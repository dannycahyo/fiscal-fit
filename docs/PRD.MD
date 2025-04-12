# Fiscal Fit - Product Requirements Document

## 1. Executive Summary

Fiscal Fit is a comprehensive personal finance management application designed to help users track expenses, manage budgets, allocate income, monitor receivables, and manage subscriptions. The application aims to solve common financial management challenges through an intuitive, feature-rich platform available on mobile and web.

## 2. Problem Statement

Many individuals face significant challenges in managing their personal finances effectively:

- **Forgotten Expenses**: Users frequently forget to track their spending, leading to budget oversights.
- **Limited Visibility**: Users lack clear insights into spending patterns across different time frames (daily, weekly, monthly, yearly).
- **Disorganized Budgeting**: Expenses are not properly categorized, making budget management difficult.
- **Poor Income Allocation**: Users struggle to distribute their income effectively across financial goals (emergency funds, investments, entertainment, learning, charity).
- **Receivables Management**: Tracking loans given to others is challenging, leading to forgotten debts.
- **Subscription Chaos**: Users lose track of their subscriptions, forgetting renewal dates and struggling to manage recurring expenses.

## 3. Product Vision

Fiscal Fit will transform personal financial management through thoughtful automation, insightful analytics, and behavioral psychology, empowering users to develop better financial habits and achieve their financial goals.

## 4. Core Features & Requirements

### 4.1 Expense Tracking

| ID   | User Story                                                                   | Requirements                                                                                           | Priority |
| ---- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------- |
| ET-1 | As a user, I want to quickly log expenses so I don't forget them.            | - One-tap expense entry<br>- Voice input option<br>- Frequently used expense shortcuts                 | High     |
| ET-2 | As a user, I want to scan receipts to automatically capture expense details. | - OCR technology integration<br>- Automatic categorization<br>- Data extraction (date, amount, vendor) | Medium   |
| ET-3 | As a user, I want expenses to be automatically categorized to save time.     | - ML-based categorization<br>- Category suggestions<br>- Manual override option                        | High     |
| ET-4 | As a user, I want to see where I spent money to understand my habits.        | - Location tagging<br>- Map visualization<br>- Location-based insights                                 | Low      |
| ET-5 | As a user, I want to track expenses in multiple currencies for my travels.   | - Multi-currency support<br>- Exchange rate integration<br>- Base currency conversion                  | Medium   |

### 4.2 Budget Management

| ID   | User Story                                                                    | Requirements                                                                                   | Priority |
| ---- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------- |
| BM-1 | As a user, I want to create custom budget categories that match my lifestyle. | - Custom category creation<br>- Category icons/colors<br>- Nested subcategories                | High     |
| BM-2 | As a user, I want to set monthly/weekly budgets to control my spending.       | - Flexible budget periods<br>- Budget templates<br>- Amount-based and percentage-based options | High     |
| BM-3 | As a user, I want to visualize my budget progress to stay on track.           | - Progress bars/charts<br>- Color-coded indicators<br>- Remaining amount calculation           | High     |
| BM-4 | As a user, I want alerts when I'm approaching budget limits.                  | - Customizable threshold alerts<br>- Push notifications<br>- Email digests                     | Medium   |
| BM-5 | As a user, I want unused budget to roll over to the next period.              | - Configurable rollover rules<br>- Rollover history<br>- Rollover limits                       | Low      |

### 4.3 Financial Analytics

| ID   | User Story                                                                   | Requirements                                                                                          | Priority |
| ---- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------- |
| FA-1 | As a user, I want to see my spending over various time periods.              | - Daily/weekly/monthly/yearly views<br>- Custom date range selection<br>- Comparative period analysis | High     |
| FA-2 | As a user, I want to analyze spending by category to identify problem areas. | - Category breakdown charts<br>- Trend analysis<br>- Anomaly detection                                | High     |
| FA-3 | As a user, I want to visualize spending trends to understand habits.         | - Line/bar charts<br>- Heatmaps<br>- Interactive data exploration                                     | Medium   |
| FA-4 | As a user, I want spending forecasts based on my history.                    | - ML-based forecasting<br>- Seasonal adjustment<br>- "What-if" scenario modeling                      | Low      |
| FA-5 | As a user, I want to compare my current spending to past periods.            | - Month-over-month comparison<br>- Year-over-year analysis<br>- Custom period comparison              | Medium   |

### 4.4 Income Allocation

| ID   | User Story                                                             | Requirements                                                                                            | Priority |
| ---- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------- |
| IA-1 | As a user, I want to create allocation categories for my income.       | - Customizable allocation buckets<br>- Percentage/amount-based allocation<br>- Visual allocation editor | High     |
| IA-2 | As a user, I want allocation templates to quickly set up my finances.  | - Predefined templates (50/30/20, etc.)<br>- Custom template creation<br>- Template sharing             | Medium   |
| IA-3 | As a user, I want to set and track financial goals.                    | - Goal creation (amount/date)<br>- Progress tracking<br>- Milestone celebrations                        | High     |
| IA-4 | As a user, I want recommended distributions based on best practices.   | - Smart suggestions<br>- Personalized advice<br>- Financial health score                                | Low      |
| IA-5 | As a user, I want to see my savings rate and how it changes over time. | - Savings rate calculation<br>- Historical tracking<br>- Benchmark comparison                           | Medium   |

### 4.5 Receivables Tracker

| ID   | User Story                                                        | Requirements                                                                              | Priority |
| ---- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------- |
| RT-1 | As a user, I want to track money I've loaned to others.           | - Loan entry (amount, person, date)<br>- Status tracking<br>- Notes and attachments       | High     |
| RT-2 | As a user, I want reminders about loans due to be repaid.         | - Due date setting<br>- Configurable reminders<br>- Shareable reminders to borrowers      | High     |
| RT-3 | As a user, I want to calculate interest on loans if applicable.   | - Simple/compound interest calculation<br>- Customizable rates<br>- Accrual visualization | Low      |
| RT-4 | As a user, I want to set up repayment schedules for larger loans. | - Installment planning<br>- Payment schedule<br>- Partial payment tracking                | Medium   |
| RT-5 | As a user, I want to visualize all outstanding debts.             | - Debt dashboard<br>- Person-based grouping<br>- Timeline visualization                   | Medium   |

### 4.6 Subscription Manager

| ID   | User Story                                                           | Requirements                                                                                   | Priority |
| ---- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------- |
| SM-1 | As a user, I want to track all my subscriptions in one place.        | - Subscription entry<br>- Service categorization<br>- Recurring cycle setup                    | High     |
| SM-2 | As a user, I want reminders before subscriptions renew.              | - Configurable lead time<br>- Renewal notifications<br>- Action buttons (remind later, cancel) | High     |
| SM-3 | As a user, I want to analyze my subscription spending.               | - Total subscription cost<br>- Service breakdown<br>- Usage value analysis                     | Medium   |
| SM-4 | As a user, I want recommendations for subscriptions I should cancel. | - Low-usage detection<br>- Duplicate service identification<br>- Cost-saving recommendations   | Low      |
| SM-5 | As a user, I want integration with popular subscription services.    | - API integrations<br>- Automatic status updates<br>- Direct management links                  | Medium   |

## 5. User Journeys

### 5.1 Onboarding Journey

1. User downloads app and creates account
2. User completes initial profile (income, financial goals)
3. User sets up initial budget categories
4. User connects banking accounts (optional)
5. User completes tutorial on core features
6. User adds first expense

### 5.2 Daily Usage Journey

1. User opens app to log new expense
2. User selects category, enters amount
3. User checks budget status
4. User views daily spending summary
5. User receives insights on recent spending pattern

### 5.3 Monthly Financial Planning Journey

1. User receives month-end summary notification
2. User reviews previous month's performance
3. User adjusts budget categories based on insights
4. User allocates new income for upcoming month
5. User reviews and updates financial goals

### 5.4 Debt/Receivables Management Journey

1. User logs money loaned to friend
2. User sets repayment date and reminder
3. User receives notification as date approaches
4. User logs repayment when received
5. User reviews lending history
