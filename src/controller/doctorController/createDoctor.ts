import bcrypt from 'bcryptjs';
import { getRepository } from "typeorm";
import { Request, Response } from 'express';
import Doctor from "../../models/Doctor";
import ApiCrm from "../../Api/api";
import AppError from '../../shared/error/Error';



class CreateDoctorController {


    public async createDoctor(req: Request, res: Response) {

        const doctorRepository = getRepository(Doctor);

        const {
            name,
            email,
            password,
            cpf,
            crm,
            phone
        } =  req.body;

        try {
            const nameExists = await doctorRepository.findOne({ where: { name } });
        if (nameExists) {
            throw new AppError('Nome ja existe');
        }

        const emailExists = await doctorRepository.findOne({ where: { email } });
        if (emailExists) {
            throw new AppError('Email ja existe');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        const situacao = ApiCrm.getName(name);

        situacao.then(function (response) {
            if (response === 'Ativo') {

                const doctorUser = doctorRepository.create({
                    name,
                    email,
                    password:  passwordHashed,
                    cpf,
                    crm,
                    phone
                });

                doctorRepository.save(doctorUser);
                throw new AppError('Mèdico criado com sucesso!', 2001);
                //return res.status(201).json({ message: 'Médico criado com sucesso!' });

            }
            throw new AppError('Não foi criado', 401);
        })
        } catch (error) {
            console.log(">>>>>>>>>>>>>>>>>>>"+error);
        }       

    }
    
}
export default new CreateDoctorController();