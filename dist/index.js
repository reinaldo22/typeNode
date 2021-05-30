"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("./database/connect");
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const requisitionRouter_1 = __importDefault(require("./routes/requisitionRouter"));
const justificationRouter_1 = __importDefault(require("./routes/justificationRouter"));
const morgan_1 = __importDefault(require("morgan"));
require("express-async-errors");
const app = express_1.default();
const cors = require('cors');
app.use(cors());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(userRouter_1.default);
app.use(justificationRouter_1.default);
app.use(requisitionRouter_1.default);
app.listen(process.env.PORT, () => console.log('Server started'));
