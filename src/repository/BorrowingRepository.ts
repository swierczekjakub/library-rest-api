import {AppDataSource} from "../data-source";
import {Borrowing} from "../entity/Borrowing";

export const borrowingRepository = AppDataSource.getRepository(Borrowing).extend({
    async findBooksCurrentlyBorrowedByReader(readerId: string) {
        return this.createQueryBuilder('borrowing')
            .leftJoinAndSelect('borrowing.book', 'book')
            .where('borrowing.reader.id = :readerId', {readerId})
            .andWhere('borrowing.actualReturnDate IS NULL')
            .getMany();
    },
    async findUnreturnedBook(bookId: string) {
        return this.createQueryBuilder('borrowing')
            .leftJoinAndSelect('borrowing.book', 'book')
            .where('book.id = :bookId', {bookId})
            .andWhere('borrowing.actualReturnDate IS NULL')
            .getOne();
    }
});
