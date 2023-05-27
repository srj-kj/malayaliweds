import express from "express";
const router = express.Router();

import {
  adminLogin,
  getUsers,
  userActions,
} from "../controller/adminController";

router.post("/login", adminLogin);

router.get("/users", getUsers);

router.put("/user/block/:id", userActions);

export default router;
