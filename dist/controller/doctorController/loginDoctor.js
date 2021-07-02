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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const doctorRepositorie_1 = __importDefault(require("../../repositorie/doctorRepositorie"));
class LoginDoctorController {
    signInDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repo = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            var regexEmail = new RegExp("^[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+.com$");
            const { email, password } = req.body;
            const doctor = yield repo.findByEmail(email);
            if (!doctor) {
                return res.status(404).json({ message: "Email not registered in the system" });
            }
            if (!(regexEmail).test(email)) {
                return res.status(404).json({ message: 'Invalid email' });
            }
            if (!doctor.password) {
                return res.status(404).json({ message: "Inactive or invalid password" });
            }
            if (doctor.activate === 0) {
                return res.status(404).json({ message: "Your profile has been inactivated, please reset your password to reactivate your profile" });
            }
            const isValidatePassword = yield bcryptjs_1.default.compare(password, doctor.password);
            if (!isValidatePassword) {
                return res.status(401).json({ message: "Incorrect email or password" });
            }
            const token = jsonwebtoken_1.default.sign({ id: doctor.id }, 'secret', { expiresIn: '1d' });
            return res.json({
                doctor,
                message: "Ok",
                token
            });
        });
    }
}
exports.default = new LoginDoctorController();
