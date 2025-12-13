import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddStatusColumnToOrderDetails1727683883385
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'total',
        type: 'decimal',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'total');
  }
}
