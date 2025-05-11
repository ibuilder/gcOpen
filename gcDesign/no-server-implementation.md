# No-Server Implementation Guide for gcDesign

This guide provides instructions for running gcDesign without a local server, using embedded JavaScript components.

## Files Required

1. Replace `component-loader.js` with `embedded-components.js` 
2. Update all HTML files to use the embedded component loader

## Steps to Implement

### Step 1: Save the New Component Loader
Save the `embedded-components.js` file in your `assets/js/` directory. This file contains the sidebar and header HTML embedded as JavaScript strings.

### Step 2: Update HTML Files
For each HTML file, replace the script section at the bottom with:

```html
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Embedded Components -->
    <script src="assets/js/embedded-components.js"></script>
    <!-- Custom JS -->
    <script src="assets/js/main.js"></script>
</body>
</html>
```

### Step 3: File Structure
Your project structure should look like this:
```
gcDesign/
├── index.html
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
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       └── embedded-components.js
└── components/  (no longer needed for this approach)
```

## Usage

1. Open any HTML file directly in your browser
2. The sidebar and header will load automatically
3. Navigate between pages using the sidebar links

## Advantages

- Works without a local server
- Can be opened directly from the file system
- No CORS issues
- Easier deployment and sharing

## Limitations

- Less modular than external component files
- Components must be updated in the JavaScript file rather than separate HTML files

## Troubleshooting

If components don't appear:
1. Check that `embedded-components.js` is in the correct location
2. Verify the script path in your HTML files
3. Check the browser console for JavaScript errors
4. Ensure Bootstrap is loading correctly

## Converting Back to Server Version

If you later want to use the server-based component loader:
1. Replace `embedded-components.js` with `component-loader.js` in your script tags
2. Create the separate component HTML files
3. Run a local server as described in the main documentation
