import { EntityRepository, Repository } from "typeorm";
import Testando from "../models/testando";


@EntityRepository(Testando)
class TestandoRepository extends Repository<Testando>{

}

export default TestandoRepository;