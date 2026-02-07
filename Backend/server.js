import "dotenv/config";
import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import visa from "./routes/visa.js";


const FRONTEND_URL = process.env.FRONTEND_URL || "*";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(
  cors({
    origin: FRONTEND_URL === "*" ? "*" : [FRONTEND_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", auth);
app.use("/visa", visa);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});