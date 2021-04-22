import { EntityRepository, Repository } from "typeorm";
import Doctor from "../models/Doctor";
import User from "../models/user";

@EntityRepository(Doctor)
class DoctorRepository extends Repository<Doctor>{

}

export default DoctorRepository;