// Fermentation Rulebook
// Duration in hours, temperature in Celsius
// Steps include: { step, offsetHours, description }

const rules = {
  "milk-kefir": {
    name: "Milk Kefir",
    getDurationHours(T) {
      if (8 <= T && T < 20) {
        return -2 * T + 64;
      } else if (20 <= T && T < 30) {
        return -1 * T + 44;
      } else {
        return null;
      }
    },
    minTemp: 8,
    maxTemp: 30,
    steps: [
      { step: "Abfüllen", offsetHours: 0, description: "Place kefir grains in jar, add room-temperature milk" },
      { step: "Fermentation", offsetHours: null, description: "Fermentation in progress" },
      { step: "Check", offsetHours: 12, description: "Gently check if milk has thickened" },
      { step: "Fertig", offsetHours: null, description: "Kefir is ready! Store in fridge, consume within 3-5 days" },
    ],
    checkIntervalHours: 12,
  },

  "buttermilk": {
    name: "Buttermilk",
    getDurationHours(T) {
      if (T < 20) {
        return -1.2 * T + 60;
      } else if (20 <= T && T <= 27) {
        return -1.2 * T + 54;
      } else {
        return null;
      }
    },
    minTemp: -Infinity,
    maxTemp: 27,
    steps: [
      { step: "Abfüllen", offsetHours: 0, description: "Add 2 tbsp store-bought buttermilk or culture to room-temperature milk" },
      { step: "Fermentation", offsetHours: null, description: "Fermentation in progress" },
      { step: "Check", offsetHours: 12, description: "Should be thick and tangy. Shake gently to mix" },
      { step: "Fertig", offsetHours: null, description: "Chill before drinking. Keeps 1-2 weeks refrigerated" },
    ],
    checkIntervalHours: 6,
  },

  "water-kefir": {
    name: "Water Kefir",
    getDurationHours(T) {
      if (T < 20) {
        return 48;
      } else if (20 <= T && T < 26) {
        return -1.2 * T + 72;
      } else if (26 <= T && T <= 28) {
        return -2 * T + 80;
      } else {
        return null;
      }
    },
    minTemp: -Infinity,
    maxTemp: 28,
    steps: [
      { step: "Abfüllen", offsetHours: 0, description: "Dissolve sugar in water, add kefir grains and optional dried fruit" },
      { step: "1. Fermentation", offsetHours: null, description: "First fermentation in progress" },
      { step: "Check", offsetHours: 12, description: "Check for bubbles and slight fizz" },
      { step: "optional 2. Fermentation", offsetHours: null, description: "Add fruit/juice if desired, let ferment at room temp" },
      { step: "Check", offsetHours: 36, description: "Check fizz level" },
      { step: "Fertig", offsetHours: null, description: "Refrigerate and enjoy! Consume within 1 week" },
    ],
    checkIntervalHours: 12,
    f2OffsetHours: 12,
  },

  "kombucha": {
    name: "Kombucha",
    getDurationHours(T) {
      if (18 <= T && T < 21) {
        return (-1.75 * T + 50) * 24;
      } else if (21 <= T && T < 25) {
        return (-1 * T + 35) * 24;
      } else if (25 <= T && T <= 30) {
        return (-0.4 * T + 15) * 24;
      } else {
        return null;
      }
    },
    minTemp: 18,
    maxTemp: 30,
    steps: [
      { step: "Abfüllen", offsetHours: 0, description: "Brew tea, add sugar, let cool to room temperature" },
      { step: "1. Fermentation", offsetHours: null, description: "First fermentation with SCOBY" },
      { step: "Check", offsetHours: 72, description: "Taste test - should be mildly tart, not too sweet" },
      { step: "optional 2. Fermentation", offsetHours: 24, description: "Bottle with juice/fruit for second fermentation" },
      { step: "Check", offsetHours: 48, description: "Check fizz level" },
      { step: "Fertig", offsetHours: null, description: "Refrigerate and enjoy! Burp bottles daily if needed" },
    ],
    checkIntervalHours: 48,
    f2OffsetHours: 24,
  },

  "kimchi": {
    name: "Kimchi",
    getDurationHours(T) {
      if (15 <= T && T < 18) {
        return (-1 * T + 22) * 24;
      } else if (18 <= T && T < 22) {
        return (-1 * T + 20) * 24;
      } else if (22 <= T && T < 25) {
        return (-0.5 * T + 13) * 24;
      } else if (25 <= T && T <= 30) {
        return 0.5 * 24; // ~12-24h
      } else {
        return null;
      }
    },
    minTemp: 15,
    maxTemp: 30,
    steps: [
      { step: "Abfüllen", offsetHours: 0, description: "Salt Napa cabbage and radish, let sit 2 hours to draw out water" },
      { step: "Initialfermentation bei Raumtemperatur", offsetHours: 24, description: "Leave at room temp 2-4 days, burp jar daily" },
      { step: "Check", offsetHours: 48, description: "Check fermentation progress" },
      { step: "Fermentation im Kühlschrank", offsetHours: null, description: "Transfer to fridge for slow fermentation" },
      { step: "Check", offsetHours: 168, description: "Weekly check in fridge" },
      { step: "Fertig", offsetHours: null, description: "Transfer to fridge. Flavor improves for 1-2 weeks" },
    ],
    checkIntervalHours: 24,
  },

  "pickled-vegetables": {
    name: "Pickled Vegetables",
    getDurationHours(T) {
      if (15 <= T && T < 18) {
        return (-0.8 * T + 26) * 24;
      } else if (18 <= T && T < 22) {
        return (-1 * T + 28) * 24;
      } else if (22 <= T && T < 25) {
        return (-1 * T + 25) * 24;
      } else if (T > 25) {
        return (-1 * T + 30) * 24;
      } else {
        return null;
      }
    },
    minTemp: 15,
    maxTemp: Infinity,
    steps: [
      { step: "Abfüllen", offsetHours: 0, description: "Mix 2-3% salt by weight in water, pack vegetables tightly in jar" },
      { step: "Fermentation", offsetHours: null, description: "Fermentation in progress" },
      { step: "Check", offsetHours: 24, description: "Check that vegetables stay submerged, skim any surface mold" },
      { step: "Fertig", offsetHours: null, description: "Transfer to fridge. Keeps 2-3 months refrigerated" },
    ],
    checkIntervalHours: 24,
  },

  "sauerkraut": {
    name: "Sauerkraut",
    getDurationHours(T) {
      if (15 <= T && T < 18) {
        return (-0.8 * T + 16) * 24;
      } else if (18 <= T && T < 22) {
        return (-1 * T + 22) * 24;
      } else if (22 <= T && T < 25) {
        return (-1.5 * T + 40) * 24;
      } else if (25 <= T && T <= 28) {
        return (-1 * T + 31) * 24;
      } else {
        return null;
      }
    },
    minTemp: 15,
    maxTemp: 28,
    steps: [
      { step: "Abfüllen", offsetHours: 0, description: "Shred cabbage, add 2% salt by weight, pack tightly in jar" },
      { step: "Fermentation", offsetHours: null, description: "Fermentation in progress at room temperature" },
      { step: "Check", offsetHours: 168, description: "Weekly check - ensure cabbage stays submerged" },
      { step: "Fertig", offsetHours: null, description: "Transfer to fridge. Will keep for months refrigerated" },
    ],
    checkIntervalHours: 168, // weekly
  },

  "sourdough-starter": {
    name: "Sourdough Starter",
    getDurationHours(T) {
      if (18 <= T && T < 21) {
        return -1 * T + 32;
      } else if (21 <= T && T < 24) {
        return -0.75 * T + 24;
      } else if (24 <= T && T <= 28) {
        return -0.5 * T + 18;
      } else {
        return null;
      }
    },
    minTemp: 18,
    maxTemp: 28,
    steps: [
      { step: "Abfüllen", offsetHours: 0, description: "Mix equal parts flour and water (50g each), stir well" },
      { step: "Fermentation", offsetHours: null, description: "Fermentation in progress" },
      { step: "Check", offsetHours: 24, description: "Look for bubbles and rise - sign of active fermentation" },
      { step: "Fertig", offsetHours: null, description: "Starter should double in size after feeding. Ready to use or refrigerate" },
    ],
    checkIntervalHours: 24,
  },

  "sourdough-bulk": {
    name: "Sourdough Bulk",
    getDurationHours(T) {
      if (T < 18) {
        return 16;
      } else if (18 <= T && T < 21) {
        return -1.5 * T + 35;
      } else if (21 <= T && T < 24) {
        return -1 * T + 30;
      } else if (24 <= T && T < 28) {
        return -0.8 * T + 25;
      } else if (28 <= T && T <= 30) {
        return -0.5 * T + 18;
      } else {
        return null;
      }
    },
    minTemp: -Infinity,
    maxTemp: 30,
    steps: [
      { step: "Abfüllen", offsetHours: 0, description: "Mix flour, water, and active starter" },
      { step: "Fermentation", offsetHours: null, description: "Bulk fermentation in progress" },
      { step: "Check", offsetHours: 4, description: "Perform coil folds or stretch and fold" },
      { step: "Fertig", offsetHours: null, description: "Dough should be puffy and jiggly. Shape and proof" },
    ],
    checkIntervalHours: 12,
  },
};

// Helper: get duration based on temperature using rule's function or tempRanges
function getDurationForTemp(rule, temperature) {
  // New method: use getDurationHours function
  if (rule.getDurationHours) {
    const duration = rule.getDurationHours(temperature);
    if (duration !== null) return duration;
    // Fallback: clamp to valid temp range and recalculate
    const clampedTemp = Math.max(rule.minTemp || -Infinity, Math.min(temperature, rule.maxTemp || Infinity));
    return rule.getDurationHours(clampedTemp);
  }
  // Legacy method: use tempRanges (for rules like yogurt without getDurationHours)
  if (rule.tempRanges) {
    for (const range of rule.tempRanges) {
      if (temperature >= range.min && temperature <= range.max) {
        return range.durationHours;
      }
    }
    // Fallback: find closest range
    const diffs = rule.tempRanges.map((r) => ({
      range: r,
      diff: Math.min(Math.abs(temperature - r.min), Math.abs(temperature - r.max)),
    }));
    diffs.sort((a, b) => a.diff - b.diff);
    return diffs[0].range.durationHours;
  }
  return null;
}

// Generate full plan
function generatePlan(typeKey, temperature, startTime = new Date()) {
  const rule = rules[typeKey];
  if (!rule) return null;

  const durationHours = getDurationForTemp(rule, temperature);
  const endTime = new Date(startTime.getTime() + durationHours * 60 * 60 * 1000);

  const steps = [];
  let hasSecondFermentation = false;

  // First pass: check if there's a second fermentation step
  rule.steps.forEach((s) => {
    if (s.step === "optional 2. Fermentation" || s.step === "Fermentation im Kühlschrank") {
      hasSecondFermentation = true;
    }
  });

  rule.steps.forEach((s, i) => {
    let offset = s.offsetHours;
    if (offset === null) {
      // Dynamic step - set based on context
      if (s.step === "Fermentation" || s.step === "1. Fermentation") {
        // Main fermentation ends at durationHours
        offset = durationHours;
      } else if (s.step === "Initialfermentation bei Raumtemperatur") {
        // Kimchi: first room temp fermentation, then fridge
        offset = durationHours / 2; // Split time between room temp and fridge
      } else if (s.step === "Fermentation im Kühlschrank") {
        // Kimchi: second fermentation in fridge
        offset = durationHours;
      } else if (s.step === "optional 2. Fermentation") {
        // Second fermentation starts after main fermentation
        offset = durationHours;
      } else if (s.step === "Fertig") {
        // End of entire process
        if (hasSecondFermentation) {
          offset = durationHours + (rule.f2OffsetHours || 24);
        } else {
          offset = durationHours;
        }
      }
    }

    if (offset !== null) {
      const dueDate = new Date(startTime.getTime() + offset * 60 * 60 * 1000);
      steps.push({
        step: s.step,
        dueDate: dueDate.toISOString(),
        description: s.description,
        isDynamic: s.offsetHours === null,
      });
    }
  });

  // Add check events (only up to main fermentation end, not including second fermentation)
  const checks = [];
  const checkInterval = rule.checkIntervalHours || 48;
  let checkTime = startTime.getTime() + checkInterval * 60 * 60 * 1000;
  const endMs = durationHours * 60 * 60 * 1000;

  while (checkTime < startTime.getTime() + endMs) {
    checks.push({
      step: "Check fermentation",
      dueDate: new Date(checkTime).toISOString(),
      description: `Routine check - taste, smell, observe bubbles/texture`,
      isCheck: true,
    });
    checkTime += checkInterval * 60 * 60 * 1000;
  }

  const allEvents = [...steps, ...checks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return {
    type: rule.name,
    typeKey,
    temperature,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    durationHours,
    events: allEvents,
  };
}

module.exports = { rules, generatePlan };
