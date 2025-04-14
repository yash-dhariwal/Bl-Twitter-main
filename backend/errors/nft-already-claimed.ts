import { BaseResponse } from "../domain/entity";
import BaseCustomError from "./base-custom-error";

export class NFTAlreadyClaimed extends BaseCustomError {
  private statusCode = 400;
  private defaultErrorMessage = "NFT with provided id was already claimed.";

  constructor() {
    super("NFT with provided id was already claimed.");
    Object.setPrototypeOf(this, NFTAlreadyClaimed.prototype);
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
