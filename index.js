const connectToMongo = require('./db');
const express=require("express");
connectToMongo();
let cors= require("cors");

const app=express();

const path = require('path');

const shortid = require('shortid');

const razorpay = require('razorpay');

const port=process.env.PORT || 8000;

//initialize razorpay credentials

const razorpay =  new razorpay({
    key_id: "rzp_test_ATIDqpJJTUeTEw",
    key_secret:"Atf2j4yxFH1kmNqenFwGwp2w"

})

app.use(express.json())
app.use(cors());
app.get('/',(req,res)=>{
    res.send("hello world");  
})

app.get('/logo.jpg',(req,res)=>{
    res.sendFile(path.join(__dirname,"logo.jpg"))
})

app.post('/razorpay', async (req,res)=>{
    const payment_capture = 1
    const amount = 499
    const currency = 'INR'

    const options = {
        amount : amount*100,
        currency:currency,
        receipt:shortid_generate(),
        payment_capture

    }

    try{
        const response = await razorpay.orders.create('options')
    } catch(error){
        console.log('error')
    }
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/order', require('./routes/order'))

app.listen(port,()=>{
    console.log(`Trendy Tone the application is started succesfully on ${port}`);
})