import { getRepository } from 'typeorm';
import {Request, Response} from 'express';
import nodemailer from 'nodemailer';
import DoctorRepository from '../../repositorie/doctorRepositorie';
import { getCustomRepository } from 'typeorm';
import Doctor from '../../models/Doctor';


class SendEmailController{

    public async sendEmail(req:Request, res:Response){
        const doctorRepository = getCustomRepository(DoctorRepository);

        const {email} = req.body;

        try {
        const user = await doctorRepository.findByEmail(email);
        if(!user){
            return res.status(404).json({ message: "Email not registered in the system" })
        }
        

        const id = user.id

        var transport = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: "0be89881ec1c58",
                    pass: "f2fa7550b78068"
                }
        });
        const url = `https://smart-gait.herokuapp.com/validationEmail/${id}`
        transport.sendMail({
            from: 'Testando <92fe25ba83-325b9d@inbox.mailtrap.io>',
            to: email,
            subject: 'Cadastro Realizado com sucesso',
            html: `To confirm your registration click on the link: <a href="${url}">${url}</a>`
        });
        res.status(200).json({message:'Link sent, check your email'});
        
        } catch (error) {
            res.status(400).json({message:'sorry something went wrong'})
        }
        
    }
    public async findEmail(req:Request, res:Response){
        const doctorRepository = getCustomRepository(DoctorRepository);
        
        const {email} = req.body;
        console.log(email)

        const emailExists = await doctorRepository.findByEmail(email);
        
        if (emailExists) {     
            return res.json(emailExists);
          }
        if (!emailExists) {
            return res.status(404).json({ message: "This user not register in the system" });
        }

        
        
    }
    public async updateEmail(req:Request, res:Response){
    
    const emailExists = await getRepository(Doctor).findOne(req.body.params); 
    if (emailExists) {
      getRepository(Doctor).merge(emailExists, req.body);
      const results = await getRepository(Doctor).save(emailExists);
      return res.json(results);

    }
    if (!emailExists) {
        return res.status(404).json({ message: "This user not register in the system" });
    }
}
    
}
export default new SendEmailController();
