# SmartSolve Landing Page

[SmartSolve Logo]

## Simplify your life with SmartSolve.

SmartSolve is a Pi-powered app that brings together task planning, budgeting, meal planning, mental wellness, and local services into one seamless platform. This landing page showcases SmartSolve’s features, subscription plans, and community benefits, encouraging users to get started for free or upgrade to a paid plan.

The design is inspired by Headspace, featuring a calm, minimal, and supportive aesthetic with a focus on user-friendly navigation and accessibility. The page is fully responsive and optimized for performance.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Pi Network Integration](#pi-network-integration)
- [Assets](#assets)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Hero Section:** Engaging headline and subheadline with a "Get Started for Free" CTA.
- **Why SmartSolve?:** Highlights key benefits of using SmartSolve.
- **Subscription Plans:** Displays Free, Standard, Premium, and Pro plans with features and pricing in Pi.
- **Features Section:** Showcases core features (To-Do & Reminders, Budget Management, Meal Planning, Wellness Support, Local Services).
- **Pi Network Integration:** Emphasizes SmartSolve’s role in the Pi ecosystem.
- **Community Section:** Encourages users to join thousands of Pioneers using SmartSolve.
- **Responsive Design:** Fully responsive for mobile, tablet, and desktop devices.
- **Accessibility:** Includes skip links, ARIA labels, and focus states for better accessibility.
- **Performance:** Lazy-loaded images and deferred Font Awesome CSS for faster load times.
- **Headspace-Inspired Design:** Calm color palette, rounded cards, and clean typography.

---

## Tech Stack

- **HTML5:** Structure of the landing page.
- **CSS3:** Styling with a mobile-first approach, flexbox, and grid layouts.
- **JavaScript:** Smooth scrolling, footer collapsible sections, and Pi SDK placeholder.
- **Font Awesome:** Icons for visual enhancement.
- **Google Fonts:** Inter and Poppins fonts for typography.

---

## Setup Instructions

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari).
- A text editor (e.g., VS Code) for making changes.
- (Optional) A local server setup like Live Server for development.

### Steps

1. **Clone the Repository**

   If this project is hosted in a repository, clone it to your local machine:
   ```bash
   git clone https://github.com/wainfoundation/SmartSolve.git
   ```
   Alternatively, download the project files as a ZIP and extract them.

2. **Open the Project**

   Navigate to the project directory:
   ```bash
   cd smartsolve-landing-page
   ```

3. **Run the Landing Page**

   Open `index.html` in a web browser:
   - Double-click `index.html` to open it directly, or
   - Use a local server for a better development experience:
     ```bash
     # If using VS Code with Live Server
     code .
     # Right-click index.html and select "Open with Live Server"
     ```

4. **Edit the Code (Optional)**  
   - Modify `index.html` for content changes.
   - Update the `<style>` section in `index.html` for CSS adjustments.
   - Edit the `<script>` section in `index.html` for JavaScript changes.

5. **Deploy (Optional)**

   To deploy the landing page online:
   - Use a static hosting service like Vercel, Netlify, or GitHub Pages.
   
   Example for Vercel:
   - Install Vercel CLI: `npm install -g vercel`
   - Deploy the project: `vercel deploy`
   - Follow the prompts to deploy your site.

---

## File Structure

```
smartsolve-landing-page/
├── index.html         # Main landing page file (includes HTML, CSS, and JS)
├── README.md          # Project documentation
└── assets/            # Placeholder for assets (images, etc.)
    ├── illustration.webp  # Placeholder for hero illustration
    └── app-preview.webp   # Placeholder for app preview image
```

Note: The `assets/` folder is not included in this prototype but is recommended for organizing images. Replace placeholder images in `index.html` with actual assets.

---

## Usage

- **View the Landing Page:** Open `index.html` in a browser to see the SmartSolve landing page.
- **Navigate Sections:** Use the navigation bar to jump to Features or Plans, or scroll through the page.
- **Sign in with Pi:** The "Sign in with Pi" and "Get Started" buttons include a placeholder for Pi SDK integration (currently an alert).
- **Responsive Testing:** Resize the browser window or use a mobile device to test responsiveness.
- **Accessibility:** Use a screen reader or keyboard navigation to ensure accessibility features work as expected.

---

## Pi Network Integration

SmartSolve uses Pi as its sole currency for subscriptions. The landing page includes placeholders for Pi SDK integration:

- **Sign-in:** The "Sign in with Pi" and "Get Started" buttons trigger an alert as a placeholder for `Pi.authenticate()`.
- **Subscriptions:** Pricing is displayed in Pi (e.g., 3 Pi/month for Standard).
- **Pi Ecosystem Links:** The footer includes links to Pi Wallet and Learn About Pi.

For actual Pi SDK implementation, refer to xAI’s [API documentation](https://x.ai/api) for details on `Pi.authenticate()` and payment flows.

---

## Assets

The following assets are referenced in the landing page as placeholders. Replace them with actual images:

- **Illustration:** ![Illustration](https://via.placeholder.com/300x200?text=Illustration) (used in the hero section).
- **App Preview:** ![App Preview](https://via.placeholder.com/600x300?text=App+Preview) (used in the app preview section, removed in this version but can be re-added).

### Recommendations:
- Convert images to WebP format for better performance.
- Optimize image sizes (e.g., 300x200px for the illustration, 600x300px for the app preview).
- Store images in the `assets/` folder.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit: `git commit -m "Add your feature"`.
4. Push to your branch: `git push origin feature/your-feature`.
5. Open a pull request with a description of your changes.

Please ensure your code follows the Headspace-inspired design (calm colors, rounded elements, clean typography) and maintains accessibility standards.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## SmartSolve Team

© 2025 SmartSolve. All rights reserved.  
Built with ❤️ for the Pi Network community.
