import { MigrationInterface, QueryRunner, Table, TableColumn, TableIndex } from "typeorm";

export class User1718803626426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "users",
        columns: [
          new TableColumn({
            name: "id",
            type: "bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          }),

          new TableColumn({
            name: "email",
            type: "varchar",
            isUnique: true
          }),
          
          new TableColumn({
            name: "password",
            type: "varchar"
          }),

          new TableColumn({
            name: "deleted_at",
            type: "timestamp",
            default: null,
            isNullable: true
          }),

          new TableColumn({
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          }),

          new TableColumn({
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          })
        ]
      }))

      await queryRunner.createIndex("users", new TableIndex({
        name: "idx_user_email",
        columnNames: ["email"]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropIndex("users", "idx_user_email")
      await queryRunner.dropTable("users")
    }

}
