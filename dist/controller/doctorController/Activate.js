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
const typeorm_1 = require("typeorm");
const Doctor_1 = __importDefault(require("../../models/Doctor"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Activate {
    verifyActivate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const testeRepository = typeorm_1.getRepository(Doctor_1.default);
            const doctor = yield testeRepository.findOne(req.params.id);
            console.log(doctor);
            if (!doctor) {
                return res.status(404).json({ message: "User not found" });
            }
            try {
                jsonwebtoken_1.default.verify(doctor.token, 'secret', function (err, decode) {
                    console.log(err === null || err === void 0 ? void 0 : err.message);
                    if ((err === null || err === void 0 ? void 0 : err.message) === 'jwt expired' && doctor.activate === 0) {
                        return res.status(400).json({ message: "Token expired" });
                    }
                    else {
                        doctor.activate = 1;
                        testeRepository.update(id, doctor);
                    }
                });
                return res.status(200).json({ message: "Email successfully validated!" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
            // return res.status(200).json({ message: "Email successfully validated!" });
        });
    }
}
exports.default = new Activate();
