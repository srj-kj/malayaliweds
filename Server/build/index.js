"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const Port = 3000;
app.use(express_1.default.json());
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:8000'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", userRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
mongoose_1.default
    .connect("mongodb://localhost:27017/malayaliWeds")
    .then(() => {
    console.log("Database Connected");
})
    .catch((err) => {
    console.log(err);
});
app.listen(Port, () => {
    console.log(`listening on port ${Port}`);
});
