import dotenv from "dotenv";
import app from "./app";
import colors from "colors";

const parsedNodeEnv = process.env.NODE_ENV || "development";

dotenv.config({
  path: parsedNodeEnv === "development" ? ".env.local" : ".env",
});

// server
const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log(colors.yellow(`NFT Service running on port ${port}`));
});
