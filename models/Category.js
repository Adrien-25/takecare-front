// Import necessary libraries and modules from Mongoose
import mongoose, { model, models, Schema } from "mongoose";

// Create a new Mongoose Schema for the Category model
const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Category" },
  properties: [{ type: Object }],
});

export const Category = models?.Category || model("Category", CategorySchema);
