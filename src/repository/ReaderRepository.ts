import {AppDataSource} from "../data-source";
import {Reader} from "../entity/Reader";

export const readerRepository = AppDataSource.getRepository(Reader);
