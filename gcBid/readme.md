# gcBid Dashboard

A construction project management dashboard built with Bootstrap 5.

## File Structure

```
project/
│
├── dashboard.html          # Home/Dashboard page (Page 1)
├── projects.html          # Projects management (Page 2)
├── qualified-bidders.html # Qualified bidders list (Page 3)
├── prequalifications.html # Prequalifications (Page 4)
├── bid-packages.html      # Bid packages management (Page 5)
├── budget.html            # Budget overview (Page 6)
├── schedule.html          # Schedule of values (Page 7)
├── contracts.html         # Contracts management (Page 8)
├── companies.html         # Companies directory (Page 9)
├── disciplines.html       # Disciplines/CSI divisions (Page 10)
├── users.html             # User management (Page 11)
├── reports.html           # Reports section (Page 12)
├── file-explorer.html     # File explorer (Page 13)
│
├── styles.css             # Custom CSS styles
├── script.js              # JavaScript for functionality
└── README.md             # This file
```

## Features

- **Responsive sidebar navigation**
- **Bootstrap 5 modals** for adding new items
- **Interactive dashboard** with statistics
- **Form validation** and submission handling
- **Data tables** for listing items
- **Search functionality**
- **User authentication interface**

## Dependencies

- Bootstrap 5.1.3
- Font Awesome 6.0.0
- Modern web browser with JavaScript enabled

## Setup

1. Download all files to a directory
2. Open `dashboard.html` in a web browser
3. Navigate through the sidebar menu

## Modal Forms

Each page includes appropriate modal forms for adding new items:
- Add Project
- Add Qualified Bidder
- Add Prequalification
- Add Bid Package
- Add Budget
- Add Schedule of Values
- Add Contract
- Add Company
- Add Discipline
- Add User

## Styling

Custom CSS classes include:
- `.sidebar` - Left navigation panel
- `.stat-card` - Dashboard statistics cards
- `.activity-item` - Recent activity items
- `.deadline-item` - Upcoming deadlines

## JavaScript Functionality

- Modal form submissions
- Search functionality
- Sidebar navigation active states
- File upload handling
- Project selection dropdown
- User sign out

## Notes

- All pages share the same sidebar navigation
- Empty state messages are shown when no data exists
- Forms include validation but don't persist data
- File uploads are handled client-side only