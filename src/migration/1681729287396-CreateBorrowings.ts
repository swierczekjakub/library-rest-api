import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm"

export class CreateBorrowings1681729287396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Borrowings",
            columns: [
                {
                    name: "id",
                    type: "varchar(36)",
                    isPrimary: true,
                    default: "UUID()",
                },
                {
                    name: "borrowDate",
                    type: "timestamp",
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: "returnDate",
                    type: "timestamp",
                    default: 'DATE_ADD(NOW(), INTERVAL 14 DAY)',
                },
                {
                    name: "bookId",
                    type: "varchar(36)",
                    isUnique: true,
                },
                {
                    name: "readerId",
                    type: "varchar(36)"
                }
            ]
        }));

        await queryRunner.createForeignKey("Borrowings", new TableForeignKey({
            columnNames: ["bookId"],
            referencedColumnNames: ["id"],
            referencedTableName: "Books",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("Borrowings", new TableForeignKey({
            columnNames: ["readerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "Readers",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("Borrowings", "bookId");
        await queryRunner.dropForeignKey("Borrowings", "readerId");
        await queryRunner.dropTable("Borrowings");
    }
}
