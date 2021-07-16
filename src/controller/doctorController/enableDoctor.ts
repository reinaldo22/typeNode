import { getRepository,getCustomRepository } from "typeorm";
import Doctor from "../../models/Doctor";
import { Request, Response } from 'express';
import DoctorRepository from "../../repositorie/doctorRepositorie";

class EnableDoctorController {

    public async enable(req: Request, res: Response) {

        const { id } = req.params;

        const userRepository = getCustomRepository(DoctorRepository);

        const user = await userRepository.findById(id);

        if (!user) {
            return res.status(404).json({ message: "This user does not exist" });
        }

        user.activate = 0;
        
        await userRepository.update(id,user);

        return res.status(200).json({ message: "Account successfully disabled!" });
    }
}

export default new EnableDoctorController();