import {config} from "dotenv";
import {z} from "zod"
import * as path from "node:path";

// important to find path .env config path by default is './.env' we should to resolve it
config({path: path.resolve(import.meta.dirname,'../../../.env')})


const schema = z.object({
    PORT:z.string().default("3000"),
    DB_HOST:z.string().default("localhost "),
    DB_PORT:z.string().default("5432"),
    DB_USER:z.string().default("postgres"),
    DB_PASS:z.string(),
    DB_NAME:z.string(),
    DB_POOL_MAX:z.string(),
    DB_MIGRATIONS_DIRECTORY:z.string(),
    DB_MIGRATIONS_EXTENSION:z.string()

})

const parsed = schema.parse(process.env);

export const env = {
    port :Number(parsed.PORT),
    db:{
        host:parsed.DB_HOST,
        port:Number(parsed.DB_PORT),
        user:parsed.DB_USER,
        pass:parsed.DB_PASS,
        name:parsed.DB_NAME,
        pool_max:Number(parsed.DB_POOL_MAX),
        migrationsDirectory:path.resolve(import.meta.dirname,'../../../', parsed.DB_MIGRATIONS_DIRECTORY),
        migrationsExtension:parsed.DB_MIGRATIONS_EXTENSION,
    }
}