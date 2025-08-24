import ApiError from "./ApiError.js";

export default class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(message, 400, "BadRequest");
  }
}