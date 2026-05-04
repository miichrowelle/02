const functions = require('firebase-functions');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initFirebase } = require('./firebase-db');
const fermentationRoutes = require('./routes/fermentation');
const icsRoutes = require('./routes/ics');

// Initialize Firebase
initFirebase();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/fermentation', fermentationRoutes);
app.use('/api/fermentation', icsRoutes);

// Serve static files from React build in production
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

exports.api = functions.https.onRequest(app);

exports.api = functions.https.onRequest(app);
