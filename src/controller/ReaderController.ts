import {Request, Response} from "express";
import {validate} from "class-validator";
import {ReaderService} from "../service/ReaderService";
import {AddReaderDto} from "../dto/AddReaderDto";
import {extractErrorInfo} from "../utils/extractErrorInfo";


export class ReaderController {
    private readerService = new ReaderService();

    async getAllReaders (req: Request, res: Response) {
        const books = await this.readerService.getReaders();
        res.status(200).json({books, nbHits: books.length});
    }

    async getSingleReader (req: Request, res: Response) {
        const {id} = req.params;
        const book = await this.readerService.getReader(id);
        res.status(200).json({book})
    }

    async addReader (req: Request, res: Response) {
        const {firstName, lastName, phoneNumber, email} = req.body;
        const addReaderDto = new AddReaderDto();

        Object.assign(addReaderDto, {firstName, lastName, phoneNumber, email})

        const errors = await validate(addReaderDto);

        if (errors.length > 0) {
            return res.status(400).json({message: extractErrorInfo(errors)});
        }

        const newReader = await this.readerService.addReader(addReaderDto);

        res.status(201).json({newReader})
    }

    async updateReader (req: Request, res: Response) {
        const {id} = req.params;
        const updatedReader = await this.readerService.updateReader(id, req.body);

        res.status(200).json(updatedReader);
    }

    async removeReader (req: Request, res: Response) {
        const {id} = req.params;
        await this.readerService.remove(id);

        res.status(200).json({isSuccess: true})
    }
}
