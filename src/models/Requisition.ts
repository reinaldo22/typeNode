import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('requisition')
class Requisition {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    description: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;
}

export default Requisition;