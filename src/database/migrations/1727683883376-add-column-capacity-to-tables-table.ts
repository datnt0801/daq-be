import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCapacityColumnToTables1727683883376
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tables',
      new TableColumn({
        name: 'capacity',
        type: 'int',
        isNullable: false,
        default: 6,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tables', 'capacity');
  }
}
