import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateReaders1681726668369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "readers",
                columns: [
                    {
                        name: "id",
                        type: "varchar(36)",
                        isPrimary: true,
                        default: "UUID()",
                    },
                    {
                        name: "firstName",
                        type: "varchar(50)",
                    },
                    {
                        name: "lastName",
                        type: "varchar(100)",
                    },
                    {
                        name: "phoneNumber",
                        type: "varchar(15)"
                    },
                    {
                      name: "email",
                      type: "varchar(255)",
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    }
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("readers");
    }
}
