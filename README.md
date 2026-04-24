# FinLens — Finance Dashboard

FinLens is a modern, responsive, and highly interactive financial analytics application. It consists of a React + Vite frontend dashboard and a Node.js + Express + MongoDB backend API that powers real transaction data, summary computations, and data insights.

## Project Structure

```
finLens/
├── src/               ← React frontend (Vite)
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

- **Dashboard Overview**: Displays key financial metrics (Net Balance, Income, Expenses) alongside an interactive Area Chart representing balance trends and a Pie Chart for categorical spending breakdown.
- **Transactions Management**:
  - View a detailed, tabular list of all financial transactions.
  - **Filter** transactions by type (Income/Expense/All).
  - **Search** transactions dynamically by description or category.
  - **Sort** transactions seamlessly by date or amount.
- **Role-Based Access Control (RBAC)**: Simulated frontend roles (Admin & Viewer).
  - **Admin**: Full access. Can add, edit, and delete transactions.
  - **Viewer**: Read-only access. Mutation controls are hidden.
- **Automated Insights**: Generates dynamic financial observations (highest spending category, average monthly expenses, savings rate) based on the transaction dataset.
- **Theme Toggling**: First-class support for both **Dark** and **Light** modes via CSS variables mapped to Tailwind configuration.
- **Fully Responsive**: Adapts seamlessly to Desktop, Tablet, and Mobile viewports.

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

Open `http://localhost:5173` in your browser.

---

## Backend

A RESTful API built with Node.js, Express, and MongoDB (Mongoose).

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
| `GET` | `/api/summary` | totalIncome, totalExpenses, netBalance |
| `GET` | `/api/insights` | Category expense breakdown + monthly trend |

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
# Edit .env and set your MONGO_URI and PORT

# 3. (Optional) Seed sample data — 22 transactions across 4 months
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

- **Summary & Insights** are computed dynamically via MongoDB aggregation pipelines — no stale cached values.
- **`/api/insights`** runs two aggregations in parallel (`Promise.all`): category-wise expense totals and a monthly income/expense trend grouped by `{ year, month }`.
- **Error handling** middleware catches Mongoose `ValidationError` and `CastError`, returning clean 400 responses with descriptive messages.
