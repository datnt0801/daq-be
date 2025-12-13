import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFloorColumnToTables1727683883378 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tables',
      new TableColumn({
        name: 'floor',
        type: 'int',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tables', 'floor');
  }
}
