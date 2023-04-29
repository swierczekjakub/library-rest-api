import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Book} from "./Book";
import {Reader} from "./Reader";
import {IsDate, IsNotEmpty, IsString, Length} from "class-validator";

@Entity({ name: 'borrowings' })
export class Borrowing {
    @IsNotEmpty()
    @Length(36, 36)
    @IsString()
    @PrimaryColumn({ type: 'varchar', length: 36, default: () => 'uuid()'})
    id: string;

    @IsNotEmpty()
    @IsDate()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    borrowDate: Date;

    @IsNotEmpty()
    @IsDate()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    returnDate: Date;

    @Column({ type: 'timestamp', nullable: true})
    actualReturnDate: Date;

    @ManyToOne(() => Book, book => book.borrowings, { onDelete: 'CASCADE' })
    book: Book;

    @ManyToOne(() => Reader, reader => reader.borrowings, { onDelete: 'CASCADE' })
    reader: Reader;
}
