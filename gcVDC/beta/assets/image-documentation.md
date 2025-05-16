# gcVDC Image System Documentation

## Overview

This document provides comprehensive information about the image system used in the gcVDC application. It covers all available images, their usage patterns, and best practices for implementation.

## Image Asset Structure

All image assets are stored in the `assets/img/` directory with the following organization:

```
assets/
└── img/
    ├── logo.svg                  # Main application logo
    ├── favicon.svg               # Browser tab icon
    ├── system-icons.svg          # Combined system icons
    ├── structural-icon.svg       # Structural system icon
    ├── mechanical-icon.svg       # Mechanical system icon
    ├── electrical-icon.svg       # Electrical system icon
    ├── plumbing-icon.svg         # Plumbing system icon
    ├── fire-protection-icon.svg  # Fire protection system icon
    ├── architectural-icon.svg    # Architectural system icon
    ├── empty-state.svg           # Empty state illustration
    ├── plan-placeholder.svg      # Plan placeholder
    ├── model-placeholder.svg     # 3D model visualization placeholder
    ├── no-data-chart.svg         # No data chart placeholder
    ├── user-avatar.svg           # Default user avatar
    └── placeholder.svg           # Generic placeholder
```

## Image Types

### Branding Elements

| Image      | File           | Description                      | Usage                                        |
|------------|----------------|----------------------------------|----------------------------------------------|
| Logo       | logo.svg       | Main application logo            | Header, login screen, reports                |
| Favicon    | favicon.svg    | Browser tab icon                 | Browser tabs, bookmarks                      |

### System Icons

| Icon           | File                      | Color     | Usage                                       |
|----------------|---------------------------|-----------|---------------------------------------------|
| Structural     | structural-icon.svg       | #0d6efd   | Structural elements, beams, columns         |
| Mechanical     | mechanical-icon.svg       | #0dcaf0   | HVAC, ducts, mechanical equipment           |
| Electrical     | electrical-icon.svg       | #ffc107   | Electrical elements, wiring, panels         |
| Plumbing       | plumbing-icon.svg         | #20c997   | Pipes, fixtures, drains                     |
| Fire Protection| fire-protection-icon.svg  | #dc3545   | Sprinklers, fire alarms, extinguishers      |
| Architectural  | architectural-icon.svg    | #6f42c1   | Walls, doors, windows, architectural elements|

### Placeholder Images

| Image             | File                  | Usage                                           |
|-------------------|----------------------|--------------------------------------------------|
| Empty State       | empty-state.svg      | Empty lists, no search results                   |
| Plan Placeholder  | plan-placeholder.svg | Missing plan preview                             |
| Model Placeholder | model-placeholder.svg| 3D model visualization area                      |
| No Data Chart     | no-data-chart.svg    | Charts without data                              |
| User Avatar       | user-avatar.svg      | Default user profile image                       |
| Generic Placeholder| placeholder.svg     | Fallback for any missing images                  |

## CSS Files

The image system is supported by the following CSS files:

1. **image-styles.css**: Basic styling for all images
2. **icon-sprites.css**: Sprite sheet implementation for system icons and status indicators

## JavaScript Utilities

The `image-utils.js` file provides helper functions for working with images:

### Functions

#### `getSystemIcon(systemType, large = false)`

Returns HTML for the system icon based on the system type.

```javascript
// Example
const structuralIcon = gcVDC.getSystemIcon('Structural'); // Regular size
const largeIcon = gcVDC.getSystemIcon('Mechanical', true); // Large size
```

#### `getPlaceholderImage(type, message = '')`

Returns HTML for a placeholder image with an optional message.

```javascript
// Example
const emptyState = gcVDC.getPlaceholderImage('empty-state', 'No data found');
```

#### `getUserAvatar(userId = null, large = false)`

Returns HTML for a user avatar.

```javascript
// Example
const avatar = gcVDC.getUserAvatar();
const largeAvatar = gcVDC.getUserAvatar(null, true);
```

## Implementation Guide

### Basic Image Usage

```html
<!-- Simple image -->
<img src="assets/img/logo.svg" alt="gcVDC Logo">

<!-- System icon -->
<img src="assets/img/structural-icon.svg" alt="Structural System" class="system-icon">

<!-- Placeholder -->
<img src="assets/img/empty-state.svg" alt="No items found" class="empty-state-img">
```

### Advanced Image Styling

```html
<!-- Image with overlay -->
<div class="img-container">
  <img src="assets/img/plan-placeholder.svg" alt="Plan Preview">
  <div class="img-overlay">
    <button class="btn btn-primary">View Plan</button>
  </div>
  <span class="img-badge">New</span>
</div>

<!-- System icon with status -->
<div class="d-flex align-items-center">
  <img src="assets/img/mechanical-icon.svg" alt="Mechanical System" class="system-icon me-2">
  <span class="status-indicator status-in-progress me-1"></span>
  <span>In Progress</span>
</div>
```

### Using JavaScript Utilities

```javascript
// Get a system icon and insert it into the DOM
const container = document.getElementById('icon-container');
container.innerHTML = gcVDC.getSystemIcon('Structural');

// Show empty state placeholder when no data is available
function updateElementsList(elements) {
  const container = document.getElementById('elements-container');
  
  if (!elements || elements.length === 0) {
    container.innerHTML = gcVDC.getPlaceholderImage('empty-state', 'No elements found. Add some elements to get started.');
    return;
  }
  
  // Render elements list...
}

// Load user avatar
function loadUserProfile(userId) {
  const profileImage = document.getElementById('profile-image');
  profileImage.innerHTML = gcVDC.getUserAvatar(userId, true);
  
  // Load other profile information...
}
```

### Using CSS Classes

The image system provides several CSS classes to handle different use cases:

#### System Icons

```html
<!-- Regular size system icon -->
<img src="assets/img/structural-icon.svg" alt="Structural System" class="system-icon">

<!-- Large size system icon -->
<img src="assets/img/mechanical-icon.svg" alt="Mechanical System" class="system-icon-lg">

<!-- System icon with specific styling -->
<img src="assets/img/electrical-icon.svg" alt="Electrical System" class="system-icon system-icon-electrical">
```

#### Status Indicators

```html
<!-- Status indicator for "Not Started" -->
<span class="status-indicator status-not-started"></span>

<!-- Status indicator with text -->
<div class="d-flex align-items-center">
  <span class="status-indicator status-in-progress me-1"></span>
  <span>In Progress</span>
</div>

<!-- Status indicator in a badge -->
<span class="badge bg-success">
  <span class="status-indicator status-complete me-1"></span>
  Complete
</span>
```

#### Placeholder Images

```html
<!-- Empty state placeholder -->
<img src="assets/img/empty-state.svg" alt="No items found" class="empty-state-img">

<!-- Plan placeholder -->
<img src="assets/img/plan-placeholder.svg" alt="No plan preview" class="plan-placeholder-img">

<!-- No data chart placeholder -->
<img src="assets/img/no-data-chart.svg" alt="No data available" class="no-data-chart-img">

<!-- 3D model placeholder -->
<img src="assets/img/model-placeholder.svg" alt="3D model visualization" class="model-placeholder-img">

<!-- User avatar -->
<img src="assets/img/user-avatar.svg" alt="User Avatar" class="user-avatar">

<!-- Generic placeholder -->
<img src="assets/img/placeholder.svg" alt="Image" class="placeholder-img">
```

### Using Sprite Sheets

The icon-sprites.css file provides a sprite sheet implementation for more efficient loading of multiple icons:

```html
<!-- Using sprite sheet for system icons -->
<span class="system-icon-sprite system-icon-structural"></span>
<span class="system-icon-sprite system-icon-mechanical"></span>
<span class="system-icon-sprite system-icon-electrical"></span>

<!-- Large icon from sprite sheet -->
<span class="system-icon-sprite system-icon-plumbing large"></span>
```

## Best Practices

1. **Always include alt text** for images to ensure accessibility.
2. **Use the appropriate CSS classes** to ensure consistent styling.
3. **Preload important images** using the preload-images class:
   ```html
   <div class="preload-images">
     <img src="assets/img/logo.svg" alt="Preload Logo">
     <!-- Additional preloaded images -->
   </div>
   ```
4. **Handle loading errors** by including fallback images:
   ```javascript
   // Example from image-utils.js
   img.addEventListener('error', function() {
     this.src = 'assets/img/placeholder.svg';
   });
   ```
5. **Use SVG images when possible** for better scaling and smaller file sizes.
6. **Apply proper sizing** with CSS classes rather than inline styles.
7. **Use JavaScript utilities** for dynamic image insertion.
8. **Implement lazy loading** for images that are not immediately visible.

## Dark Mode Support

The image styling includes automatic adjustments for dark mode:

```css
/* From image-styles.css */
[data-theme="dark"] .placeholder-img {
  filter: brightness(0.8);
}

[data-theme="dark"] .system-icon {
  filter: brightness(1.1);
}
```

No additional configuration is needed—the images will automatically adapt to dark mode when the `data-theme="dark"` attribute is set on the HTML element.

## Image Gallery

For a visual reference of all available images, browse the image gallery page at:

```
/image-gallery.html
```

This page displays all available images with code examples and usage information.

## Adding New Images

To add new images to the system:

1. Add the SVG file to the `assets/img/` directory
2. Add the appropriate CSS classes to `image-styles.css`
3. Update the `image-utils.js` file if needed
4. Add the image to the preload section if it's frequently used
5. Update this documentation to include the new image

## Browser Compatibility

The SVG images and styling are compatible with all modern browsers, including:

- Chrome 49+
- Firefox 45+
- Safari 9+
- Edge 12+
- Opera 36+

For older browsers, consider adding PNG fallbacks for critical images.

## Performance Considerations

To optimize image loading and performance:

1. **Use the sprite sheet** for frequently used icons
2. **Preload critical images** that appear above the fold
3. **Lazy load non-critical images** that appear below the fold
4. **Minimize SVG file sizes** by removing unnecessary elements and attributes
5. **Cache images** with appropriate HTTP headers
6. **Use CSS for animations and effects** rather than animated images

## Conclusion

The gcVDC image system provides a comprehensive and flexible framework for managing images throughout the application. By following these guidelines and using the provided utilities, you can ensure consistent and efficient image usage.

For additional assistance or feature requests related to the image system, please contact the development team.
