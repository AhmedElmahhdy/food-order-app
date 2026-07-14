import {env} from "../config/env.ts"
import type {Knex} from "knex"

const config: Knex.Config = {
    client:"pg",
    connection:{
        host:env.db.host,
        port:env.db.port,
        user:env.db.user,
        password:env.db.pass,
        database:env.db.name
    },
    pool:{
        max:env.db.pool_max,
    },
    migrations:{
        directory:env.db.migrationsDirectory,
        extension:env.db.migrationsExtension,
    }
}
export default config