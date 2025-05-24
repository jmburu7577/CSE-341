const express = require('express');
const app = express();
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;

app
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/contacts', require('./routes/contacts'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port)
      .on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${port} is busy, trying ${port + 1}`);
          app.listen(port + 1);
        } else {
          console.error(err);
        }
      })
      .on('listening', () => {
        console.log(`Connected to DB and listening on ${port}`);
      });
  }
});