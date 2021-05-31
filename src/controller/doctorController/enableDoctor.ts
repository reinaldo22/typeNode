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
            return res.status(404).json({ message: "Este usuário não existe" });
        }

        user.password = ' ';
        
        await userRepository.save(user);

        return res.status(200).json({ message: "Conta desativada com sucesso!" });
    }
}

export default new EnableDoctorController();