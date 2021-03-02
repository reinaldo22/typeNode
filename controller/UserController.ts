import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import UseRepository from '../repositorie/UserRepository';
import { hash} from 'bcrypt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import Role from '../models/Role';
import User from '../models/User';

class UserController {

    public async signUp(req: Request, res: Response) {

        const roleRepository = getRepository(Role);
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

        const roleUserDefault = await roleRepository.find({ name: 'USER' });

        const user = userRepository.create({
            name,
            email,
            password: passwordHashed,
            dataNascimento,
            cpf,
            phone,
            roles: roleUserDefault
        });



        await userRepository.save(user);

        return res.status(201).json({ message: 'Usuário criado com sucesso!' });
    }

    public async signIn(req: Request, res: Response) {
        
        const repo = getRepository(User);

        const { email, password } = req.body;

        const user = await repo.findOne({ email }, { relations: ['roles'] });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Este email  não existe" });
        }
        if (!user.active) {
            return res.status(404).json({ message: "Este Usuário esta inativo" });
        }
        const isValidatePassword = await bcrypt.compare(password, user.password as string);
        
        if (!isValidatePassword) {
            return res.status(401).json({ message: "Verifique sua senha" });
        }
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });


       // delete user.password;

        return res.json({
            message: "Ok",
            token
        });


    }
    
    public async signInDoctor(req: Request, res: Response, next:NextFunction) {

        const userRepository = getCustomRepository(UseRepository);

        const {name, email, password} = req.body;

       
        
        const user2 = await userRepository.find();

        /*for(let i = 0; i< user2.length; i++){
            if(user2[i].situacao ==="inativo"){
               next();
            }
        }
        */
        res.status(404).json({message:"inativo"});
    }
    public async forgotPassword(req: Request, res: Response){
        const userRepository = getCustomRepository(UseRepository);

        const { email } = req.body;

        try {
            const user = await userRepository.find({
                where: {
                    email
                }
            })
            var transport = nodemailer.createTransport({
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: "",
                    pass: ""
                }
            });
            const newPassword = crypto.randomBytes(4).toString('hex');

            transport.sendMail({
                from: 'Testando <>',
                to: email,
                subject: 'Recuperacao de senha',
                text: `Olá sua senha é: ${newPassword}`
            }).then(
                () => {
                    hash(newPassword, 8).then(
                        password => {
                            userRepository.update(user[0].id, {
                                password
                            }).then(
                                () => {
                                    return res.status(200).json({ message: "email sended" })
                                }

                            ).catch(
                                () => {
                                    return res.status(404).json({ message: "user not found" })
                                }
                            )
                        }
                    )

                }
            ).catch(
                () => {
                    return res.status(404).json({ message: "fail to email" })
                }
            )
        } catch (error) {
            return res.status(404).json({ message: "erro" });
        }
    }
    public async enable(req: Request, res: Response) {

        const { id } = req.params;

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { id },
        });



        if (!user) {
            return res.status(404).json({ message: "Este usuário não existe" });
        }

        const updateUser = userRepository.findOne(user)


        user.active = !user.active;






        await userRepository.save(user);

        return res.status(200).json({ message: "Conta desativada com sucesso!" });

    }
}
export default new UserController();