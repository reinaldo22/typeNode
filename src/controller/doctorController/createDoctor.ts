import bcrypt from 'bcryptjs';
import { getRepository } from "typeorm";
import { Request, Response } from 'express';
import Doctor from "../../models/Doctor";
import ApiCrm from "../../Api/api";



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
            return res.status(409).json({ message: "Este usuário já existe" });
        }

        const emailExists = await doctorRepository.findOne({ where: { email } });
        if (emailExists) {
            return res.status(409).json({ message: "Este email já existe!" });
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

                return res.status(201).json({ message: 'Médico criado com sucesso!' });

            }
            return res.status(401).json({ message: 'Não foi possível continuar seu cadastro, verifique sua situação junto do CRM' });
        })
        } catch (error) {
            console.log(">>>>>>>>>>>>>>>>>>>"+error);
        }       

    }
    
}
export default new CreateDoctorController();