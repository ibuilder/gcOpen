# gcDeliver Dashboard

This is a dashboard application for gcDeliver, a construction project management platform. The application consists of 7 main pages with various settings sub-pages under the Settings section.

## File Structure

```
gcdeliver-dashboard/
│
├── index.html              # Dashboard (Page 1)
├── projects.html           # Projects page (Page 2)
├── partners.html           # Partners page (Page 3)
├── items.html              # Items page (Page 4)
├── deliveries.html         # Deliveries page (Page 5)
├── schedule.html           # Schedule/Gantt chart (Page 6)
├── daily-reports.html      # Daily Reports (Page 7)
├── settings.html           # Settings main page (Page 8 - includes all sub-pages as tabs)
├── sample-page.html        # Example page demonstrating component usage
│
├── css/
│   └── styles.css          # Main stylesheet
│
├── js/
│   ├── components.js       # Reusable HTML components
│   └── script.js           # JavaScript for modals and interactions
│
├── images/                 # Image assets
│   ├── company-logo.svg    # Company logo
│   ├── placeholder.svg     # Generic placeholder
│   ├── user-avatar.svg     # Default user profile picture
│   ├── project-placeholder.svg    # Project image placeholder
│   ├── item-placeholder.svg       # Item/material image placeholder
│   ├── partner-placeholder.svg    # Partner company logo placeholder
│   ├── weather-sun.svg           # Sunny weather icon
│   ├── weather-cloud-sun.svg     # Partly cloudy weather icon
│   └── weather-cloud-rain.svg    # Rainy weather icon
│
└── README.md              # This file
```

## Features

- Bootstrap-based responsive design
- Modular HTML components for easy maintenance
- Dynamic charts using Chart.js
- Modals for adding new projects, partners, items, deliveries, etc.
- Interactive Gantt chart on the Schedule page
- Settings page with multiple tabs:
  - Account Information
  - Company Profile
  - Export Data
  - Notification Preferences
  - Security Settings
  - Storage Management
  - Team Members

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- Chart.js (for data visualization)
- Bootstrap Icons

## Setup Instructions

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Navigate through different pages using the sidebar navigation

## Modular Architecture

The application uses a modular approach with reusable components:

- `components.js` contains functions to generate common UI elements:
  - `createSidebar(activePage)` - Generates the sidebar navigation
  - `createProjectCard(project)` - Creates project cards
  - `createPartnerCard(partner)` - Creates partner cards
  - `createDashboardCard(data)` - Creates dashboard stat cards
  - Helper functions for ratings, headers, etc.

## Page Descriptions

1. **Dashboard**: Overview of active projects, deliveries, pending items, and active partners
2. **Projects**: List of all construction projects with progress tracking
3. **Partners**: Manage suppliers and subcontractors
4. **Items**: Material and equipment inventory management
5. **Deliveries**: Track deliveries and manage delivery schedules
6. **Schedule**: Gantt chart visualization of project timelines
7. **Daily Reports**: Submit and view daily work reports
8. **Settings**: Configure account, company, notifications, security, and team settings

## Chart Integration

The dashboard includes two main charts:
- Project Progress Chart (Gantt-style horizontal bar chart)
- Manpower Distribution Chart (vertical bar chart)

Both charts are responsive and update based on selected filters.

## Note

This is a static HTML mockup. For a fully functional application, you would need to integrate with a backend server and database.

