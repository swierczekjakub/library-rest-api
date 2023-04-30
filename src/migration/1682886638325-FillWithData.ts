import { MigrationInterface, QueryRunner } from "typeorm"

export class FillWithData1682886638325 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO \`books\` (\`id\`, \`title\`, \`author\`, \`isbn\`, \`publisher\`, \`createdAt\`, \`updatedAt\`) VALUES ('093279cd-e35f-11ed-b385-d85ed3e24e98', 'Grammatik A1–B2. Gramatyka języka niemieckiego z ćwiczeniami', 'Anna Kryczyńska-Pham, Justyna Łuczak', '978-83-02-16158-2', 'WSiP', '2023-04-25 11:48:03', '2023-04-25 11:48:03'), ('15c9baba-e35e-11ed-b385-d85ed3e24e98', 'Lemmy autobiografia - Biała gorączka', 'Janiss Grizza, Lemmy Kilmister', '978-83-63785-29-1', 'KAGRA', '2023-04-25 11:41:15', '2023-04-25 11:41:15'),('1b446a12-fc02-48e4-8986-30c9c46fcfd0', 'Książka test', 'Testowy autor książki', '978-83-0000-000-0', 'Test Wielki', '2023-04-29 14:53:41', '2023-04-29 14:53:41'),('48457cd4-e361-11ed-b385-d85ed3e24e98', 'Into the Wild', 'Jon Krakauer', '978-0-385-48680-4', 'Anchor Books', '2023-04-25 12:04:08', '2023-04-27 13:57:46'),('5eb812ba-e35f-11ed-b385-d85ed3e24e98', 'Zew Cthulhu', 'H. P. Lovecraft', '978-83-89064-59-6', 'C&T Crime & Thriller', '2023-04-25 11:50:26', '2023-04-25 11:50:26'),('75ebd713-e361-11ed-b385-d85ed3e24e98', 'Labirynt duchów', 'Carlos Ruiz Zafón', '978-83-287-0775-7', 'Muza', '2023-04-25 12:05:24', '2023-04-25 12:05:24'),('95f156f0-e35e-11ed-b385-d85ed3e24e98', 'Mechaniczna pomarańcza', 'Anthony Burgess', '978-83-7998-029-1', 'Vis-a-Vis Etiuda', '2023-04-25 11:44:50', '2023-04-25 11:44:50'),('a39412d6-e361-11ed-b385-d85ed3e24e98', 'O czasie i wodzie', 'Andri Snær Magnason', '978-83-66147-53-9', 'Karakter', '2023-04-25 12:06:41', '2023-04-25 12:06:41'),('b09b356d-e35f-11ed-b385-d85ed3e24e98', 'Canon Eos 760D/750D: Podręcznik użytkownika', 'Jeff Revell', '978-83-7579-527-1', 'Galaktyka', '2023-04-25 11:52:44', '2023-04-25 11:52:44'),('d06af692-e361-11ed-b385-d85ed3e24e98', 'Śmierć i życie wielkich miast Ameryki', 'Jane Jacobs', '978-83-937716-3-9', 'Centrum Architektury', '2023-04-25 12:07:56', '2023-04-25 12:07:56');
        `);
        await queryRunner.query(`
            INSERT INTO \`readers\` (\`id\`, \`firstName\`, \`lastName\`, \`phoneNumber\`, \`email\`, \`createdAt\`, \`updatedAt\`) VALUES ('3ef94a14-e362-11ed-b385-d85ed3e24e98', 'Steven', 'Seagal', '+49030762994', 'seagal1@gmail.com', '2023-04-25 12:11:02', '2023-04-25 12:11:02'),('56fae538-e362-11ed-b385-d85ed3e24e98', 'Robert', 'Kubica', '+48502333193', 'rkubica1@gmail.com', '2023-04-25 12:11:42', '2023-04-25 12:11:42'),('a1c54f68-e362-11ed-b385-d85ed3e24e98', 'Fan', 'Tomas', '+33655595425', 'fantomas@gmail.com', '2023-04-25 12:13:47', '2023-04-27 13:11:23'),('bf24cc35-717c-4f0f-b6d9-b69909fa5fd3', 'Testowy', 'Tester', '+48505505505', 'testowytester@gmail.com', '2023-04-29 11:05:28', '2023-04-29 11:06:39'),('c0e09c16-e362-11ed-b385-d85ed3e24e98', 'Phil', 'Collins', '+441632960774', 'easylover@gmail.com', '2023-04-25 12:14:40', '2023-04-25 12:14:40');
        `);
        await queryRunner.query(`
            INSERT INTO \`borrowings\` (\`id\`, \`borrowDate\`, \`returnDate\`, \`actualReturnDate\`, \`bookId\`, \`readerId\`) VALUES ('0ce251ac-e366-11ed-b385-d85ed3e24e98', '2022-04-25 14:37:44', '2023-05-24 14:37:46', NULL, '75ebd713-e361-11ed-b385-d85ed3e24e98', '3ef94a14-e362-11ed-b385-d85ed3e24e98'),('2cf0c506-e366-11ed-b385-d85ed3e24e98', '2023-02-28 13:21:32', '2023-06-05 14:38:38', NULL, '15c9baba-e35e-11ed-b385-d85ed3e24e98', '3ef94a14-e362-11ed-b385-d85ed3e24e98'),('3ef8ad68-e698-11ed-9cef-d85ed3e24e98', '2023-02-28 15:14:48', '2023-05-29 14:14:51', '2023-04-29 14:16:06', '093279cd-e35f-11ed-b385-d85ed3e24e98', '56fae538-e362-11ed-b385-d85ed3e24e98'),('76aa1f53-600b-46fc-bdb7-1e720643b6e5', '2023-04-27 14:04:07', '2023-05-27 14:04:07', '2023-04-27 14:11:26', 'd06af692-e361-11ed-b385-d85ed3e24e98', '3ef94a14-e362-11ed-b385-d85ed3e24e98'),('784d8cc1-8a5d-47aa-93a2-ef0d35b93640', '2023-04-29 14:57:14', '2023-05-29 14:57:14', NULL, 'b09b356d-e35f-11ed-b385-d85ed3e24e98', 'a1c54f68-e362-11ed-b385-d85ed3e24e98'),('d0a17a8f-e3ab-11ed-b6b3-d85ed3e24e98', '2023-01-16 21:56:57', '2023-03-25 21:57:15', '2023-04-26 12:12:01', '95f156f0-e35e-11ed-b385-d85ed3e24e98', 'c0e09c16-e362-11ed-b385-d85ed3e24e98');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM \`borrowings\``);
        await queryRunner.query(`DELETE FROM \`books\``);
        await queryRunner.query(`DELETE FROM \`readers\``);
    }

}
