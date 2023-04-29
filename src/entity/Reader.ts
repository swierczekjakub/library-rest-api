import {Entity, Column, OneToMany, PrimaryColumn} from 'typeorm';
import {Borrowing} from "./Borrowing";
import {IsDate, IsNotEmpty, IsPhoneNumber, IsString, Length, MaxLength} from "class-validator";

@Entity({ name: 'readers' })
export class Reader {
    @IsNotEmpty()
    @Length(36, 36)
    @IsString()
    @PrimaryColumn({ type: 'varchar', length: 36, default: () => 'uuid()'})
    id: string;

    @IsNotEmpty()
    @MaxLength(50)
    @IsString()
    @Column({ type: 'varchar', length: 50 })
    firstName: string;

    @IsNotEmpty()
    @MaxLength(100)
    @IsString()
    @Column({ type: 'varchar', length: 100 })
    lastName: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @Length(5, 15)
    @Column({ type: 'varchar', length: 15 })
    phoneNumber: string;

    @IsNotEmpty()
    @MaxLength(255)
    @IsString()
    @Column({ type: 'varchar', length: 255 })
    email: string;

    @IsNotEmpty()
    @IsDate()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @IsNotEmpty()
    @IsDate()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Borrowing, borrowing => borrowing.reader)
    borrowings: Borrowing[];
}
