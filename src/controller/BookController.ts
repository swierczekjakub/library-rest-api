import {Request, Response} from "express";
import {BookService} from "../service/BookService";
import {AddBookDto} from "../dto/AddBookDto";
import {validate} from "class-validator";
import {extractErrorInfo} from "../utils/extractErrorInfo";

export class BookController {
    private bookService = new BookService();

    async getAllBooks (req: Request, res: Response) {
        const books = await this.bookService.getBooks();
        res.status(200).json({books, nbHits: books.length});
    }

    async getSingleBook (req: Request, res: Response) {
        const {id} = req.params;
        const book = await this.bookService.getBook(id);
        res.status(200).json({book})
    }

    async addBook (req: Request, res: Response) {
        const {title, author, isbn, publisher} = req.body;
        const addBookDto = new AddBookDto();
        Object.assign(addBookDto, {title, author, isbn, publisher})
        const errors = await validate(addBookDto);

        if (errors.length > 0) {
             return res.status(400).json({message: extractErrorInfo(errors)});
        }

        const newBook = await this.bookService.addBook(addBookDto);

        res.status(201).json({newBook})
    }

    async updateBook (req: Request, res: Response) {
        const {id} = req.params;
        const updatedBook = await this.bookService.updateBook(id, req.body);

        res.status(200).json(updatedBook);
    }

    async removeBook (req: Request, res: Response) {
        const {id} = req.params;
        await this.bookService.remove(id);

        res.status(200).json({isSuccess: true});
    }
}
