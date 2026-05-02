const express = require('express');
const icalPkg = require('ical-generator');
const ICalCalendar = icalPkg.default || icalPkg;
const { getFermentation } = require('../db');

const router = express.Router();

router.get('/:id/ics', (req, res) => {
  const fermentation = getFermentation(req.params.id);

  if (!fermentation) {
    return res.status(404).send('Fermentation not found');
  }

  const cal = new ICalCalendar({
    name: `Fermentation: ${fermentation.plan.type}`,
    description: `Fermentation schedule for ${fermentation.plan.type} at ${fermentation.temperature}°C`,
  });

  const events = fermentation.plan.events || [];

  events.forEach((event) => {
    const startDate = new Date(event.dueDate);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 min duration

    cal.createEvent({
      start: startDate,
      end: endDate,
      summary: `[${fermentation.plan.type}] ${event.step}`,
      description: event.description || '',
      location: 'Fermentation location',
    });
  });

  // Add fermentation start event
  cal.createEvent({
    start: new Date(fermentation.startTime),
    end: new Date(new Date(fermentation.startTime).getTime() + 30 * 60 * 1000),
    summary: `[${fermentation.plan.type}] Fermentation Started`,
    description: `Started ${fermentation.plan.type} at ${fermentation.temperature}°C`,
  });

  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', `inline; filename="fermentation-${req.params.id}.ics"`);
  res.send(cal.toString());
});

module.exports = router;
