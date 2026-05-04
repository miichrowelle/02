# Fermentation Planner

A web application that helps you manage fermentation projects with time planning and calendar integration.

## Features

- **Temperature-Based Planning**: Select what you're fermenting and your room temperature to get a personalized timeline
- **9 Fermentation Types** across 4 categories:
  - **Dairy**: Milk Kefir, Buttermilk
  - **Beverages**: Water Kefir, Kombucha
  - **Vegetables**: Sauerkraut, Kimchi, Pickled Vegetables
  - **Grains**: Sourdough Starter, Sourdough Bulk
- **Dynamic Calendar Subscription**: Get a unique URL for each fermentation that generates a dynamic `.ics` file
- **Apple Design System**: Clean, native iOS-like interface
- **European Time Format**: 24-hour format with relative time displays

## Tech Stack

### Frontend
- **React 18** with Vite
- **Apple Design System** styling

### Backend
- **Node.js** with Express
- **Firebase Firestore** for data persistence
- **Firebase Functions** for API hosting
- **ical-generator** for dynamic `.ics` calendar feeds

### Deployment
- **Firebase App Hosting** (full-stack: frontend + backend)
- **Firebase Functions** (Node.js 20 runtime)

## Project Structure

```
fermentation-planner/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                    # Firebase Functions backend
│   ├── data/
│   │   └── rules.js             # Fermentation math (temp → duration)
│   ├── routes/
│   │   ├── fermentation.js
│   │   └── ics.js
│   ├── firebase-db.js          # Firestore database functions
│   ├── index.js                # Firebase Functions entry point
│   └── package.json
│
├── firebase.json              # Firebase configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js v20+
- npm
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project (create at [console.firebase.google.com](https://console.firebase.google.com))

### Local Development

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Terminal 1 - Backend (Firebase emulators)
cd server
firebase emulators:start

# Terminal 2 - Frontend
cd client
npm run dev
```

App available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001/<your-project>/us-central1/api`

## Firebase Deployment

### Setup

```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init hosting,functions

# Build the React frontend
cd client && npm run build
```

### Deploy

```bash
# Deploy everything (functions + hosting)
firebase deploy

# Or deploy separately
firebase deploy --only functions
firebase deploy --only hosting
```

Your app will be available at:
- `https://<your-project>.web.app`
- `https://<your-project>.firebaseapp.com`

## API Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/fermentation` | Create new fermentation |
| GET | `/api/fermentation/:id` | Get fermentation details |
| PUT | `/api/fermentation/:id` | Update temperature |
| GET | `/api/fermentation/:id/ics` | Dynamic `.ics` calendar feed |

## Fermentation Math

Durations are calculated from temperature using linear formulas in `server/data/rules.js`. Each type has its own temperature ranges and return values (all in hours):

| Type | Range | Formula |
|------|-------|----------|
| Milk Kefir | 8–30°C | `-2T + 64` / `-T + 44` |
| Buttermilk | <27°C | `-1.2T + 60` / `-1.2T + 54` |
| Water Kefir | <28°C | `48h` / `-1.2T + 72` / `-2T + 80` |
| Kombucha | 18–30°C | Day-based × 24 |
| Sauerkraut | 15–28°C | Day-based × 24 |
| Kimchi | 15–30°C | Day-based × 24 |
| Pickled Veg | 15°C+ | Day-based × 24 |
| Sourdough Starter | 18–28°C | Hours |
| Sourdough Bulk | <30°C | Hours |

Out-of-range temperatures clamp to the nearest valid value.

## Calendar Subscription

Each fermentation generates a unique calendar URL. Subscribe in:
- **Google Calendar**: + → From URL → Paste ICS URL
- **Apple Calendar**: File → New Calendar Subscription → Paste URL

## License

MIT
