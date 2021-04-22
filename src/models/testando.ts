import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
export type UserRoleType = "admin" | "doctor" | "user";


@Entity('testando')
class Testando {


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
    phone: string;

    @Column()
    activate:number;

    @Column({
        type: "enum",
        enum: ["admin", "doctor", "user"],
        default: "doctor"
    })
    role: UserRoleType

    @CreateDateColumn()
    created_at: Date;


}

export default Testando;