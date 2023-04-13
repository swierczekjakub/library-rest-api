import * as express from "express"
import { AppDataSource } from "./data-source"

AppDataSource.initialize()
    .then(async () => {
        const app = express()
        app.use(express.json())

        app.listen(3000, () => console.log('Listening on http://localhost:3000'));
    })
    .catch(error => console.log(error))
