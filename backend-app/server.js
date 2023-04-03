const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!!! shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");

const database = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD 
);

mongoose.set("strictQuery", true);

// Connect the database
mongoose
  .connect(database, {useNewUrlParser: true})
  .then((con) => {
    console.log("\x1b[33m","[ app ]","\x1b[0m","DB Connected Successfully!");
  }).catch((err) => {
    console.log("\x1b[33m","[ app ]","\x1b[0m","DB Connection Failed!"); 
  }); //Now all the errors of mongo will be handled by the catch block

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log("\x1b[33m","[ app ]","\x1b[0m","DB Default Connection Failed!");
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
console.log("\x1b[33m","[ app ]","\x1b[0m","DB Default Connection Disconnected!");
})

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("\x1b[33m","[ app ]","\x1b[0m","Running on port : ", "\x1b[32m",`${port}`, "\x1b[0m", '');
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!!  shutting down ...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
