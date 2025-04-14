# BL-Twitter - Decentralized Twitter

## Project Runtims:
1. NodeJS: v21.6.1

## Setup Locally
1. Clone the repository to your local machine using
   
   ```bash
   git clone https://github.com/pulkit0333/twitter3.git
   ```
3. Run the setup.sh shell script (for mac) or setup.bat script for windows in each of the project directories to setup frontend, backend and nft creation projects.

   For Mac / Unix:
   ```bash
   source ./frontend/setup.sh
   source ./backend/setup.sh
   source ./nft-collection/setup.sh
   ```

   For Windows:
   ```cmd
   ./frontend/setup.bat
   ./backend/setup.bat
   ./nft-collection/setup.bat
   ```

   Confirm that node_modules folder and .env file is generated in each of the directories.

## Firebase Setup
1. Head over to [Firebase](https://firebase.google.com) and create new project with any name you want.
2. Register a new web app and paste its credentials in frontend/.env.local file.

   ```bash
   # Firestore Setup
   REACT_APP_FIREBASE_API_KEY = "your_api_key"
   REACT_APP_FIREBASE_AUTH_DOMAIN = "your_auth_domain"
   REACT_APP_FIREBASE_PROJECT_ID = "your_project_id"
   REACT_APP_FIREBASE_STORAGE_BUCKET = "your_storage_bucket"
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "your_messaging_sender_id"
   REACT_APP_FIREBASE_APP_ID = "your_app_id"
   ```
4. Head over to project settings and download new service account key.
5. Copy this service account key with file name **serviceAccountKey.json** in backend and nft-collection directory.

## NFT.Storage & Infura Setup
  1. Head over to [nft.storage](https://nft.storage/) and create new account.
  2. Create a new api key, copy its value and past it in nft-collection/.env file.
     
     ```bash
     NFT_STORAGE_API_KEY = "your-nft-storage-api-key-here"
     ```
  4. Now, head over to [Infura.io](https://www.infura.io/).
  5. Goto your dashboard, create new API key and paste its value in backend/.env file.
     
     ```bash
     INFURA_API_KEY = "your-infura-api-key-here"
     ```

## Test, Run and Deploy Smart Contract using Remix IDE
   1. Signup at [Remix IDE](https://remix.ethereum.org/).
   2. Import nft-collection, twitter smart contract in remix ide.
   3. Test, run and deploy contract on sepolia chain, using injected provider.
   4. Copy twitter contract address and paste it in frontend/.env.local file.
      ```bash
      REACT_APP_TWEET_CONTRACT = "your-twitter-contract-address"
      ```
   5. Also set you backend base url in frontend/.env.local file.
      ```bash
      REACT_APP_NFT_API_BASEURL = "http://127.0.0.1:8000/api"
      ```

      Note: You can run backend on different PORT but ensure to replace it with 8000.
   7. Copy nft-contract address and your metamask account private key in backend/.env file.
      ```bash
      PRIVATE_KEY = "your-account-private-key"
      NFT_COLLECTION_CONTRACT_ADDRESS = "your-nft-contract-address"
      ```

## Genarating NFTs:
   1. To generate NFTs change you directory to nft-generator folder.
   2. Run this command to generate images:
      ```bash
      yarn generate
      ```
   3. Run this command to upload nft to IPFS and store metadata in Firebase.
      ```bash
      yarn upload
      ```

## Running project
   1. Start backend changing to backend directory and using:
      ```bash
      yarn start
      ```
   2. Start front end in new terminal using:
      ```bash
      yarn start
      ```
     
