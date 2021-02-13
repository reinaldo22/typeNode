import { json, NextFunction } from 'express';
import { Request, response, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UseRepository from '../repositorie/UserRepository';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import RoleRepository from '../repositorie/RoleRepository';


class UserController {

    async signUp(req: Request, res: Response) {

        const userRepository = getCustomRepository(UseRepository);
        const roleRepository = getCustomRepository(RoleRepository);

        const {
            name,
            email,
            password,
            dataNacimento,
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
            dataNacimento,
            situacao,
            rg,
            cpf,
            phone,
            roles: roleExists,
        });



        await userRepository.save(user);



        return res.status(201).json({ messsage: "Usuário criado com sucesso!" });
    }

    async signIn(req: Request, res: Response) {
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
    async signUpDoctor() {  
    }
    async signInDoctor(req: Request, res: Response, next:NextFunction) {

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
}
export default new UserController();