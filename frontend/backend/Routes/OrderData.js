const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        let newData = [{ Order_date: req.body.order_date }, ...data];

        await Order.findOneAndUpdate(
            { email: req.body.email },
            { $push: { order_data: newData } },
            { upsert: true, new: true }
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/myorderData', async (req, res)=> {
    try{
        let myData = await Order.findOne({ 'email': req.body.email})
        res.json({orderData:myData})
    }catch(error){
        res.status(500).json({ error: error.message });
    }
})
module.exports = router;
