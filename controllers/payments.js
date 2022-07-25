require('dotenv').config();

const ObjectId = require('mongodb').ObjectId;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/order');
const Products = require('../models/product');

// @desc    POST a payment
const createPayment = async (req, res) => {

    try {
        const { userId, address, order } = req.body;
        const {
            phone, house_name: houseName, street, city, state, zip,
        } = address;

        const customer = await stripe.customers.create({
            phone,
            address: {
                city,
                line1: houseName,
                line2: street,
                postal_code: zip,
                state: state
            },
            metadata: { 
                id: userId,
                cart: JSON.stringify(order.map(item => {
                   return {
                    _id: item._id,
                    quantity: item.quantity,
                }
                })),
            }
        });

        const line_items = order.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image],
                        metadata: {
                            id: item._id,
                            type: item.type,
                            brand: item.brand,
                            color: item.color,
                            description: item.description,
                        },
                    },
                    unit_amount: item.discountPrice ? item.discountPrice * 100 : item.price * 100,
                },
                quantity: item.quantity,
            };
        }
        );

        const session = await stripe.checkout.sessions.create({
            line_items,
            customer: customer.id,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/order_receipt`,
            cancel_url: `${process.env.CLIENT_URL}/review_order`,
        });
        
        res.send({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message});
    }
}

// @desc    POST create an order
const createOrder = async (customer, data) => {
    const items = JSON.parse(customer.metadata.cart);
    const itemsIds = [];

    items.forEach(item => {
        itemsIds.push(ObjectId(item._id));
    });

    const orderedItems = await Products.find({
        "_id" : {
          "$in" : itemsIds
         }
    });
  
    const newOrder = new Order({
      userId: customer.metadata.id,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products: orderedItems.map((item, index) => {
          return {
            ...item,
            quantity: items[index].quantity,
          };
        }),
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: customer.address,
      payment_status: data.payment_status,
    });
  
    try {
      const savedOrder = await newOrder.save();
      console.log("Processed Order:", savedOrder);
    } catch (err) {
      console.log(err);
    }
  };


// @desc    POST a stripe event
const eventHook = (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event, data, eventType;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, process.env.ENDPOINT_SECRET);
//     console.log("Webhook verified: ",event);
//   } catch (err) {
//     console.log(`Webhook Error: ${err.message}`);
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   data = event.data.object;
//   eventType = event.type;
                              
    data = request.body.data.object;
    eventType = request.body.type;

  // Handle the event
    if (eventType === 'checkout.session.completed') {
        stripe.customers.retrieve(data.customer).then(customer => {
            createOrder(customer, data);
        }
        ).catch(err => {
            console.log(err);
        }
        );
    }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
};


module.exports = { createPayment, eventHook };