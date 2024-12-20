import { MigrationInterface, QueryRunner } from "typeorm";

export class Token1734732036532 implements MigrationInterface {
    name = 'Token1734732036532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "githubAccessToken"`);
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" ALTER COLUMN "read" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" ALTER COLUMN "read" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "githubAccessToken" text NOT NULL`);
    }

}
