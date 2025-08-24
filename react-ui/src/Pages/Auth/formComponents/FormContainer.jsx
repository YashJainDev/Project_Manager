import CustomForm from "./CustomForm";

const FormContainer = ({
  mode
}) => {

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md">
        <div className="py-24 px-10">
          <h2 className="text-2xl font-semibold mb-2 text-center">{mode}</h2>
          <CustomForm mode={mode}/>
          <div className="text-center mt-4">
            {mode === 'Login' ? "Don't have an account yet? " : "Already have an account "}
            <a href={mode === 'Login' ? "/auth/signup" : "/auth/login"}>
              <span className=" inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200 text-purple-900">
                {mode === 'Login' ? "Register" : "Login"}
              </span>
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FormContainer;
