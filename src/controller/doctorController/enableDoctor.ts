import { getRepository } from "typeorm";
import Doctor from "../../models/Doctor";
import { Request, Response } from 'express';

class EnableDoctorController {

    public async enable(req: Request, res: Response) {

        const { id } = req.params;

        const userRepository = getRepository(Doctor);

        const user = await userRepository.findOne({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({ message: "This user does not exist" });
        }

        user.activate = 0;
        
        await userRepository.save(user);

        return res.status(200).json({ message: "Account successfully disabled!" });
    }
}

export default new EnableDoctorController();