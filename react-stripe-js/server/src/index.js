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

// app.get("/", (req, res) => {
//   res.status(200).send("Hello Stripe");
// });

// app.get("/success", (req, res) => {
//   res.status(200).send("Transaction Completed");
// });

app.post("/", async (req, res) => {
  if (req.method === "GET") {
    const invoice = await stripe.invoices.create({
      customer: 'cus_N4Ws92wsGKTl8O',
      price: 1,
      currency: 'usd',
      description: 'Payment for services rendered',
      due_date: '2022-12-31',
    });

    const sendInvoice = await stripe.invoices.sendInvoice(invoice.id);

    res.status(200).send(sendInvoice);
  }
});

app.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);
