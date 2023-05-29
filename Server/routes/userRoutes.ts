import express from "express";
import {
  block,
  checkBlock,
  connection,
  follow,
  general,
  getEducation,
  getGeneral,
  getPref,
  getReligion,
  googleAuth,
  login,
  otp,
  postEducation,
  postPref,
  postreligion,
  profile,
  search,
  signup,
} from "../controller/userController";
import User from "../model/userSchema";
import userAuthMiddleware from "../middlwares/authService";
const router = express.Router();
//const controller = userController()
router.post("/login", login);
router.post("/signup", signup);

router.post("/auth/google", googleAuth);

router.post("/otp/login", otp);

router.post("/profile/general/:id", userAuthMiddleware, general);

router.get("/profile/general/:id", userAuthMiddleware, getGeneral);

router.post("/profile/religion/:id", userAuthMiddleware, postreligion);

router.get("/profile/religion/:id", userAuthMiddleware, getReligion);

router.get("/profile/education/:id", userAuthMiddleware, getEducation);

router.post("/profile/education/:id", userAuthMiddleware, postEducation);

router.get("/profile/preferences/:id", userAuthMiddleware, getPref);

router.post("/profile/preferences/:id", userAuthMiddleware, postPref);

router.get("/search/:id", userAuthMiddleware, search);

router.get("/profile/:id", userAuthMiddleware, profile);

router.post("/connect/", userAuthMiddleware, connection);

router.post("/follow", userAuthMiddleware, follow);

router.post("/block/", userAuthMiddleware, block);

router.post("/checkblock", userAuthMiddleware, checkBlock);

export default router;
