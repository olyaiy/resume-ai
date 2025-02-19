# ResumeLM - AI-Powered Resume Builder

> 🚧 **Under Active Development** 

An intelligent, open-source resume builder powered by AI that helps create and tailor resumes for specific job applications. Built with Next.js 15, React 19, TypeScript, and Shadcn UI.

![Dashboard Screenshot](public/images/ss1.webp)

## ✨ Live Demo

Check out the live demo at [resumelm.com](https://resumelm.com)

## 🌟 Key Features

### Resume Management
- 📝 Two-tier resume system:
  - **Base Resumes**: Foundation templates for your professional profile
  - **Tailored Resumes**: AI-optimized versions for specific job applications
- 💼 Comprehensive section management for:
  - Work Experience
  - Education
  - Projects
  - Skills
- 🎨 Modern, responsive design with soft gradient minimalist theme
- 📱 Mobile-first approach with responsive layouts

![Resume Editor](public/images/ss2.webp)

### AI Integration
- 🤖 AI-powered content suggestions for all resume sections
- 💡 Smart content optimization and improvement recommendations
- 🎯 Intelligent job description analysis
- 💬 Interactive AI assistant for resume writing guidance
- ✨ Real-time content enhancement suggestions

![AI Assistant](public/images/ss4.webp)

### Technical Features
- 🔒 Row Level Security (RLS) for data protection
- 🚀 Server-side rendering with Next.js 15 App Router
- 📄 PDF generation and preview
- 🎨 Custom design system with consistent UI/UX
- 🔄 Real-time updates and preview

## 🎨 Design System

### Core Principles
- **Layered Depth**: Multiple translucent layers create visual hierarchy
- **Organic Motion**: Subtle animations suggest liveliness without distraction
- **Purposeful White Space**: Generous spacing improves content digestion
- **Consistent Interaction**: Predictable hover and active states

### Visual Elements
- Soft gradient backgrounds with floating orbs
- Glass-morphism effects with backdrop blur
- Responsive grid layouts
- Interactive hover states with smooth transitions

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Shadcn UI Components
- Tailwind CSS
- React PDF

### AI & Data Processing
- OpenAI Integration
- Server Components for AI Processing
- Structured JSON Data Format

### Database
- PostgreSQL with Row Level Security
- Prisma ORM
- Supabase Auth

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resumelm.git
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `NEXT_PUBLIC_SITE_URL`: Your application URL (e.g., http://localhost:3000 for local development)

Required AI API Keys (one of these will work, or you can simmply enter your api key in the settings):
- `ANTHROPIC_API_KEY`: For Claude AI integration
- `OPENAI_API_KEY`: For OpenAI features
- `OPENROUTER_API_KEY`: For OpenRouter AI routing
- `DEEPSEEK_API_KEY`: For Deepseek AI integration
- `GEMINI_API_KEY`: For Google's Gemini AI
- `GROQ_API_KEY`: For Groq AI integration

Required Redis Configuration:
- `UPSTASH_REDIS_REST_URL`: Your Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Your Upstash Redis REST token

Optional Stripe Integration (for production, you wont need them but cool if you're intrested in learning more):
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `NEXT_PUBLIC_SUBSCRIPTION_LINK`: Your subscription page URL
- `PRICE_ID`: Stripe price ID
- `PRODUCT_ID`: Stripe product ID
- `NEXT_PUBLIC_STRIPE_PRO_PRICE_ID`: Stripe pro tier price ID

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Status

### Production Ready Features
- ✅ Complete resume management system
- ✅ AI-powered content generation and optimization
- ✅ PDF export functionality
- ✅ Responsive design system
- ✅ User authentication and authorization
- ✅ Profile management
- ✅ Real-time preview and editing

### Upcoming Features
- 🔄 Enhanced AI tailoring algorithms
- 🔄 Additional resume templates
- 🔄 Advanced PDF customization
- 🔄 Job application tracking
- 🔄 Analytics dashboard

## 📝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

[GNU Affero General Public License v3 (AGPL-3.0)](LICENSE)

This project is licensed under the GNU AGPL v3 license. This means:
- ✅ You can view, use, and modify the code
- ✅ You can distribute the code
- ✅ You must keep the source code open source
- ✅ Any modifications must also be under AGPL-3.0
- ❌ You cannot use this code in closed-source commercial applications
- ❌ You cannot use this code to provide a similar service without making your code open source

For more details, see the [full license text](LICENSE).

---

Built with ❤️ using [Next.js](https://nextjs.org/)
