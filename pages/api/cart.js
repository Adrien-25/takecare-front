// Import necessary libraries and models
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";

// Request handler function
export default async function handle(req,res) {
  // Connect to the MongoDB database using Mongoose
  await mongooseConnect();

  // Fetch products based on the provided IDs
  const ids = req.body.ids;

  // Respond with the array of products as a JSON response
  res.json(await Product.find({_id:ids}));
}