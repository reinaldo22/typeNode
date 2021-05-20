import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import ApiCrm from '../../Api/api';
import DoctorRepository from '../../repositorie/doctorRepositorie';
import CreateDoctorService from '../../service/createDoctorService';




class CreateDoctorController {


    public async createDoctor(req: Request, res: Response) {

        const {
            name,
            email,
            password,
            cpf,
            specialization,
            crm,
            phone
        } = req.body;

        const doctorRepository = getCustomRepository(DoctorRepository);
        try {
            const emailExists = await doctorRepository.findByEmail(email);

            if (emailExists) {
                
                return res.status(409).json({ message: "Este email já existe!" });
            }
            const nameExists = await doctorRepository.findByName(name);
            if (nameExists) {
                return res.status(409).json({ message: "Este usuário já existe" });
            }



            const createDoctor = new CreateDoctorService();
            const situacao = ApiCrm.getName(name);

        situacao.then(function (response) {
            if (response === 'Ativo') {

                const doctor = createDoctor.execute({
                    name,
                    email,
                    password,
                    cpf,
                    specialization,
                    crm,
                    phone,
                });


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