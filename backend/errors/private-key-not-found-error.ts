class PrivateKeyNotFoundError extends Error {
  constructor() {
    super(
      "Private key was not provided. Please ensure to set it in enviournment variables."
    );
  }
}

export {PrivateKeyNotFoundError}