# gcOpen.org Website

This repository contains the website for gcOpen.org, a platform providing open-source tools for General Contractors and the Construction Industry. The website showcases our suite of Laravel applications and provides resources for users.

## Project Overview

gcOpen.org offers several open-source tools for the construction industry:

- **gcBid**: Streamlines the bidding process with automated estimations and proposal generation
- **gcDeliver**: Manages deliveries, tracks materials, and coordinates with suppliers
- **gcBilling**: Generates invoices, tracks payments, and manages financial records
- **gcDesign**: Provides planning, design, and visualization tools for construction projects

## File Structure

```
gcopen-website/
├── index.html                  # Main landing page
├── faq.html                    # FAQ and installation guide
├── css/
│   ├── styles.css              # Main stylesheet
│   └── responsive.css          # Media queries for responsiveness
├── js/
│   ├── main.js                 # Main JavaScript file
│   └── form-handler.js         # Form submission logic
├── img/
│   ├── logo.svg                # gcOpen logo
│   ├── blueprint-bg.svg        # Blueprint background for jumbotron
│   ├── product-thumbnails/     # Product screenshots
│   │   ├── gcbid-thumbnail.svg
│   │   ├── gcdeliver-thumbnail.svg
│   │   ├── gcbilling-thumbnail.svg
│   │   └── gcdesign-thumbnail.svg
│   ├── testimonials/           # Testimonial avatars
│   │   ├── avatar-1.svg
│   │   ├── avatar-2.svg
│   │   └── avatar-3.svg
│   └── icons/                  # Custom icons (if any)
├── docs/
│   ├── installation.md         # Detailed installation guide
│   ├── firebase-hosting.md     # Firebase hosting guide
│   ├── laravel-forge.md        # Laravel Forge guide
│   ├── digitalocean.md         # DigitalOcean hosting guide
│   └── laravel-cloud.md        # Laravel Cloud guide
├── setup-gcopen-website.sh     # Master setup script
└── README.md                   # This file
```

## Setup and Deployment

### Local Development

1. Clone this repository:
   ```
   git clone https://github.com/gcopen/website.git
   cd website
   ```

2. Open `index.html` in your browser to view the website locally.

3. Make changes as needed and test locally before deployment.

### Deployment

#### Option 1: Standard Web Hosting

1. Upload all files to your web hosting provider using FTP or their control panel.
2. Ensure proper permissions are set on all files and directories.

#### Option 2: GitHub Pages

1. Push your changes to the `main` branch.
2. Go to repository Settings > Pages.
3. Select the `main` branch as the source.
4. The website will be available at `https://[username].github.io/website/`.

#### Option 3: Netlify/Vercel

1. Connect your GitHub repository to Netlify or Vercel.
2. Configure build settings (not required for static HTML).
3. Deploy automatically with each push to the main branch.

## Customization

### Product Information

To update product information, edit the card sections in `index.html`:

```html
<div class="card-body text-center">
    <div class="product-icon">
        <i class="fas fa-file-contract"></i>
    </div>
    <h4 class="card-title">gcBid</h4>
    <p class="card-text">Your product description here.</p>
    <div class="mt-auto">
        <a href="#" class="btn btn-primary mb-2 w-100 demo-btn">Live Demo</a>
        <a href="https://github.com/gcopen/gcBid" target="_blank" class="btn btn-outline-dark w-100">
            <i class="fab fa-github me-2"></i>GitHub
        </a>
    </div>
</div>
```

### Styling

The website uses custom CSS variables for consistent styling. To change the color scheme, edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #0056b3;
    --secondary-color: #17a2b8;
    --accent-color: #ffc107;
}
```

## Contributing

Contributions to improve the website are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact us at support@gcopen.org or open an issue on GitHub.
