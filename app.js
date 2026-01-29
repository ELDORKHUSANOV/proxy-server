// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/apiRoutes');
const downloadRoutes = require('./routes/downloadRoutes');

const app = express();

// ===== Middlewares =====
app.use(cors());
app.use(bodyParser.json());

// Cache ni o‘chirish
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// ===== Routes =====
app.use('/api', apiRoutes);
app.use('/download', downloadRoutes); // /download/mib, /download/ishonchnoma

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
