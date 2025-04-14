import { BaseResponse } from "../domain/entity";

export default abstract class BaseCustomError extends Error {
  protected constructor(message?: string) {
    super(message);

    Object.setPrototypeOf(this, BaseCustomError.prototype);
  }

  /**
   * Returns response status code for a error.
   * @returns {number}
   */
  abstract getStatusCode(): number;

  /**
   * Returns serialized output for a error.
   * @returns {BaseResponsenumber}
   */
  abstract serializeErrorOutput(): BaseResponse;
}
