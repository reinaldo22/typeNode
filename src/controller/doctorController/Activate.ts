import { getRepository } from 'typeorm';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import Doctor from '../../models/Doctor';


class Activate {
    public async verifyActivate(req:Request, res:Response, next:NextFunction){
        
        const { token } = req.params;

        const testeRepository = getRepository(Doctor);
        console.log("roken=>",token);
        const doctor = await testeRepository.findOne({
            where: { token },
        });
       
        if (!doctor) {
            return res.status(404).json({ message: "Este usuário não existe" });
        }
        doctor.activate = 1;

        await testeRepository.save(doctor);

        return res.status(200).json({ message: "Cadastro validado!" });
    }
}

export default new Activate();