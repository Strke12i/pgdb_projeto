import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv"

dotenv.config()

// npm run typeorm migration:generate .\src\migration\CreateA -- -d .\src\data-source.ts
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    logging: true,
    entities: [`${__dirname}/entity/*.{ts,js}`],
    migrations: [`${__dirname}/migration/*.{ts,js}`],
    subscribers: [],
    //dropSchema: true
})
