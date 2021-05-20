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
const api_1 = __importDefault(require("../../Api/api"));
const doctorRepositorie_1 = __importDefault(require("../../repositorie/doctorRepositorie"));
const createDoctorService_1 = __importDefault(require("../../services/createDoctorService"));
class CreateDoctorController {
    createDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, cpf, specialization, crm, phone } = req.body;
            const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            try {
                const emailExists = yield doctorRepository.findByEmail(email);
                if (emailExists) {
                    return res.status(409).json({ message: "Este email já existe!" });
                }
                const nameExists = yield doctorRepository.findByName(name);
                if (nameExists) {
                    return res.status(409).json({ message: "Este usuário já existe" });
                }
                const createDoctor = new createDoctorService_1.default();
                const situacao = api_1.default.getName(name);
                situacao.then(function (response) {
                    if (response === 'Ativo') {
                        const doctor = createDoctor.execute({
                            name,
                            email,
                            password,
                            cpf,
                            specialization,
                            crm,
                            phone,
                        });
                        return res.status(201).json({ message: 'Médico criado com sucesso!' });
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
exports.default = new CreateDoctorController();
