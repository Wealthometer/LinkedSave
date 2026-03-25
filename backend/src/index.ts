import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
