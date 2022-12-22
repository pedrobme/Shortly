import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import signUpRoute from "./routes/signup.route.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(signUpRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running at port ${PORT}`));
