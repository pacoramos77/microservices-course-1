const express = require("express");
const axios = require("axios");

const PORT = 4003;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  console.log('POST /events', req.body)

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected': 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        ...data,
        status,
      }
    }).catch(console.error);

  }


});

app.listen(PORT, () => {
  console.log('Listening on ', PORT, '(Moderation service)');
});
