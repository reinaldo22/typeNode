"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createDoctor_1 = __importDefault(require("../controller/doctorController/createDoctor"));
const loginDoctor_1 = __importDefault(require("../controller/doctorController/loginDoctor"));
const Validate_1 = __importDefault(require("../controller/doctorController/Validate"));
const Activate_1 = __importDefault(require("../controller/doctorController/Activate"));
const routes = express_1.Router();
routes.post('/doctorSignUp', createDoctor_1.default.createDoctor);
routes.post('/validate', Validate_1.default.createValidate);
routes.get('/activate/:token', Activate_1.default.verifyActivate);
routes.post('/signInDoctor', loginDoctor_1.default.signInDoctor);
exports.default = routes;
