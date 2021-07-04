import { getRepository } from 'typeorm';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import Doctor from '../../models/Doctor';


class Activate {
    public async verifyActivate(req:Request, res:Response, next:NextFunction){
        
        const { id } = req.params;

        try {
        const testeRepository = getRepository(Doctor);
        
        const doctor = await testeRepository.findOne({where: { id }});
        if(!doctor){
            return res.status(404).json({ message: "User not found" });
        }
        
        
        doctor.activate = 1;

        await testeRepository.update(id, doctor);

        return res.status(200).json({ message: "Email successfully validated!" });
        } catch (error) {
            return res.status(400).json({ message: "Something went wrong" });
        }
        
    }
}

export default new Activate();