import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterColumnImageTableFoodItems1727683883377
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'food_items',
      'image',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'food_items',
      'image',
      new TableColumn({
        name: 'image',
        type: 'int',
        isNullable: true,
      }),
    );
  }
}
