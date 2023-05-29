import express from "express";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";

import mongoose from "mongoose";
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express();
const Port = 3000;
app.use(bodyParser.json());
app.use(express.json());
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
