import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ApiCrm from "../../Api/api";
import Testando from '../../models/testando';
import nodemailer from 'nodemailer';



class CreateDoctorValidate{

    public async createValidate(req:Request, res:Response){

        const testeRepository = getRepository(Testando);
        

        const {
            name,
            email,
            password,
            cpf,
            crm,
            phone
        } =  req.body;

        try {
            const nameExists = await testeRepository.findOne({ where: { name } });
        if (nameExists) {
            return res.status(409).json({ message: "Este usuário já existe" });
        }

        const emailExists = await testeRepository.findOne({ where: { email } });
        if (emailExists) {
            return res.status(409).json({ message: "Este email já existe!" });
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);

        const token = jwt.sign({ id: salt }, 'secret', { expiresIn: '1d' });
        
        const situacao = ApiCrm.getName(name);

        situacao.then(function (response) {
            if (response === 'Ativo') {

                const teste = testeRepository.create({
                    name,
                    email,
                    password:  passwordHashed,
                    cpf,
                    crm,
                    token:token,
                    activate: 0,
                    phone
                });

                
                
                testeRepository.save(teste);
                
                
                var transport = nodemailer.createTransport({
                    host: 'smtp.mailtrap.io',
                    port: 2525,
                    auth: {
                        user: "98b9ff94843710",
                        pass: "5bf821b88c9c02"
                    }
                });
             
                const url = `http://localhost:8080/activate/${token}`
                transport.sendMail({
                    from: 'Testando <b06b889ecb-0f0faf@inbox.mailtrap.io>',
                    to: email,
                    subject: 'Cadastro Realizado com sucesso',
                    html: `Para confirmar seu cadastro click no link: <a href="${url}">${url}</a>`
                })

                return res.status(201).json({ message: "Enviamos um link de confirmação para seu email"});

            }
            return res.status(401).json({ message: 'Não foi possível continuar seu cadastro, verifique sua situação junto do CRM' });
        })
        } catch (error) {
            console.log(">>>>>>>>>>>>>>>>>>>"+error);
        }   
    }

    

}
export default new CreateDoctorValidate();