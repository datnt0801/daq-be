import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAndAlterColumnToOrdersTable1727683883383
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'type_id',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'payment_method',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'type_id');
    await queryRunner.dropColumn('orders', 'type');
    await queryRunner.dropColumn('orders', 'status');
    await queryRunner.dropColumn('orders', 'payment_method');
  }
}
