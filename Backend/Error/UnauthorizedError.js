import ApiError from "./ApiError.js";

export default class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized",error = null) {
    super(message, 401, error);
  }
};