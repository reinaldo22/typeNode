import { getRepository } from 'typeorm';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import Testando from '../../models/testando';


class Activate {
    public async verifyActivate(req:Request, res:Response, next:NextFunction){
        
        const { token } = req.params;

        const testeRepository = getRepository(Testando);
        console.log("roken=>",token);
        const test = await testeRepository.findOne({
            where: { token },
        });
       
        if (!test) {
            return res.status(404).json({ message: "Este usuário não existe" });
        }
        test.activate = 1;

        await testeRepository.save(test);

        return res.status(200).json({ message: "Cadastro validado!" });
    }
}

export default new Activate();