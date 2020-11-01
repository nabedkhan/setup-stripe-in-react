const express = require('express');
const app = express();
const cors = require('cors');
const { resolve } = require('path');
const stripe = require("stripe")("sk_test_51HZfVUG2WLv5mNzKVSckiSyhVvshPpyPBXWZdZR49QU0RnlA6f8dNsfYLvarlnA7S2tUoTQ4BLfwzfyagVlgF7MD00tevrzd2z");

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.get('/', (req, res) => {
    res.send('Integrate Stripe Payment Method');
})

// const calculateOrderAmount = items => {
//     return 1400;
// }

app.post('/create-payment-intent', async (req, res) => {
    const items = req.body;
    console.log(items);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: items.price * 100,
        currency: 'usd'
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    })
})

app.listen(5000, () => console.log('Loading server port is 5000'));