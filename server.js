require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to Database"));

app.use(express.json());
app.use(cors());

const productRouter = require("./routes/warehouse");
const historyRouter = require("./routes/history")

app.use("/warehouse/product", productRouter);
app.use("/warehouse/history", historyRouter);


app.listen(5000, () => console.log("Server Started"));
