import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Doctor from '../../models/Doctor';

class AllUsers{


    public async getAll(req:Request, res:Response): Promise<Response>{
        
        const allDoctors = await getRepository(Doctor).find();

        console.log(">>>>>>>>>>>>",allDoctors);

        return res.json(allDoctors);
    }

}

export default new AllUsers();