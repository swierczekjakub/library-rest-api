import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateBorrowings1681729287396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "borrowings",
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
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: "actualReturnDate",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "bookId",
                    type: "varchar(36)",
                    default: null,
                    isNullable: true,
                },
                {
                    name: "readerId",
                    type: "varchar(36)",
                    default: null,
                    isNullable: true,
                }
            ]
        }));

        await queryRunner.createForeignKey("borrowings", new TableForeignKey({
            columnNames: ["bookId"],
            referencedColumnNames: ["id"],
            referencedTableName: "books",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("borrowings", new TableForeignKey({
            columnNames: ["readerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "readers",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const borrowingTable = await queryRunner.getTable("borrowings");

        const bookFk = borrowingTable.foreignKeys.find(fk => fk.columnNames.indexOf("bookId") !== -1);
        const readerFk = borrowingTable.foreignKeys.find(fk => fk.columnNames.indexOf("readerId") !== -1);

        if (bookFk) await queryRunner.dropForeignKey(borrowingTable, bookFk);
        if (readerFk) await queryRunner.dropForeignKey(borrowingTable, readerFk);

        await queryRunner.dropTable(borrowingTable);
    }
}
