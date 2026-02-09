# Analytics Dashboard

An admin dashboard for data analytics built with Next.js, featuring real-time data visualization, role-based access control and comprehensive KPI tracking.

## Live Site

[https://admin-data-analytics-dashboard.vercel.app/](https://admin-data-analytics-dashboard.vercel.app/)

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone <https://github.com/faizulislamfair/analytics-dashboard.git>
cd analytics-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

<br>

## Tech Stack Used

- **Framework**: [Next.js 15](https://nextjs.org) - React framework with App Router
- **Language**: TypeScript - Type-safe development
- **Styling**: CSS Modules & PostCSS - Component-scoped styling
- **State Management**: Zustand - Lightweight state management
- **UI Components**: Custom React components with responsive design
- **Data Visualization**: Chart.js/Recharts compatible components
- **Deployment**: Vercel - Optimized Next.js hosting

<br>

## Architecture Decisions

### 1. **App Router Structure**

- Uses Next.js App Router for intuitive file-based routing
- Multi-page dashboard with Analytics, Orders, Users and Settings sections

### 2. **Component Organization**

- **components/**: Reusable UI components organized by feature (charts, dashboard, filters, layout, ui)
- **hooks/**: Custom React hooks for data fetching and state logic
- **utils/**: Utility functions for CSV export and data manipulation
- **lib/**: API client and shared library functions
- **store/**: Zustand store for global state management

### 3. **Data Management**

- Local JSON database (`data/db.json`) for mock data
- `useDashboardData` hook for centralized data fetching
- API layer in `lib/api.ts` for separation of concerns

### 4. **Role-Based Access Control**

- `RoleSelector` component for switching between Admin and Manager roles
- Dynamic filtering and data visibility based on user role

### 5. **Export Functionality**

- CSV export feature for reporting and analysis
- Client-side export using `csvExport.ts` utility

<br>

## Assumptions Made

1. **User Roles**: The dashboard supports two roles (Admin and Manager) with different data access levels
2. **Mock Data**: Uses local JSON file for development; ready to integrate with real backend APIs
3. **Client-Side Data Processing**: Filtering and aggregation handled on the client for quick prototyping
4. **Responsive Design**: Built for desktop and tablet views, optimized for modern browsers
5. **Real-Time Updates**: Dashboard data structure supports periodic refresh patterns for future real-time integration
