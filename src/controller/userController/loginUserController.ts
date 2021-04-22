import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import jwt from 'jsonwebtoken';
import User from "../../models/user";
import bcrypt from 'bcryptjs';


class LoginUserController {
    public async signIn(req: Request, res: Response) {

        const repo = getRepository(User);

        const { email, password } = req.body;

        const user = await repo.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "Este email  não existe" });
        }
        if (!user.password) {
            return res.status(404).json({ message: "Este Usuário esta inativo" });
        }
        const isValidatePassword = await bcrypt.compare(password, user.password as string);

        if (!isValidatePassword) {
            return res.status(401).json({ message: "Verifique sua senha" });
        }
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });


        delete user.password;

        return res.json({
            message: "Ok",
            token
        });


    }
}
export default new LoginUserController();