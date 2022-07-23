require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    POST a payment
const createPayment = async (req, res) => {

    try {
        const { userId, address, order } = req.body;
        const {
            username, phone, house_name: houseName, street, city, state, zip,
        } = address;

        const customer = await stripe.customers.create({
            name: username,
            phone,
            address: {
                city,
                line1: houseName,
                line2: street,
                postal_code: zip,
                state: state
            },
            currency: 'usd',
            metadata: { 
                id: userId,
                cart: JSON.stringify(order.map(item => {
                   return {
                    _id: item._id,
                    type: item.type,
                    name: item.name,
                    brand: item.brand,
                    color: item.color,
                    description: item.description,
                    price: item.price,
                    discountPrice: item.discountPrice,
                    quantity: item.quantity,
                    image: item.image,
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
        res.status(404).json({ message: error.message});
    }
}

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
            console.log(customer);
            console.log("data: ", data);
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