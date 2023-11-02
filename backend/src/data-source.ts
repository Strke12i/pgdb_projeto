import "reflect-metadata"
import { DataSource } from "typeorm"

// npm run typeorm migration:generate .\src\migration\CreateA -- -d .\src\data-source.ts
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "pgbdProjeto",
    synchronize: false,
    logging: true,
    entities: [`${__dirname}/entity/*.{ts,js}`],
    migrations: [`${__dirname}/migration/*.{ts,js}`],
    subscribers: [],
    //dropSchema: true
})
