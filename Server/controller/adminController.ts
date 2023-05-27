import express, { Request, Response } from "express";
import User from "../model/userSchema";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const adminLogin = (req: Request, res: Response) => {
  console.log("admin here");

  let credentails = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASS,
  };
  if (
    req.body.email == credentails.email &&
    req.body.password == credentails.password
  ) {
    const accessToken = jwt.sign(
      { token: "hi" },
      process.env.JWT_SECRET as string
    );
    res.status(200).json(accessToken as string);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.find().select({
      username: 1,
      phone: 1,
      email: 1,
      gender: 1,
      dob: 1,
      blocked: 1,
    });

    console.log(user);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userActions = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user: any = await User.findById(id);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.updateOne({ _id: id }, { $set: { blocked: !user.blocked } });
    res.status(200).json({ message: "Status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
