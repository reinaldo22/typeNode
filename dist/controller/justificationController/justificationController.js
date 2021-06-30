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
const Justification_1 = __importDefault(require("../../models/Justification"));
class JustificationController {
    createJustification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const justificationRepositorie = typeorm_1.getRepository(Justification_1.default);
            const { name, description } = req.body;
            console.log(name);
            const n = Object.keys(name).length === 0;
            if (n === true && description === '') {
                return res.status(404).json({ message: 'Please select at least one option' });
            }
            const justification = justificationRepositorie.create({
                name,
                description
            });
            yield justificationRepositorie.save(justification);
            return res.status(201).json({ message: 'Justification sent' });
        });
    }
}
exports.default = new JustificationController();
