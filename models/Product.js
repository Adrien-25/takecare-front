// Import necessary libraries and modules from Mongoose
import mongoose, {model, Schema, models} from "mongoose";

// Create a new Mongoose Schema for the Product model
const ProductSchema = new Schema({
  reference: {type:Number, required:true},
  title: {type:String, required:true},
  description: String,
  marque: String,
  price: {type: Number, required: true},
  images: [{type:String}],
  category: {type:mongoose.Types.ObjectId, ref:'Category'},
  properties: {type:Object},
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);