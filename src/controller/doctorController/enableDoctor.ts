import { getRepository,getCustomRepository } from "typeorm";
import Doctor from "../../models/Doctor";
import { Request, Response } from 'express';
import DoctorRepository from "../../repositorie/doctorRepositorie";

class EnableDoctorController {

    public async enable(req: Request, res: Response) {

        
        try {
            const user = await getRepository(Doctor).findOne(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "This user does not exist" });
        }

        user.activate = 0;
        
        const result = await getRepository(Doctor).update(user.id, user);

        return res.status(200).json({ message: "Account successfully disabled!" });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
        
    }
}

export default new EnableDoctorController();