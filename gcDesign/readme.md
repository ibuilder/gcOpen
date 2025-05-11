# gcDesign - Construction Project Management System

## Project Structure

```
gcDesign/
├── index.html (redirects to dashboard.html)
├── dashboard.html
├── file-explorer.html
├── drawings.html
├── specifications.html
├── rfis.html
├── submittals.html
├── permits.html
├── field-reports.html
├── meetings.html
├── transmittals.html
├── companies.html
├── project-info.html
├── users.html
├── components/
│   ├── sidebar.html
│   └── header.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── component-loader.js
│   └── img/
│       └── logo.png
└── README.md
```

## Features

- Responsive design using Bootstrap 5
- Modular HTML components
- Dynamic modals for adding/editing content
- Sidebar navigation
- Dashboard with project status, document tracking, and scheduling
- File management system
- Drawing management with revisions
- RFI and submittal tracking
- Meeting scheduler
- Company and user management

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome Icons

## Getting Started

### Development Setup
1. Clone the repository
2. Set up a local web server (due to CORS restrictions when loading components)
   - Option 1: Using Python: `python -m http.server 8000`
   - Option 2: Using Node.js: `npx http-server`
   - Option 3: Using VS Code Live Server extension
3. Navigate to `http://localhost:8000` (or your server's URL)
4. The site will automatically redirect to the dashboard

### Direct File Access
If you want to open files directly without a server:
1. All HTML files are in the root directory
2. Components won't load due to CORS restrictions
3. You'll see the basic page structure without sidebar and header

## Components

### Sidebar
Located in `components/sidebar.html`, included in all pages for consistent navigation.

### Header
Located in `components/header.html`, included in all pages with search functionality and user menu.

### Modals
All modal components are stored in `components/modals/` directory and loaded dynamically.

## Pages

1. **Dashboard** (`dashboard.html`) - Overview of project status, documents, and schedule
2. **File Explorer** (`file-explorer.html`) - File management interface
3. **Drawings** (`drawings.html`) - Construction drawing management
4. **Specifications** (`specifications.html`) - Project specifications tracking
5. **RFIs** (`rfis.html`) - Request for Information management
6. **Submittals** (`submittals.html`) - Submittal tracking system
7. **Permits** (`permits.html`) - Permit management
8. **Field Reports** (`field-reports.html`) - Field report documentation
9. **Meetings** (`meetings.html`) - Meeting scheduler and tracker
10. **Transmittals** (`transmittals.html`) - Document transmittal system
11. **Companies** (`companies.html`) - Company management
12. **Project Information** (`project-info.html`) - Project details and settings
13. **Users** (`users.html`) - User management system

## Dependencies

- Bootstrap 5.3.0
- Font Awesome 6.0.0
- jQuery 3.6.0 (for Bootstrap functionality)
