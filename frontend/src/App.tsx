import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/navbar/navbar.component";
import Home from "./pages/home.page";
import ClaimsPage from "./pages/claims.page";
import PostTweet from "./components/post-tweet/post-tweet.component";
import { useEffect } from "react";
import Web3 from "web3";
import { initTweetContract } from "./store/slices/tweetContract.slice";
import toast, { Toaster } from "react-hot-toast";
import MyProfilePage from "./pages/my-profile.page";
import OthersProfilePage from "./pages/profile.page";
import MyPostsPage from "./pages/my-posts.page";
import ConnectPage from "./pages/connect.page";
import PostPage from "./pages/post.page";
import NFTModal from "./components/claims/nft-modal/nft-modal.component";
import NFTMintSuccessModal from "./components/claims/nft-modal/nft-min-success-modal.component";
import OwnNFTModal from "./components/profile/nft-modal/own-nft-modal.component";
import { fetchUser } from "./store/thunks/user.thunk";
import { useAppDispatch } from "./store/hooks";
import { setUser } from "./store/slices/user.sllice";
import { ProtectedRoute } from "./components/common/protected-route/protected-route.component";
import OthersNFTModal from "./components/profile/nft-modal/others-nft-modal.component";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let provider = window.ethereum;

    const handleAccountsChanged = (accounts: string[]) => {
      const address: `0x${string}` | null =
        accounts.length > 0
          ? (Web3.utils.toChecksumAddress(accounts[0]) as `0x${string}`)
          : null;

      if (address !== null) {
        dispatch(fetchUser(address));
      } else {
        dispatch(setUser(null));
      }
    };

    const requestWalletConnect = async () => {
      if (typeof provider !== "undefined") {
        await provider
          .request({ method: "eth_requestAccounts" })
          .then(async (accounts: string[]) => {
            const address: `0x${string}` = Web3.utils.toChecksumAddress(
              accounts[0]
            ) as `0x${string}`;

            // Dispatch action to set address
            dispatch(fetchUser(address));
          })
          .catch((err: any) => {
            dispatch(setUser(null));
            toast.error(err.message);
          });

        window.ethereum.on("accountsChanged", handleAccountsChanged);
      } else {
        toast.error("Please install metamask to continue.");
      }
    };

    requestWalletConnect();
    dispatch(initTweetContract(provider));

    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
      }
    };
  }, [dispatch]);

  return (
    <BrowserRouter basename="/">
      <div className="bg-black w-full min-h-screen">
        <Toaster position="bottom-right" />
        <PostTweet />
        <NFTModal />
        <NFTMintSuccessModal />
        <OwnNFTModal />
        <OthersNFTModal />

        <div className="container mx-auto grid grid-cols-12">
          <div className="col-span-3 h-screen">
            <Navbar />
          </div>
          <div className="col-span-9">
            <Routes>
              <Route path="/connect" Component={ConnectPage} />

              {/* Protected Routes  */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/claims"
                element={
                  <ProtectedRoute>
                    <ClaimsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-posts"
                element={
                  <ProtectedRoute>
                    <MyPostsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MyProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/:id" Component={OthersProfilePage} />
              <Route
                path="/post/:id"
                element={
                  <ProtectedRoute>
                    <PostPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
