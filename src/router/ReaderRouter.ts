import {Router} from "express";
import {ReaderController} from "../controller/ReaderController";

export const readerRouter = Router();
const readerController = new ReaderController();

readerRouter
    .get('/', readerController.getAllReaders.bind(readerController))
    .get('/:id', readerController.getSingleReader.bind(readerController))
    .post('/', readerController.addReader.bind(readerController))
    .patch('/:id', readerController.updateReader.bind(readerController))
    .delete('/:id', readerController.removeReader.bind(readerController))
