import {bookRepository} from "../repository/BookRepository";
import {Book} from "../entity/Book";
import {AddBookDto} from "../dto/AddBookDto";
import { v4 as uuidv4 } from 'uuid';
import {ValidationError} from "../middleware/error-handler";
import {isEqual} from "lodash";
import {validate} from "class-validator";
import {extractErrorInfo} from "../utils/extractErrorInfo";


export class BookService {
    private bookRepository = bookRepository;

    async getBooks(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    async getBook(id: string): Promise<Book> {
        const book = await this.bookRepository.findOneBy({
            id
        });

        if (!book) {
            throw new ValidationError("No book found.");
        }

        return book;
    }

    async addBook(addBookDto: AddBookDto) {
        const book: Book = Object.assign(new Book(), addBookDto)

        if (!book.id) book.id = uuidv4();
        if (!book.createdAt) book.createdAt = new Date();
        if (!book.updatedAt) book.updatedAt = new Date();

        const errors = await validate(book);

        if (errors.length > 0) {
            throw new ValidationError(`Cannot add book: ${extractErrorInfo(errors)}`);
        }

        await this.bookRepository.save(book);

        return this.getBook(book.id);
    }

    async updateBook(bookId: string, propertiesToUpdate: Partial<Book>) {
        const book = await this.getBook(bookId);
        const allowedProperties = ['title', 'author', 'isbn', 'publisher'];
        const updatedBook = new Book();

        Object.assign(updatedBook, book);

        // compare whether provided propertiesToUpdate match with allowedProperties, if so they are assigned to updatedBook. It also checks if they are true
        Object.entries(propertiesToUpdate).forEach(([key, value]) => {
            if (allowedProperties.includes(key) && value) {
                Object.assign(updatedBook, { [key]: value });
            }
        });

        if (isEqual(updatedBook, book)) throw new ValidationError('Nothing to change.')

        const errors = await validate(updatedBook);

        if (errors.length > 0) {
            console.error(errors)

            throw new ValidationError(`Reader update failed: ${extractErrorInfo(errors)}`)
        }

        updatedBook.updatedAt = new Date();

        await this.bookRepository.save(updatedBook)

        return updatedBook;
    }

    async remove(id: string): Promise<void> {
        const bookToRemove = await this.getBook(id);

        await this.bookRepository.remove(bookToRemove);
    }
}
