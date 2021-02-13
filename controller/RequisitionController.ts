import { getCustomRepository } from "typeorm";
import { Request, Response } from 'express';
import RequisitionRepository from "../repositorie/RequisitionRepository";


class RequisitionController {
    async create(req: Request, res: Response) {

        const requisitionRepository = getCustomRepository(RequisitionRepository);
        const { name, description } = req.body;

        const existsRequisition = await requisitionRepository.findOne({ name });

        if (existsRequisition) {
            return res.status(400).json({ err: "Já possui requisicao" });
        }

        const requisition = requisitionRepository.create({
            name,
            description
        });

        await requisitionRepository.save(requisition);

        return res.json(requisition);
    }
    async index(req: Request, res: Response) {
        const requisitionRepository = getCustomRepository(RequisitionRepository);

        const permissions = await requisitionRepository.find();

        return res.json(permissions);
    }
    async show(req: Request, res: Response) {
        const requisitionRepository = getCustomRepository(RequisitionRepository);

        const { id } = req.params;

        const requisition = await requisitionRepository.findOne(id);
        return res.json(requisition);
    }

}
export default new RequisitionController();