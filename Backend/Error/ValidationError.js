import ApiError from "./ApiError.js";

export default class ValidationError extends ApiError {
  constructor(message = "Validation Error", errors = "Invalid Format") {
    super(message, 409, errors);
  }
}