import { NFT, NFTMintedResponse, NFTUpdatedResponse } from "../domain/entity";
import { BaseNFTEvent } from "./base-nft-event";

export class NFTMinted extends BaseNFTEvent<NFTMintedResponse> {
  private statusCode = 201;
  private nft: NFT;
  private defaultMessage = "NFT minted succesfully";

  constructor(nft: NFT) {
    super();
    this.nft = nft;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeRest(): NFTMintedResponse {
    return {
      success: true,
      message: this.defaultMessage,
      nft: this.nft,
    };
  }
}
