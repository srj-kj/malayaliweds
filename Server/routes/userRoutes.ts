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
  getUploadedImages,
  googleAuth,
  imagesUpload,
  like,
  login,
  matchUser,
  notinterest,
  otp,
  postEducation,
  postPref,
  postreligion,
  proPic,
  profile,
  search,
  searchProfile,
  signup,
  undoRemove,
  undomatch,
} from "../controller/userController";

import userAuthMiddleware from "../middlwares/authService";
import multer from "multer";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

router.get("/search/:id", search);

router.get("/profile/:id", profile);

router.post("/connect/", connection);

router.post("/follow", follow);

router.post("/block/", block);

router.post("/checkblock", checkBlock);

router.post("/searchById", searchProfile);

router.post("/api/profilepic/:id", upload.single("profileImage"), proPic);

router.post("/api/images/upload/:id", upload.array("images"), imagesUpload);

router.get("/api/images/upload/:id", getUploadedImages);

router.post("/api/match",matchUser)
router.post("/api/undomatch",undomatch)

router.post("/api/notinterest",notinterest)
router.post("/api/undoremove",undoRemove)
router.post("/api/like",like)


export default router;
