import {Router} from "express";
import {BorrowingController} from "../controller/BorrowingController";

export const borrowingRouter = Router();
const borrowingController = new BorrowingController()

borrowingRouter
    .get('/', borrowingController.getAllBorrowings.bind(borrowingController))
    .get('/:id', borrowingController.getSingleBorrowing.bind(borrowingController))
    .post('/', borrowingController.addBorrowing.bind(borrowingController))
    .patch('/:id', borrowingController.returnBook.bind(borrowingController))
    .delete('/:id', borrowingController.removeBorrowing.bind(borrowingController));
