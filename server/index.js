const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  ""
);
const app = express();
const port = 5000;

const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send({ message: "Server up and Kicking" });
});
app.post("/payment/intent", async (req, res) => {
  console.log(req.body.price);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.price * 100,
            currency: 'INR',
            automatic_payment_methods: {
              enabled: true,
            },
            payment_method: 'pm_card_in',

          });
        
          res.json({paymentIntent : paymentIntent.client_secret});
        
    } catch (error) {
        res.json({error});

    }
   


});
app.listen(5000, () => {
  console.log("server started at port 5000");
});
