const mongoose = require("mongoose");

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5000;

class DatabaseConnection {
  constructor() {
    this.retryCount = 0;
    this.isConnected = false;

    mongoose.set("strictQuery", true);

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
      this.isConnected = true;
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
      this.isConnected = false;
      this.handleConnectionError();
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
      this.isConnected = false;
      this.handleDisconnection();
    });
  }

  async connect() {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    try {
      await mongoose.connect(process.env.MONGO_URI, connectionOptions);
      this.retryCount = 0; // Reset retry count on success
    } catch (error) {
      console.error("Initial connection failed:", error.message);
      this.handleConnectionError();
    }
  }

  async handleConnectionError() {
    if (this.retryCount < MAX_RETRIES) {
      this.retryCount++;
      console.log(`🔁 Retrying MongoDB connection... Attempt ${this.retryCount} of ${MAX_RETRIES}`);
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      return this.connect();
    } else {
      console.error(`🚫 Failed to connect to MongoDB after ${MAX_RETRIES} attempts`);
      process.exit(1);
    }
  }

  async handleDisconnection() {
    if (!this.isConnected) {
      console.log("🔄 Attempting to reconnect to MongoDB...");
      this.connect();
    }
  }

  async handleAppTermination() {
    try {
      await mongoose.connection.close();
      console.log("🛑 MongoDB connection closed on app termination");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error during DB shutdown:", error);
      process.exit(1);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name
    };
  }
}

const dbConnection = new DatabaseConnection();

module.exports = {
  connect: dbConnection.connect.bind(dbConnection),
  getStatus: dbConnection.getConnectionStatus.bind(dbConnection),
  shutdown: dbConnection.handleAppTermination.bind(dbConnection)
};
