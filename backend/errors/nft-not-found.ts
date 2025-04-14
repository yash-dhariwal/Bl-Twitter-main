import { BaseResponse } from "../domain/entity";
import BaseCustomError from "./base-custom-error";

export class NFTNotFound extends BaseCustomError {
  private statusCode = 422;
  private defaultErrorMessage = "NFT with provided id does not exist";

  constructor() {
    super("NFT with provided id does not exist");
    Object.setPrototypeOf(this, NFTNotFound.prototype);
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
    return {
      success: false,
      message: this.defaultErrorMessage,
    };
  }
}
