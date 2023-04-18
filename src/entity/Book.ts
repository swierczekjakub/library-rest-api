import {Entity, Column, OneToMany, PrimaryColumn} from 'typeorm';
import {Borrowing} from "./Borrowing";

@Entity({ name: 'books' })
export class Book {
    @PrimaryColumn({ type: 'varchar', length: 36, default: () => 'uuid()'})
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 100 })
    author: string;

    @Column({ type: 'varchar', length: 17 })
    isbn: string;

    @Column({ type: 'varchar', length: 255 })
    publisher: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Borrowing, borrowing => borrowing.book)
    borrowings: Borrowing[];
}
