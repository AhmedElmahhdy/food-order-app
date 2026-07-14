import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY ,
            email TEXT NOT NULL UNIQUE ,
            phone TEXT NOT NULL UNIQUE ,
            name TEXT NOT NULL ,
            password_hash TEXT NOT NULL ,
            role TEXT NOT NULL CHECK ( system_role IN ('customer','restaurant_user','system_admin') ),
            status TEXT NOT NULL DEFAULT 'active' CHECK ( status IN ('active','deleted') ),
            created_at TIMESTAMP NOT NULL ,
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            deleted_at TIMESTAMP                       
        )
        
        
        CREATE INDEX idx_user_email ON users(email)
        CREATE INDEX idx_user_role ON users(role)
    `)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TABLE users
    `)
}

