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
        const borrowingTable = await queryRunner.getTable("Borrowings");

        const bookFk = borrowingTable.foreignKeys.find(fk => fk.columnNames.indexOf("bookId") !== -1);
        const readerFk = borrowingTable.foreignKeys.find(fk => fk.columnNames.indexOf("readerId") !== -1);

        if (bookFk) await queryRunner.dropForeignKey("Borrowings", bookFk);
        if (readerFk) await queryRunner.dropForeignKey("Borrowings", readerFk);

        await queryRunner.dropTable("Borrowings");
    }
}
