import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfileTable1731583597484 implements MigrationInterface {
    name = 'CreateProfileTable1731583597484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('PF', 'PJ') NOT NULL, \`cnpj\` varchar(255) NULL, \`cpf\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`cell\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`zipCode\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`addition\` varchar(255) NULL, \`city\` varchar(255) NOT NULL, \`neighborhood\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`addressZipcode\` varchar(255) NOT NULL, \`addressStreet\` varchar(255) NOT NULL, \`addressNumber\` varchar(255) NOT NULL, \`addressAddition\` varchar(255) NULL, \`addressCity\` varchar(255) NOT NULL, \`addressNeighborhood\` varchar(255) NOT NULL, \`addressState\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`profile\``);
    }

}
