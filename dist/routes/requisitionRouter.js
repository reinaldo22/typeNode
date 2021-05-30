"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authJWT_1 = require("./../middlewares/authJWT");
const express_1 = require("express");
const requisitionController_1 = __importDefault(require("../controller/requisitionController/requisitionController"));
const routes = express_1.Router();
routes.post('/createRequisition', [authJWT_1.verifyToken, authJWT_1.isDoctor], requisitionController_1.default.requisition);
exports.default = routes;
