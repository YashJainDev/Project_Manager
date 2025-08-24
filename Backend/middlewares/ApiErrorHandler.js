import ApiResponse from "../Controllers/ApiResponse/index.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Something Went Wrong";
    const error = err.error || "Server Error"
    ApiResponse(res,statusCode,false,message,null,error);
};

export default errorHandler;