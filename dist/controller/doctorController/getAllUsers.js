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
const doctorRepositorie_1 = __importDefault(require("../../repositorie/doctorRepositorie"));
var axios = require('axios');
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AllUsers {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allDoctors = yield typeorm_1.getRepository(Doctor_1.default).find();
            return res.json(allDoctors);
        });
    }
    getUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield typeorm_1.getRepository(Doctor_1.default).findOne(req.params);
            return res.json(doc);
        });
    }
    updateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield typeorm_1.getRepository(Doctor_1.default).findOne(req.params);
            return res.json(doc);
        });
    }
    sendToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            const { email } = req.body;
            try {
                const user = yield doctorRepository.findByEmail(email);
                if (!user) {
                    return res.status(404).json({ message: "Email not registered in the system" });
                }
                const id = user.id;
                const salt = bcryptjs_1.default.genSalt(1);
                const newToken = jsonwebtoken_1.default.sign({ id: salt }, 'secret', { expiresIn: 300 }); //5minutos
                user.token = newToken;
                doctorRepository.update(id, user);
                console.log("Reenvio de token>>>>>>>>>>>>", user);
                var transport = nodemailer_1.default.createTransport({
                    host: 'smtp.mailtrap.io',
                    port: 2525,
                    auth: {
                        user: "0be89881ec1c58",
                        pass: "f2fa7550b78068"
                    }
                });
                const url = `http://smart-gait.herokuapp.com/validationEmail/${id}`;
                transport.sendMail({
                    from: 'Testando <92fe25ba83-325b9d@inbox.mailtrap.io>',
                    to: email,
                    subject: 'Registration completed successfully',
                    html: `To confirm your registration click on the link: <a href="${url}">${url}</a>`
                });
                res.status(200).json({ message: 'Confirmation link sent successfully' });
            }
            catch (error) {
                res.status(400).json({ message: 'sorry something went wrong' });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, cpf, crm, email, password, phone, phone2 } = req.body;
            const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            console.log(phone);
            console.log(phone2);
            const emailExists = yield doctorRepository.findByEmail(email);
            if (emailExists) {
                return res.status(409).json({ message: "Email already registered in the system" });
            }
            const crmExists = yield doctorRepository.findByCrm(crm);
            if (crmExists) {
                return res.status(409).json({ message: "CRM already registered in the system" });
            }
            const nameExists = yield doctorRepository.findByName(name);
            if (nameExists) {
                return res.status(409).json({ message: "Name already registered in the system" });
            }
            const cpfExists = yield doctorRepository.findByCpf(cpf);
            if (cpfExists) {
                return res.status(409).json({ message: "Cpf already registered in the system" });
            }
            const phoneExists = yield doctorRepository.findByPhone(phone);
            if (phoneExists) {
                return res.status(409).json({ message: "Phone already registered in the system" });
            }
            const phoneExists2 = yield doctorRepository.findByPhone(phone2);
            if (phoneExists2) {
                return res.status(409).json({ message: "Phone already registered in the system" });
            }
            try {
                const result = (yield axios.get(`https://www.consultacrm.com.br/api/index.php?tipo=crm&uf=am&q=${crm}&chave=2798018964&destino=json`)).data;
                var text = JSON.stringify(result);
                var obj = JSON.parse(text);
                var medicos = [obj];
                let medico;
                let pessoa;
                for (medico of medicos) {
                    if (medico.total === 0) {
                        return res.status(404).json({ message: "name not found" });
                    }
                    for (pessoa of medico.item) {
                        if (name !== pessoa['nome']) {
                            return res.status(404).json({ message: "Doctor name not found 2" });
                        }
                        if (crm !== pessoa['numero']) {
                            return res.status(404).json({ message: "CRM not found or inactive, check the fields" });
                        }
                        if (pessoa['situacao'] !== 'Ativo') {
                            return res.status(404).json({ message: "inactive CRM" });
                        }
                    }
                }
                var regexPhone = new RegExp("^[0-9]{11}");
                var regexPhone2 = new RegExp("^[0-9]{11}");
                var regexPassword = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,13}$");
                var regexCpf = new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})");
                var regexEmail = new RegExp("^[a-zA-Z0-9]+[@]+[a-zA-Z0-9]+.com$");
                if (!regexPhone2.test(phone2) && (phone2.length != "")) {
                    return res.status(404).json({ message: "Invalid phone2" });
                }
                if (!regexPhone.test(phone)) {
                    console.log("back-end invalid phone");
                    return res.status(404).json({ message: "Invalid phone" });
                }
                if (!regexCpf.test(cpf)) {
                    return res.status(404).json({ message: "Invalid CPF" });
                }
                if (!regexPassword.test(password)) {
                    res.status(404).json({ message: "Invalid Password" });
                }
                if (password.length < 6) {
                    return res.status(400).json({ message: "Minimum password of 6 characters" });
                }
                if (password.length > 13) {
                    return res.status(400).json({ message: "Maximum password of 13 characters" });
                }
                if (!(regexEmail).test(email)) {
                    return res.status(404).json({ message: 'Invalid email' });
                }
                return res.status(201).json({ message: 'ok' });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
exports.default = new AllUsers();
