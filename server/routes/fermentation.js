const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { generatePlan } = require('../data/rules');
const { insertFermentation, getFermentation, updateFermentation } = require('../db');

const router = express.Router();

// Create new fermentation session
router.post('/', express.json(), (req, res) => {
  const { type, temperature } = req.body;

  if (!type || !temperature) {
    return res.status(400).json({ error: 'Missing type or temperature' });
  }

  const temp = parseFloat(temperature);
  if (isNaN(temp) || temp < 10 || temp > 40) {
    return res.status(400).json({ error: 'Temperature must be between 10°C and 40°C' });
  }

  const plan = generatePlan(type, temp, new Date());
  if (!plan) {
    return res.status(400).json({ error: 'Invalid fermentation type' });
  }

  const id = uuidv4();
  insertFermentation(id, type, temp, plan.startTime, plan);

  // Use the request's origin (works for both direct access and via Vite proxy)
  let baseUrl;
  if (req.headers['x-forwarded-host']) {
    const proto = req.headers['x-forwarded-proto'] || 'http';
    baseUrl = `${proto}://${req.headers['x-forwarded-host']}`;
  } else {
    baseUrl = process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
  }
  res.json({
    id,
    ...plan,
    icsUrl: `${baseUrl}/api/fermentation/${id}/ics`,
  });
});

// Get fermentation details
router.get('/:id', (req, res) => {
  const fermentation = getFermentation(req.params.id);
  if (!fermentation) {
    return res.status(404).json({ error: 'Fermentation not found' });
  }
  const baseUrl = process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
  res.json({
    ...fermentation,
    icsUrl: `${baseUrl}/api/fermentation/${req.params.id}/ics`,
  });
});

// Update fermentation (e.g., change temperature or restart)
router.put('/:id', express.json(), (req, res) => {
  const fermentation = getFermentation(req.params.id);
  if (!fermentation) {
    return res.status(404).json({ error: 'Fermentation not found' });
  }

  const { temperature } = req.body;
  if (!temperature) {
    return res.status(400).json({ error: 'Missing temperature' });
  }

  const temp = parseFloat(temperature);
  const plan = generatePlan(fermentation.type, temp, new Date(fermentation.startTime));
  updateFermentation(req.params.id, plan);

  const baseUrl = process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
  res.json({
    id: req.params.id,
    ...plan,
    icsUrl: `${baseUrl}/api/fermentation/${req.params.id}/ics`,
  });
});

module.exports = router;
