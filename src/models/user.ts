import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';




export type UserRoleType = "admin" | "doctor" | "user";

@Entity('users')
class User {


    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    dataNascimento: string;

    @Column()
    password?: string;

    @Column()
    phone: string;

    @Column({
        type: "enum",
        enum: ["admin", "doctor", "user"],
        default: "user"
    })
    role: UserRoleType

    @CreateDateColumn()
    created_at: Date;


}

export default User;