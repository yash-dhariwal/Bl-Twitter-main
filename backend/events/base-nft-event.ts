export abstract class BaseNFTEvent<TRest = unknown> {
  /**
   * Returns response status code for a event.
   * @returns {number}
   */
  abstract getStatusCode(): number;

  /**
   * Returns serialized output for a event.
   * @returns {BaseResponse}
   */
  abstract serializeRest(): TRest;
}
