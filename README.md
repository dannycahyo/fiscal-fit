# Fiscal Fit

A comprehensive personal finance management application designed to help users track expenses, manage budgets, allocate income, monitor receivables, and manage subscriptions.

![Fiscal Fit](https://via.placeholder.com/800x400?text=Fiscal+Fit+App)

## 🚀 Overview

Fiscal Fit aims to solve common financial management challenges through an intuitive, feature-rich platform available on mobile and web. Our application transforms personal financial management through thoughtful automation, insightful analytics, and behavioral psychology, empowering users to develop better financial habits and achieve their financial goals.

## ✨ Features

- **📝 Expense Tracking**: Quickly log expenses with one-tap entry, voice input, receipt scanning, and automatic categorization
- **💰 Budget Management**: Create custom budget categories, set flexible budget periods, and visualize progress
- **📊 Financial Analytics**: View spending trends over time, analyze by category, and get forecasts based on history
- **💸 Income Allocation**: Create allocation categories, use templates, set goals, and get distribution recommendations
- **🧾 Receivables Tracker**: Track money loaned to others, set reminders, calculate interest, and visualize outstanding debts
- **📅 Subscription Manager**: Track all subscriptions, get renewal reminders, analyze spending, and get cancellation recommendations

## 🛠️ Technology Stack

### Frontend

- Expo (SDK 48+) / React Native
- TypeScript
- Expo Router for navigation
- TanStack Query for data fetching
- Victory Native for data visualization
- React Native Paper for UI components

### Backend

- Hono (lightweight web framework)
- TypeScript
- Prisma ORM with PostgreSQL
- JWT for authentication
- Zod for schema validation

### DevOps & Infrastructure

- PNPM Workspaces for monorepo management
- GitHub Actions for CI/CD
- Docker for containerization
- Vercel for frontend hosting
- Render for backend hosting
- Neon for serverless PostgreSQL

## 🏗️ Project Structure

The project is organized as a monorepo using PNPM workspaces:

```
fiscal-fit/
├── apps/
│   ├── frontend/             # Expo/React Native mobile app
│   └── backend/              # Hono backend API
├── packages/
│   ├── api-client/           # Shared API client
│   ├── config/               # Shared configuration
│   ├── core/                 # Shared business logic
│   ├── database/             # Database access layers
│   ├── ui/                   # Shared UI components
│   └── utils/                # Shared utility functions
├── docs/                     # Documentation
│   ├── PRD.MD                # Product Requirements Document
│   └── TRD.MD                # Technical Requirements Document
```

## 📋 Prerequisites

- Node.js (18+ LTS)
- PNPM (10.6.3+)
- Expo CLI
- iOS/Android Simulator (for mobile development)

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fiscal-fit.git
cd fiscal-fit

# Install dependencies
pnpm install
```

### Development

```bash
# Start all services in development mode
pnpm dev

# Start only the frontend
pnpm --filter=frontend start

# Start only the backend
pnpm --filter=backend dev
```

### Building

```bash
# Build all packages and apps
pnpm build
```

## 📱 Mobile App

The mobile app is built with Expo and React Native. To run it:

```bash
cd apps/frontend
pnpm start
```

Then, scan the QR code with the Expo Go app on your device or press 'i' or 'a' in the terminal to open in iOS or Android simulator.

## 📚 Documentation

- [Product Requirements Document](docs/PRD.MD)
- [Technical Requirements Document](docs/TRD.MD)

## 📜 License

[ISC License](LICENSE)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or feedback, please reach out to us at [dannydwicahyono@gmail.com](mailto:dannydwicahyono@gmail.com).
