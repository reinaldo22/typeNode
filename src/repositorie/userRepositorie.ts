import { EntityRepository, Repository } from "typeorm";
import User from "../models/user";

@EntityRepository(User)
class UseRepository extends Repository<User>{

}

export default UseRepository;