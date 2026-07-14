import  knex  from "knex";
import config from "./knexfile.ts";


export const db = knex(config)

// Function to check health of connection service
export async function pingDB(){
    await db.raw("SELECT 1")
}