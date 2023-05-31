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
  login,
  otp,
  postEducation,
  postPref,
  postreligion,
  proPic,
  profile,
  search,
  searchProfile,
  signup,
} from "../controller/userController";
import User from "../model/userSchema";
import userAuthMiddleware from "../middlwares/authService";
import multer from 'multer'
const router = express.Router();
const storage = multer.memoryStorage()
const upload = multer({storage: storage})
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

router.get("/search/:id", search);

router.get("/profile/:id", profile);

router.post("/connect/", userAuthMiddleware, connection);

router.post("/follow", userAuthMiddleware, follow);

router.post("/block/", userAuthMiddleware, block);

router.post("/checkblock", userAuthMiddleware, checkBlock);

router.post("/searchById", searchProfile);

router.post('/api/profilepic/:id',userAuthMiddleware,upload.single('profileImage'),proPic)

router.post('/api/images/upload/:id',userAuthMiddleware,upload.array('images'),imagesUpload)

router.get('/api/images/upload/:id',userAuthMiddleware,getUploadedImages)




export default router;
