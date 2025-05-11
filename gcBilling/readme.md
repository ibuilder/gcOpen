# GCBilling - Construction Billing Application

A comprehensive construction billing application designed for managing project financial aspects including applications for payment, change orders, budget tracking, and reporting.

## File Structure

```
gcBilling/
├── README.md
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── logo.png
├── components/
│   ├── sidebar.html
│   ├── header.html
│   └── modals/
│       ├── new-application.html
│       ├── new-change-order.html
│       ├── add-team-member.html
│       └── export-report.html
└── pages/
    ├── dashboard.html
    ├── project-information.html
    ├── budget.html
    ├── organization-chart.html
    ├── general-conditions.html
    ├── schedule-of-values.html
    ├── change-orders.html
    ├── applications.html
    ├── reports.html
    ├── settings.html
    ├── user.html
    └── help.html
```

## Page Mapping

1. **dashboard.html** - Main dashboard with financial overview (Page 1)
2. **project-information.html** - Project details and information (Page 2)
3. **budget.html** - Budget management interface (Page 3)
4. **organization-chart.html** - Team organization chart (Pages 4-5)
5. **general-conditions.html** - General conditions management (Page 6)
6. **schedule-of-values.html** - Schedule of values tracking (Page 7)
7. **change-orders.html** - Change order management (Page 8)
8. **applications.html** - Applications for payment (Page 9)
9. **reports.html** - Report generation interface (Pages 10-13)
10. **settings.html** - Unified settings page with tabs:
    - Project Information (Pages 20, 21)
    - General Conditions Categories (Page 21)
    - Cost Codes (Pages 14, 22)
11. **user.html** - User profile page with tabs:
    - Profile Information (Pages 18, 27)
    - Password Management (Pages 17, 28)
    - Notification Preferences (Pages 16, 29)
12. **help.html** - Help & FAQs with tabs (Pages 19, 23-26)
    - General Questions
    - Project Information  
    - Applications for Payment
    - Schedule of Values
    - General Conditions

## Dependencies

- Bootstrap 5.3.x
- Font Awesome 6.x
- Chart.js 3.x (for dashboard charts)

## Getting Started

1. Clone this repository
2. Open `index.html` in a web browser
3. Navigate through the application using the sidebar

## Module Structure

The application uses modular components to maintain consistency:
- **Sidebar**: Included via iframe or JavaScript injection
- **Header**: Common header component across all pages
- **Modals**: Reusable modal components for various actions

## Features

- Dashboard with key metrics and charts
- Project information management
- Budget tracking and reporting
- Change order management
- Applications for payment tracking
- Comprehensive reporting system
- Settings and preferences management

## Color Scheme

- Primary Blue: #0d6efd
- Dark Background: #212529
- Sidebar Dark: #1e2125
- Success Green: #198754
- Warning Yellow: #ffc107
- Light Gray: #f8f9fa
- Text Dark: #212529
- Text Muted: #6c757d
