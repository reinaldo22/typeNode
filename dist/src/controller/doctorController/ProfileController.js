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
const Doctor_1 = __importDefault(require("../../models/Doctor"));
class ProfileController {
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const showProfile = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            const user_id = request.userId;
            const user = yield showProfile.findById(user_id);
            if (!user) {
                response.status(404).json({ message: 'Este usuário não existe' });
            }
            return response.json(user);
        });
    }
    updateProfile(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDoc = yield typeorm_1.getRepository(Doctor_1.default).findOne(request.params.id);
            if (userDoc) {
                typeorm_1.getRepository(Doctor_1.default).merge(userDoc, request.body);
                const results = yield typeorm_1.getRepository(Doctor_1.default).save(userDoc);
                return response.json(results);
            }
            return response.status(404).json({ message: "User not found" });
        });
    }
    ;
}
exports.default = new ProfileController();
