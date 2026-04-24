# FinLens — Finance Dashboard

FinLens is a full-stack financial analytics application. The React + Vite frontend renders dashboards, charts, and transaction management — all data and computations come from a Node.js + Express + MongoDB backend. The frontend contains zero aggregation logic; every total, breakdown, and trend is computed server-side via MongoDB aggregation pipelines.

## Project Structure

```
finLens/
├── src/               ← React frontend (Vite)
│   ├── context/       ← AppContext — API calls, state, CRUD
│   └── components/    ← Dashboard, Transactions, Insights, Modal
└── server/            ← Node.js/Express backend
    ├── app.js
    ├── seed.js
    └── src/
        ├── config/    ← MongoDB connection
        ├── models/    ← Mongoose schemas
        ├── controllers/
        ├── routes/
        └── middleware/
```

---

## Frontend

### Features

- **Dashboard Overview**: Net Balance, Income, Expenses cards; running balance Area Chart; category Pie Chart — all values fetched from the backend.
- **Transactions Management**:
  - View a detailed, tabular list of all transactions fetched from `/api/transactions`.
  - **Filter** by type (Income / Expense / All).
  - **Search** dynamically by description or category.
  - **Sort** by date or amount.
- **Role-Based Access Control (RBAC)**: Simulated frontend roles (Admin & Viewer).
  - **Admin**: Can add, edit, and delete transactions (calls backend APIs).
  - **Viewer**: Read-only — mutation controls hidden.
- **Insights**: Highest spending category, savings rate, avg monthly expense, monthly income vs expense bar chart — all derived from `/api/summary` and `/api/insights`.
- **Theme Toggling**: Dark and Light modes via CSS variables mapped to Tailwind configuration.
- **Fully Responsive**: Desktop, Tablet, and Mobile viewports.

### Data Flow

The frontend does **not** compute any financial values. `AppContext` fetches all three endpoints in parallel on load and after every mutation:

```
GET /api/transactions  →  transaction list (normalized, used for table + search/sort)
GET /api/summary       →  totalIncome, totalExpenses, netBalance, count
GET /api/insights      →  categoryBreakdown[], monthlyTrend[]
```

The only client-side logic left is UI state: search filtering, type filtering, and column sorting — these are pure display concerns that operate on the already-fetched list.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v3 + PostCSS |
| Charts | Recharts |
| Icons | Lucide React |
| Typography | Space Grotesk, DM Mono, DM Sans, Syne |

### Setup

```bash
# From project root
npm install
npm run dev
```

Open `http://localhost:5173`. The backend must be running first.

---

## Backend

A RESTful API built with Node.js, Express, and MongoDB (Mongoose). All financial computations happen here via aggregation pipelines.

### Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Dev server | Nodemon |

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/transactions` | Add a new transaction |
| `GET` | `/api/transactions` | Fetch all transactions |
| `PUT` | `/api/transactions/:id` | Update a transaction |
| `DELETE` | `/api/transactions/:id` | Delete a transaction |
| `GET` | `/api/summary` | Returns `totalIncome`, `totalExpenses`, `netBalance` |
| `GET` | `/api/insights` | Returns category expense breakdown + monthly income/expense trend |

### Transaction Schema

```js
{
  amount:      Number,   // required, > 0
  type:        String,   // "income" | "expense"
  category:    String,   // required
  date:        Date,     // defaults to now
  description: String    // optional
}
```

### Setup

```bash
cd server

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env — set MONGO_URI and PORT

# 3. (Optional) Seed 32 sample transactions across 4 months
npm run seed

# 4. Start the server
npm run dev      # development (auto-reload)
npm start        # production
```

Server runs on `http://localhost:5000` by default.

### Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/finlens
```

---

## Architecture Notes

- **Zero frontend computation** — `stats`, `categoryBreakdown`, and `monthlyTrend` are removed from the React context as `useMemo` computations. The context only reshapes API responses into the format chart libraries expect.
- **`/api/summary`** uses a single `$group` aggregation to compute income and expense totals in one query.
- **`/api/insights`** runs two aggregations in parallel via `Promise.all`: a `$match → $group → $sort` pipeline for category-wise expense totals, and a double-`$group` pipeline for monthly income/expense bucketed by `{ year, month }`.
- **CRUD re-fetches** — every add, edit, or delete triggers a fresh parallel fetch of all three endpoints, keeping summary and insight data always in sync.
- **Error handling** middleware catches Mongoose `ValidationError` (missing/invalid fields) and `CastError` (bad ObjectId), returning clean 400 responses. All async route handlers use `try/catch + next(err)` to ensure errors always reach the middleware.
- **CORS** is enabled on the backend so the Vite dev server (`localhost:5173`) can reach the API (`localhost:5000`).
