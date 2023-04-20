import {AppDataSource} from "../data-source";
import {Borrowing} from "../entity/Borrowing";

export const borrowingRepository = AppDataSource.getRepository(Borrowing);
