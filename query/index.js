const express = require("express");
const cors = require("cors");

const PORT = 4002;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const posts = {};


app.get('/posts', (req, res) => {
  console.log(`GET /posts`, req.body);
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log(`POST /events`, req.body);
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type == 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => comment.id === id);

    comment.status = status;
    comment.conent = content;
  }
});

app.listen(PORT, () => {
  console.log('Listening on ', PORT, '(Query service)')
});
