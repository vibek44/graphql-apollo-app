const startServer = require("./server.cjs");
require("dotenv").config();
const { connectToDatabase } = require("./db.js");

const PORT = process.env.PORT || 4000;

async function main() {
  await connectToDatabase();
  startServer(PORT);
}

main();
