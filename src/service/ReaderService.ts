import {v4 as uuidv4} from "uuid";
import {readerRepository} from "../repository/ReaderRepository";
import {Reader} from "../entity/Reader";
import {AddReaderDto} from "../dto/AddReaderDto";
import {validate} from "class-validator";
import {ValidationError} from "../middleware/error-handler";
import {extractErrorInfo} from "../utils/extractErrorInfo";
import {isEqual} from "lodash";

export class ReaderService {
    private readerRepository = readerRepository;

    async getReaders(): Promise<Reader[]> {
        return this.readerRepository.find();
    }

    async getReader(id: string): Promise<Reader> {
        const reader = await this.readerRepository.findOneBy({
            id
        });

        if (!reader) {
            throw new ValidationError("No reader found");
        }

        return reader;
    }

    async addReader(addReaderDto: AddReaderDto) {
        const reader: Reader = Object.assign(new Reader(), addReaderDto);

        if (!reader.id) reader.id = uuidv4();
        if (!reader.createdAt) reader.createdAt = new Date();
        if (!reader.updatedAt) reader.updatedAt = new Date();

        const errors = await validate(reader);

        if (errors.length > 0) {
            throw new ValidationError(`Cannot add reader: ${extractErrorInfo(errors)}`);
        }

        await this.readerRepository.save(reader);

        return this.getReader(reader.id);
    }

    async updateReader (readerId: string, propertiesToUpdate: Partial<Reader>) {
        const reader = await this.getReader(readerId);
        const allowedProperties = ['firstName', 'lastName', 'email', 'phoneNumber'];
        const updatedReader = new Reader();

        Object.assign(updatedReader, reader);

        // compare whether provided propertiesToUpdate match with allowedProperties, if so they are assigned to updatedReader. It also checks if they are true
        Object.entries(propertiesToUpdate).forEach(([key, value]) => {
            if (allowedProperties.includes(key) && value) {
                Object.assign(updatedReader, { [key]: value });
            }
        });

        if (isEqual(updatedReader, reader)) throw new ValidationError('Nothing to change.')

        const errors = await validate(updatedReader);

        if (errors.length > 0) {
            console.error(errors)

            throw new ValidationError(`Reader update failed: ${extractErrorInfo(errors)}`)
        }

        updatedReader.updatedAt = new Date();

        await this.readerRepository.save(updatedReader)

        return updatedReader;
    }

    async remove(id: string): Promise<void> {
        const readerToRemove = await this.getReader(id);

        await this.readerRepository.remove(readerToRemove)
    }
}
