require("dotenv").config();
import * as Mongoose from "mongoose";

let database: Mongoose.Connection;

export const connect = () => {
  if (database) {
    return;
  }

  const username = process.env.MONGO_USER;
  const password = process.env.MONGO_PASSWORD;
  const cluster = process.env.MONGO_CLUSTER;
  const dbname = process.env.MONGO_DB_NAME;

  Mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );

  //   Mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  //     dbName: process.env.MONGO_DB_NAME,
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     serverSelectionTimeoutMS: 5000,
  //   });

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
