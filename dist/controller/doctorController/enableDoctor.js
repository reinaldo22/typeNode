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
const doctorRepositorie_1 = __importDefault(require("../../repositorie/doctorRepositorie"));
class EnableDoctorController {
    enable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            const user = yield userRepository.findById(id);
            if (!user) {
                return res.status(404).json({ message: "This user does not exist" });
            }
            user.activate = 0;
            yield userRepository.update(id, user);
            return res.status(200).json({ message: "Account successfully disabled!" });
        });
    }
}
exports.default = new EnableDoctorController();
