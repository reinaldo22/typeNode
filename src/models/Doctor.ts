import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserRoleType = "admin" | "doctor" | "user";

@Entity('doctors')
class Doctor {


    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    token: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    crm: string;

    @Column()
    password?: string;

    @Column()
    activate:number;

    @Column()
    phone: string;

    @Column()
    specialization: string;


    @Column({
        type: "enum",
        enum: ["admin", "doctor", "user"],
        default: "doctor"
    })
    role: UserRoleType

    @CreateDateColumn()
    created_at: Date;


}

export default Doctor;