# Weekly Medication Planner

A single-page web app for managing a weekly medication schedule. See every day of the week at a glance, add a medicine to several days at once, update dosages, and remove a medicine from one day or from the entire week.

Built with **React 19**, **Redux Toolkit** and **React Router**, with a right-to-left Hebrew interface.

## Features

- **Weekly overview** – a 7-day grid showing the medicines scheduled for each day
- **Add to multiple days at once** – pick any combination of days and add the same medicine to all of them in one step
- **Edit dosage** – update the amount of a medicine on a specific day
- **Flexible delete** – a confirmation dialog lets you remove a medicine from a single day or from the whole week
- **Form validation** – required fields and day selection are checked before saving, with inline error messages
- **Client-side routing** – fast navigation between pages without reloading, including dynamic routes such as `/day/:dayIndex`

## Tech Stack

| Area | Technology |
|------|------------|
| UI | React 19 (function components and hooks) |
| State management | Redux Toolkit (`createSlice`, `configureStore`) + React Redux |
| Routing | React Router 7 |
| Build tool | Vite |
| Code quality | ESLint |

## Architecture

The whole week lives in a single Redux slice (`weekSlice`). Components read it with `useSelector` and change it only by dispatching actions, so all updates go through one predictable place:

| Action | What it does |
|--------|--------------|
| `addMedicineToDay` | Adds a medicine to every selected day |
| `updateMedicineAmount` | Changes the dosage of one medicine on one day |
| `removeMedicineFromDay` | Removes a medicine from a single day |
| `removeMedicineFromAllDays` | Removes a medicine from the whole week |

## Project Structure

```
src/
├── components/        # Reusable UI pieces
│   ├── Navigation.jsx
│   ├── DayCard.jsx        # One day in the weekly grid
│   ├── MedicineItem.jsx   # One medicine with edit / delete actions
│   └── ConfirmDialog.jsx  # "This day only" or "whole week" delete dialog
├── pages/             # One component per route
│   ├── Home.jsx           # /
│   ├── WeeklyTable.jsx    # /weekly-table
│   ├── DayDetails.jsx     # /day/:dayIndex
│   ├── AddMedicine.jsx    # /add-medicine
│   └── EditMedicine.jsx   # /edit-medicine/:dayIndex/:medicineId
├── redux/
│   ├── store.js
│   └── slices/weekSlice.js
├── App.jsx            # Routes
└── main.jsx           # Entry point (Redux Provider)
```

## Getting Started

Requires [Node.js](https://nodejs.org/) 20 or later.

```bash
git clone https://github.com/AyalaCohenCode/medication-management.git
cd medication-management
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Author

**Ayala Cohen** – [GitHub](https://github.com/AyalaCohenCode)
