import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfileTable1731537126090 implements MigrationInterface {
    name = 'CreateProfileTable1731537126090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`addressZipcode\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`addressStreet\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`addressNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`addressAddition\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`addressCity\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`addressNeighborhood\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`addressState\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`addressState\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`addressNeighborhood\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`addressCity\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`addressAddition\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`addressNumber\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`addressStreet\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`addressZipcode\``);
    }

}
