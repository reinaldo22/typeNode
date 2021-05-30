import { getRepository } from 'typeorm';
import {Request, Response} from 'express';
import Justification from '../../models/Justification';


class JustificationController{

    public async createJustification(req:Request, res:Response){
        const justificationRepositorie = getRepository(Justification);
        const {name, description} = req.body;

        const justification = justificationRepositorie.create({
            name,
            description
        });
        await justificationRepositorie.save(justification);
        return res.status(201).json({message:'Justificativa enviada'});
    }
}
export default new JustificationController();