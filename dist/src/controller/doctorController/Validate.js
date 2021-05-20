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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_1 = require("typeorm");
const api_1 = __importDefault(require("../../Api/api"));
const testando_1 = __importDefault(require("../../models/testando"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class CreateDoctorValidate {
    createValidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const testeRepository = typeorm_1.getRepository(testando_1.default);
            const { name, email, password, cpf, crm, phone } = req.body;
            try {
                const nameExists = yield testeRepository.findOne({ where: { name } });
                if (nameExists) {
                    return res.status(409).json({ message: "Este usuário já existe" });
                }
                const emailExists = yield testeRepository.findOne({ where: { email } });
                if (emailExists) {
                    return res.status(409).json({ message: "Este email já existe!" });
                }
                const salt = yield bcryptjs_1.default.genSalt(10);
                const passwordHashed = yield bcryptjs_1.default.hash(password, salt);
                const token = jsonwebtoken_1.default.sign({ id: salt }, 'secret', { expiresIn: '1d' });
                const situacao = api_1.default.getName(name);
                situacao.then(function (response) {
                    if (response === 'Ativo') {
                        const teste = testeRepository.create({
                            name,
                            email,
                            password: passwordHashed,
                            cpf,
                            crm,
                            token: token,
                            activate: 0,
                            phone
                        });
                        testeRepository.save(teste);
                        var transport = nodemailer_1.default.createTransport({
                            host: 'smtp.mailtrap.io',
                            port: 2525,
                            auth: {
                                user: "98b9ff94843710",
                                pass: "5bf821b88c9c02"
                            }
                        });
                        const url = `http://localhost:8080/activate/${token}`;
                        transport.sendMail({
                            from: 'Testando <b06b889ecb-0f0faf@inbox.mailtrap.io>',
                            to: email,
                            subject: 'Cadastro Realizado com sucesso',
                            html: `Para confirmar seu cadastro click no link: <a href="${url}">${url}</a>`
                        });
                        return res.status(201).json({ message: "Enviamos um link de confirmação para seu email" });
                    }
                    return res.status(401).json({ message: 'Não foi possível continuar seu cadastro, verifique sua situação junto do CRM' });
                });
            }
            catch (error) {
                console.log(">>>>>>>>>>>>>>>>>>>" + error);
            }
        });
    }
}
exports.default = new CreateDoctorValidate();
