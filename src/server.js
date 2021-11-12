import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { badRequest, unAuthorized } from "./errorsHandler.js";
import { notFound, genericError } from "./errorsHandler.js";
import productsRouter from "./APIs/products/index.js";


const server = express();

// GLOBAL MIDDLEWARE
server.use(cors());
server.use(express.json());

// ROUTES
server.use('/products', productsRouter)


// ERROR-HANDLING MIDDLEWARE
server.use(badRequest);
server.use(unAuthorized);
server.use(notFound);
server.use(genericError);


const { PORT, MONGO_CONNECTION } = process.env;


mongoose.connect(MONGO_CONNECTION); // NEED ONE MONGO DB CONNECTION FROM SOMEONE.
mongoose.connection.on('connected', () => {
  console.log('We are live boys 🟡 🟢')
server.listen(PORT, () => {
    console.table(listEndpoints(server));
    console.log("Server is running on port:", PORT);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});