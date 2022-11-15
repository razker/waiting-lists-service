require("dotenv").config();
import * as Mongoose from "mongoose";

let database: Mongoose.Connection;

export const connect = () => {
  const uri =
    "mongodb+srv://razker:GRZvNgrQPShsEWLU@cluster0.vmmyehk.mongodb.net/?retryWrites=true&w=majority";
  console.log(
    "db.config | connect | process.env.MONGO_URL :::",
    process.env.MONGO_CONNECTION_STRING
  );

  if (database) {
    return;
  }

  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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
