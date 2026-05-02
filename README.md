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
- **SQLite** (better-sqlite3) for data persistence
- **ical-generator** for dynamic `.ics` calendar feeds

### Deployment
- **Docker** multi-stage build
- **Single container** — Express serves the built React frontend
- Designed for **Unraid** + **Tailscale** remote access

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
├── server/                    # Express backend
│   ├── data/
│   │   └── rules.js             # Fermentation math (temp → duration)
│   ├── routes/
│   │   ├── fermentation.js
│   │   └── ics.js
│   ├── db.js
│   └── index.js
│
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Single-service deployment
└── .dockerignore
```

## Getting Started

### Prerequisites
- Node.js v20+
- npm

### Local Development

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Terminal 1 - Backend
cd server
node index.js

# Terminal 2 - Frontend
cd client
npm run dev
```

App available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## Docker Deployment (Unraid)

### Build & Run

```bash
docker compose up -d --build
```

### Unraid Setup

1. Copy project to `/mnt/user/appdata/fermentation-planner/`
2. SSH into Unraid and run `docker compose up -d --build`
3. Access via Tailscale: `http://<unraid-tailscale-ip>:3000`

### Container Configuration

| Setting | Value |
|---------|-------|
| Port | `3000` |
| Volume | `/mnt/user/appdata/fermentation-planner/data:/app/data` |
| Env: `DB_PATH` | `/app/data/fermentation.db` |
| Env: `NODE_ENV` | `production` |

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
|------|-------|---------|
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
