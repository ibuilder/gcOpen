# Image Usage Instructions

## Created Images

Here are the images that need to be created for the gcBid dashboard:

### 1. User Avatar Images
- **user-avatar.svg** - Default user avatar (gray background)
- **user-avatar-admin.svg** - Admin user avatar (green background with 'A')

### 2. Empty State Images
- **empty-folder.svg** - Empty folder illustration
- **no-budget.svg** - No budget found illustration
- **empty-projects.svg** - No projects illustration

### 3. Chart Placeholders
- **chart-pie-placeholder.svg** - Pie chart placeholder
- **chart-bar-placeholder.svg** - Bar chart placeholder

## How to Save and Use

1. Create an `images` folder in your project directory
2. Save each SVG file with the filename provided
3. Update the HTML files to reference these images:

```html
<!-- Replace placeholder URLs with: -->
<img src="images/user-avatar-admin.svg" alt="Admin User" class="user-avatar">
```

## Updated File Structure

```
project/
├── images/
│   ├── user-avatar.svg
│   ├── user-avatar-admin.svg
│   ├── empty-folder.svg
│   ├── no-budget.svg
│   ├── empty-projects.svg
│   ├── chart-pie-placeholder.svg
│   └── chart-bar-placeholder.svg
├── dashboard.html
├── projects.html
├── ... (other HTML files)
├── styles.css
├── script.js
└── README.md
```

## HTML Updates Needed

After saving the images, update these references in your HTML files:

1. All occurrences of `https://via.placeholder.com/40` should be replaced with:
   - `images/user-avatar-admin.svg` for admin users
   - `images/user-avatar.svg` for regular users

2. For chart placeholders on the dashboard, you can optionally add:
   ```html
   <img src="images/chart-pie-placeholder.svg" alt="Chart" style="width: 120px; height: 120px;">
   ```

3. For the budget page empty state:
   ```html
   <img src="images/no-budget.svg" alt="No Budget" style="width: 120px; height: 120px;">
   ```

4. For the file explorer empty state:
   ```html
   <img src="images/empty-folder.svg" alt="Empty Folder" style="width: 120px; height: 120px;">
   ```