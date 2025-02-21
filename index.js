const dotenv = require("dotenv");
const cors = require("cors");
const app = require("./app");

app.use(cors());

// Handling uncaughtException Errors
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err}`);
  console.error("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// Set the port from environment or default to 4000
const port = process.env.PORT || 4000;

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Handling Unhandled Rejection Errors
process.on("UnhandledRejection", (err) => {
  console.error(`Error: ${err}`);
  console.error("Shutting down the server due to unhandled promise rejection");
  process.exit(1);
});
