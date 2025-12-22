# Portfolio Website - Menyaga Enyo Israel

A modern, interactive portfolio website built with Next.js, featuring a game-inspired UI, smooth animations, and a comprehensive showcase of projects, skills, and experience.

## 🚀 Features

### Core Features
- **Game-Inspired UI**: XP bar, achievements, and stats display
- **Dark/Light Mode**: Automatic system preference detection with manual override
- **Smooth Animations**: GSAP-powered animations throughout the site
- **3D Elements**: Three.js integration for immersive 3D components
- **Responsive Design**: Fully responsive across all device sizes
- **SEO Optimized**: Comprehensive metadata and structured data
- **Performance Optimized**: Optimized for Core Web Vitals and Lighthouse scores

### Pages
- **Home**: Hero section with animated typewriter effect, XP bar, stats, and achievements
- **About**: Personal introduction and background information
- **Projects**: Showcase of frontend and backend projects with filtering
- **Experience**: Professional experience timeline
- **Services**: Detailed service offerings and expertise
- **Blog**: Blog posts and articles (with dynamic routing)
- **Contact**: Contact form for inquiries

### Interactive Components
- **Animated Keyboard**: 3D keyboard visualization
- **Avatar 3D**: 3D avatar component
- **Project Cards**: Interactive project cards with hover effects
- **Experience Timeline**: Animated timeline of professional experience
- **Theme Toggle**: System-aware theme switcher
- **Navigation**: Smooth scrolling navigation with active states

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe development

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **SCSS/SASS** - Additional styling capabilities
- **CSS Modules** - Component-scoped styles

### Animation & 3D
- **GSAP** - Professional animation library
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber

### Additional Libraries
- **react-simple-typewriter** - Typewriter effect
- **react-scroll** - Smooth scrolling functionality

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
my_portfolio/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Blog pages with dynamic routing
│   ├── contact/           # Contact page
│   ├── experience/        # Experience timeline page
│   ├── projects/           # Projects showcase page
│   ├── services/           # Services page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── sitemap.ts          # Sitemap generation
├── src/
│   ├── components/         # React components
│   │   ├── about.tsx
│   │   ├── Achievements.tsx
│   │   ├── AnimatedKeyboard.tsx
│   │   ├── Avatar3D.tsx
│   │   ├── BlogList.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ExperienceTimeline.tsx
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectsList.tsx
│   │   ├── ServicesList.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useGSAP.ts
│   │   └── useIntersectionObserver.ts
│   ├── data/              # Static data
│   │   └── blogPosts.ts
│   ├── images/            # Image assets
│   ├── style/             # Global styles
│   │   ├── globals.css
│   │   ├── components/
│   │   └── pages/
│   └── utils/             # Utility functions
├── public/                # Static assets
│   ├── texture/          # 3D texture files
│   └── ...
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my_portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Theme System

The portfolio features an advanced theme system:

- **Automatic Detection**: Detects system dark/light mode preference
- **Manual Override**: Users can manually switch between light, dark, or system mode
- **Persistent**: Theme preference is saved to localStorage
- **Dynamic Updates**: Automatically updates when system preference changes (in system mode)

### Theme Toggle
The theme toggle cycles through three modes:
1. **System** - Follows OS preference
2. **Light** - Forced light mode
3. **Dark** - Forced dark mode

## 🎯 Key Features Explained

### Game-Inspired UI
- **XP Bar**: Visual representation of experience level
- **Achievements**: Badge system showcasing accomplishments
- **Stats**: Key metrics and statistics display

### Animation System
- GSAP animations for smooth, professional transitions
- Staggered animations for list items
- Scroll-triggered animations
- Custom hooks for animation management

### 3D Components
- Three.js integration for immersive experiences
- 3D avatar and keyboard visualizations
- Optimized for performance with code splitting

### Performance Optimizations
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized package imports
- Compressed assets
- SWC minification

## 🌐 Deployment

### Vercel (Recommended)
The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure settings
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

### Build for Production
```bash
npm run build
npm run start
```

## 🔧 Configuration

### Next.js Config
The `next.config.mjs` includes:
- Image optimization settings
- Package import optimization
- Compression enabled
- Security headers

### Tailwind Config
Custom color palette and design tokens defined in `tailwind.config.ts`:
- Primary colors
- Accent colors
- Muted colors
- Custom gradients
- Animation keyframes

## 📝 Customization

### Adding Projects
Edit `src/components/ProjectsList.tsx` to add new projects to the `frontendProjects` or `backendProjects` arrays.

### Modifying Content
- **About**: `src/components/about.tsx`
- **Experience**: `src/components/ExperienceTimeline.tsx`
- **Services**: `src/components/ServicesList.tsx`
- **Blog Posts**: `src/data/blogPosts.ts`

### Styling
- Global styles: `src/style/globals.css`
- Component styles: `src/style/components/`
- Page-specific styles: `src/style/pages/`

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs)
- [Three.js Documentation](https://threejs.org/docs)

## 📄 License

This project is private and proprietary.

## 👤 Author

**Menyaga Enyo Israel**
- Portfolio: [https://mieworks.vercel.app](https://mieworks.vercel.app)
- Email: israelvictor126@gmail.com
- LinkedIn: [israelmenyaga](http://www.linkedin.com/in/israelmenyaga)
- GitHub: [MIE-CODE](https://github.com/MIE-CODE)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [GSAP](https://greensock.com/gsap/)
- 3D graphics powered by [Three.js](https://threejs.org)

---

**Note**: This is a personal portfolio website. Feel free to use it as inspiration for your own portfolio, but please create your own unique design and content.
