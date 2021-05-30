"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const justificationController_1 = __importDefault(require("../controller/justificationController/justificationController"));
const authJWT_1 = require("./../middlewares/authJWT");
const express_1 = require("express");
const routes = express_1.Router();
routes.post('/justification', [authJWT_1.verifyToken, authJWT_1.isDoctor], justificationController_1.default.createJustification);
exports.default = routes;
