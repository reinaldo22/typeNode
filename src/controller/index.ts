import { Request, Response } from 'express';


class Index{


    public async index(req:Request, res:Response){

        res.status(200).json({message:"DEPLOY FEITO COM SUCESSO!"})
    }
}
export default new Index();