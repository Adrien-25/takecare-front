// Import necessary libraries and modules from Mongoose
import {model, models, Schema} from "mongoose";

// Create a new Mongoose Schema for the Order model
const OrderSchema = new Schema({
  line_items:Object,
  name:String,
  email:String,
  city:String,
  postalCode:String,
  streetAddress:String,
  country:String,
  paid:Boolean,
}, {
  timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);