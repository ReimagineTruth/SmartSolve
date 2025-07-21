# SmartSolve - Pi-Powered Productivity Platform

SmartSolve is a comprehensive productivity platform powered by Pi Network, designed to help users manage tasks, budget, meals, wellness, and local services in one beautiful interface.

## 🚀 Features

### Core Features
- **Task Management**: Unlimited tasks with priority levels and smart organization
- **Budget Tracking**: Advanced financial tools with AI-powered insights
- **Meal Planning**: Complete meal planner with recipes and grocery lists
- **Mental Wellness**: AI mood assistant with personalized recommendations
- **Local Services**: Pi Network integration for local service discovery and booking

### Plan-Based Features
- **Free Plan**: Basic tools with limited features
- **Standard Plan**: Unlimited tasks, advanced budget tools, full meal planner
- **Premium Plan**: Family features, kids mode, group chat, shared calendars
- **Pro Plan**: Business tools, team collaboration, advanced analytics
- **Lifetime Plan**: One-time payment for all features forever

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Deployment**: Vercel

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

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable components
│   └── PaymentModal.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Pricing.tsx
│   ├── PaymentModalDemo.tsx
│   ├── DemoFreePlan.tsx
│   ├── DemoStandardPlan.tsx
│   ├── DemoPremiumPlan.tsx
│   └── DemoProPlan.tsx
├── App.tsx             # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: `#A3CFFA` (Blue)
- **Secondary**: `#A8D5BA` (Green)
- **Text**: `#2A3B5A` (Dark Blue)
- **Background**: `#F5F5F5` (Light Gray)
- **Pi Currency**: `#FFD700` (Gold)
- **Lifetime**: `#FFE5B4` (Light Orange)

### Typography
- **Primary Font**: Inter (Sans-serif)
- **Display Font**: Poppins (Sans-serif)

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables** (if needed):
   ```
   VITE_API_URL=your_api_url
   VITE_PI_NETWORK_APP_ID=your_pi_app_id
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## 📱 Pages & Routes

- `/` - Home page with features and pricing overview
- `/pricing` - Detailed pricing page with plan comparison
- `/payment-demo` - Payment modal demonstration
- `/demo/free` - Free plan dashboard demo
- `/demo/standard` - Standard plan dashboard demo
- `/demo/premium` - Premium plan dashboard demo
- `/demo/pro` - Pro plan dashboard demo

## 💰 Payment Integration

### Pi Network Integration
SmartSolve integrates with Pi Network for secure payments:

```typescript
// Example Pi payment integration
const handlePiPayment = async (amount: number, plan: string) => {
  try {
    const payment = await Pi.createPayment({
      amount: amount.toString(),
      memo: `SmartSolve ${plan} Plan`,
      metadata: {
        plan: plan,
        billing: 'monthly'
      }
    });
    
    console.log('Payment successful:', payment);
    // Handle successful payment
  } catch (error) {
    console.error('Payment failed:', error);
    // Handle payment error
  }
};
```

### Payment Modal Component
The `PaymentModal` component provides a complete payment flow:

```typescript
import PaymentModal from './components/PaymentModal';

// Usage
<PaymentModal 
  isOpen={showModal}
  plan="standard"
  onSuccess={(details) => {
    console.log('Payment successful:', details);
  }}
  onClose={() => setShowModal(false)}
/>
```

## 🎯 Key Features by Plan

### Free Plan
- Limited tasks (5 items)
- Basic budget tracking
- 2 meal suggestions per day
- Daily quotes only
- View-only local services
- Ads enabled

### Standard Plan (3 Pi/month)
- Unlimited tasks & planning
- Advanced budget tools
- Full meal planner
- AI mood assistant
- Post local service requests
- Ad-free experience

### Premium Plan (6 Pi/month)
- All Standard features
- Family calendar & sharing
- Kids mode with rewards
- Group chat & file sharing
- Full grocery planner
- Privacy controls

### Pro Plan (9 Pi/month)
- All Premium features
- Team collaboration tools
- Business tools (Marketing + Income)
- TruthWeb & Cloudy integrations
- Virtual assistant booking
- Advanced analytics

### Lifetime Plan (99 Pi one-time)
- All Pro Plan features
- Lifetime access - No monthly fees
- Priority support
- Early access to new features
- Exclusive lifetime badge
- Beta tester for future apps

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- React Router for navigation

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
- [Vercel](https://vercel.com/) for deployment platform
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons

## 📞 Support

For support, email support@smartsolve.app or join our community:

- **Website**: [smartsolve.app](https://smartsolve.app)
- **Documentation**: [docs.smartsolve.app](https://docs.smartsolve.app)
- **Community**: [community.smartsolve.app](https://community.smartsolve.app)

---

**Built with ❤️ by the SmartSolve Team**
