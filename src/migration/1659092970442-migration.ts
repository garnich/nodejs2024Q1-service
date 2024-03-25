import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1659092970442 implements MigrationInterface {
    name = 'migration1659092970442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favourites" DROP COLUMN "albumsIds"`);
        await queryRunner.query(`ALTER TABLE "favourites" DROP COLUMN "artistsIds"`);
        await queryRunner.query(`ALTER TABLE "favourites" DROP COLUMN "tracksIds"`);
        await queryRunner.query(`ALTER TABLE "album" ADD "favoritesId" integer`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD "favoritesId" integer`);
        await queryRunner.query(`ALTER TABLE "artists" ADD "favoritesId" integer`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_044d50da14c9d109cc1ba040a60" FOREIGN KEY ("favoritesId") REFERENCES "favourites"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_9f837920b195f2e2aa3e41d8e58" FOREIGN KEY ("favoritesId") REFERENCES "favourites"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artists" ADD CONSTRAINT "FK_ebd440a2ca93675e37029cc9a72" FOREIGN KEY ("favoritesId") REFERENCES "favourites"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artists" DROP CONSTRAINT "FK_ebd440a2ca93675e37029cc9a72"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_9f837920b195f2e2aa3e41d8e58"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_044d50da14c9d109cc1ba040a60"`);
        await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "favoritesId"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP COLUMN "favoritesId"`);
        await queryRunner.query(`ALTER TABLE "album" DROP COLUMN "favoritesId"`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD "tracksIds" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD "artistsIds" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favourites" ADD "albumsIds" text NOT NULL`);
    }

}
