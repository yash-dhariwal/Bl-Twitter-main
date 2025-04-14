import { FieldValidationError } from "express-validator";
import { BaseResponse, SerializedErrorField } from "../domain/entity";
import BaseCustomError from "./base-custom-error";

export type InvalidInputConstructorErrorsParam = FieldValidationError[];

export class InvalidInput extends BaseCustomError {
  private readonly errors: FieldValidationError[] | undefined;

  private statusCode = 422;

  private defaultErrorMessage = "The input provided is invalid";

  constructor(errors?: InvalidInputConstructorErrorsParam) {
    super("The input provided is invalid");
    this.errors = errors;

    Object.setPrototypeOf(this, InvalidInput.prototype);
  }

  /**
   * Returns response status code for invalid input error.
   * @returns {number}
   */
  getStatusCode(): number {
    return this.statusCode;
  }

  /**
   * Returns serialized output for invalid input error.
   * @returns {BaseResponse}
   */
  serializeErrorOutput(): BaseResponse {
    return this.parseValidationErrors();
  }

  /**
   * Parse validation errors and returns serialized output.
   * @returns {BaseResponse}
   */
  private parseValidationErrors(): BaseResponse {
    const parsedErrors: SerializedErrorField = {};

    if (this.errors && this.errors.length > 0) {
      this.errors.forEach((error) => {
        if (parsedErrors[error.path]) {
          parsedErrors[error.path].push(error.msg);
        } else {
          parsedErrors[error.path] = [error.msg];
        }
      });
    }

    return {
      success: false,
      message: this.defaultErrorMessage,
      errors: parsedErrors,
    };
  }
}
