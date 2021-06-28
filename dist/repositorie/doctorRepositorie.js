"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const Doctor_1 = __importDefault(require("../models/Doctor"));
let DoctorRepository = class DoctorRepository extends typeorm_1.Repository {
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.findOne({
                where: {
                    name,
                },
            });
            return doctor;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.findOne({
                where: {
                    id,
                },
            });
            return doctor;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.findOne({
                where: {
                    email,
                },
            });
            return doctor;
        });
    }
    findByCpf(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.findOne({
                where: {
                    cpf,
                },
            });
            return doctor;
        });
    }
    findByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.findOne({
                where: {
                    phone,
                },
            });
            return doctor;
        });
    }
    findByPhone2(phone2) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.findOne({
                where: {
                    phone2,
                },
            });
            return doctor;
        });
    }
    findByCrm(crm) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield this.findOne({
                where: {
                    crm,
                },
            });
            return doctor;
        });
    }
};
DoctorRepository = __decorate([
    typeorm_1.EntityRepository(Doctor_1.default)
], DoctorRepository);
exports.default = DoctorRepository;
