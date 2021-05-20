import { getCustomRepository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import DoctorRepository from '../../repositorie/doctorRepositorie';
import Doctor from '../../models/Doctor';

export interface Usuario {
  name: string;
  phone: string;
}

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {

    const showProfile = getCustomRepository(DoctorRepository);

    const user_id = request.userId;

    const user = await showProfile.findById(user_id);

    if (!user) {
      response.status(404).json({ message: 'Este usuário não existe' });
    }

    return response.json(user);
  }

  public async updateProfile(request: Request, response: Response):Promise<Response> {

    const userDoc = await getRepository(Doctor).findOne(request.params.id);
    if(userDoc){
      getRepository(Doctor).merge(userDoc, request.body);
      const results = await getRepository(Doctor).save(userDoc);
      return response.json(results);
    } 
    return response.status(404).json({message: "User not found"})
  };
}

export default new ProfileController();