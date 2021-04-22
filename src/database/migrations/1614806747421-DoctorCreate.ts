import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class DoctorCreate1614806747421 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'doctors',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar',

                    },
                    {
                        name: 'email',
                        type: 'varchar',

                    },
                    {
                        name: 'password',
                        type: 'varchar',

                    },
                    {
                        name: 'crm',
                        type: 'varchar',

                    },
                    {
                        name: 'cpf',
                        type: 'varchar',

                    },
                    {
                        name: 'phone',
                        type: 'varchar',

                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'

                    },
                ]
            }
            )
        );

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('doctors');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
