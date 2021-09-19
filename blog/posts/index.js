const express = require("express");
// const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const PORT = 4000;

const app = express();
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  console.log(id, posts[id]);

  await axios
    .post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => console.log(err.message));

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received event", req.body.type);
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
