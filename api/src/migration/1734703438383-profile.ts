import { MigrationInterface, QueryRunner } from "typeorm";

export class Profile1734703438383 implements MigrationInterface {
    name = 'Profile1734703438383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "githubContributions" integer NOT NULL, "languages" text array NOT NULL, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "githubProfileUrl" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profileId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_b1bda35cdb9a2c1b777f5541d87" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "githubProfileUrl"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
    }

}
