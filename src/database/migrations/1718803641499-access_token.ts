import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class AccessToken1718803641499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "access_tokens",
        columns: [
          new TableColumn({
            name: "id",
            type: "bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),

          new TableColumn({
            name: "user_id",
            type: "bigint",
            isNullable: true,
            default: null,
          }),

          new TableColumn({
            name: "token",
            type: "varchar",
          }),

          new TableColumn({
            name: "expired_at",
            type: "timestamp",
          }),

          new TableColumn({
            name: "deleted_at",
            type: "timestamp",
            default: null,
            isNullable: true,
          }),

          new TableColumn({
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          }),

          new TableColumn({
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          }),
        ],
      })
    );

    await queryRunner.createForeignKey(
      "access_tokens",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("access_tokens")
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes("user_id"))
    await queryRunner.dropForeignKey("access_tokens", foreignKey!)
    await queryRunner.dropTable("access_tokens")
  }
}
