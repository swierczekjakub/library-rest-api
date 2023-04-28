import * as express from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import {bookRouter} from "./router/BookRouter";
import {readerRouter} from "./router/ReaderRouter";
import {errorHandler} from "./middleware/error-handler";
import {borrowingRouter} from "./router/BorrowingRouter";
import {notFound} from "./middleware/not-found";

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        app.use(express.json())
        app.use('/api/v1/books', bookRouter)
        app.use('/api/v1/readers', readerRouter);
        app.use('/api/v1/borrowings', borrowingRouter);
        app.use(errorHandler);
        app.use(notFound);

        app.listen(3000, () => console.log('Listening on http://localhost:3000'));
    })
    .catch(error => console.log(error))
