const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const PORT = 4001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  console.log(`GET /posts/${req.params.id}/comments`, req.body);

  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  console.log(`POST /posts/${req.params.id}/comments`, req.body);
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: "pending",
      },
    })
    .catch(console.error);

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log(`POST /events`, req.body);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios
      .post("http://event-bus-srv:4005/events", {
        type: "CommentUpdated",
        data,
      })
      .catch(console.error);
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening port ${PORT} (Comments service)`);
});
