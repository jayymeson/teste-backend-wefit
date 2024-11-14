import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintsToProfile1731586036547 implements MigrationInterface {
    name = 'AddUniqueConstraintsToProfile1731586036547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`zipCode\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`street\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`number\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`addition\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`city\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`neighborhood\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`state\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0e84ce893bbffc4373786d5654\` ON \`profile\` (\`cpf\`, \`cnpj\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ce341cb86a9039cba7a9db7d92\` ON \`profile\` (\`cpf\`, \`type\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ce341cb86a9039cba7a9db7d92\` ON \`profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e84ce893bbffc4373786d5654\` ON \`profile\``);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`state\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`neighborhood\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`city\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`addition\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`street\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`zipCode\` varchar(255) NOT NULL`);
    }

}
