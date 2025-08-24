import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyUser = createAsyncThunk("auth/verifyUser", async(_, thunkAPI )=>{
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token Found");
    const authURl = (import.meta.env.VITE_APP_BASE_URL).concat("/app/user/auth");
    if (!authURl) throw new Error("could not get auth URL");
    

    try {
        const res = await axios.get(
          authURl,
          {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        return res.data.message;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error);

    }
});

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isAuthenticated:null,
        loading:false,
        token:localStorage.getItem("token") || null,
        error:null,
        isLoggedin : false
    },
    reducers:{
        logout:(state)=>{
            localStorage.removeItem("token");
            state.isAuthenticated = false;
            state.isLoggedin = false;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
            state.isLoggedin = true;
        },
        loginFailed:(state,action)=>{
            state.isAuthenticated = false;
            state.isLoggedin = false,
            state.error = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(verifyUser.pending,(state)=>{
            state.loading = true;
            state.error = false;
        });
        builder.addCase(verifyUser.fulfilled,(state)=>{
            state.loading = false;
            state.isAuthenticated = true;
        });
        builder.addCase(verifyUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload || "Server error";
            state.isAuthenticated = false;
        })
    }
});

export const { logout,loginSuccess,loginFailed } = authSlice.actions;
export default authSlice.reducer;