const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const stripe = new Stripe(
  "sk_test_51KwwPXCfQa2WnrXMnYwTX7CcOMjWLwE0AQgaik5J7EgjUufOOTW2yEt1tqUgbafDxBiphK4W9Z7zeqccEQjlc7Gb00NWYreXPl",
  {
    apiVersion: "2022-08-01",
  }
);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello Stripe");
});

app.get("/success", (req, res) => {
  res.status(200).send("Transaction Completed");
});

app.post("/api/checkout_sessions", async (req, res) => {
  if (req.method === "POST") {
    const { title, price, image } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: price * 100,
            product_data: {
              name: title,
            },
          },
        },
      ],
      shipping_options: [{ shipping_rate: "shr_1Kx6gCCfQa2WnrXMXFOTCTVP" }],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      billing_address_collection: "auto",
      success_url: `http://localhost:5000/success`,
      cancel_url: `http://localhost:5000/`,
    });

    res.status(200).json({ id: session.id });
  }
});

app.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);
