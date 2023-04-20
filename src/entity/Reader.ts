import {Entity, Column, OneToMany, PrimaryColumn} from 'typeorm';
import {Borrowing} from "./Borrowing";

@Entity({ name: 'readers' })
export class Reader {
    @PrimaryColumn({ type: 'varchar', length: 36, default: () => 'uuid()'})
    id: string;

    @Column({ type: 'varchar', length: 50 })
    firstName: string;

    @Column({ type: 'varchar', length: 100 })
    lastName: string;

    @Column({ type: 'varchar', length: 15 })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Borrowing, borrowing => borrowing.reader)
    borrowings: Borrowing[];
}
