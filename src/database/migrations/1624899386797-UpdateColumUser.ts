import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateColumUser1624899386797 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE doctors DROP COLUMN phone2')
    
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("doctors", "phone2");
    }

}
