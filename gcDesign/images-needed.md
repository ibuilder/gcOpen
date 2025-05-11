# Images Needed for gcDesign

## Required Images

### 1. Logo Files
- **logo.png** - Main company logo (recommended: 200x60px)
- **logo-icon.png** - Square icon version (recommended: 64x64px)
- **favicon.ico** - Browser tab icon (16x16px and 32x32px)
- **Path**: `assets/img/`

### 2. User Avatar Placeholders
- **default-avatar.png** - Default user avatar (recommended: 150x150px)
- **team-avatar-1.png** - Sample team member avatars
- **team-avatar-2.png**
- **team-avatar-3.png**
- **Path**: `assets/img/avatars/`

### 3. Company Logos
- **company-placeholder.png** - Default company logo (recommended: 100x100px)
- **abc-contractors-logo.png** - Sample company logo
- **Path**: `assets/img/companies/`

### 4. Empty State Illustrations
- **no-files.svg** - For empty file explorer
- **no-drawings.svg** - For empty drawings page
- **no-meetings.svg** - For empty meetings page
- **no-reports.svg** - For empty reports page
- **Path**: `assets/img/empty-states/`

### 5. File Type Icons
- **pdf-icon.png** - PDF file icon
- **dwg-icon.png** - AutoCAD drawing icon
- **doc-icon.png** - Document icon
- **xls-icon.png** - Spreadsheet icon
- **Path**: `assets/img/file-types/`

### 6. Project Images
- **project-thumbnail.jpg** - Default project image (recommended: 400x300px)
- **building-placeholder.jpg** - Placeholder for building photos
- **construction-site.jpg** - Generic construction site image
- **Path**: `assets/img/projects/`

## File Structure with Images

```
gcDesign/
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── embedded-components.js
    │   └── main.js
    └── img/
        ├── logo.png
        ├── logo-icon.png
        ├── favicon.ico
        ├── avatars/
        │   ├── default-avatar.png
        │   ├── team-avatar-1.png
        │   ├── team-avatar-2.png
        │   └── team-avatar-3.png
        ├── companies/
        │   ├── company-placeholder.png
        │   └── abc-contractors-logo.png
        ├── empty-states/
        │   ├── no-files.svg
        │   ├── no-drawings.svg
        │   ├── no-meetings.svg
        │   └── no-reports.svg
        ├── file-types/
        │   ├── pdf-icon.png
        │   ├── dwg-icon.png
        │   ├── doc-icon.png
        │   └── xls-icon.png
        └── projects/
            ├── project-thumbnail.jpg
            ├── building-placeholder.jpg
            └── construction-site.jpg
```

## How to Create These Images

### 1. Logo
- Use a design tool like Canva, Figma, or Adobe Illustrator
- Create a construction/building-themed logo
- Use blue (#1a237e) as primary color to match the theme

### 2. Avatars
- Use placeholder services or create simple illustrations
- Ensure consistent style across all avatars
- Save as PNG with transparent background

### 3. Empty State Illustrations
- Use services like UnDraw.co or create simple SVG illustrations
- Keep them minimal and match the application's color scheme
- Save as SVG for better scalability

### 4. File Type Icons
- Create simple, flat-design icons
- Use consistent colors and style
- Size: 48x48px or 64x64px

## Alternative: Use External Services

Instead of creating all images, you can use:

1. **For Avatars**: Continue using DiceBear API
2. **For Icons**: Use Font Awesome icons throughout
3. **For Illustrations**: Use UnDraw.co inline SVGs
4. **For Logos**: Use CSS-based text logos

This approach keeps the application lightweight and reduces maintenance.
