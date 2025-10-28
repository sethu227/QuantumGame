## Quantum Outreach

Interactive quantum-themed web app with a Node.js/Express backend and a Vite + React frontend. It includes demo components like a Double Slit simulator, a Quantum Coin Flip, and Quantum Teleportation, plus a simple API to retrieve game metadata from MongoDB.

### Tech Stack
- Backend: Node.js, Express, Mongoose, CORS, dotenv
- Frontend: React 18, Vite, React Router DOM, Axios
- Database: MongoDB (via Mongoose)

### Monorepo Structure
```
quantum-outreach/
  backend/
    controllers/
      gameController.js
    models/
      GameData.js
    routes/
      gameRoutes.js
    server.js
    package.json
  frontend/
    src/
      App.jsx
      App.css
      main.jsx
      components/
        Card.css
        DoubleSlitSimulator.jsx
        QuantumCoinFlip.jsx
        QuantumTeleportation.jsx
    index.html
    vite.config.js
    package.json
  .gitignore
  README.md
```

### Backend
- Entry: `backend/server.js`
- Routes: `GET /api/games` → returns all documents from the `GameData` collection
- Env: reads `MONGO_URI` via dotenv

Key files:
- `backend/routes/gameRoutes.js` wires `GET /` to controller
- `backend/controllers/gameController.js` uses `GameData.find()`
- `backend/models/GameData.js` defines the Mongo model (ensure it matches your data)

#### Environment Variables
Create `backend/.env` with:
```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
PORT=5000
```

#### Install & Run (Backend)
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### Frontend
- Vite app in `frontend/`
- React components in `frontend/src/components/`

#### Install & Run (Frontend)
```bash
cd frontend
npm install
npm run dev
# Vite dev server prints a local URL (e.g., http://localhost:5173)
```

#### Build
```bash
cd frontend
npm run build
```
Artifacts output to `frontend/dist/` (ignored by git).

### API Summary
- `GET /api/games` — returns JSON array of game metadata from MongoDB.

### Development Notes
- Ensure MongoDB is reachable via `MONGO_URI` before starting the backend.
- CORS is enabled; adjust origin rules in `backend/server.js` if deploying across domains.

### Contributing
1. Create a branch
2. Commit your changes
3. Open a PR against `main`

### License
This project is provided as-is; add a license file if you intend to distribute.

### Repository
Pushed to `main` on `QuantumGame`:
- `https://github.com/sethu227/QuantumGame.git`


