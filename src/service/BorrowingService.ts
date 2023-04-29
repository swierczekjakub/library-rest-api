import {borrowingRepository} from "../repository/BorrowingRepository";
import {bookRepository} from "../repository/BookRepository";
import {Borrowing} from "../entity/Borrowing";
import {ValidationError} from "../middleware/error-handler";
import {readerRepository} from "../repository/ReaderRepository";
import {add, differenceInDays} from "date-fns";
import {v4 as uuidv4} from "uuid";
import {validate} from "class-validator";
import {extractErrorInfo} from "../utils/extractErrorInfo";

export class BorrowingService {
    private borrowingRepository = borrowingRepository;
    private bookRepository = bookRepository;
    private readerRepository = readerRepository;

    async getBorrowings(): Promise<Borrowing[]> {
        return this.borrowingRepository.find({
            relations: {
                book: true,
                reader: true,
            }
        })
    }

    async getBorrowing(borrowingId: string): Promise<Borrowing> {
        const borrowing = await this.borrowingRepository.findOne({
            where: {
                id: borrowingId,
            },
            relations: {
                book: true,
                reader: true,
            },
        })

        if (!borrowing) {
            throw new ValidationError("No borrowing found.");
        }

        return borrowing;
    }

    async addBorrowing(readerId: string, bookId: string) {
        const book = await this.bookRepository.findOneBy({id: bookId});

        if (!book) throw new ValidationError('No book with such id.');

        const reader = await this.readerRepository.findOneBy({id: readerId});

        if (!reader) throw new ValidationError('No reader with such id.');

        const unreturnedBook = await this.borrowingRepository.findUnreturnedBook(bookId);

        if (unreturnedBook) throw new ValidationError('This book has already been borrowed.')

        const booksCurrentlyBorrowedByReader: Borrowing[] = await this.borrowingRepository.findBooksCurrentlyBorrowedByReader(readerId);

        if (booksCurrentlyBorrowedByReader.length >= 3) throw new ValidationError('Another book cannot be borrowed because the maximum number of borrowings has been exceeded')

        booksCurrentlyBorrowedByReader.map((el: Borrowing) => {
            const bookHoldingTime = differenceInDays(new Date(), el.borrowDate)
            if (bookHoldingTime > 180) throw new ValidationError(`It is not possible to borrow book because another book has been held for more than 6 months`)
        })

        const newBorrowing = Object.assign(new Borrowing(), {
            id: uuidv4(),
            borrowDate: new Date(),
            returnDate: add(new Date(), {months: 1}),
            reader,
            book
        })

        const errors = await validate(newBorrowing);

        if (errors.length > 0) {
            throw new ValidationError(`Cannot add reader: ${extractErrorInfo(errors)}`);
        }

        await this.borrowingRepository.save(newBorrowing);
    }

    async updateBorrowing(borrowingId: string, readerId: string, bookId: string) {
        const borrowing = await this.getBorrowing(borrowingId);

        if (!borrowing) throw new ValidationError('No borrowing with such id.');
        if ((borrowing.reader.id !== readerId || borrowing.book.id !== bookId)) throw new ValidationError('Incorrect readerId or bookId.');
        if (borrowing.actualReturnDate !== null) throw new ValidationError('Book already returned.')

        borrowing.actualReturnDate = new Date();

        await this.borrowingRepository.save(borrowing);
    }

    async removeBorrowing(borrowingId: string) {
        const borrowingToRemove = await this.getBorrowing(borrowingId);

        if (borrowingToRemove.actualReturnDate === null) throw new ValidationError("Cannot delete borrowing because book has been unreturned");

        await this.borrowingRepository.remove(borrowingToRemove);
    }
}
