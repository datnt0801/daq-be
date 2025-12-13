import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddStatusColumnToOrderDetails1727683883384
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_details',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('order_details', 'status');
  }
}
