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
const doctorRepositorie_1 = __importDefault(require("../repositorie/doctorRepositorie"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class CreateDoctorService {
    execute({ name, email, password, cpf, specialization, crm, phone }) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            const salt = yield bcryptjs_1.default.genSalt(10);
            const passwordHashed = yield bcryptjs_1.default.hash(password, salt);
            const token = jsonwebtoken_1.default.sign({ id: salt }, 'secret', { expiresIn: '1d' });
            const doctor = doctorRepository.create({
                name,
                email,
                password: passwordHashed,
                cpf,
                crm,
                specialization,
                token: token,
                activate: 0,
                phone
            });
            doctorRepository.save(doctor);
            var transport = nodemailer_1.default.createTransport({
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: "98b9ff94843710",
                    pass: "5bf821b88c9c02"
                }
            });
            const url = `http://localhost:8081/activate/${token}`;
            transport.sendMail({
                from: 'Testando <b06b889ecb-0f0faf@inbox.mailtrap.io>',
                to: email,
                subject: 'Cadastro Realizado com sucesso',
                html: `Para confirmar seu cadastro click no link: <a href="${url}">${url}</a>`
            });
        });
    }
}
exports.default = CreateDoctorService;
