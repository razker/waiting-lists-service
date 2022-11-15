require("dotenv").config();
import * as Mongoose from "mongoose";

let database: Mongoose.Connection;

export const connect = () => {
  console.log(
    "db.config | connect | process.env.MONGO_CONNECTION_STRING && MONGO_DB_NAME :::",
    process.env.MONGO_CONNECTION_STRING,
    process.env.MONGO_DB_NAME
  );

  if (database) {
    return;
  }

  Mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    dbName: process.env.MONGO_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  });

  database = Mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  Mongoose.disconnect();

  database.once("close", async () => {
    console.log("Diconnected  to database");
  });
};
