import { getCustomRepository, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import DoctorRepository from '../../repositorie/doctorRepositorie';
import Doctor from '../../models/Doctor';



class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {

    const showProfile = getCustomRepository(DoctorRepository);

    const user_id = request.userId;

    const user = await showProfile.findById(user_id);

    if (!user) {
      response.status(404).json({ message: 'this user does not exist' });
    }

    return response.json(user);
  }

  public async updateProfile(request: Request, response: Response):Promise<Response> {

    
    const {specialization, phone, phone2} = request.body;
    try {

  if(phone.length < 6){
        return response.status(404).json({ message: "Invalid phone minimum 6 numbers" }); 
     }
  
    const userDoc = await getRepository(Doctor).findOne(request.params.id);
    
    
    if(userDoc){
      const userRepository =  getRepository(Doctor);
      
      userDoc.phone = phone;
      userDoc.phone2 = phone2;
      userDoc.specialization = specialization;

      userRepository.save(userDoc);
      return response.status(200).json({message: "User not found"})
    } 
    } catch (error) {
      return response.status(404).json({error})
    }
    
    return response.status(404).json({message: "User not found"})
  };
}

export default new ProfileController();