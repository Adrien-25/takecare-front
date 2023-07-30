// Import necessary libraries and models
import {mongooseConnect} from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import {Order} from "@/models/Order";

// Stripe webhook endpoint secret
const endpointSecret = "whsec_634d3142fd2755bd61adaef74ce0504bd2044848c8aac301ffdb56339a0ca78d";

// Webhook handler function
export default async function handler(req,res) {
  // Connect to the MongoDB database using Mongoose
  await mongooseConnect();

  // Extract the Stripe signature from the request headers
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Construct the Stripe event using the request buffer and the endpoint secret
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    // If there's an error in the Stripe event, send a 400 error response
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      // When a checkout session is completed, update the corresponding order in the database
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        // Update the order's "paid" status to true
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Respond with a 200 status to confirm successful processing of the webhook event
  res.status(200).send('ok');
}

// Configurations for the API route
export const config = {
  api: {bodyParser:false,}
};

// bright-thrift-cajole-lean
// acct_1Lj5ADIUXXMmgk2a