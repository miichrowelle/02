# Fermentation Planner

A web application that helps you manage fermentation projects with time planning and calendar integration.

## Features

- **Fermentation Time Planning**: Select what you're fermenting and your location's temperature to get a personalized time plan
- **9 Fermentation Types**: Milk Kefir, Yogurt, Buttermilk, Water Kefir, Kombucha, Sauerkraut, Kimchi, Pickled Vegetables, Sourdough Starter
- **Dynamic Calendar Subscription**: Get a unique URL for each fermentation that generates a dynamic `.ics` file
- **Apple Design System**: Clean, native iOS-like interface with proper system fonts and styling
- **European Time Format**: 24-hour format with relative time displays ("in 3 days", "in 12h")

## Tech Stack

### Frontend
- **React 18** with Vite
- **Apple Design System** styling (SF Pro fonts, iOS-like components)
- Native HTML `<select>` elements for iOS picker behavior

### Backend
- **Node.js** with Express
- **SQLite** (better-sqlite3) for data persistence
- **ical-generator** for dynamic `.ics` calendar feeds

## Project Structure

```
fermentation-planner/
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── FermentForm.jsx    # Type/category selection + temperature slider
│   │   │   ├── TimePlan.jsx        # Timeline display with relative times
│   │   │   └── CalendarInfo.jsx   # Calendar subscription UI
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   └── styles.css             # All styling (Apple Design System)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                    # Express backend
    ├── data/
    │   └── rules.js             # Fermentation rulebook (type + temp → duration)
    ├── routes/
    │   ├── fermentation.js      # API routes for creating/getting fermentations
    │   └── ics.js              # Dynamic .ics calendar feed generator
    ├── db.js                   # SQLite database setup
    ├── index.js                # Server entry point
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js v20+ (v20.11.1 tested)
- npm (comes with Node.js)

### Installation

```bash
# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### Running Locally (for development)

**Terminal 1 - Backend:**
```bash
cd server
PUBLIC_URL=http://YOUR_LOCAL_IP:3000 node index.js
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:5173` or `http://YOUR_LOCAL_IP:5173` (for phone access)
- Backend API: `http://localhost:3000`

### Testing on Your Phone (Same WiFi)

1. Find your computer's local IP: `ifconfig | grep "inet "` (look for non-127.0.0.1)
2. Start backend with: `PUBLIC_URL=http://YOUR_IP:3000 node index.js`
3. Start frontend: `cd client && npm run dev` (uses `--host` flag automatically)
4. On your phone, open: `http://YOUR_IP:5173`
5. The calendar subscription URL will use your IP, making it accessible from your phone

## API Endpoints

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/fermentation` | Create new fermentation session |
| GET | `/api/fermentation/:id` | Get fermentation details + plan |
| GET | `/api/fermentation/:id/ics` | Dynamic .ics file for calendar subscription |
| PUT | `/api/fermentation/:id` | Update fermentation (temperature change) |

## Calendar Subscription

Each fermentation generates a unique calendar URL. Subscribe in:
- **Google Calendar**: + → From URL → Paste ICS URL
- **Apple Calendar**: File → New Calendar Subscription → Paste URL

The calendar updates automatically when you make changes (dynamic ICS generation).

## Fermentation Rulebook

The `server/data/rules.js` file contains all fermentation rules:
- **Temperature ranges** with corresponding durations
- **Step-by-step instructions** with timing
- **Check intervals** for routine monitoring

To add new fermentation types, add entries following the existing structure.

## License

MIT License - feel free to use this for your fermentation projects!
