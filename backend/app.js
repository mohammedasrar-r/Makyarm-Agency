const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io"); 
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const sanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const userRouter = require("./routes/user.routes");
const socketHandler = require("./socket/socket.js");
const { connect, shutdown } = require("./DB/db");

require("dotenv").config();

// Initialize express app and server
const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://makyarm-agency-w5rf.vercel.app", // Frontend URL
    credentials: true
  }
});

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  message: "Too many requests from this IP, please try again later"
});

// === MIDDLEWARE ===
app.use("/api", limiter);
app.use(helmet());
app.use((req, res, next) => {
  sanitize(req.body);
  sanitize(req.params);
  sanitize(req.query); // sanitize properties, not the object itself
  next();
}); // Sanitizes req.body, req.params, and req.query
app.use(hpp());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173","https://makyarmagenciespvt.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  allowedHeaders: [
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

// Middleware to inject io instance into req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API routes
app.use("/api/user", userRouter);

// Setup WebSocket handlers
socketHandler(io);

// Handle DB connection and start server
connect()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
