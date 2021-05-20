"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllUsers_1 = __importDefault(require("../controller/doctorController/getAllUsers"));
const routes = express_1.Router();
routes.get('/index', getAllUsers_1.default.todos);
exports.default = routes;
