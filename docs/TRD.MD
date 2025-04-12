# Fiscal Fit - Technical Requirements Document (TRD)

## 1. Introduction

This Technical Requirements Document (TRD) provides detailed specifications for the development of the Fiscal Fit personal finance application. It complements the Product Requirements Document (PRD) by focusing on technical implementation details, architecture decisions, design patterns, and development best practices.

## 2. Technology Stack Overview

### 2.1 Frontend Technologies

| Technology         | Version          | Purpose                                      |
| ------------------ | ---------------- | -------------------------------------------- |
| Expo               | Latest (SDK 48+) | Cross-platform development framework         |
| Expo Router        | Latest           | File-based routing system                    |
| React              | 18+              | Core UI framework                            |
| TypeScript         | 4.9+             | Type-safe programming language               |
| TanStack Query     | Latest           | Data fetching, caching, and state management |
| Expo SQLite        | Latest           | Local data storage                           |
| Victory Native     | Latest           | Data visualization                           |
| React Native Paper | Latest           | UI component library                         |
| Formik + Yup       | Latest           | Form management and validation               |

### 2.2 Backend Technologies

| Technology        | Version | Purpose                                                  |
| ----------------- | ------- | -------------------------------------------------------- |
| Hono              | Latest  | Lightweight, high-performance backend framework          |
| Hono RPC          | Latest  | Type-safe API communication between frontend and backend |
| TypeScript        | 4.9+    | Type-safe programming language                           |
| PostgreSQL (Neon) | Latest  | Primary database (serverless)                            |
| Prisma            | Latest  | ORM for database interactions (with PostgreSQL)          |
| JWT               | Latest  | Authentication token standard                            |
| Zod               | Latest  | Schema validation                                        |
| Node.js           | 18+ LTS | Runtime environment                                      |

### 2.3 DevOps & Infrastructure

| Technology     | Version | Purpose                        |
| -------------- | ------- | ------------------------------ |
| GitHub Actions | N/A     | CI/CD pipeline                 |
| Docker         | Latest  | Containerization for backend   |
| Vercel         | N/A     | Frontend hosting               |
| Render         | N/A     | Backend hosting (with Docker)  |
| Neon           | N/A     | Serverless PostgreSQL Database |
| ESLint         | Latest  | Code linting                   |
| Prettier       | Latest  | Code formatting                |
| Husky          | Latest  | Git hooks                      |

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────┐      ┌─────────────────────────┐
│                         │      │                         │
│     Expo Application    │      │      API Gateway        │
│                         │      │                         │
│  ┌─────────────────┐   │      │  ┌─────────────────┐   │
│  │                 │   │      │  │                 │   │
│  │   Expo Router   │   │◄────►│  │    Hono API     │   │
│  │                 │   │      │  │                 │   │
│  └─────────────────┘   │      │  └─────────────────┘   │
│                         │      │            │           │
└─────────────────────────┘      └────────────┼───────────┘
                                              │
                                              ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│                         │      │                         │
│    Service Layer        │      │    Database Layer       │
│                         │      │                         │
│  ┌─────────────────┐   │      │  ┌─────────────────┐   │
│  │                 │   │      │  │                 │   │
│  │ Business Logic  │◄──┼─────►│  │  Neon Postgres  │   │
│  │                 │   │      │  │                 │   │
│  └─────────────────┘   │      │  └─────────────────┘   │
│                         │      │                         │
└─────────────────────────┘      └─────────────────────────┘
```

### 3.2 Monorepo Structure

Fiscal Fit will be organized as a monorepo using Turborepo or PNPM workspaces to share code between packages:

```
fiscal-fit/
├── apps/
│   ├── frontend/             # Expo application
│   └── backend/              # Hono backend API
├── packages/
│   ├── core/             # Shared business logic
│   ├── utils/            # Utility functions
│   ├── api-client/       # Frontend API client
│   └── config/           # Shared configuration
├── docs/                 # Documentation
├── scripts/              # Build and deployment scripts
└── package.json          # Root package.json
```

## 4. Detailed Frontend Architecture

### 4.1 Folder Structure (Expo Router)

Fiscal Fit will use Expo Router's file-based routing system:

```
apps/expo/
├── app/                  # Expo Router directory
│   ├── _layout.tsx       # Root layout with providers
│   ├── index.tsx         # Home/Dashboard screen
│   ├── (auth)/           # Auth group
│   │   ├── _layout.tsx   # Auth layout
│   │   ├── sign-in.tsx   # Sign in screen
│   │   └── sign-up.tsx   # Sign up screen
│   ├── (main)/           # Main app screens grouped
│   │   ├── _layout.tsx   # Tab navigator layout
│   │   ├── expenses/     # Expenses section
│   │   │   ├── _layout.tsx  # Expenses stack layout
│   │   │   ├── index.tsx    # Expenses list
│   │   │   ├── [id].tsx     # Individual expense details (dynamic route)
│   │   │   └── create.tsx   # Create expense
│   │   ├── budget/       # Budget section
│   │   │   ├── _layout.tsx  # Budget stack layout
│   │   │   ├── index.tsx    # Budget overview
│   │   │   └── [id].tsx     # Individual budget details
│   │   ├── analytics/    # Analytics section
│   │   │   ├── _layout.tsx  # Analytics stack layout
│   │   │   └── index.tsx    # Analytics dashboard
│   │   ├── loans/        # Loans section
│   │   │   ├── _layout.tsx  # Loans stack layout
│   │   │   ├── index.tsx    # Loans list
│   │   │   └── [id].tsx     # Individual loan details
│   │   └── subscriptions/ # Subscriptions section
│   │       ├── _layout.tsx  # Subscriptions stack layout
│   │       ├── index.tsx    # Subscriptions list
│   │       └── [id].tsx     # Individual subscription details
│   ├── settings/         # Settings screens
│   │   ├── _layout.tsx   # Settings stack layout
│   │   ├── index.tsx     # Settings home
│   │   ├── profile.tsx   # Profile settings
│   │   └── preferences.tsx  # App preferences
│   └── +not-found.tsx    # 404 page
├── src/
│   ├── assets/           # Static assets (images, fonts)
│   ├── components/       # UI components
│   │   ├── common/       # Shared components
│   │   ├── expenses/     # Expense-related components
│   │   ├── budget/       # Budget-related components
│   │   └── ...           # Other feature-specific components
│   ├── hooks/            # Custom React hooks
│   │   ├── api/          # API hooks using TanStack Query
│   │   └── ...           # Other custom hooks
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── constants/        # Application constants
└── ...                   # Configuration files
```

### 4.2 State Management with TanStack Query

```
hooks/api/
├── useExpenses.ts        # Expense-related queries and mutations
├── useBudgets.ts         # Budget-related queries and mutations
├── useAnalytics.ts       # Analytics-related queries
├── useLoans.ts           # Loan-related queries and mutations
├── useSubscriptions.ts   # Subscription-related queries and mutations
└── useAuth.ts            # Authentication-related queries and mutations
```

#### 4.2.1 Sample TanStack Query Hook

```typescript
// Example for expense management
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../services/api";

// Get all expenses
export function useExpenses(filters = {}) {
  return useQuery({
    queryKey: ["expenses", filters],
    queryFn: () => api.expenses.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get a single expense
export function useExpense(id) {
  return useQuery({
    queryKey: ["expenses", id],
    queryFn: () => api.expenses.getById(id),
    enabled: !!id,
  });
}

// Create a new expense
export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newExpense) => api.expenses.create(newExpense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}

// Update an expense
export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => api.expenses.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({
        queryKey: ["expenses", variables.id],
      });
    },
  });
}

// Delete an expense
export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => api.expenses.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
```

#### 4.2.2 Local Storage Strategy

- Use Expo SecureStore for sensitive information
- Use AsyncStorage for general persistent data
- Implement data sync mechanism for offline capability with TanStack Query's persistQueryClient plugin
- Cache frequently accessed data for performance

### 4.3 UI/UX Guidelines

#### 4.3.1 Design System

- Implement a consistent design system with:
  - Typography scale
  - Color palette with dark/light theme support
  - Spacing scale
  - Component library customization
  - Accessibility compliance

#### 4.3.2 Responsive Design Strategy

- Mobile-first approach
- Use Flexbox for layouts
- Implement responsive breakpoints for web
- Support different device orientations

#### 4.3.3 Animations and Transitions

- Use React Native Reanimated for complex animations
- Keep animations subtle and purposeful
- Ensure animations don't impact performance

## 5. Detailed Backend Architecture

### 5.1 Folder Structure (API)

```
apps/api/
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── auth.ts       # Authentication controllers
│   │   ├── expenses.ts   # Expense controllers
│   │   └── ...           # Other feature controllers
│   ├── middleware/       # Custom middleware
│   │   ├── auth.ts       # Authentication middleware
│   │   ├── validation.ts # Request validation
│   │   └── error.ts      # Error handling
│   ├── models/           # Prisma models and extensions
│   ├── services/         # Business logic
│   │   ├── auth.ts       # Authentication services
│   │   ├── expense.ts    # Expense services
│   │   └── ...           # Other services
│   ├── utils/            # Utility functions
│   ├── routes/           # API routes
│   ├── config/           # Configuration
│   │   ├── env.ts        # Environment variables
│   │   ├── jwt.ts        # JWT configuration
│   │   └── cors.ts       # CORS configuration
│   ├── db/               # Database connections and utilities
│   │   ├── client.ts     # Prisma client instance
│   ├── types/            # TypeScript types
│   ├── rpc/              # RPC endpoint definitions
│   └── index.ts          # Entry point
├── prisma/               # Prisma ORM
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Generated migrations
│   └── seed.ts           # Database seed script
└── ...                   # Configuration files
```

### 5.2 API Design

#### 5.2.1 RPC Implementation with Hono

Hono RPC will be used for type-safe communication between frontend and backend:

```typescript
// Example RPC schema
import { hc } from "@hono/client";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// Schema definition (shared between frontend & backend)
export const expenseSchema = z.object({
  amount: z.number().positive(),
  category_id: z.string().uuid(),
  date: z.string().datetime(),
  description: z.string().optional(),
  location: z.string().optional(),
});

// Backend RPC endpoint
app.post(
  "/api/expenses",
  zValidator("json", expenseSchema),
  async (c) => {
    const data = c.req.valid("json");
    // Implementation
    return c.json({ success: true, data: result });
  },
);

// Frontend usage
const client = hc("/api");
const result = await client.expenses.$post({
  json: {
    amount: 42.5,
    category_id: "123e4567-e89b-12d3-a456-426614174000",
    date: new Date().toISOString(),
  },
});
```

#### 5.2.2 Authentication Flow

1. User registration/login with email/username and password
2. JWT token generation with appropriate expiry
3. Refresh token mechanism for session persistence
4. Secure token storage on client devices
5. Role-based access control for premium features

#### 5.2.3 Error Handling Strategy

- Consistent error response format
- HTTP status codes aligned with error types
- Detailed error messages in development, sanitized in production
- Error logging and monitoring

### 5.3 Database Design

#### 5.3.1 PostgreSQL Schema Design

Fiscal Fit will use Neon Postgres with the following table structure:

**users**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | VARCHAR | User email (unique) |
| username | VARCHAR | Username (unique) |
| password_hash | VARCHAR | Hashed password |
| full_name | VARCHAR | User's full name |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| last_login | TIMESTAMP | Last login timestamp |
| preferences | JSONB | User settings and preferences |

**expenses**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| amount | DECIMAL | Expense amount |
| category_id | UUID | Foreign key to categories |
| date | DATE | Date of expense |
| description | VARCHAR | Description of expense |
| location | VARCHAR | Location (optional) |
| currency_code | VARCHAR | Currency code (ISO) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| tags | VARCHAR[] | Array of tags |
| is_recurring | BOOLEAN | Whether this is a recurring expense |
| recurring_id | UUID | Foreign key to recurring_expenses (nullable) |

**categories**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users (nullable for system categories) |
| name | VARCHAR | Category name |
| color | VARCHAR | Color code (hex) |
| icon | VARCHAR | Icon identifier |
| is_system | BOOLEAN | Whether this is a system category |
| parent_id | UUID | Foreign key to categories (self-reference, nullable) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**budgets**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| category_id | UUID | Foreign key to categories (nullable for overall budget) |
| amount | DECIMAL | Budget amount |
| period_type | VARCHAR | Period type (daily, weekly, monthly, yearly) |
| start_date | DATE | Start date |
| end_date | DATE | End date (nullable for ongoing) |
| is_rollover | BOOLEAN | Whether unused budget rolls over |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**income_sources**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| name | VARCHAR | Income source name |
| amount | DECIMAL | Income amount |
| frequency | VARCHAR | Frequency (one-time, weekly, bi-weekly, monthly, etc.) |
| next_date | DATE | Next income date |
| is_active | BOOLEAN | Whether this income source is active |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**allocations**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| income_source_id | UUID | Foreign key to income_sources |
| category_id | UUID | Foreign key to categories |
| amount | DECIMAL | Allocation amount or percentage |
| is_percentage | BOOLEAN | Whether amount is a percentage |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**loans**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| person_name | VARCHAR | Person name |
| contact_info | VARCHAR | Contact information (nullable) |
| amount | DECIMAL | Loan amount |
| is_lent | BOOLEAN | True if user lent money, false if borrowed |
| date_given | DATE | Date loan was given |
| due_date | DATE | Due date (nullable) |
| status | VARCHAR | Status (outstanding, partially_paid, paid) |
| notes | TEXT | Notes about the loan |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**loan_payments**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| loan_id | UUID | Foreign key to loans |
| amount | DECIMAL | Payment amount |
| date | DATE | Payment date |
| notes | TEXT | Payment notes |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**subscriptions**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| name | VARCHAR | Subscription name |
| amount | DECIMAL | Subscription amount |
| frequency | VARCHAR | Frequency (weekly, monthly, yearly, etc.) |
| start_date | DATE | Start date |
| next_payment_date | DATE | Next payment date |
| category_id | UUID | Foreign key to categories |
| notes | TEXT | Subscription notes |
| reminder_days | INTEGER | Days before to remind |
| is_active | BOOLEAN | Whether the subscription is active |
| service_identifier | VARCHAR | Identifier for specific service (e.g., "netflix") |
| management_url | VARCHAR | URL for managing the subscription (nullable) |
| last_used_date | DATE | Last time user recorded using this subscription (nullable) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**subscription_usage**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| subscription_id | UUID | Foreign key to subscriptions |
| usage_date | DATE | Date of usage |
| usage_value | INTEGER | Value/rating of usage (e.g., 1-5 scale) |
| usage_note | TEXT | Note about the usage |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**subscription_actions**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| subscription_id | UUID | Foreign key to subscriptions |
| action_type | VARCHAR | Action type (e.g., 'remind_later', 'cancel', 'renew') |
| scheduled_date | DATE | Scheduled date |
| status | VARCHAR | Status (e.g., 'pending', 'completed', 'cancelled') |
| notes | TEXT | Notes |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**subscription_recommendations**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| subscription_id | UUID | Foreign key to subscriptions |
| recommendation_type | VARCHAR | Recommendation type (e.g., 'cancel', 'downgrade') |
| reason | TEXT | Reason for recommendation |
| potential_savings | DECIMAL | Potential savings amount |
| is_viewed | BOOLEAN | Whether user has viewed this recommendation |
| is_actioned | BOOLEAN | Whether user has taken action on this recommendation |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**service_integrations**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| service_name | VARCHAR | Service name |
| api_key_encrypted | VARCHAR | Encrypted API key (nullable) |
| integration_status | VARCHAR | Status of integration |
| last_sync | TIMESTAMP | Last synchronization timestamp |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**financial_goals**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| name | VARCHAR | Goal name |
| target_amount | DECIMAL | Target amount |
| current_amount | DECIMAL | Current amount |
| deadline | DATE | Goal deadline |
| category_id | UUID | Foreign key to categories (nullable) |
| priority | INTEGER | Goal priority |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**recurring_expenses**
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| amount | DECIMAL | Expense amount |
| category_id | UUID | Foreign key to categories |
| frequency | VARCHAR | Frequency (daily, weekly, monthly, etc.) |
| start_date | DATE | Start date |
| end_date | DATE | End date (nullable) |
| description | VARCHAR | Description |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

#### 5.3.2 Data Relationships

1. One-to-Many Relationships:

   - User to Expenses: A user has many expenses
   - User to Categories: A user has many custom categories
   - User to Budgets: A user has many budgets
   - User to Income Sources: A user has many income sources
   - User to Loans: A user has many loans
   - User to Subscriptions: A user has many subscriptions
   - User to Financial Goals: A user has many financial goals
   - Category to Expenses: A category has many expenses
   - Loan to Loan Payments: A loan has many payments
   - Recurring Expense to Expenses: A recurring expense template has many actual expenses
   - Subscription to Subscription Usage: A subscription has many usage records
   - Subscription to Subscription Actions: A subscription has many action records
   - Subscription to Subscription Recommendations: A subscription can have many recommendations

2. Self-Referential Relationships:

   - Category to Category: Categories can have parent categories (hierarchical)

3. Many-to-Many Relationships:
   - Income Sources to Categories via Allocations: Income sources are allocated across multiple categories

#### 5.3.3 Database Indexes

Important indexes to optimize query performance:

- User email and username (for auth lookups)
- Expense date and user_id (for filtered queries)
- Expense category_id (for category filtering)
- Budget user_id and period_type (for budget lookups)
- Subscription next_payment_date (for upcoming payment alerts)
- Loan due_date (for upcoming payment reminders)

## 6. Feature-Specific Technical Implementation

### 6.1 Expense Tracking Implementation

#### 6.1.1 Quick Expense Entry

- Implement gesture-based UI for rapid expense entry
- Voice recognition integration using Expo Speech API
- Machine learning model for automatic categorization
- Integration with device camera for receipt scanning and OCR

#### 6.1.2 Offline Support

- Implement TanStack Query's offline mutation capabilities
- Queue transactions when offline and sync when connection is restored
- Conflict resolution strategy for syncing offline changes

#### 6.1.3 Receipt Scanning

- Integrate with OCR service (Google Cloud Vision API or Tesseract.js)
- ML model for extracting date, amount, vendor from receipt images
- Receipt image storage and management strategy

### 6.2 Budget Management Implementation

#### 6.2.1 Budget Alerts

- Implement push notification system using Expo Notifications
- Create threshold-based alert system with configurable triggers
- Develop real-time budget monitoring service

#### 6.2.2 Budget Visualization

- Implement interactive charts using Victory Native
- Create animated progress indicators for budget status
- Design comparative visualizations for month-over-month analysis

#### 6.2.3 Budget Rollover

- Design database structure to track unused budget amounts
- Implement rollover rules engine with configurable options
- Create historical visualization of rollover trends

### 6.3 Financial Analytics Implementation

#### 6.3.1 Data Aggregation

- Design efficient data aggregation queries with PostgreSQL
- Implement caching strategy for frequently accessed analytics
- Create scheduled background calculations for complex analytics

#### 6.3.2 Trend Analysis

- Implement statistical analysis algorithms for trend detection
- Design anomaly detection system based on historical patterns
- Create predictive models using simple forecasting algorithms

#### 6.3.3 Visualization Components

- Implement reusable chart components with Victory Native
- Design interactive filtering and data exploration UI
- Create responsive visualization layouts for different device sizes

### 6.4 Income Allocation Implementation

#### 6.4.1 Allocation Engine

- Design flexible allocation rule system
- Implement percentage and fixed-amount allocation logic
- Create allocation suggestion algorithms based on financial best practices

#### 6.4.2 Goal Tracking

- Implement milestone-based goal tracking system
- Design progress visualization with projection capabilities
- Create celebration/achievement system for meeting goals

### 6.5 Receivables Tracker Implementation

#### 6.5.1 Loan Management

- Design comprehensive loan tracking system
- Implement reminder scheduling with push notifications
- Create flexible repayment tracking with partial payment support

#### 6.5.2 Interest Calculation

- Implement configurable interest calculation models
- Design amortization schedule generator
- Create visualization of payment schedules and interest accrual

### 6.6 Subscription Manager Implementation

#### 6.6.1 Subscription Tracking

- Design subscription management system with various renewal cycles
- Implement reminder system with configurable lead times
- Create usage tracking and value assessment algorithms

#### 6.6.2 Recommendations Engine

- Design algorithm for identifying low-use subscriptions
- Implement savings calculation for subscription optimization
- Create intelligent cancellation suggestion system

## 7. Conclusion

This Technical Requirements Document provides a comprehensive blueprint for the development of the Fiscal Fit application. It's designed to align with the product requirements while providing specific technical implementation details for the development team.

The document will be reviewed and updated regularly throughout the development process to reflect changing requirements or technical decisions.
