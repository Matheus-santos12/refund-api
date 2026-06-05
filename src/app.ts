import cors from "cors";
import express from "express";

import { errorHandling } from "./middlewares/error-handling";

const app = express();
app.use(cors());
app.use(express.json());

app.use(errorHandling);

export { app };
