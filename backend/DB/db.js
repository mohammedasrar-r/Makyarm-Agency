const mongoose = require("mongoose");

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5000

class DatabaseConnection{
    constructor(){
        this.retryCount = 0
        this.isConnected = false
        mongoose.set("strictQuery",true)
        mongoose.connection.on("connected",()=>{
            console.log("MONGODB CONNECTED SUCCESSFULLY")
            this.isConnected = true
        })
        mongoose.connection.on("error",()=>{
            console.log("ERROR FOUND IN MONGODB")
            this.isConnected = false
        })
        mongoose.connection.on("connected",()=>{
            console.log("MONGODB DISCONNECTED SUCCESSFULLY")
            this.handleDisconnection()

        })
    }
    async connect(){
        if(!process.env.MONGO_URI){
            throw new Error("MONGO DB uri is not defined in env variable")
        }
        const conectionOption ={
            useNewUrlParser:true,
            useUnifiedTopology:true,
            maxPoolSize :10,
            serverSelectionTimeoutMS:5000,
            socketTimeoutMS:45000,
            family:4
        }
        await mongoose.connect(process.env.MONGO_URI,conectionOption);
        this.retryCount = 0 // Reset retry count on success      
    }
    async handleConnectionErro(){
        if(this.retryCount < MAX_RETRIES){
            this.retryCount++;
            console.log(`Retrying connection ... Attemp ${this.retryCount} of ${MAX_RETRIES}`)
            await new Promise(resolve =>setTimeout(()=>{
                resolve
            },RETRY_INTERVAL))
            return this.connect()
        }
        else{
            console.error(`Failed to connect to MongoDb after ${MAX_RETRIES} attempts`)
            process.exit(1)
        }
    }
    async handleDisconnection(){
        if(!this.isConnected){
            console.log("Attemption to reconnect to MongoDb...")
            this.connect()
        }
    }
    async handleAppTermination(){
        try{
            await mongoose.connection.close()
            console.log("MongoDb connection closed through app")
            process.exist(0)
        }
        catch(error){
            console.error("Error during database disconnection",error)
            process.exit(1)
        }
    }
    getConnectionStatus(){
        return{
            isConnected:this.isConnected,
            readyState:mongoose.connection.readyState,
            host:mongoose.connection.host,
            name:mongoose.connection.name

        }
    }
}

const dbConnection = new DatabaseConnection()
module.exports = dbConnection.connect.bind(dbConnection)
module.exports = dbConnection.getConnectionStatus.bind(dbConnection)