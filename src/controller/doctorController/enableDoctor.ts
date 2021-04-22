import { getRepository } from "typeorm";
import Doctor from "../../models/Doctor";
import { Request, Response } from 'express';
import AppError from "../../shared/error/Error";

class EnableDoctorController {

    public async enable(req: Request, res: Response) {

        const { id } = req.params;

        const userRepository = getRepository(Doctor);

        const user = await userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new AppError('Este usuário não existe', 404);

        }

        user.password = ' ';
        
        await userRepository.save(user);

        throw new AppError('Criado com sucesso',201);


    }
}

export default new EnableDoctorController();