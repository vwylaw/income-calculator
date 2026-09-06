# Australian Income Calculator

A fast, responsive React-based income and tax calculator designed to compare earnings across **Hourly, Daily, Weekly, Fortnightly, Monthly, and Yearly** frequencies under Australian taxation and superannuation legislation.

---

## 🌟 Key Features

- **Multi-Frequency Matrix**: Enter any figure into Base Salary, Package (Base + Super), or Total (Package + GST) across any timeframe, and all 42 values automatically recalculate in real time.
- **Contractor vs. Permanent Support**: Toggles GST columns and adjusts annual contractor income based on configurable annual days off / public holidays.
- **Dynamic Australian Financial Year Defaulting**: Automatically defaults to the active Australian financial year (which starts on 1 July) based on the current date.
- **ATO-Compliant Financial Year Configurations**: Parameterised configurations for **FY 2023–24**, **FY 2024–25**, **FY 2025–26**, **FY 2026–27**, and **FY 2027–28** (Stage 3 tax cuts, 15% and 14% rate cuts, and 12% Super Guarantee target).
- **High Test Coverage**: Over **97% code coverage** across unit, domain, integration, and UI component tests using Vitest and React Testing Library.

---

## 🏗️ Architecture Design

The application follows a unidirectional, reactive data flow architecture that separates configuration, mathematical calculations, application state, and presentation components:

```
src/
├── components/                 # React presentation components
│   ├── AdjustmentForm.jsx      # Employment type, days off, and FY dropdown
│   ├── Assumptions.jsx         # Summary of hours, GST, and super rates
│   ├── FYData.jsx              # Re-export alias for backwards compatibility
│   ├── GlobalContext.jsx       # Reactive context provider
│   ├── IncomeRow.jsx           # Reusable data-driven row component
│   └── Table.jsx               # Compact main table layout
├── config/                     # Financial year configurations
│   └── financialYears/
│       ├── fy2324.js           # FY 2023–24 (11% Super, 19%/32.5%/37%/45% Tax)
│       ├── fy2425.js           # FY 2024–25 (11.5% Super, 16%/30%/37%/45% Tax)
│       ├── fy2526.js           # FY 2025–26 (12% Super, Stage 3 Tax)
│       ├── fy2627.js           # FY 2026–27 (12% Super, 15% rate on $18.2k-$45k)
│       ├── fy2728.js           # FY 2027–28 (12% Super, 14% rate on $18.2k-$45k)
│       └── index.js            # Central registry & dynamic 1-July FY resolution
├── constants/
│   └── workSchedule.js         # Working hours (8h/d, 40h/w, 260d/y, 2080h/y)
├── utils/
│   └── incomeCalculator.js     # Pure calculation and frequency conversion engine
└── test/
    └── setup.js                # Vitest & Jest-DOM setup
```

For in-depth mathematical formulas, data schemas, and architecture diagrams, see the [Architecture Document](docs/ARCHITECTURE.md).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository
git clone https://github.com/cocolam-dev/income-calculator.git
cd income-calculator

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing & Coverage

Run the complete Vitest test suite:
```bash
npm test
```

Generate the test coverage report:
```bash
npm run test:coverage
```

### Test Coverage Summary:
- **Statements**: > 97%
- **Branches**: > 91%
- **Functions**: > 92%
- **Lines**: > 97%

---

## 📦 Production Build

Compile the production bundle (outputs to `docs/` for GitHub Pages deployment):
```bash
npm run build
```

Verify ESLint rules:
```bash
npm run lint
```
