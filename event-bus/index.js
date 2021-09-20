const express = require("express");
const axios = require("axios");

const PORT = 4005;

const URL_POSTS = "http://localhost:4000";
const URL_COMMENTS = "http://localhost:4001";
const URL_QUERY_SERVICE = "http://localhost:4002";
const URL_MODERATION_SERVICE = "http://localhost:4003";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  console.log("POST /events", req.body);
  const event = req.body;
  events.push(event);

  await Promise.all([
    sendEvent(URL_POSTS, event),
    sendEvent(URL_COMMENTS, event),
    sendEvent(URL_QUERY_SERVICE, event),
    sendEvent(URL_MODERATION_SERVICE, event),
  ]);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  console.log("GET /events", req.body);
  res.send(events);
})

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}, (Event-bus service)`);
});


function sendEvent(baseUrl, event) {
  const url = `${baseUrl}/events`;

  console.log("sendEvent", url);

  return axios
    .post(url, event)
    .catch((err) => {
      console.error('ERROR', url, err.message);
    });
}