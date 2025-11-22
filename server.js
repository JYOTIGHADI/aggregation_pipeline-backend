import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import orderRouter from "./routes/order.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Aggregation Pipeline API Working");
});

app.use("/api/orders", orderRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.listen(8000, () => console.log("Server running on port 8000"));


