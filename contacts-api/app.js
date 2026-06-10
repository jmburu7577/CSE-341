const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const mongodb = require('./db/connection');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 3000;


app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/', (req, res) => {
    res.json({
      message: 'Contacts API is running!',
      endpoints: {
        allContacts: 'GET /contacts',
        singleContact: 'GET /contacts/:id',
        apiDocs: 'GET /api-docs'
      }
    });
  })
  .use('/contacts', require('./routes/contacts'));



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
    return;
  }
  app.listen(port, () => {
    console.log(`Connected to DB and listening on ${port}`);
  });
});


