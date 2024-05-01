//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  const { name, comment } = req.body;
  comments.push({ name, comment });
  fs.writeFile('comments.json', JSON.stringify(comments), err => {
    if (err) {
      res.status(500).send('Unable to save comment');
    } else {
      res.status(201).send('Comment saved');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});