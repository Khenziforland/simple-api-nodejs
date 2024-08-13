import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class Product1718803654124 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          new TableColumn({
            name: "id",
            type: "bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),

          new TableColumn({
            name: "product_category_id",
            type: "bigint",
          }),

          new TableColumn({
            name: "name",
            type: "varchar",
          }),

          new TableColumn({
            name: "price",
            type: "bigint",
          }),

          new TableColumn({
            name: "image",
            type: "varchar",
            default: null,
            isNullable: true,
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
      "products",
      new TableForeignKey({
        columnNames: ["product_category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product_categories",
        onDelete: "CASCADE"
      })
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("products")
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes("product_category_id"))
    await queryRunner.dropForeignKey("products", foreignKey!)
    await queryRunner.dropTable("products")
    }

}
