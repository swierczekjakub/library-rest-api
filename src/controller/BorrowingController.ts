import {BorrowingService} from "../service/BorrowingService";
import {Request, Response} from "express";

export class BorrowingController {
    private borrowingService = new BorrowingService()

    async getAllBorrowings (req: Request, res: Response) {
        const books = await this.borrowingService.getBorrowings()
        res.status(200).json({books, nbHits: books.length});
    }

    async getSingleBorrowing (req: Request, res: Response) {
        const {id} = req.params;
        const borrowing = await this.borrowingService.getBorrowing(id);
        res.status(200).json({borrowing})
    }

    async addBorrowing (req: Request, res: Response) {
        const {bookId, readerId} = req.body;
        await this.borrowingService.addBorrowing(readerId, bookId);

        res.status(201).json({isSuccess: true});
    }

    async returnBook (req: Request, res: Response) {
        const {id} = req.params;
        const {bookId, readerId} = req.body;

        await this.borrowingService.updateBorrowing(id, readerId, bookId);

        res.status(200).json({isSuccess: true})
    }

    async removeBorrowing (req: Request, res: Response) {
        const {id} = req.params;

        await this.borrowingService.removeBorrowing(id);

        res.status(200).json({isSuccess: true})
    }
}
