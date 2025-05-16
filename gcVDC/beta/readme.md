# gcVDC - Global Construction Virtual Design and Construction

![gcVDC Logo](assets/img/logo.svg)

## Overview

gcVDC is a comprehensive web application designed for construction project management, with a focus on work tracking, clash detection, reporting, and plan management. This application provides a unified platform for construction project stakeholders to collaborate, track progress, and identify potential issues before they occur on the construction site.

## Features

### 1. Work In Place Tracking
- Track construction elements across different systems (Structural, Mechanical, Electrical, Plumbing, Fire Protection, Architectural)
- View and update element status (Not Started, In Progress, Complete, On Hold)
- Filter elements by system, status, location, and more
- Monitor progress by system and overall project completion

### 2. Clash Detection
- Configure clash detection settings between different building systems
- Set tolerance levels for each system pair
- Run clash detection and visualize results
- View and manage clashes by priority and type
- Track clash resolution status

### 3. Reports
- Generate custom reports with selected building systems
- Choose from various report formats (PDF, Excel, Word, HTML)
- Include charts, data, and summaries
- View progress trends over time
- Track status distribution across elements

### 4. Plan Management
- Upload and organize construction plans by system and level
- Track plan versions and changes
- View and download plans
- Filter plans by system type

### 5. Settings and Configuration
- Configure user preferences and notification settings
- Customize project information and settings
- Adjust 3D viewer settings and system colors
- Switch between light and dark themes

## Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5 for responsive design
- Chart.js for data visualization
- Font Awesome for icons

### Planned Backend
- Node.js with Express
- MongoDB or PostgreSQL database
- JWT for authentication
- RESTful API architecture

## Project Structure

```
gcVDC/
├── README.md                     # Project documentation
├── assets/                       # Static assets
│   ├── css/                      # CSS stylesheets
│   │   ├── style.css             # Main stylesheet
│   │   └── dark-theme.css        # Dark theme styles
│   ├── js/                       # JavaScript files
│   │   ├── main.js               # Main JavaScript functionality
│   │   ├── modals.js             # Modal management
│   │   ├── charts.js             # Charts and data visualization
│   │   └── filters.js            # Filtering functionality
│   └── img/                      # Images and icons
│       ├── logo.svg              # gcVDC logo
│       └── favicon.ico           # Favicon
├── components/                   # Reusable HTML components
│   ├── sidebar.html              # Sidebar navigation component
│   ├── header.html               # Header component
│   └── modals.html               # Modal components
├── index.html                # Dashboard page
├── work-in-place.html        # Work tracking page
├── clash-detection.html      # Clash detection page
├── reports.html              # Reports page
├── plans.html                # Plans page
└── settings.html             # Settings page
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server for local development (see options below)

### Running Locally

#### Option 1: Simple HTTP Server (Python)
If you have Python installed:

```bash
# Navigate to the project directory
cd gcVDC

# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```

Then open your browser to http://localhost:8000

#### Option 2: Using Node.js
If you have Node.js installed:

```bash
# Install serve globally (if not already installed)
npm install -g serve

# Navigate to the project directory
cd gcVDC

# Run the server
serve
```

Then follow the URL provided in the terminal (typically http://localhost:5000)

#### Option 3: Using Visual Studio Code
If you're using VS Code, you can use the "Live Server" extension:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Development Setup

For further development of the frontend:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gcVDC.git
cd gcVDC
```

2. Open the project in your preferred code editor

3. Make changes to the HTML, CSS, or JavaScript files

4. Refresh the browser to see your changes

### Backend Development

For backend development, see the IMPLEMENTATION_GUIDE.md for detailed instructions on setting up the backend API and database.

## Customization

### Theming
- Toggle between light and dark mode using the theme switcher in the sidebar
- Modify `style.css` and `dark-theme.css` for custom styling
- System and status colors can be changed in the Settings page

### Configuration
- Project settings can be modified in the Settings page
- User preferences can be set for notifications and appearance

## Deployment

### Basic Deployment
The current frontend implementation can be deployed to any web server or static hosting service.

1. Copy all files to your web server's public directory
2. Configure your web server to serve the files
3. Access the application through your domain

### Advanced Deployment
For a complete deployment with backend integration, see the IMPLEMENTATION_GUIDE.md for detailed instructions.

## Documentation

- README.md: Overview and setup instructions
- IMPLEMENTATION_GUIDE.md: Detailed implementation and backend development guide
- SUMMARY.md: Summary of developed components and next steps

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## Roadmap

### Phase 1: Frontend Enhancement
- Implement remaining interactive features
- Add form validation
- Enhance accessibility
- Add comprehensive error handling

### Phase 2: Backend Implementation
- Develop RESTful API endpoints
- Set up database models
- Implement authentication system
- Connect frontend to backend API

### Phase 3: Advanced Features
- 3D model viewer integration
- Real-time notifications
- Collaborative editing
- Mobile application

### Phase 4: Integration with External Systems
- BIM software integration
- Calendar and scheduling tools
- Document management systems
- Project management platforms

## Known Issues and Limitations

- This version is frontend-only with simulated data
- Some features require backend implementation to be fully functional
- Advanced clash detection requires 3D model processing
- Chart data is currently simulated

## Troubleshooting

### Common Issues
- **Issue**: Charts not displaying
  **Solution**: Make sure Chart.js is properly loaded or try clearing your browser cache

- **Issue**: Components not loading
  **Solution**: Ensure you're running the app from a web server, not opening HTML files directly

- **Issue**: Styling issues in certain browsers
  **Solution**: Check browser compatibility and consider adding appropriate polyfills

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap team for the responsive framework
- Chart.js developers for the visualization library
- Font Awesome for the icon set
- All contributors to the project

## Contact

For questions or support, please contact:
- Project Maintainer: [Your Name](mailto:your.email@example.com)
- Website: [yourdomain.com](https://yourdomain.com)
