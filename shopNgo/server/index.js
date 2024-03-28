import 'dontenv/config';
import express from 'express';
import * as paypal from './paypal-api.js'
// import AppProvider from '../src/front-end/shop-n-go/src/AppProvider';
import cors from 'cors';
const { PORT = 8888 } = process.env;

const app = express();

// app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.post("/my-server/create-paypal-order", async (req, res) => {
    try {
        const order = await paypal.createOrder(req.body);
        res.json(order);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/my-server/capture-paypal-order", async (req, res) => {
    const { orderId } = req.body;
    try {
        const captureData = await paypal.capturePayment(orderId);
        res.json(captureData);
    } catch (error) {
        res.status(500).send(error.message);
    }
})


app.listen(PORT, () => {
    console.log("Server listening at https://localhost:${PORT}/")
})