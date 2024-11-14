import { MigrationInterface, QueryRunner } from "typeorm";

export class Terms1731597974867 implements MigrationInterface {
    name = 'Terms1731597974867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` ADD \`termsAccepted\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0e84ce893bbffc4373786d5654\` ON \`profile\` (\`cpf\`, \`cnpj\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ce341cb86a9039cba7a9db7d92\` ON \`profile\` (\`cpf\`, \`type\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ce341cb86a9039cba7a9db7d92\` ON \`profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e84ce893bbffc4373786d5654\` ON \`profile\``);
        await queryRunner.query(`ALTER TABLE \`profile\` DROP COLUMN \`termsAccepted\``);
    }

}
