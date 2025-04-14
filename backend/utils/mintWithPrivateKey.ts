import { TransactionReceipt, ethers } from "ethers";
import Twitter3NFTDropABI from "./Twitter3NFTDrop.json";
import { config } from "dotenv";
import { NFTContractNotFoundError, PrivateKeyNotFoundError } from "../errors";
config();

const provider = new ethers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const contractAddress = process.env.NFT_COLLECTION_CONTRACT_ADDRESS;

async function mintNFTWithPrivateKey(
  nftId: string,
  recipientAddress: string
): Promise<TransactionReceipt> {
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    throw new PrivateKeyNotFoundError();
  }

  if (!contractAddress) {
    throw new NFTContractNotFoundError();
  }

  // Connect to the deployed smart contract using the private key
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(
    contractAddress,
    Twitter3NFTDropABI.abi,
    wallet
  );

  try {
    const url = `ipfs://${nftId}/metadata.json`;

    // Perform the minting operation on the smart contract
    const mintTransaction = await contract.safeMint(recipientAddress, url);

    // Wait for the transaction to be mined
    const receipt = await mintTransaction.wait();

    return receipt;
  } catch (error) {
    throw error;
  }
}

export { mintNFTWithPrivateKey };
