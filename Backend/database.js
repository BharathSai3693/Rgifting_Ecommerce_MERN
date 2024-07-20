require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_ATLAS_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let dbInstance;

async function connectToDatabase() {
  if (!dbInstance) {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      dbInstance = client.db("Rgiftingz"); // Replace with your database name
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
  return dbInstance;
}

module.exports = { connectToDatabase };
