"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.post("/login", userController_1.login);
router.post("/signup", userController_1.signup);
router.post("/auth/google", userController_1.googleAuth);
router.post("/otp/login", userController_1.otp);
exports.default = router;
