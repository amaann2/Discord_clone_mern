const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const socketServer = require("./socketServer");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const friendInvitationRoutes = require("./routes/friendInvitationRoutes");
const path = require("path");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));
// app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/friend-invitation", friendInvitationRoutes);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });
const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is Listening on port ${PORT}`);
      console.log("Database is Connected successfully");
    });
  })
  .catch((err) => {
    console.log("database connection failed. server not started");
    console.log(err);
  });
