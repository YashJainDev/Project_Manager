import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth.js";

const CustomForm = ({ e,
  mode
}) => {
  const { login,register,error,loading } = useAuth();
    const [credentials,setCredentials] = useState({
      username:"",
      email:"",
      password:""
    });

  const HandleSubmit = async(e)=>{
    e.preventDefault();
    if (mode == "Sign Up")
      register(credentials);
    else
      login(credentials);
  }

  return <form onSubmit={HandleSubmit}>
    <div className={`form-control w-full mt-4`}>
      <label className="label">
        <span className={'label-text text-base-content '}>Username</span>
      </label>
      <input 
        type={'text'} 
        value={credentials.username}
        placeholder={''} 
        required 
        onChange={e => setCredentials({
          ...credentials,
          username: e.target.value
        })} 
        className="input  input-bordered w-full validator" 
        pattern="[A-Za-z][A-Za-z0-9\-_]*$" 
        title="Must start with a letter and contain only letters, numbers, or hyphens"
        minLength="3" 
        maxLength="20" 
      />
      <p className="validator-hint hidden">
        Must be 3 to 20 characters
        <br />containing only letters, numbers or dash
      </p>
    </div>

    {mode === "Sign Up" && (
        <div className={`form-control w-full mt-4`}>
      <label className="label">
        <span className={'label-text text-base-content '}>Email</span>
      </label>
      <input 
        type={'email'} 
        value={credentials.email} 
        placeholder={''} 
        required onChange={e => setCredentials({
          ...credentials,
          email: e.target.value
        })} 
        className="input  input-bordered w-full validator" 
      />
      <div className="validator-hint hidden">Enter valid email address</div>
    </div>
    )}

    <div className={`form-control w-full mt-4`}>
      <label className="label">
        <span className={'label-text text-base-content '}>Password</span>
      </label>
      <input 
        type={'password'} 
        value={credentials.password} 
        placeholder={''} 
        onChange={e => setCredentials({
          ...credentials,
          password: e.target.value
        })} 
        className="input input-bordered w-full validator" 
        minLength="8" 
        required 
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" 
      />
      <p className="validator-hint hidden">
        Must be more than 8 characters, including
        <br />At least one number
        <br />At least one lowercase letter
        <br />At least one uppercase letter
      </p>
      {error.length > 0 && (error.map((msg)=>{
        return <p className="text-red-500">{msg}</p>
      }))}

    </div>

    {
      
    }
    <button type="submit" className={`btn mt-2 w-full btn-primary text-black`}>
      {loading ? (
        <span className="loading loading-dots loading-xl"></span>  
      ) : (
        mode === "Sign Up" ? "Register" : "Access Dashboard"
      )}
    </button>
  </form>;
}


export default CustomForm;