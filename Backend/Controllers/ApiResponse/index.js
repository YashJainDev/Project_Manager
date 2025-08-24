export default function ApiResponse(res, statusCode, success, message, data = null, error = null) {
    const response = {
        success,
        message,
        ...(data && { data }),
        ...(error && { error }),
    };

    return res.status(statusCode).json(response);
}