import { Migration } from "medusa-extender";
import { MigrationInterface, QueryRunner } from "typeorm";

@Migration()
export default class addStoreIdToUser1657975603000 implements MigrationInterface {
  name = 'addStoreIdToUser1657975603000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `ALTER TABLE public."user" ADD COLUMN IF NOT EXISTS "store_id" text;`;
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `ALTER TABLE public."user" DROP COLUMN "store_id";`;
    await queryRunner.query(query);
  }
}