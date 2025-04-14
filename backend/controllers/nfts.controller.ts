import { Request, Response } from "express";
import {
  NFTBase,
  NFTUpdatedResponse,
  NFTFetchedResponse,
  NFTMintedResponse,
  NFTSFetchedResponse,
  NFT,
  NFTAddedResponse,
} from "../domain/entity";
import { NFTSFetched, NFTMinted, NFTAdded, NFTUpdated } from "../events";
import { FieldValidationError, validationResult } from "express-validator";
import { InvalidInput, NFTNotFound, NFTAlreadyClaimed } from "../errors";
import db from "../firebase";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { mintNFTWithPrivateKey } from "../utils";

const nftsController = {
  /**
   * Fetch all unclaimed nfts from database.
   * @param {Request<{}, NFTSFetchedResponse>} req - Request Body
   * @param {Response<NFTSFetchedResponse>} res - Response Body
   * @returns {void}
   */
  fetchNFTS: async (
    req: Request<{}, NFTSFetchedResponse>,
    res: Response<NFTSFetchedResponse>
  ) => {
    const errors = validationResult(req).array() as FieldValidationError[];

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    try {
      const queryResult = await db
        .collection("nfts")
        .where("owner", "==", null)
        .get();

      const nftsFetched = new NFTSFetched(queryResult);

      return res
        .status(nftsFetched.getStatusCode())
        .send(nftsFetched.serializeRest());
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update NFT Detail in DB.
   * @param {Request<{id: string}, NFTUpdatedResponse>} req - Request Body
   * @param {Response<NFTUpdatedResponse>} res - Response Body
   * @returns {void}
   */
  updateNFT: async (
    req: Request<{ id: string }, NFTUpdatedResponse, NFT>,
    res: Response<NFTUpdatedResponse>
  ) => {
    const errors = validationResult(req).array() as FieldValidationError[];

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    const nft: NFT = req.body;
    const id: string = req.params.id;

    try {
      const currentServerTime = Timestamp.now();

      const nftData = {
        ...nft,
        updatedAt: currentServerTime,
      };

      await db.collection("nfts").doc(id).update(nftData);

      const nftUpdated = (
        await db.collection("nfts").doc(id).get()
      ).data() as NFT;

      const nftUpdatedEvent = new NFTUpdated(nftUpdated);

      return res
        .status(nftUpdatedEvent.getStatusCode())
        .send(nftUpdatedEvent.serializeRest());
    } catch (error) {
      throw error;
    }
  },

  /**
   * Add NFT Detail in DB.
   * @param {Request<{id: string}, NFTAddedResponse>} req - Request Body
   * @param {Response<NFTAddedResponse>} res - Response Body
   * @returns {void}
   */
  addNFT: async (
    req: Request<{ id: string }, NFTAddedResponse, NFTBase>,
    res: Response<NFTAddedResponse>
  ) => {
    const errors = validationResult(req).array() as FieldValidationError[];

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    const nft: NFTBase = req.body;
    const id: string = req.params.id;

    try {
      const currentServerTime = Timestamp.now();

      const nftData = {
        ...nft,
        createdAt: currentServerTime,
      };

      await db.collection("nfts").doc(id).set(nftData);

      const nftUpdatedEvent = new NFTAdded({ ...nftData, id });

      return res
        .status(nftUpdatedEvent.getStatusCode())
        .send(nftUpdatedEvent.serializeRest());
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mint NFT and assign to a specific address.
   * @param {Request<{id: string}, NFTMintedResponse>} req - Request Body
   * @param {Response<NFTMintedResponse>} res - Response Body
   * @returns {void}
   */
  mintNFT: async (
    req: Request<
      { id: string },
      NFTMintedResponse,
      { recipientAddress: `0x${string}` }
    >,
    res: Response<NFTMintedResponse>
  ) => {
    const errors = validationResult(req).array() as FieldValidationError[];

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    const { recipientAddress } = req.body;
    const id = req.params.id;

    // Fetch NFT details from the database
    const nftDetails = (
      await db.collection("nfts").doc(id).get()
    ).data() as NFT;

    // Validate that the NFT exists and has not been claimed
    if (!nftDetails) {
      throw new NFTNotFound();
    }

    if (nftDetails.owner !== null) {
      throw new NFTAlreadyClaimed();
    }

    try {
      // Perform the minting process using the private key and smart contract interaction
      const mintResult = await mintNFTWithPrivateKey(id, recipientAddress);
      const transactionHash = mintResult.hash;

      // Update the NFT details in the database
      await db.collection("nfts").doc(id).update({
        owner: recipientAddress,
        mintedAt: Timestamp.now(),
        mintTransactionHash: transactionHash,
      });

      db.collection("users")
        .doc(recipientAddress)
        .update({ level: FieldValue.increment(1) });

      const nftMintedEvent = new NFTMinted({
        ...nftDetails,
        owner: recipientAddress,
        mintTransactionHash: transactionHash,
        mintedAt: Timestamp.now(),
      });

      return res
        .status(nftMintedEvent.getStatusCode())
        .send(nftMintedEvent.serializeRest());
    } catch (error) {
      throw error;
    }
  },
};

export { nftsController };
