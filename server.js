const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const PORT = 8001;
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "/") });
});

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", msg => {
    console.log("message: " + msg);

    io.emit("chat message", msg);
  });

  socket.on("congrats", args => {
    console.log(args);
  });
});

server.listen(PORT, () => {
  console.log("Escutando na porta " + PORT);
});
