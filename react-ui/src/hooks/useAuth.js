import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailed } from "../Slice/authSlice";
import { toast } from "react-hot-toast";

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const baseURL = import.meta.env.VITE_APP_BASE_URL;
    if (!baseURL) throw new Error("Could not get base app URL");

    const authRequest = async (auth_url, credentials) => {
        const url = baseURL.concat(auth_url);

        try {
            setLoading(true);
            const response = await axios.post(url, credentials);
            if (!response.data.success) {
                const errMsg = response.data.message || "Login failed";
                setError(errMsg);
                toast.error(errMsg);
                return;
            }

            if (response.data.data.accessToken) {
                const token = response.data.data.accessToken
                console.log(token)
                localStorage.setItem('token', token);
                dispatch(loginSuccess(token));
                toast.success("You have been Successfully Logged In")
                navigate('/dashboard');
            }
        } catch (err) {
            let errMsg = [];
            if (err.response.data.message == "Validation Error")
                errMsg = err.response?.data?.error || "Authentication failed";
            if (err.response.data.message == "Unauthorized Error"){
                errMsg = err.response?.data?.error || "Unauthorized Error"
            }
            errMsg = errMsg.map(((obj)=>obj.msg))
            setError(errMsg);
            dispatch(loginFailed(errMsg));
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    const login = (credentials) => authRequest('/app/user/login', credentials);
    const register = (credentials) => authRequest('/app/user/register', credentials);

    return { login, register, loading, error };
}
