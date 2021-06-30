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
exports.isDoctor = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const doctorRepositorie_1 = __importDefault(require("../repositorie/doctorRepositorie"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token)
        return res.status(404).json({ message: 'Does not have toke' });
    try {
        const data = jsonwebtoken_1.default.decode(token);
        const { id } = data;
        req.userId = id;
        return next();
    }
    catch (error) {
        res.status(401).json({ message: 'Erro ', error });
    }
    /*const decode = jwt.decode(token);

    var userId = decode
    var chave = (userId)
    
*/
});
exports.verifyToken = verifyToken;
const isDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
    const id = req.userId;
    const doc = yield doctorRepository.findOne({ where: { id } });
    if ((doc === null || doc === void 0 ? void 0 : doc.role) === "doctor") {
        next();
        return;
    }
    return res.status(401).json({ message: 'Você não possui permissão de administrador' });
});
exports.isDoctor = isDoctor;
/*export const isUser = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getCustomRepository(UserRepository);
    const id = req.userId;

    const user = await userRepository.findOne({ where: { id } })
    if (user?.role === "user") {
        next();
        return;
    }
    return res.status(401).json({ message: 'Você não possui permissão' });
}

*/
