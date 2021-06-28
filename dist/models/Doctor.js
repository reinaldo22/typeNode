"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Doctor = class Doctor {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", Number)
], Doctor.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Doctor.prototype, "token", void 0);
__decorate([
    typeorm_1.Column({ type: 'text',
        unique: true,
        nullable: true }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], Doctor.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.MaxLength(50),
    __metadata("design:type", String)
], Doctor.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Doctor.prototype, "cpf", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Doctor.prototype, "crm", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Doctor.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Doctor.prototype, "activate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Doctor.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Doctor.prototype, "phone2", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], Doctor.prototype, "specialization", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: ["admin", "doctor", "user"],
        default: "doctor"
    }),
    __metadata("design:type", String)
], Doctor.prototype, "role", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Doctor.prototype, "created_at", void 0);
Doctor = __decorate([
    typeorm_1.Entity('doctors')
], Doctor);
exports.default = Doctor;
function unique(unique, arg1, nullable, arg3) {
    throw new Error("Function not implemented.");
}
function nullable(unique, arg1, nullable, arg3) {
    throw new Error("Function not implemented.");
}
