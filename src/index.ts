import * as express from "express"
import { AppDataSource } from "./data-source"
import {bookRouter} from "./router/BookRouter";
import {readerRouter} from "./router/ReaderRouter";
import {borrowingRouter} from "./router/BorrowingRouter";

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        app.use(express.json())
        app.use('/api/v1/books', bookRouter)
        app.use('/api/v1/readers', readerRouter);
        app.use('/api/v1/borrowings', borrowingRouter);

        app.listen(3000, () => console.log('Listening on http://localhost:3000'));
    })
    .catch(error => console.log(error))
