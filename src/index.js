import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import signUpRoute from "./routes/signup.route.js";
import signInRoute from "./routes/signin.route.js";
import shortenRoute from "./routes/shorten.route.js";

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use(signUpRoute);
app.use(signInRoute);
app.use(shortenRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server running at port ${PORT}`));
