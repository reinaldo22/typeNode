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
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = require("bcryptjs");
const Error_1 = __importDefault(require("../../shared/error/Error"));
class ForgotDoctorPassword {
    forgotDoctorPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            const { email } = req.body;
            try {
                const user = yield doctorRepository.find({
                    where: {
                        email
                    }
                });
                var transport = nodemailer_1.default.createTransport({
                    host: 'smtp.mailtrap.io',
                    port: 2525,
                    auth: {
                        user: "98b9ff94843710",
                        pass: "5bf821b88c9c02"
                    }
                });
                const newPassword = crypto_1.default.randomBytes(4).toString('hex');
                transport.sendMail({
                    from: 'Testando <b06b889ecb-0f0faf@inbox.mailtrap.io>',
                    to: email,
                    subject: 'Recuperacao de senha',
                    text: `Olá sua senha é: ${newPassword}`
                }).then(() => {
                    bcryptjs_1.hash(newPassword, 8).then(password => {
                        doctorRepository.update(user[0].id, {
                            password
                        }).then(() => {
                            throw new Error_1.default('E-mail enviado com sucesso!', 200);
                        }).catch(() => {
                            throw new Error_1.default('Não existe', 404);
                        });
                    });
                }).catch(() => {
                    return res.status(404).json({ message: "fail to email" });
                });
            }
            catch (error) {
                return res.status(404).json({ message: "erro" });
            }
        });
    }
}
exports.default = new ForgotDoctorPassword();
