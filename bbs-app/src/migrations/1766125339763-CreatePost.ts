import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePost1766125339763 implements MigrationInterface {
    name = 'CreatePost1766125339763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer NOT NULL, CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "title", "content", "createdAt", "updatedAt", "userId") SELECT "id", "title", "content", "createdAt", "updatedAt", "userId" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "post"("id", "title", "content", "createdAt", "updatedAt", "userId") SELECT "id", "title", "content", "createdAt", "updatedAt", "userId" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
