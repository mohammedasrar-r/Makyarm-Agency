const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io"); 
const rateLimit = require("express-rate-limit");
const helmet = require("helmet")
const mongoSantizer = require("express-mongo-sanitize")
const hpp = require("hpp");
const userRouter = require("./routes/user.routes");
const notification = require("./routes/notification.routes");
const  socketHandler = require('./socket/socket.js');
const dbConnection = require("./DB/db");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const limiter = rateLimit({
    windowsMs: 15 * 60 * 1000, // 15 minutes
    limit : 100,
    message :"Too many request from this "
})

const io = new Server(server, { cors: { origin: '*' } });

dbConnection()
app.use("/api", limiter);
app.use(helmet());
app.use(mongoSantizer())
app.use(hpp())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
    methods:["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    allowedHeaders :[
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Origin",
        "X-Requested-With",
        "device-remember-token",
        "Origin",
        "Accept"
    ]
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to inject io
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/notification", notification);

socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
