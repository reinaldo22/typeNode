"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("./src/database/connect");
const userRouter_1 = __importDefault(require("./src/routes/userRouter"));
const index_1 = __importDefault(require("./src/routes/index"));
const requisitionRouter_1 = __importDefault(require("./src/routes/requisitionRouter"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = express_1.default();
const cors = require('cors');
app.use(cors());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(userRouter_1.default);
app.use(requisitionRouter_1.default);
app.use(index_1.default);
app.listen(8080, () => console.log('Server started'));