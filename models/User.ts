import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Role from "./Role";

@Entity('users')
class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    dataNacimento: string;

    @Column()
    rg: string;

    @Column()
    situacao: string;

    @Column()
    cpf: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    created_at: Date;


    @ManyToMany(() => Role)
    @JoinTable({
        name: 'users_roles',
        joinColumns: [{ name: 'user_id' }],
        inverseJoinColumns: [{ name: 'role_id' }]
    })
    roles: Role[]

}
export default User;
