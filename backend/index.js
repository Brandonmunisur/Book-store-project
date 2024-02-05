import express from "express";
import "dotenv/config";

import { PORT, mongoDBURL } from "./config.js";
import mongoose, { Mongoose } from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome To MERN STACK TUTORIAL");
});

app.post("/books", async (request, response) => {
  try {
    // Check for required fields
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Please send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const bookDocument = await Book.create(newBook); // Use a different variable name
    return response.status(201).send(bookDocument);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    const server = app
      .listen(PORT, () => {
        console.log(`Server running on port ${server.address().port}`);
      })
      .on("error", (error) => {
        if (error.code === "EADDRINUSE") {
          console.log(`Port ${PORT} is already in use, trying another port...`);
          const server = app.listen(0); // 0 means an arbitrary unused port
          console.log(`Server running on port ${server.address().port}`);
        } else {
          console.error("Error starting server:", error);
        }
      });
  })
  .catch((error) => {
    console.error(error);
  });
