import {Entity, Column, OneToMany, PrimaryColumn} from 'typeorm';
import {Borrowing} from "./Borrowing";
import {IsDate, IsNotEmpty, IsString, Length, MaxLength} from "class-validator";

@Entity({ name: 'books' })
export class Book {
    @IsNotEmpty()
    @IsString()
    @Length(36, 36)
    @PrimaryColumn({ type: 'varchar', length: 36, default: () => 'uuid()'})
    id: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @Column({ type: 'varchar', length: 255 })
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @Column({ type: 'varchar', length: 100 })
    author: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 17)
    @Column({ type: 'varchar', length: 17 })
    isbn: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    @Column({ type: 'varchar', length: 255 })
    publisher: string;

    @IsNotEmpty()
    @IsDate()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @IsNotEmpty()
    @IsDate()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Borrowing, borrowing => borrowing.book)
    borrowings: Borrowing[];
}
