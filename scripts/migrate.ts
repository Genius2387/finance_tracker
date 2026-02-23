import { setDefaultResultOrder } from "node:dns";
setDefaultResultOrder("ipv4first");

import { config } from "dotenv";
config({ path: ".env" });

import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  try {
    console.log(
      "DB HOST:",
      new URL(process.env.DATABASE_URL!).hostname
    );

    await client.connect();

    const db = drizzle(client);

    await migrate(db, { migrationsFolder: "drizzle" });

    await client.end();
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
}

main();
