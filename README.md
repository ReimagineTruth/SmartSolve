# SmartSolve - Your Life, Simplified

A modern, full-stack productivity application powered by Pi Network. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Task Management**: Organize tasks with AI-powered prioritization and smart reminders
- **Budget Tracking**: Track expenses and savings with Pi Network integration
- **Meal Planning**: Plan healthy meals and generate shopping lists automatically
- **Mental Wellness**: Track mood, practice mindfulness, and maintain mental health
- **Local Services**: Connect with trusted local service providers in your area
- **Pi Network Integration**: Seamless payments and rewards using Pi cryptocurrency
- **Dark Mode**: Beautiful dark/light theme support
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smartsolve-app.git
   cd smartsolve-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Or connect your GitHub repository**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically deploy on every push

### Other Platforms

The app can be deployed to any static hosting platform:

- **Netlify**: Connect your GitHub repository
- **GitHub Pages**: Use GitHub Actions for deployment
- **Firebase Hosting**: Use Firebase CLI
- **AWS S3 + CloudFront**: Upload the `dist` folder

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout with navigation
│   └── ProtectedRoute.tsx
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Dark/light theme
├── lib/               # Utility libraries
│   └── api.ts         # API client configuration
├── pages/             # Page components
│   ├── Home.tsx       # Landing page
│   ├── Login.tsx      # Authentication
│   ├── Dashboard.tsx  # Main dashboard
│   ├── Tasks.tsx      # Task management
│   ├── Budget.tsx     # Budget tracking
│   ├── Meals.tsx      # Meal planning
│   ├── Wellness.tsx   # Mental wellness
│   ├── Services.tsx   # Local services
│   └── Profile.tsx    # User profile
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... more shades
    900: '#0c4a6e',
  },
  secondary: {
    // ... secondary colors
  }
}
```

### Themes
The app supports dark/light mode with automatic system preference detection.

## 🔐 Authentication

The app includes:
- Email/password authentication
- Pi Network integration (simulated)
- JWT token management
- Protected routes
- User profile management

## 📱 Responsive Design

The app is fully responsive with:
- Mobile-first design approach
- Collapsible sidebar navigation
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Performance

- **Fast Loading**: Vite for instant hot module replacement
- **Optimized Build**: Tree shaking and code splitting
- **Lazy Loading**: Route-based code splitting
- **Image Optimization**: Automatic image optimization
- **Caching**: Efficient caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pi Network](https://minepi.com/) for blockchain integration
- [Vite](https://vitejs.dev/) for the amazing build tool
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the UI library
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

If you have any questions or need help, please:

1. Check the [FAQ](FAQ.md)
2. Search existing [issues](https://github.com/yourusername/smartsolve-app/issues)
3. Create a new issue with detailed information

---

**Made with ❤️ by the SmartSolve Team**
