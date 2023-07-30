// Import necessary libraries and models
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Order} from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);

// Webhook handler function
export default async function handler(req,res) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }

  // Extract data from the request body
  const {
    name,email,city,
    postalCode,streetAddress,country,
    cartProducts,
  } = req.body;

  // Connect to the MongoDB database using Mongoose
  await mongooseConnect();

  // Get unique product IDs from the cartProducts array
  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];

  // Fetch product information based on the unique product IDs
  const productsInfos = await Product.find({_id:uniqueIds});

  // Create an array of line_items for the Stripe session
  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      // Add the product to the line_items array
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  // Create an order document in the database
  const orderDoc = await Order.create({
    line_items,name,email,city,postalCode,
    streetAddress,country,paid:false,
  });

  // Create a Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: {orderId:orderDoc._id.toString(),test:'ok'},
  });

  // Respond with the URL of the Stripe checkout session
  res.json({
    url:session.url,
  })

}