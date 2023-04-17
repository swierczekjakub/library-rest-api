import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateBooks1681726264976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'books',
                columns: [
                    {
                        name: "id",
                        type: "varchar(36)",
                        isPrimary: true,
                        default: "UUID()",
                    },
                    {
                        name: 'title',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'author',
                        type: 'varchar(100)',
                    },
                    {
                        name: 'isbn',
                        type: 'varchar(17)',
                    },
                    {
                        name: 'publisher',
                        type: 'varchar(255)',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    }
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('books');
    }
}
