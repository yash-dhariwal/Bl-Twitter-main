class NFTContractNotFoundError extends Error {
  constructor() {
    super(
      "NFT contract was not provided. Please ensure to set it in enviournment variables."
    );
  }
}

export { NFTContractNotFoundError };
