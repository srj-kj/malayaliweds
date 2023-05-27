import express, { Request, Response } from "express";
import User from "../model/userSchema";
import bcrypt from "bcrypt";
import moment from "moment";


import jwt from "jsonwebtoken";
const router = express.Router();
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid User" });
    }

    if (user.blocked) {
      return res.status(404).json({ message: "Unauthorized User" });
    }

    const userPass = await bcrypt.compare(password, user.password as string);

    if (!userPass) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { token: "hi" },
      process.env.JWT_SECRET as string
    );
    const data = {
      id:user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      accessToken,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const user: any = {
      username: req.body.name,
      email: req.body.email,
      phone: req.body.mobile,
      dob: req.body.dob,
      gender: req.body.gender,
    };

    const dob = moment(user?.dob);
    console.log(dob);
    const today = moment();
    user.age = today.diff(dob, "years");
    console.log("age");
    
    console.log(user.age);


    const userFind = await User.findOne({
      $or: [{ email: user.email }, { phone: user.phone }],
    });

    if (userFind) {
      console.log("User Exist");
      return res.status(400).json({ message: "User Exist" });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    user.password = password;
    await User.create(user);
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    const email = data.email;
    const user = await User.findOne({ email });
    const accessToken = jwt.sign(
      { token: "hi" },
      process.env.JWT_SECRET as string
    );

    if (user?.blocked) {
      return res.status(404).json({ message: "Account is Restricted" });
    }

    if (!user) {
      const userField = {
        email: data.email,
        username: data.name,
        isGoogleRegister: true,
      };

      await User.create(userField);

      const details = {
        email: data.email,
        username: data.name,
        isGoogleRegister: true,
        accessToken,
      };
      res.status(200).json({ details, message: "Registration successful" });
    }
    if (user) {
      const details = {
        email: user.email,
        username: user.username,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        accessToken,
      };
      res.status(200).json({ details, message: "Login successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const otp = async (req: Request, res: Response) => {
  try {
    console.log("call is coming");
    const phone = req.body.phone;
    console.log(phone);

    const user = await User.findOne({ phone });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "Invalid User" });
    }

    const accessToken = jwt.sign(
      { token: "hi" },
      process.env.JWT_SECRET as string
    );
    const data = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      accessToken,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
