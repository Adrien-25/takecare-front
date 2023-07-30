// Import the Mongoose library
import mongoose from "mongoose";

// Function to connect to the MongoDB database
export function mongooseConnect() {
  // Check if the Mongoose connection is already open (readyState === 1)
  if (mongoose.connection.readyState === 1) {
    // This prevents opening multiple connections to the same database
    return mongoose.connection.asPromise();
  } else {
    // Get the MongoDB URI from the environment variable 'MONGODB_URI'
    const uri = process.env.MONGODB_URI;

    // Connect to the MongoDB database using the 'mongoose.connect' function
    return mongoose.connect(uri);
  }
}