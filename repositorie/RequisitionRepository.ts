import { EntityRepository, Repository } from 'typeorm';
import Requisition from '../models/Requisition';

@EntityRepository(Requisition)
class RequisitionRepository extends Repository<Requisition>{

}

export default RequisitionRepository;