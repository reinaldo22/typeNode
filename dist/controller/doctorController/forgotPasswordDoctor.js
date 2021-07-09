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
const doctorRepositorie_1 = __importDefault(require("../../repositorie/doctorRepositorie"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Doctor_1 = __importDefault(require("../../models/Doctor"));
class ForgotDoctorPassword {
    forgotDoctorPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorRepository = typeorm_1.getCustomRepository(doctorRepositorie_1.default);
            const { email } = req.body;
            try {
                const user = yield doctorRepository.findByEmail(email);
                if (!user) {
                    return res.status(404).json({ message: "Invalid Domain" });
                }
                var transport = nodemailer_1.default.createTransport({
                    host: 'smtp.mailtrap.io',
                    port: 2525,
                    auth: {
                        user: "0be89881ec1c58",
                        pass: "f2fa7550b78068"
                    }
                });
                const id = user.id;
                const url = `http://localhost:3000/confirmPassword/${id}`;
                transport.sendMail({
                    from: 'Testando <92fe25ba83-325b9d@inbox.mailtrap.io>',
                    to: email,
                    subject: 'Password recovery',
                    html: `To reset your password click on the link => <a href="${url}">${url}</a>`
                }).then(() => {
                    return res.status(200).json({ message: 'We send an email with the password reset link to the registered email, access your email to change the password' });
                }).catch(() => {
                    return res.status(400).json({ message: "Failed to send email" });
                });
            }
            catch (error) {
                return res.status(404).json({ message: "erro" });
            }
        });
    }
    passwordUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = req.body;
                var regexPassword = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{6,13}$");
                if (!regexPassword.test(password)) {
                    res.status(404).json({ message: "Invalid Password" });
                }
                if (password.length < 6) {
                    return res.status(400).json({ message: "Minimum password of 6 characters" });
                }
                if (password.length > 13) {
                    return res.status(400).json({ message: "Maximum password of 13 characters" });
                }
                const user = yield typeorm_1.getRepository(Doctor_1.default).findOne(req.params.id);
                if (!user) {
                    return res.status(404).json({ message: 'This user does not exist in the system.' });
                }
                const isValidatePassword = yield bcryptjs_1.default.compare(password, user.password);
                if (isValidatePassword) {
                    return res.status(404).json({ message: 'Cannot use old password' });
                }
                if (user.activate === 0) {
                    user.activate = 1;
                }
                const salt = yield bcryptjs_1.default.genSalt(10);
                const passwordHashed = yield bcryptjs_1.default.hash(password, salt);
                user.password = passwordHashed;
                const results = yield typeorm_1.getRepository(Doctor_1.default).save(user);
                return res.json(results);
            }
            catch (error) {
            }
        });
    }
}
exports.default = new ForgotDoctorPassword();
