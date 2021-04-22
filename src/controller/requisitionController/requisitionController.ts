import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Requisition from '../../models/Requisition';

class RequisitionController {

    public async requisition(req: Request, res: Response) {

        const requisitionRepository = getRepository(Requisition);

        const { name, description } = req.body;

        const requisition = requisitionRepository.create({
            name,
            description
        });

        await requisitionRepository.save(requisition);

        return res.status(200).json({ message: 'Requisição criada com sucesso!' });
    }
}
export default new RequisitionController();