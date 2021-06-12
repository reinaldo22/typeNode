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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Doctor_1 = __importDefault(require("../../models/Doctor"));
class ForgotDoctorPassword {
    forgotDoctorPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            const { email } = req.body;
            try {
                const user = yield doctorRepository.findByEmail(email);
                if (!user) {
                    return res.status(404).json({ message: "Email not registered in the system" });
                }
                var transport = nodemailer_1.default.createTransport({
                    host: 'smtp.mailtrap.io',
                    port: 2525,
                    auth: {
                        user: "0be89881ec1c58",
                        pass: "f2fa7550b78068"
                    }
                });
                const id = user.id;
                const url = `https://smart-gait.herokuapp.com/confirmPassword/${id}`;
                transport.sendMail({
                    from: 'Testando <92fe25ba83-325b9d@inbox.mailtrap.io>',
                    to: email,
                    subject: 'Recuperacao de senha',
                    html: `Para redefinir sua senha click no link => <a href="${url}">${url}</a>`
                }).then(() => {
                    return res.status(200).json({ message: 'Enviamos um e-mail com o link de redefinição de senha para o e-mail cadastrado,acesse seu e-mail para alterar a senha' });
                }).catch(() => {
                    return res.status(400).json({ message: "Falha ao enviar e-mail" });
                });
            }
            catch (error) {
                return res.status(404).json({ message: "erro" });
            }
        });
    }
    passwordUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = req.body;
                const user = yield typeorm_1.getRepository(Doctor_1.default).findOne(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: 'Este usuário não existe no sistema' });
                }
                const isValidatePassword = yield bcryptjs_1.default.compare(password, user.password);
                if (isValidatePassword) {
                    return res.status(404).json({ message: 'Não poderá usar a senha antiga' });
                }
                if (user.activate === 0) {
                    user.activate = 1;
                }
                const salt = yield bcryptjs_1.default.genSalt(10);
                const passwordHashed = yield bcryptjs_1.default.hash(password, salt);
                user.password = passwordHashed;
                const results = yield typeorm_1.getRepository(Doctor_1.default).save(user);
                return res.json(results);
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.default = new ForgotDoctorPassword();
