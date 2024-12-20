import { MigrationInterface, QueryRunner } from "typeorm";

export class CommitId1734717145359 implements MigrationInterface {
    name = 'CommitId1734717145359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "commitId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" ALTER COLUMN "read" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" ALTER COLUMN "read" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "commitId"`);
    }

}
