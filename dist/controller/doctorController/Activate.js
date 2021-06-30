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
class Activate {
    verifyActivate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const testeRepository = typeorm_1.getRepository(Doctor_1.default);
                const doctor = yield testeRepository.findOne({ where: { id } });
                if (!doctor) {
                    return res.status(404).json({ message: "User not found" });
                }
                doctor.activate = 1;
                yield testeRepository.save(doctor);
                return res.status(200).json({ message: "Email successfully validated!" });
            }
            catch (error) {
                return res.status(400).json({ message: "Something went wrong" });
            }
        });
    }
}
exports.default = new Activate();
