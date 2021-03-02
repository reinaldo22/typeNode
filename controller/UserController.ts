import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UseRepository from '../repositorie/UserRepository';
import { compare, hash } from 'bcrypt';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';
import RoleRepository from '../repositorie/RoleRepository';
import nodemailer from 'nodemailer';

class UserController {

    public async signUp(req: Request, res: Response) {

        const userRepository = getCustomRepository(UseRepository);
        const roleRepository = getCustomRepository(RoleRepository);

        const {
            name,
            email,
            password,
            dataNascimento,
            situacao,
            rg,
            cpf,
            phone,
            roles
        } = req.body;

        const existUser = await userRepository.findOne({ name });

        if (existUser) {
            return res.status(400).json({ message: "Usuário já existe" });
        }


        const passwordHashed = await hash(password, 8);

        const roleExists = await roleRepository.findByIds(roles);


        const user = userRepository.create({
            name,
            email,
            password: passwordHashed,
            dataNascimento,
            situacao,
            rg,
            cpf,
            phone,
            roles: roleExists,
        });



        await userRepository.save(user);



        return res.status(201).json({ messsage: "Usuário criado com sucesso!" });
    }

    public async signIn(req: Request, res: Response) {
        const userRpository = getCustomRepository(UseRepository);


        const { email, password } = req.body;

        const user = await userRpository.findOne({ email }, { relations: ["roles"] });
        

        if (!user) {
            return res.status(400).json({ error: "E-mail não encontrado!" });
        }

        const matchPassword = await compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ error: "E-mail ou senha incorreta!" });
        }

        const roles = user.roles.map((role) => role.name);

        const token = sign({}, '6d181f09973a097dace470b377420809', {
            subject: user.id,
            expiresIn: '1d'
        });
        return res.json({ roles, token });
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
}
export default new UserController();