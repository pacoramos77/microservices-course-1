const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const PORT = 4000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  console.log(`GET /posts`, req.body);
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  console.log(`POST /posts`, req.body);
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

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
  console.log(`POST /events`, req.body);
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} (Posts service)`);
});
