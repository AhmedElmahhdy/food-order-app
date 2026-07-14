import http from "http";
import { createApp } from "./app.js";
import { env } from "./common/config/env.js";
import { db } from "./common/knex/knex.js";
const app = createApp();
const server = http.createServer(app);
server.listen(env.port, () => {
    console.log(`Server started at ${env.port}`);
});
// important to close and db connection after close server
async function shutdown() {
    server.close(async () => {
        console.log("Database shutdown");
        await db.destroy();
        process.exit(0);
    });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
