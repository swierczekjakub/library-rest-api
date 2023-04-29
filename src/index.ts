import * as express from "express";
import "express-async-errors";
import {AppDataSource} from "./data-source";
import {bookRouter} from "./router/BookRouter";
import {readerRouter} from "./router/ReaderRouter";
import {errorHandler} from "./middleware/error-handler";
import {borrowingRouter} from "./router/BorrowingRouter";
import {notFound} from "./middleware/not-found";
import * as swaggerUI from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as path from "path";
import rateLimiter from "express-rate-limit";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));
        app.use(
            rateLimiter({
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 100, // limit each IP to 100 requests per windowMs
            })
        );
        app.use(express.json());
        app.get('/', (req, res) => {
            res.send(`<h1>library API</h1></h1><a href="/api-docs">Documentation</a>`);
        })
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
        app.use('/api/v1/books', bookRouter);
        app.use('/api/v1/readers', readerRouter);
        app.use('/api/v1/borrowings', borrowingRouter);
        app.use(errorHandler);
        app.use(notFound);

        app.listen(3000, () => console.log('Listening on http://localhost:3000'));
    })
    .catch(error => console.log(error))
