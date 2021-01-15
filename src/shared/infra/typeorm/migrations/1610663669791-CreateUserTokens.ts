import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateUserTokens1610663669791
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
