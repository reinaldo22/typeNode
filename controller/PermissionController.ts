import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import PermissionRepository from '../repositorie/PermissionRepository';

class PermissionController {
    async create(req: Request, res: Response) {

        const permissionRepository = getCustomRepository(PermissionRepository);
        const { name, description } = req.body;

        const existPermission = await permissionRepository.findOne({ name });

        if (existPermission) {
            return res.status(400).json({ err: "Já possui permissão" });
        }

        const permission = permissionRepository.create({
            name,
            description
        });

        await permissionRepository.save(permission);

        return res.json(permission);
    }



}
export default new PermissionController();