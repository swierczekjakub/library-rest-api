import {Router} from "express";
import {BookController} from "../controller/BookController";

export const bookRouter = Router();
const bookController = new BookController()

bookRouter
    .get('/', bookController.getAllBooks.bind(bookController))
    .get('/:id', bookController.getSingleBook.bind(bookController))
    .post('/', bookController.addBook.bind(bookController))
    .patch('/:id', bookController.updateBook.bind(bookController))
    .delete('/:id', bookController.removeBook.bind(bookController))
