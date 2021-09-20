const express = require("express");
const cors = require("cors");
const axios = require("axios");

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

const handleEvent = (type, data) => {
  
  console.log(`handleEvent`, type, data);

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
};

app.post('/events', (req, res) => {
  console.log(`POST /events`);
  const { type, data } = req.body;

  handleEvent(type, data);
  res.send({});
});

app.listen(PORT, async () => {
  console.log('Listening on ', PORT, '(Query service)');

  try {
    const res = await axios.get("http://localhost:4005/events");
 
    for (let event of res.data) {
      console.log("Processing event:", event);
 
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
