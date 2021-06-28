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
const class_validator_1 = require("class-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CreateDoctorController {
    createDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            const { name, email, password, cpf, specialization, crm, phone, phone2, } = req.body;
            try {
                const emailExists = yield doctorRepository.findByEmail(email);
                if (emailExists) {
                    return res.status(409).json({ message: "Email already registered in the system" });
                }
                const nameExists = yield doctorRepository.findByName(name);
                if (nameExists) {
                    return res.status(409).json({ message: "This user already exists" });
                }
                const cpfExists = yield doctorRepository.findByName(cpf);
                if (cpfExists) {
                    return res.status(409).json({ message: "Cpf is already in use on another profile" });
                }
                const crmExists = yield doctorRepository.findOne({
                    where: { crm }
                });
                if (crmExists) {
                    return res.status(409).json({ message: "CRM is already in use on another profile" });
                }
                const situacao = api_1.default.getName(name);
                const salt = yield bcryptjs_1.default.genSalt(1);
                const passwordHashed = yield bcryptjs_1.default.hash(password, salt);
                const token = jsonwebtoken_1.default.sign({ id: salt }, 'secret', { expiresIn: 300 }); //5minutos
                situacao.then(function (response) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (response === 'Ativo') {
                            const doctor = doctorRepository.create({
                                name,
                                email,
                                password: passwordHashed,
                                cpf,
                                crm,
                                specialization,
                                token: token,
                                activate: 0,
                                phone,
                                phone2
                            });
                            const errors = yield class_validator_1.validate(doctor);
                            if (errors.length > 0) {
                                return res.status(400).json({ message: errors.map(v => v.constraints) });
                            }
                            doctorRepository.save(doctor);
                            return res.status(201).json({ message: 'Successfully created doctor!' });
                        }
                        return res.status(401).json({ message: 'It was not possible to continue your registration, check your situation with the CRM' });
                    });
                });
            }
            catch (error) {
                console.log("Sorry, we can't register user: " + error);
            }
        });
    }
}
exports.default = new CreateDoctorController();
