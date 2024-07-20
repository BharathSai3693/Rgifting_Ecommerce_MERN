require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3');



const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Initialize AWS S3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
  });
global.s3Client = s3Client;


// Middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000',}));

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.use('/users', require('./routes/users'));
app.use('/admin', require('./routes/admins'));



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
