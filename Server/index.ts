import express from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";

import mongoose from "mongoose";
import cors from 'cors'

const app = express();
const Port = 3000;

app.use(express.json());
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:8000'], // Allow requests from this origin
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors())
app.use(express.urlencoded({ extended:true }))

app.use("/", userRoutes);
app.use('/admin',adminRoutes);
mongoose
  .connect("mongodb://localhost:27017/malayaliWeds")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
