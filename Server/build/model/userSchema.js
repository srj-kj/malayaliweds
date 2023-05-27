"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userschema = new mongoose_1.Schema({
    username: {
        type: "string",
        required: true,
        min: 3,
    },
    email: {
        type: "string",
        required: true,
        lowercase: true,
        unique: true,
    },
    phone: {
        type: "string",
    },
    dob: {
        type: "string",
    },
    password: {
        type: "string",
        min: 5,
    },
    gender: {
        type: "string",
    },
    blocked: {
        type: "boolean",
        default: false
    }
});
const User = (0, mongoose_1.model)("users", userschema, "users");
exports.default = User;
