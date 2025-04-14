import { NFT, NFTUpdatedResponse } from "../domain/entity";
import { BaseNFTEvent } from "./base-nft-event";

export class NFTAdded extends BaseNFTEvent<NFTUpdatedResponse> {
  private statusCode = 201;
  private nft: NFT;
  private defaultMessage = "NFT added succesfully";

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
