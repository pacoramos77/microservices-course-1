const express = require("express");
const axios = require("axios");

const PORT = 4005;

const URL_POSTS = "http://localhost:4000";
const URL_COMMENTS = "http://localhost:4001";
const URL_QUERY_SERVICE = "http://localhost:4002";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios
    .post(`${URL_POSTS}/events`, event)
    .then(() => {
      console.log(`${URL_POSTS}/events OK`);
    })
    .catch((err) => {
      console.log(`${URL_POSTS}/events`, err.message);
    });
  axios
    .post(`${URL_COMMENTS}/events`, event)
    .then(() => {
      console.log(`${URL_COMMENTS}/events OK`);
    })
    .catch((err) => {
      console.log(`${URL_COMMENTS}/events`, err.message);
    });
  axios
    .post(`${URL_QUERY_SERVICE}/events`, event)
    .then(() => {
      console.log(`${URL_QUERY_SERVICE}/events OK`);
    })
    .catch((err) => {
      console.log(`${URL_QUERY_SERVICE}/events`, err.message);
    });
  res.send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Listining port ${PORT}`);
});
