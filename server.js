const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

// ✅ Step 1: Webhook verification
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "roshanleatherverify"; // change if you want
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Step 2: Handle incoming messages from WhatsApp
app.post("/webhook", (req, res) => {
  const body = req.body;
  console.log("📩 Incoming Message:", JSON.stringify(body, null, 2));

  if (body.object && body.entry && body.entry[0].changes[0].value.messages) {
    const message = body.entry[0].changes[0].value.messages[0];
    const from = message.from;
    const text = message.text?.body;
    console.log(`💬 Message from ${from}: ${text}`);
  }

  res.sendStatus(200);
});

app.listen(3000, () => console.log("🚀 Webhook running on port 3000"));
