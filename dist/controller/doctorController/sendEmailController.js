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
const nodemailer_1 = __importDefault(require("nodemailer"));
const doctorRepositorie_1 = __importDefault(require("../../repositorie/doctorRepositorie"));
const typeorm_2 = require("typeorm");
const Doctor_1 = __importDefault(require("../../models/Doctor"));
class SendEmailController {
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorRepository = typeorm_2.getCustomRepository(doctorRepositorie_1.default);
            const { email } = req.body;
            try {
                const user = yield doctorRepository.findByEmail(email);
                if (!user) {
                    return res.status(404).json({ message: "Email not registered in the system" });
                }
                const id = user.id;
                var transport = nodemailer_1.default.createTransport({
                    host: 'smtp.mailtrap.io',
                    port: 2525,
                    auth: {
                        user: "0be89881ec1c58",
                        pass: "f2fa7550b78068"
                    }
                });
                const url = `https://smart-gait.herokuapp.com/validationEmail/${id}`;
                transport.sendMail({
                    from: 'Testando <92fe25ba83-325b9d@inbox.mailtrap.io>',
                    to: email,
                    subject: 'Cadastro Realizado com sucesso',
                    html: `To confirm your registration click on the link: <a href="${url}">${url}</a>`
                });
                res.status(200).json({ message: 'Link sent, check your email' });
            }
            catch (error) {
                res.status(400).json({ message: 'sorry something went wrong' });
            }
        });
    }
    findEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorRepository = typeorm_2.getCustomRepository(doctorRepositorie_1.default);
            const { email } = req.body;
            console.log(email);
            try {
                const emailExists = yield doctorRepository.findByEmail(email);
                if (emailExists) {
                    return res.json(emailExists);
                }
                if (!emailExists) {
                    return res.status(404).json({ message: "This user not register in the system" });
                }
            }
            catch (error) {
                return res.status(404).json({ error });
            }
        });
    }
    updateEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailExists = yield typeorm_1.getRepository(Doctor_1.default).findOne(req.body.params);
            try {
                if (emailExists) {
                    typeorm_1.getRepository(Doctor_1.default).merge(emailExists, req.body);
                    const results = yield typeorm_1.getRepository(Doctor_1.default).save(emailExists);
                    return res.json(results);
                }
                if (!emailExists) {
                    return res.status(404).json({ message: "This user not register in the system" });
                }
            }
            catch (error) {
                return res.status(404).json({ error });
            }
        });
    }
}
exports.default = new SendEmailController();
