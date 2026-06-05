require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db/conn');
const contactsRouter = require('./routes/contacts');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Static fallback data if MongoDB is not configured or no document found
const professionalData = {
    professionalName: 'James mburu',
    base64Image: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABfElEQVR4Xu3YwQ3CMBRA0cG2M6QBGaSFlCvYv2s/KlWVS7ScqKkQ1l+ZbB8X3e9vvl4e6VQIkSJEiRIkSeQn4LkfyB+Z55BQ+jB6IbOE3gG1Cj/m+n6eNOJcQAZ4lQgiJwi9GZ0x9kBC+dNHe+gI67iRlhOOOOLISbm4gGFltwxzOsTxs/4vW0eTCAfkGUgB1V4R0xj+zA+uUQDe2gqnLgG1QOW0DawxjwcwE4M642A3sG2wJbB+YkSxj9dXqZQDo4pYkMEZqsj7YoE/5p2fWp1HfyTeXIAbfD/FjaL2EYbo0csHjnpg6QwQbKEIv4Uw7pHQeKt7Km5E9qYpQ+oABxSIdJT7syxfH5YlW2u2tL0J/5+sMlN7J7v2XjjfIkSeX7Tf+7RIkSZFvkv0EGRNrdF4QFEeQAAAABJRU5ErkJggg==',
    nameLink: {
        firstName: 'James',
        url: 'https://resume-craft-shine.vercel.app/'
    },

    primaryDescription:
        ' is a Cloud Solutions Architect, Software Developer, and IT Infrastructure Specialist with over 7 years of experience delivering enterprise technology solutions.',

    workDescription1:
        'I specialize in cloud architecture, network administration, cybersecurity, digital transformation, and healthcare technology systems.',

    workDescription2:
        'My experience includes Microsoft Azure, Office 365 Administration, Active Directory, ERP implementations, telemedicine platforms, full-stack web development, and hospital information systems.',


    linkTitleText: 'Connect with me online:',

    linkedInLink: {
        text: 'LinkedIn',
        link: 'https://www.linkedin.com/in/james-mburu-maina/'
    },
    githubLink: {
        text: 'GitHub',
        link: 'https://github.com/jmburu7577'
    }
};

// Connect to MongoDB (used by routes)
db.connectToMongo()
    .then(() => console.log('DB connector initialized'))
    .catch((err) => console.error('DB init error', err.message));

// Example existing endpoint (keeps fallback behavior)
app.get('/professional', async (req, res) => {
    res.json(professionalData);
});

// Mount contacts routes
app.use('/contacts', contactsRouter);
app.use('/api/contacts', contactsRouter);

// Serve swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('Frontend API is running. Use GET /professional');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    const client = db.client();
    if (client) await client.close();
    process.exit(0);
});
