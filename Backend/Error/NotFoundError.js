import ApiError from "./ApiError.js";

export default class NotFoundError extends ApiError {
  constructor(message = "Resource Not Found") {
    super(message, 404, "NotFound");
  }
};