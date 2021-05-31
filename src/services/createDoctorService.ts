import { getCustomRepository } from 'typeorm';
import DoctorRepository from '../repositorie/doctorRepositorie';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';



interface IRequest {
    name: string;
    email: string;
    password: string;
    cpf: string;
    specialization: string;
    crm: string;
    phone:string;
}

class CreateDoctorService {

    public async execute({ name, email, password, cpf, specialization, crm, phone}: IRequest): Promise<void> {

        const doctorRepository = getCustomRepository(DoctorRepository);

        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        const token = jwt.sign({ id: salt }, 'secret', { expiresIn: '1d' });

       
        const doctor = doctorRepository.create({
            name,
            email,
            password: passwordHashed,
            cpf,
            crm,
            specialization,
            token: token,
            activate: 0,
            phone
        });


        doctorRepository.save(doctor);

        var transport = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: "0be89881ec1c58",
                    pass: "f2fa7550b78068"
                }
        });

        const url = `https://server-gait.herokuapp.com/activate/${token}`
        transport.sendMail({
            from: 'Testando <92fe25ba83-325b9d@inbox.mailtrap.io>',
            to: email,
            subject: 'Cadastro Realizado com sucesso',
            html: `Para confirmar seu cadastro click no link: <a href="${url}">${url}</a>`
        })
    }
}
export default CreateDoctorService;
