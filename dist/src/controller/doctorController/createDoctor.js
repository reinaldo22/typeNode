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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const typeorm_1 = require("typeorm");
const Doctor_1 = __importDefault(require("../../models/Doctor"));
const api_1 = __importDefault(require("../../Api/api"));
const Error_1 = __importDefault(require("../../shared/error/Error"));
class CreateDoctorController {
    createDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorRepository = typeorm_1.getRepository(Doctor_1.default);
            const { name, email, password, cpf, crm, phone } = req.body;
            try {
                const nameExists = yield doctorRepository.findOne({ where: { name } });
                if (nameExists) {
                    throw new Error_1.default('Nome ja existe');
                }
                const emailExists = yield doctorRepository.findOne({ where: { email } });
                if (emailExists) {
                    throw new Error_1.default('Email ja existe');
                }
                const salt = yield bcryptjs_1.default.genSalt(10);
                const passwordHashed = yield bcryptjs_1.default.hash(password, salt);
                const situacao = api_1.default.getName(name);
                situacao.then(function (response) {
                    if (response === 'Ativo') {
                        const doctorUser = doctorRepository.create({
                            name,
                            email,
                            password: passwordHashed,
                            cpf,
                            crm,
                            phone
                        });
                        doctorRepository.save(doctorUser);
                        throw new Error_1.default('Mèdico criado com sucesso!', 2001);
                        //return res.status(201).json({ message: 'Médico criado com sucesso!' });
                    }
                    throw new Error_1.default('Não foi criado', 401);
                });
            }
            catch (error) {
                console.log(">>>>>>>>>>>>>>>>>>>" + error);
            }
        });
    }
}
exports.default = new CreateDoctorController();
