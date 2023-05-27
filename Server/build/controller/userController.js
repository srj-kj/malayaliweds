"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otp = exports.googleAuth = exports.signup = exports.login = void 0;
const express_1 = __importDefault(require("express"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const google_auth_library_1 = require("google-auth-library");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const oAuth2Client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, "postmessage");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield userSchema_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid User" });
        }
        if (user.blocked) {
            return res.status(404).json({ message: "Unauthorized User" });
        }
        const userPass = yield bcrypt_1.default.compare(password, user.password);
        if (!userPass) {
            return res.status(404).json({ message: "Invalid password" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ token: "hi" }, process.env.JWT_SECRET);
        const data = {
            username: user.username,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            gender: user.gender,
            accessToken,
        };
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const user = {
            username: req.body.name,
            email: req.body.email,
            phone: req.body.mobile,
            dob: req.body.dob,
            gender: req.body.gender,
        };
        const userFind = yield userSchema_1.default.findOne({
            $or: [{ email: user.email }, { phone: user.phone }],
        });
        if (userFind) {
            console.log("User Exist");
            return res.status(400).json({ message: "User Exist" });
        }
        const password = yield bcrypt_1.default.hash(req.body.password, 10);
        user.password = password;
        yield userSchema_1.default.create(user);
        res.status(200).json({ message: "Registration successful" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signup = signup;
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const email = data.email;
        const user = yield userSchema_1.default.findOne({ email });
        const accessToken = jsonwebtoken_1.default.sign({ token: "hi" }, process.env.JWT_SECRET);
        if (user === null || user === void 0 ? void 0 : user.blocked) {
            return res.status(404).json({ message: "Account is Restricted" });
        }
        if (!user) {
            const userField = {
                email: data.email,
                username: data.name,
                isGoogleRegister: true,
            };
            yield userSchema_1.default.create(userField);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.googleAuth = googleAuth;
const otp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("call is coming");
        const phone = req.body.phone;
        console.log(phone);
        const user = yield userSchema_1.default.findOne({ phone });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Invalid User" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ token: "hi" }, process.env.JWT_SECRET);
        const data = {
            username: user.username,
            email: user.email,
            phone: user.phone,
            dob: user.dob,
            gender: user.gender,
            accessToken,
        };
        res.status(200).json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.otp = otp;
