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
class AllUsers {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allDoctors = yield typeorm_1.getRepository(Doctor_1.default).find();
            return res.json(allDoctors);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, cpf, crm, email, password, phone } = req.body;
            const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            console.log(phone);
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
                var regexPhone = new RegExp("^[(][1-9]{2}[)](?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$");
                var regexPassword = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,13}$");
                var regexCpf = new RegExp("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})");
                if (regexPhone.test(phone)) {
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
                if (email === '') {
                    return res.status(400).json({ message: "Email cannot be empty" });
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
