import * as dotenv from 'dotenv';
dotenv.config();
import "reflect-metadata"
import { DataSource } from "typeorm"
import * as path from "path";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname, 'entity/*.ts')],
    migrations: [path.join(__dirname, 'migration/*.ts')],
    subscribers: [],
})
