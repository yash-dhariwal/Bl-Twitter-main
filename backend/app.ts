import express from "express";
import "express-async-errors";
import { errorHandler } from "./middleware";
import { nftsView } from "./views";
import cors from "cors";

const app = express();
app.use(express.json());

let corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

// Routes - Ensure that this comes after middlewares
app.use(nftsView);

// Error handling middleware
app.use(errorHandler);

export default app;
