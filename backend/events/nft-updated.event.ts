import { NFT, NFTUpdatedResponse } from "../domain/entity";
import { BaseNFTEvent } from "./base-nft-event";

export class NFTUpdated extends BaseNFTEvent<NFTUpdatedResponse> {
  private statusCode = 200;
  private nft: NFT;
  private defaultMessage = "NFT updated succesfully";

  constructor(nft: NFT) {
    super();
    this.nft = nft;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeRest(): NFTUpdatedResponse {
    return {
      success: true,
      message: this.defaultMessage,
      nft: this.nft,
    };
  }
}
