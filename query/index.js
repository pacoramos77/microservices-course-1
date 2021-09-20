const express = require("express");
const cors = require("cors");

const PORT = 4002;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const posts = {};
/* QUICK EXAMPLE
posts = {
  'post-1': {
    id: 'post-1',
    title: 'post title',
    comments: [
      { id: 'post1-comment1', content: 'comment!' }
    ]
  },
  'post-2': {
    id: 'post-2',
    title: 'post title',
    comments: [
      { id: 'post2-comment1', content: 'comment!' }
    ]
  }
}
*/
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data} = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type == 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];

    post.comments.push({ id, content });
  }

  console.log(posts);

});

app.listen(PORT, () => {
  console.log('Listening on ', PORT)
});