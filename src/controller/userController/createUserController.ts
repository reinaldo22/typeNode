
import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../../models/user';


class CreateUserController {

    public async signUp(req: Request, res: Response) {


        const userRepository = getRepository(User);


        const {
            name,
            email,
            password,
            dataNascimento,
            cpf,
            phone
        } = req.body;

        const nameExists = await userRepository.findOne({ where: { name } });
        if (nameExists) {
            return res.status(409).json({ message: "Este usuário já existe" });
        }

        const emailExists = await userRepository.findOne({ where: { email } });
        if (emailExists) {
            return res.status(409).json({ message: "Este email já existe!" });
        }

        const passwordHashed = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: passwordHashed,
            dataNascimento,
            cpf,
            phone,
        });



        await userRepository.save(user);

        return res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }

}
export default new CreateUserController();