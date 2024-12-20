import { MigrationInterface, QueryRunner } from "typeorm";

export class MostTables1734707899162 implements MigrationInterface {
    name = 'MostTables1734707899162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "questionId" uuid NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL DEFAULT '', "lineNum" integer, "programmingLanguage" text, "text" text NOT NULL, "codeSnippet" text, "path" text, "creatorId" integer NOT NULL, "postId" uuid NOT NULL, "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "creatorConnectionId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "repo" text NOT NULL, "repoOwner" text NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "creatorConnectionId" integer, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_comment_notificatoin" ("id" SERIAL NOT NULL, "commentId" uuid NOT NULL, "questionId" uuid NOT NULL, "userToNotifyId" integer NOT NULL, "type" character varying NOT NULL, "read" boolean NOT NULL DEFAULT 'false', "createdAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIME WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a86ce35db0f1cb23c3f50bff028" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_38c7b71e5d494309af3cb8a7d70" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_b6bf60ecb9f6c398e349adff52f" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_ff65e258c5faccc63a769a1ee20" FOREIGN KEY ("creatorConnectionId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_a2c68f8ec872d02cea8357f5ec7" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_e592413a85fcf2e8badae812c72" FOREIGN KEY ("creatorConnectionId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" ADD CONSTRAINT "FK_e64a0b69453916aae08a1ee05ee" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" ADD CONSTRAINT "FK_bfd2283632cd40dbeb347bbdc4d" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" ADD CONSTRAINT "FK_1338b6f361e3c7e26152b93b07d" FOREIGN KEY ("userToNotifyId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" DROP CONSTRAINT "FK_1338b6f361e3c7e26152b93b07d"`);
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" DROP CONSTRAINT "FK_bfd2283632cd40dbeb347bbdc4d"`);
        await queryRunner.query(`ALTER TABLE "question_comment_notificatoin" DROP CONSTRAINT "FK_e64a0b69453916aae08a1ee05ee"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_e592413a85fcf2e8badae812c72"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_a2c68f8ec872d02cea8357f5ec7"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_ff65e258c5faccc63a769a1ee20"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_b6bf60ecb9f6c398e349adff52f"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_38c7b71e5d494309af3cb8a7d70"`);
        await queryRunner.query(`DROP TABLE "question_comment_notificatoin"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
