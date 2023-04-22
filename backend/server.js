const app = require("./app.js");
const dotenv = require("dotenv");
const connectDatabase = require("./configurations/database.js");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config({ path: "backend/configurations/files.env" });

connectDatabase();

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log("Server is working on http://localhost:" + port);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
