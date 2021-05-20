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
const Error_1 = __importDefault(require("../../shared/error/Error"));
class EnableDoctorController {
    enable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const userRepository = typeorm_1.getRepository(Doctor_1.default);
            const user = yield userRepository.findOne({
                where: { id },
            });
            if (!user) {
                throw new Error_1.default('Este usuário não existe', 404);
            }
            user.password = ' ';
            yield userRepository.save(user);
            throw new Error_1.default('Criado com sucesso', 201);
        });
    }
}
exports.default = new EnableDoctorController();
