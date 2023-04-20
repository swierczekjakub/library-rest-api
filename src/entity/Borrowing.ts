import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Book} from "./Book";
import {Reader} from "./Reader";

@Entity({ name: 'borrowings' })
export class Borrowing {
    @PrimaryColumn({ type: 'varchar', length: 36, default: () => 'uuid()'})
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    borrowDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    returnDate: Date;

    @ManyToOne(() => Book, book => book.borrowings, { onDelete: 'CASCADE' })
    book: Book;

    @ManyToOne(() => Reader, reader => reader.borrowings, { onDelete: 'CASCADE' })
    reader: Reader;
}
