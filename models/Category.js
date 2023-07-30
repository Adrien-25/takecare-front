// Import necessary libraries and modules from Mongoose
import mongoose, {model, models, Schema} from "mongoose";

// Create a new Mongoose Schema for the Category model
const CategorySchema = new Schema({
  // Define the "name" field as a required string
  name: {type:String,required:true},
  
  // Define the "parent" field as a reference to another Category model object
  parent: {type:mongoose.Types.ObjectId, ref:'Category'},
  
  // Define the "properties" field as an array of objects
  properties: [{type:Object}]
});

export const Category = models?.Category || model('Category', CategorySchema);