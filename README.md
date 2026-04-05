# FinLens — Finance Dashboard

FinLens is a modern, responsive, and highly interactive frontend dashboard built with React and Vite. It serves as a comprehensive financial tracking application that allows users to monitor their balance, track expenses, and gain actionable insights.

This project was built for a frontend developer internship screening assignment, focusing on clean architecture, responsive design, and global state management. The project features a robust design system completely powered by utility-first styling with **Tailwind CSS**, utilizing custom configuration to elegantly handle theming and design tokens.

## Features

- **Dashboard Overview**: Displays key financial metrics (Net Balance, Income, Expenses) alongside an interactive Area Chart representing balance trends and a Pie Chart for categorical spending breakdown.
- **Transactions Management**: 
  - View a detailed, tabular list of all financial transactions.
  - **Filter** transactions by type (Income/Expense/All).
  - **Search** transactions dynamically by description or category.
  - **Sort** transactions seamlessly by date or amount.
- **Role-Based Access Control (RBAC)**: Simulated frontend roles (Admin & Viewer). 
  - **Admin**: Full access. Can add, edit, and delete transactions.
  - **Viewer**: Read-only access. Mutation controls (Add, Edit, Delete buttons) are hidden.
- **Automated Insights**: Generates dynamic financial observations (e.g., highest spending category, average monthly expenses, savings rate) based on the transaction dataset.
- **Theme Toggling**: First-class support for both **Dark** and **Light** modes, implemented cleanly via CSS variables mapped tightly to Tailwind configuration, allowing instantaneous theme toggling.
- **Fully Responsive**: Adapts seamlessly to Desktop, Tablet, and Mobile viewport sizes using Tailwind's rich responsive utilities.

## Overview of Approach & Architecture

1. **State Management**: React's Context API (`AppContext.jsx`) is utilized as a centralized store for the entire application. It manages the transaction array, the active theme, the current user role, search/filter queries, and UI toast notifications. Furthermore, it uses `useMemo` hooks to efficiently derive and cache complex data structures (like chart data, sorted transactions, and aggregated statistics) ensuring high performance.
2. **Component Structure**: The application is highly modular. The core view is split into independent sub-views (`Dashboard.jsx`, `Transactions.jsx`, `Insights.jsx`) that are lazy-swapped based on the active sidebar navigation state.
3. **Styling & Theming (Tailwind CSS)**: The application utilizes a highly custom Tailwind CSS implementation. Design tokens (colors, animations, fonts) are carefully organized via CSS variables and passed into `tailwind.config.js`. The Light/Dark mode toggle naturally switches the `data-theme` attribute on the global document, recalculating the underlying custom properties and propagating them across Tailwind's utility classes instantaneously without Javascript computation.
4. **Data Visualization**: Charts are powered by `recharts`. The components dynamically respond to the state derived from the Context API.
5. **Formatting**: Financial figures are formatted natively utilizing `Intl.NumberFormat('en-IN')` to display accurate Indian Rupee formatting, including thousands, Lakhs, and Crores abbreviations.

## Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v3 + PostCSS
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Typography**: Space Grotesk, DM Mono, DM Sans, Syne (via Google Fonts)

## Setup Instructions

Ensure you have Node.js installed on your machine.

1. **Clone the repository** and navigate to the project folder:
   ```bash
   cd finLens
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

---
