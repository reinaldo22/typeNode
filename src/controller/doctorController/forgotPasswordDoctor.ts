import { getCustomRepository, getRepository  } from "typeorm";
import DoctorRepository from "../../repositorie/doctorRepositorie";
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import Doctor from "../../models/Doctor";

class ForgotDoctorPassword {

    public async forgotDoctorPassword(req: Request, res: Response) {
        const doctorRepository = getCustomRepository(DoctorRepository);

        const { email } = req.body;
        

        try {

            const user = await doctorRepository.findByEmail(email);
            if(!user){
                return res.status(404).json({ message: "Email not registered in the system" })
            }
           
            var transport = nodemailer.createTransport({
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: "0be89881ec1c58",
                    pass: "f2fa7550b78068"
                }
            });

            const id = user.id

            const url = `https://smart-gait.herokuapp.com/confirmPassword/${id}`
            transport.sendMail({
                from: 'Testando <92fe25ba83-325b9d@inbox.mailtrap.io>',
                to: email,
                subject: 'Recuperacao de senha',
                html: `Para redefinir sua senha click no link => <a href="${url}">${url}</a>`
            }).then(
                ()=>{
                    return res.status(200).json({message: 'Enviamos um e-mail com o link de redefinição de senha para o e-mail cadastrado,acesse seu e-mail para alterar a senha'})
                }
            ).catch(
                ()=>{
                    return res.status(400).json({message:"Falha ao enviar e-mail"})
                }
            )
        } catch (error) {
            return res.status(404).json({ message: "erro" });
        }
    }
    public async passwordUpdate(req:Request, res:Response){
        
        try {
        const { password } = req.body;
        
       
        const user = await getRepository(Doctor).findOne(req.params.id);
        
        if(!user){
            return res.status(404).json({message:'Este usuário não existe no sistema'})
        }
        const isValidatePassword = await bcrypt.compare(password, user.password as string)
        if(isValidatePassword){
            return res.status(404).json({message:'Não poderá usar a senha antiga'})
        }
        if(user.activate === 0){
            user.activate = 1;
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        
        
        user.password = passwordHashed;

        
        const results = await getRepository(Doctor).save(user);
        return res.json(results);
        } catch (error) {
            return res.json(error);
        }
            
        
    } 
}

export default new ForgotDoctorPassword();