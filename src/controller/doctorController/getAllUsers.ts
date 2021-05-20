import {Response, Request} from 'express';

class AllUsers{

    public async todos(req: Request, res: Response) {

        return res.status(200).json({message:"Rota funcionando"})
    }

}
export default new AllUsers();