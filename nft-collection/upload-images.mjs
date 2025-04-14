import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import mime from 'mime';
import { NFTStorage, File } from "nft.storage"
import db from "./db.mjs"
import axios from "axios"
import {Timestamp} from "firebase-admin/firestore"

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
async function storeNFT(imagePath, name, description) {
    // load the file from disk
    const image = await fileFromPath(imagePath);

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
    });
}

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
async function fileFromPath(filePath) {
    const content = await fs.readFile(filePath);
    const type = mime.getType(filePath);
    return new File([content], path.basename(filePath), { type });
}

async function main() {
    try {
        for (let i = 3; i < 10; i++) {
            const imageName = `image_${i}.png`;
            const imagePath = `./images/${imageName}`;

            // Upload image
            const imageUploadResponse = await storeNFT(
                imagePath,
                imageName,
                'NFT Description'
            );

            console.log('Image uploaded:', imageUploadResponse);

            const { ipnft } = imageUploadResponse
            
            const metadataRes = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipnft}/metadata.json`)
            
            const metadata = metadataRes.data

            const res = await db.collection('nfts').doc(ipnft).set({...metadata, owner: null, createdAt: Timestamp.now()})
            console.log('Image added to DB:', res);
        }
    } catch (error) {
        console.error(error);
    }
}

main();
