require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mqtt = require("mqtt");
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

const options = {
  port: 1883,
  host: "mqtt-dashboard.com",
  clientId: "clientId-gAe5UTm3Ou",
  // username: 'thuy',
  // password: '123456',
};
const client = mqtt.connect(options);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Gửi dữ liệu từ backend sang frontend
  socket.emit("messageFromBackend", "Hello from backend!");

  // Xử lý sự kiện khi máy khách ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

client.on("connect", () => {
  console.log("MQTT connected!!");
});
const sensors = "sensorData1234";

client.subscribe(sensors, () => {
  // client.on("message", (topic, message) => {
  //   console.log(message.toString());
  // });
});

client.on("error", function (error) {
  console.log(error);
});

client.on("message", function (topic, message) {
  console.log(`Received message: 
  topic: ${topic} 
  data: ${message.toString()}`);
  io.sockets.emit("updateSensor", message.toString().split(" "));
});

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to Database"));

app.use(express.json());
app.use(cors());

const productRouter = require("./routes/warehouse");
const historyRouter = require("./routes/history");

app.use("/warehouse/product", productRouter);
app.use("/warehouse/history", historyRouter);

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
