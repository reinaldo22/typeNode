import { EntityRepository, Repository } from "typeorm";
import Doctor from "../models/Doctor";



  

@EntityRepository(Doctor)
class DoctorRepository extends Repository<Doctor>{

    public async findByName(name:string):Promise<Doctor | undefined>{
        const doctor = await this.findOne({
            where:{
                name,
            },
        });
        return doctor;
    }

    public async findById(id:string):Promise<Doctor | undefined>{
        const doctor = await this.findOne({
            where:{
                id,
            },
        });
        return doctor;
    }

    public async findByEmail(email:string):Promise<Doctor | undefined>{
        const doctor = await this.findOne({
            where:{
                email,
            },
        });
        return doctor;
    }
    
}

export default DoctorRepository;