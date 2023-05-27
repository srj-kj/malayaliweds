"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const adminController_1 = require("../controller/adminController");
router.post("/login", adminController_1.adminLogin);
router.get("/users", adminController_1.getUsers);
router.put("/user/block/:id", adminController_1.userActions);
exports.default = router;
