import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Navigate,Outlet, useNavigate } from "react-router-dom";
import { verifyUser } from "../Slice/authSlice";
import toast from "react-hot-toast";

/*==============================
This Route will check if the user is Authorized or not
==============================*/
export default function ProtectedRoutes(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated,loading,error } = useSelector((state)=>state.auth);

    useEffect(()=>{
        dispatch(verifyUser());
    },[dispatch])

    useEffect(() => {
        if (error === "TokenExpiredError") {
            toast.error("Session expired. Please log in again.");
            navigate("/auth/login");
        } else if (error === "JsonWebTokenError") {
            toast.error("Invalid token. Please log in again.");
            navigate("/auth/login");
        } else if (error === "Server error") {
            toast.error("Something went wrong. Please try again later.");
        }
    }, [error, navigate]);


    if (loading || isAuthenticated === null) return <div className="min-h-screen skeleton flex justify-center items-center text-xl">Loading...</div>;

    if (!isAuthenticated ) return <Navigate to="/auth/login" />;

    return <Outlet/>;
}
    