import ApiError from "./ApiError.js";

export default class ForbiddenError extends ApiError {
  constructor(message = "Forbidden") {
    super(message, 403, "Forbidden");
  }
};