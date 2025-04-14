import { NFT, NFTSFetchedResponse } from "../domain/entity";
import { BaseNFTEvent } from "./base-nft-event";

export class NFTSFetched extends BaseNFTEvent<NFTSFetchedResponse> {
  private statusCode = 200;
  private nfts: NFT[];
  private defaultMessage = "NFTs fetched succesfully";

  constructor(
    nfts: FirebaseFirestore.QuerySnapshot<
      FirebaseFirestore.DocumentData,
      FirebaseFirestore.DocumentData
    >
  ) {
    super();
    this.nfts = nfts.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as NFT;
    });
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeRest(): NFTSFetchedResponse {
    return {
      success: true,
      message: this.defaultMessage,
      nfts: this.nfts,
      ntfsCount: this.nfts.length,
    };
  }
}
