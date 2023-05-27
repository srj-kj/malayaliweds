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
exports.userActions = exports.getUsers = exports.adminLogin = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const adminLogin = (req, res) => {
    console.log("admin here");
    let credentails = {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
    };
    if (req.body.email == credentails.email &&
        req.body.password == credentails.password) {
        const accessToken = jsonwebtoken_1.default.sign({ token: "hi" }, process.env.JWT_SECRET);
        res.status(200).json(accessToken);
    }
};
exports.adminLogin = adminLogin;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.default.find().select({
            username: 1,
            phone: 1,
            email: 1,
            gender: 1,
            dob: 1,
            blocked: 1,
        });
        console.log(user);
        res.status(200).json({ user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUsers = getUsers;
const userActions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield userSchema_1.default.findById(id);
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        yield userSchema_1.default.updateOne({ _id: id }, { $set: { blocked: !user.blocked } });
        res.status(200).json({ message: "Status updated" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.userActions = userActions;
