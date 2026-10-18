const express = require('express');
require('dotenv').config();

const app = express();

// Parse incoming JSON request bodies so they are available through req.body.
app.use(express.json());

// Optional middleware mentioned in the lecture: log each incoming request.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Route 1: Home route.
app.get('/', (req, res) => {
  res.send('Week 2 API');
});

// Route 2: Accept a user's name and email, then greet the user.
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (
    typeof name !== 'string' || name.trim() === '' ||
    typeof email !== 'string' || email.trim() === ''
  ) {
    return res.status(400).send('Name and email must be filled');
  }

  return res.send(`Hello ${name.trim()}`);
});

// Route 3: Return a profile message containing the requested ID.
app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// Handle malformed JSON request bodies with a 400 Bad Request response.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send('Invalid JSON request body');
  }

  console.error(err);
  return res.status(500).send('Internal server error');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Week 2 API running at http://localhost:${PORT}`);
});
