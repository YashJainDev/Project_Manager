import { useParams } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import FormContainer from './formComponents/FormContainer';
import { useSelector } from 'react-redux';

export default function AuthEntry({}) {
  const { type } = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated)
    return <Navigate to="/dashboard" replace />;
  if (type === "login")  return <FormContainer mode={"Login"}></FormContainer>;
  if (type === "signup") return  <FormContainer mode={"Sign Up"}></FormContainer>;
  // Fallback
  return <FormContainer mode={"Sign Up"}></FormContainer>;
    
}
