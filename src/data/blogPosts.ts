export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Production-Ready Websites: From Figma to Deployment",
    excerpt: "A comprehensive guide to transforming Figma designs into pixel-perfect, production-ready websites using modern tools and best practices.",
    content: `Transforming Figma designs into production-ready websites requires a systematic approach, attention to detail, and the right tools. This guide covers the complete workflow from design handoff to deployment.

## Understanding the Design

Before writing any code, thoroughly analyze the Figma design:

1. **Review the Design System**: Check for design tokens, color palettes, typography scales, and spacing systems
2. **Identify Components**: Break down the design into reusable components
3. **Note Interactions**: Document hover states, animations, and transitions
4. **Check Responsive Breakpoints**: Understand how the design adapts across devices

## Setting Up Your Development Environment

Start with a solid foundation:

\`\`\`bash
# Create Next.js project with TypeScript
npx create-next-app@latest my-project --typescript --tailwind --app

# Install essential tools
npm install framer-motion gsap
npm install -D @types/node
\`\`\`

## Extracting Design Tokens

Extract design tokens from Figma:

\`\`\`typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#009c9e',
          900: '#003d3e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
}
\`\`\`

## Component Architecture

Structure your components to match the design:

\`\`\`typescript
// components/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}) => {
  return (
    <button
      className={\`btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

## Pixel-Perfect Implementation

Achieve pixel-perfect accuracy:

1. **Use Browser DevTools**: Compare side-by-side with Figma
2. **Measure Everything**: Use Figma's measurement tools
3. **Match Typography**: Ensure font sizes, line heights, and letter spacing match exactly
4. **Verify Spacing**: Use consistent spacing scale

## Responsive Implementation

Implement responsive design systematically:

\`\`\`typescript
<div className="
  grid grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 md:gap-6 lg:gap-8
  px-4 md:px-6 lg:px-8
">
  {/* Content */}
</div>
\`\`\`

## Animation Implementation

Add smooth animations using Framer Motion or GSAP:

\`\`\`typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
\`\`\`

## Collaboration with Designers

Effective collaboration ensures pixel-perfect implementation:

1. **Regular Communication**: Schedule design reviews and feedback sessions
2. **Design System Alignment**: Ensure component library matches design system
3. **Animation Discussions**: Clarify animation timing, easing, and interactions
4. **Responsive Breakpoints**: Confirm breakpoints and mobile-first approach
5. **Accessibility Requirements**: Discuss color contrast, focus states, and ARIA labels

## Quality Assurance

Before deployment:

1. **Cross-browser Testing**: Test on Chrome, Firefox, Safari, Edge
2. **Device Testing**: Test on various screen sizes (mobile, tablet, desktop)
3. **Performance Audit**: Run Lighthouse and achieve 95+ scores
4. **Accessibility Check**: Ensure WCAG 2.1 AA compliance
5. **Code Review**: Have peers review your implementation
6. **Visual Regression Testing**: Use tools like Percy or Chromatic
7. **User Testing**: Get feedback from real users

## Deployment Checklist

- [ ] All images optimized and using Next.js Image
- [ ] SEO metadata configured (title, description, Open Graph)
- [ ] Analytics integrated (Google Analytics, PostHog)
- [ ] Error tracking set up (Sentry, LogRocket)
- [ ] Performance monitoring enabled
- [ ] Security headers configured
- [ ] Environment variables set correctly
- [ ] Database migrations completed
- [ ] CDN configured for static assets
- [ ] SSL certificate installed
- [ ] Backup strategy in place

## Post-Deployment

1. **Monitor Performance**: Track Core Web Vitals and Lighthouse scores
2. **User Analytics**: Monitor user behavior and conversion rates
3. **Error Tracking**: Set up alerts for critical errors
4. **A/B Testing**: Test different variations for optimization
5. **Continuous Improvement**: Iterate based on data and feedback

Master the complete workflow from Figma designs to production deployment, ensuring pixel-perfect implementations that perform exceptionally.`,
    date: "2024-02-15",
    category: "Development",
    readTime: "12 min read",
  },
  {
    id: 2,
    title: "Mastering Core Web Vitals: A Complete Performance Optimization Guide",
    excerpt: "Deep dive into Core Web Vitals optimization, achieving 95+ Lighthouse scores, and implementing performance best practices for production websites.",
    content: `Achieving exceptional web performance is crucial for user experience, SEO rankings, and business success. This comprehensive guide covers Core Web Vitals optimization, Lighthouse scoring, and proven techniques to achieve 95+ performance scores.

## Understanding Core Web Vitals

Core Web Vitals are three specific metrics that Google uses to measure user experience:

### Largest Contentful Paint (LCP)
**Target: < 2.5 seconds**

LCP measures loading performance. Optimize by:
- Using Next.js Image component with proper sizing
- Implementing resource hints (preconnect, prefetch, preload)
- Optimizing server response times
- Using CDN for static assets
- Eliminating render-blocking resources

\`\`\`typescript
// Optimize LCP with priority images
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Loads immediately
  placeholder="blur"
/>
\`\`\`

### First Input Delay (FID) / Interaction to Next Paint (INP)
**Target: < 100ms for FID, < 200ms for INP**

Measures interactivity. Optimize by:
- Code splitting and lazy loading
- Minimizing JavaScript execution time
- Using Web Workers for heavy computations
- Optimizing third-party scripts

\`\`\`typescript
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});
\`\`\`

### Cumulative Layout Shift (CLS)
**Target: < 0.1**

Measures visual stability. Optimize by:
- Setting explicit dimensions for images and videos
- Reserving space for dynamic content
- Avoiding inserting content above existing content
- Using aspect-ratio CSS property

\`\`\`typescript
// Prevent CLS with aspect ratio
<div className="aspect-video w-full">
  <Image src="/video-thumb.jpg" fill />
</div>
\`\`\`

## Achieving 95+ Lighthouse Scores

### Image Optimization

\`\`\`typescript
// Use Next.js Image with optimization
import Image from 'next/image';

<Image
  src="/product.jpg"
  alt="Product"
  width={800}
  height={600}
  quality={85}
  format="webp"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
\`\`\`

### Font Optimization

\`\`\`typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});
\`\`\`

### Code Splitting

\`\`\`typescript
// Route-based code splitting (automatic in Next.js)
// Component-based code splitting
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('./Chart'), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
\`\`\`

### Bundle Analysis

\`\`\`bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
\`\`\`

## Advanced Optimization Techniques

### Server Components for Performance

\`\`\`typescript
// Server Component - no JavaScript sent to client
async function ProductList() {
  const products = await fetchProducts();
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
\`\`\`

### Static Generation with ISR

\`\`\`typescript
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export const revalidate = 3600; // Revalidate every hour
\`\`\`

### Caching Strategies

\`\`\`typescript
// API route with caching
export async function GET(request: Request) {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });
  return Response.json(await data.json());
}
\`\`\`

## Performance Monitoring

### Lighthouse CI

\`\`\`yaml
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: ['http://localhost:3000'],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
\`\`\`

### Real User Monitoring

\`\`\`typescript
// Track Core Web Vitals
export function reportWebVitals(metric: any) {
  // Send to analytics
  if (metric.label === 'web-vital') {
    // Google Analytics
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
    
    // PostHog
    posthog.capture('web_vital', {
      name: metric.name,
      value: metric.value,
    });
  }
}
\`\`\`

## Best Practices Checklist

- [ ] All images optimized and using Next.js Image
- [ ] Fonts optimized with next/font
- [ ] JavaScript bundle size minimized
- [ ] Code splitting implemented
- [ ] Static generation where possible
- [ ] Caching headers configured
- [ ] Third-party scripts optimized
- [ ] LCP < 2.5s
- [ ] FID/INP < 100ms/200ms
- [ ] CLS < 0.1
- [ ] Lighthouse score 95+

Master these techniques to build lightning-fast, high-performing web applications that users love.`,
    date: "2024-01-15",
    category: "Next.js",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Mastering TypeScript for React",
    excerpt: "A comprehensive guide to using TypeScript effectively in React applications for better type safety and developer experience.",
    content: `TypeScript brings static typing to React, helping catch errors early and improving code maintainability. This guide covers everything from basic type annotations to advanced patterns.

## Basic Component Typing

When creating React components with TypeScript, you'll define prop types using interfaces or type aliases:

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
\`\`\`

## Typing Hooks

TypeScript works seamlessly with React hooks. For useState, TypeScript can infer types automatically, but you can also be explicit:

\`\`\`typescript
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

For useRef, specify the ref type:
\`\`\`typescript
const inputRef = useRef<HTMLInputElement>(null);
\`\`\`

## Generic Components

Create reusable components with generics:

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Event Handlers

Type event handlers properly:

\`\`\`typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
};
\`\`\`

## Context API

Type your context properly:

\`\`\`typescript
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
\`\`\`

## Migration Tips

When migrating from JavaScript to TypeScript:
1. Start with \`.tsx\` files gradually
2. Use \`any\` sparingly - prefer \`unknown\`
3. Enable strict mode in tsconfig.json
4. Use type assertions carefully

By the end, you'll write more robust, type-safe React applications.`,
    date: "2024-01-10",
    category: "TypeScript",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Discover how to create beautiful, responsive user interfaces using Tailwind CSS utility classes.",
    content: `Tailwind CSS revolutionizes how we build user interfaces with its utility-first approach. This tutorial walks you through creating responsive, accessible designs using Tailwind's powerful utility classes.

## Getting Started

Install Tailwind CSS in your project:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Configure your \`tailwind.config.js\` to include your template paths, then add Tailwind directives to your CSS file.

## Responsive Design

Tailwind uses mobile-first breakpoints:
- \`sm:\` - 640px and up
- \`md:\` - 768px and up
- \`lg:\` - 1024px and up
- \`xl:\` - 1280px and up
- \`2xl:\` - 1536px and up

Example:
\`\`\`html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
\`\`\`

## Layout Utilities

Use Flexbox and Grid with Tailwind:

\`\`\`html
<div class="flex flex-col md:flex-row gap-4">
  <div class="flex-1">Column 1</div>
  <div class="flex-1">Column 2</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Grid items -->
</div>
\`\`\`

## Customization

Extend Tailwind in your config:

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
}
\`\`\`

## Dark Mode

Enable dark mode in your config and use the \`dark:\` variant:

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
\`\`\`

## Component Extraction

For repeated patterns, use \`@apply\`:

\`\`\`css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600;
}
\`\`\`

Master the art of rapid UI development while maintaining clean, maintainable code.`,
    date: "2024-01-05",
    category: "CSS",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "State Management in React: Context vs Redux",
    excerpt: "Comparing Context API and Redux for state management in React applications, with practical examples.",
    content: `Choosing the right state management solution is crucial for React applications. This article compares React Context API and Redux, helping you make informed decisions.

## When to Use Context API

Context API is perfect for:
- Simple state sharing across components
- Theme or user preferences
- Avoiding prop drilling
- Small to medium applications

Example:
\`\`\`typescript
const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

## When to Use Redux

Redux is ideal for:
- Complex state logic
- Large applications
- Time-travel debugging needs
- Predictable state updates
- Middleware requirements

## Redux Toolkit

Modern Redux uses Redux Toolkit for simpler code:

\`\`\`typescript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});
\`\`\`

## Performance Considerations

Context API can cause unnecessary re-renders if not optimized. Use memoization:

\`\`\`typescript
const MemoizedComponent = React.memo(MyComponent);
\`\`\`

Redux uses selectors to prevent unnecessary re-renders and offers better performance for large state trees.

## Best Practices

1. **Context**: Split contexts by concern (ThemeContext, AuthContext, etc.)
2. **Redux**: Normalize your state structure
3. **Both**: Keep state as local as possible
4. **Both**: Use TypeScript for type safety

## Making the Choice

- Start with Context API for simple needs
- Upgrade to Redux when complexity grows
- Consider Zustand or Jotai as middle-ground alternatives

Through real-world examples, you'll understand how to structure state, handle async operations, and optimize re-renders. Make the right choice for your project's needs.`,
    date: "2023-12-28",
    category: "React",
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "Optimizing Performance in Next.js",
    excerpt: "Best practices for improving performance in Next.js applications, including code splitting and image optimization.",
    content: `Performance is key to user experience and SEO. This guide covers essential optimization techniques for Next.js applications.

## Code Splitting

Next.js automatically splits your code, but you can optimize further with dynamic imports:

\`\`\`typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if needed
});
\`\`\`

## Image Optimization

Always use the Next.js Image component:

\`\`\`typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={800}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
/>
\`\`\`

## Font Optimization

Optimize fonts with next/font:

\`\`\`typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
\`\`\`

## Static Generation

Use Static Site Generation (SSG) when possible:

\`\`\`typescript
export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }));
}
\`\`\`

## Bundle Analysis

Analyze your bundle size:

\`\`\`bash
npm install @next/bundle-analyzer
\`\`\`

## Caching Strategies

Implement proper caching:
- Use ISR (Incremental Static Regeneration) for dynamic content
- Set appropriate cache headers
- Use React Server Components to reduce client bundle

## Core Web Vitals

Monitor and optimize:
- LCP (Largest Contentful Paint) - < 2.5s
- FID (First Input Delay) - < 100ms
- CLS (Cumulative Layout Shift) - < 0.1

## Performance Monitoring

Use tools like:
- Lighthouse
- WebPageTest
- Next.js Analytics
- Vercel Analytics

Transform your Next.js app into a lightning-fast experience.`,
    date: "2023-12-20",
    category: "Performance",
    readTime: "7 min read",
  },
  {
    id: 6,
    title: "Introduction to React Native Development",
    excerpt: "Getting started with React Native for cross-platform mobile development and building your first app.",
    content: `React Native enables building beautiful, native mobile apps from a single codebase using React. This comprehensive introduction covers everything you need to start your React Native journey.

## Getting Started

Install React Native and set up your development environment:

\`\`\`bash
# Install Node.js and npm
# Then install React Native CLI
npm install -g react-native-cli

# Create a new project
npx react-native init MyApp
cd MyApp

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
\`\`\`

## Understanding React Native

React Native uses JavaScript/TypeScript and React:
- Component-based architecture
- JSX syntax
- React hooks and state management
- Native performance

## Component System

Everything in React Native is a component:

\`\`\`javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default App;
\`\`\`

## State Management

Choose a state management solution:
- **useState** - For simple local state
- **Context API** - For app-wide state
- **Redux** - For complex state logic
- **Zustand** - Lightweight alternative

## Navigation

Navigate between screens using React Navigation:

\`\`\`javascript
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

## API Integration

Make HTTP requests:

\`\`\`javascript
import { useEffect, useState } from 'react';

const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
\`\`\`

## Local Storage

Store data locally using AsyncStorage:

\`\`\`javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save
await AsyncStorage.setItem('key', 'value');

// Read
const value = await AsyncStorage.getItem('key');
\`\`\`

## Fast Refresh

React Native's Fast Refresh lets you see changes instantly without losing app state. Changes are automatically reflected in your app.

## Deployment

Build for production:

\`\`\`bash
# Android
cd android
./gradlew assembleRelease

# iOS
cd ios
xcodebuild -workspace MyApp.xcworkspace -scheme MyApp archive
\`\`\`

Start building cross-platform apps today.`,
    date: "2023-12-15",
    category: "React Native",
    readTime: "9 min read",
  },
  {
    id: 7,
    title: "Integrating Analytics and CRM: Google Analytics, PostHog, and HubSpot",
    excerpt: "Complete guide to integrating analytics platforms and CRM systems into web applications for data-driven decision making.",
    content: `Integrating analytics and CRM systems is essential for understanding user behavior, tracking conversions, and managing customer relationships. This guide covers implementing Google Analytics, PostHog, and HubSpot in Next.js applications.

## Setting Up Google Analytics

### Installation and Configuration

\`\`\`typescript
// lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
\`\`\`

### Next.js Integration

\`\`\`typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          strategy="afterInteractive"
          src={\`https://www.googletagmanager.com/gtag/js?id=\${GA_TRACKING_ID}\`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {\`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '\${GA_TRACKING_ID}');
          \`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### Tracking Custom Events

\`\`\`typescript
// components/Button.tsx
import { event } from '@/lib/analytics';

export function CTAButton() {
  const handleClick = () => {
    event({
      action: 'click',
      category: 'engagement',
      label: 'cta_button',
    });
    // Handle click
  };
  
  return <button onClick={handleClick}>Get Started</button>;
}
\`\`\`

## Implementing PostHog

### Setup

\`\`\`typescript
// lib/posthog.ts
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
}

export default posthog;
\`\`\`

### Feature Flags

\`\`\`typescript
import posthog from '@/lib/posthog';

export function FeatureComponent() {
  const isFeatureEnabled = posthog.isFeatureEnabled('new-feature');
  
  if (!isFeatureEnabled) return null;
  
  return <div>New Feature</div>;
}
\`\`\`

### User Identification

\`\`\`typescript
// After user login
posthog.identify(userId, {
  email: user.email,
  name: user.name,
});
\`\`\`

## HubSpot CRM Integration

### HubSpot Forms

\`\`\`typescript
// components/HubSpotForm.tsx
'use client';

import { useEffect } from 'react';

export function HubSpotForm({ portalId, formId }: { portalId: string; formId: string }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId,
          formId,
          target: '#hubspot-form',
        });
      }
    });

    return () => {
      document.body.removeChild(script);
    };
  }, [portalId, formId]);

  return <div id="hubspot-form" />;
}
\`\`\`

### HubSpot API Integration

\`\`\`typescript
// app/api/hubspot/route.ts
export async function POST(request: Request) {
  const { email, name } = await request.json();
  
  const response = await fetch(
    \`https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/\${email}\`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: \`Bearer \${process.env.HUBSPOT_API_KEY}\`,
      },
      body: JSON.stringify({
        properties: [
          { property: 'email', value: email },
          { property: 'firstname', value: name },
        ],
      }),
    }
  );
  
  return Response.json(await response.json());
}
\`\`\`

## Tracking Conversions

\`\`\`typescript
// Track conversion events
export function trackConversion(conversionType: string, value?: number) {
  // Google Analytics
  event({
    action: 'conversion',
    category: 'engagement',
    label: conversionType,
    value,
  });
  
  // PostHog
  posthog.capture('conversion', {
    type: conversionType,
    value,
  });
  
  // HubSpot
  fetch('/api/hubspot/track', {
    method: 'POST',
    body: JSON.stringify({ event: conversionType, value }),
  });
}
\`\`\`

## Privacy and GDPR Compliance

\`\`\`typescript
// Cookie consent management
export function CookieConsent() {
  const [consent, setConsent] = useState(false);
  
  const handleAccept = () => {
    setConsent(true);
    localStorage.setItem('cookie-consent', 'true');
    // Initialize analytics
    initializeAnalytics();
  };
  
  if (consent || localStorage.getItem('cookie-consent')) {
    return null;
  }
  
  return <CookieBanner onAccept={handleAccept} />;
}
\`\`\`

Implement these integrations to gain valuable insights and manage customer relationships effectively.`,
    date: "2024-03-01",
    category: "Analytics",
    readTime: "15 min read",
  },
  {
    id: 8,
    title: "Building with Headless CMS: Sanity and Contentful Integration",
    excerpt: "Complete guide to integrating headless CMS platforms like Sanity and Contentful for content-driven websites.",
    content: `Headless CMS platforms provide flexible content management while maintaining developer control. This guide covers integrating Sanity and Contentful into Next.js applications.

## Sanity CMS Integration

### Setup and Configuration

\`\`\`bash
# Install Sanity CLI
npm install -g @sanity/cli

# Initialize Sanity project
sanity init
\`\`\`

### Schema Definition

\`\`\`typescript
// schemas/post.ts
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alt Text',
            },
          ],
        },
      ],
    },
  ],
};
\`\`\`

### Next.js Integration

\`\`\`typescript
// lib/sanity.ts
import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Fetch posts
export async function getPosts() {
  const query = \`*[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    content,
    _createdAt
  }\`;
  
  return await client.fetch(query);
}

// Fetch single post
export async function getPostBySlug(slug: string) {
  const query = \`*[_type == "post" && slug.current == $slug][0]\`;
  return await client.fetch(query, { slug });
}
\`\`\`

### Rendering Sanity Content

\`\`\`typescript
// components/SanityContent.tsx
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity-image';

export function SanityContent({ content }: { content: any }) {
  return (
    <PortableText
      value={content}
      components={{
        types: {
          image: ({ value }: any) => (
            <img
              src={urlFor(value).width(800).url()}
              alt={value.alt || 'Image'}
            />
          ),
        },
      }}
    />
  );
}
\`\`\`

## Contentful Integration

### Setup

\`\`\`bash
npm install contentful
\`\`\`

### Client Configuration

\`\`\`typescript
// lib/contentful.ts
import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

// Fetch entries
export async function getEntries(contentType: string) {
  const response = await client.getEntries({
    content_type: contentType,
    order: '-sys.createdAt',
  });
  
  return response.items;
}

// Fetch single entry
export async function getEntryBySlug(slug: string, contentType: string) {
  const response = await client.getEntries({
    content_type: contentType,
    'fields.slug': slug,
    limit: 1,
  });
  
  return response.items[0];
}
\`\`\`

### TypeScript Types

\`\`\`typescript
// types/contentful.ts
export interface BlogPost {
  fields: {
    title: string;
    slug: string;
    content: Document;
    featuredImage: Asset;
    publishedDate: string;
  };
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
}
\`\`\`

## ISR with Headless CMS

\`\`\`typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return <SanityContent content={post.content} />;
}
\`\`\`

## Preview Mode

\`\`\`typescript
// app/api/preview/route.ts
import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }
  
  draftMode().enable();
  redirect(\`/blog/\${slug}\`);
}
\`\`\`

## Image Optimization

\`\`\`typescript
// lib/sanity-image.ts
import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Usage with Next.js Image
<Image
  src={urlFor(post.image).width(1200).url()}
  alt={post.image.alt}
  width={1200}
  height={600}
/>
\`\`\`

Build scalable, content-driven websites with headless CMS integration.`,
    date: "2024-02-20",
    category: "CMS",
    readTime: "18 min read",
  },
  {
    id: 9,
    title: "Advanced Animation Techniques: Framer Motion and GSAP Mastery",
    excerpt: "Master advanced animation techniques using Framer Motion and GSAP to create stunning, performant animations.",
    content: `Animations bring websites to life, creating engaging user experiences. This comprehensive guide covers advanced techniques using Framer Motion and GSAP.

## Framer Motion Fundamentals

### Basic Animations

\`\`\`typescript
import { motion } from 'framer-motion';

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Content
    </motion.div>
  );
}
\`\`\`

### Stagger Animations

\`\`\`typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

<motion.div variants={container} initial="hidden" animate="show">
  {items.map((item) => (
    <motion.div key={item.id} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
\`\`\`

### Scroll Animations

\`\`\`typescript
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function ScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
}
\`\`\`

## GSAP Advanced Techniques

### Timeline Animations

\`\`\`typescript
import { useGSAP } from '@/hooks/useGSAP';
import gsap from 'gsap';

export function TimelineAnimation() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.title', {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: 'power3.out',
    })
    .from('.subtitle', {
      opacity: 0,
      x: -30,
      duration: 0.8,
    }, '-=0.5')
    .from('.content', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.1,
    }, '-=0.3');
  }, { scope: containerRef });
  
  return <div ref={containerRef}>...</div>;
}
\`\`\`

### ScrollTrigger Animations

\`\`\`typescript
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

useGSAP(() => {
  gsap.fromTo('.element', 
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.element',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}, {});
\`\`\`

### Performance Optimization

\`\`\`typescript
// Use will-change for better performance
gsap.set('.animated', {
  willChange: 'transform, opacity',
});

// Clean up after animation
gsap.to('.element', {
  opacity: 0,
  onComplete: () => {
    gsap.set('.element', { willChange: 'auto' });
  },
});
\`\`\`

## Combining Framer Motion and GSAP

\`\`\`typescript
// Use Framer Motion for component animations
// Use GSAP for complex timeline animations

export function HybridAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
  // GSAP for complex sequence
  useGSAP(() => {
    if (isVisible) {
      gsap.to('.complex-element', {
        rotation: 360,
        scale: 1.2,
        duration: 2,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  }, { scope: containerRef, dependencies: [isVisible] });
  
  // Framer Motion for simple interactions
  return (
    <motion.div
      ref={containerRef}
      onViewportEnter={() => setIsVisible(true)}
    >
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        Click Me
      </motion.button>
    </motion.div>
  );
}
\`\`\`

## Best Practices

1. **Performance**: Use \`transform\` and \`opacity\` for animations
2. **Accessibility**: Respect \`prefers-reduced-motion\`
3. **Mobile**: Optimize for touch interactions
4. **Testing**: Test animations across devices

\`\`\`typescript
// Respect reduced motion
const prefersReducedMotion = useReducedMotion();

const animation = prefersReducedMotion
  ? {}
  : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    };
\`\`\`

Create stunning, performant animations that enhance user experience.`,
    date: "2024-02-10",
    category: "Animation",
    readTime: "20 min read",
  },
  {
    id: 10,
    title: "Security Best Practices for Modern Web Applications",
    excerpt: "Comprehensive guide to implementing security-conscious development practices and rigorous QA testing.",
    content: `Security is paramount in modern web development. This guide covers essential security practices, vulnerability prevention, and QA testing strategies.

## Input Validation and Sanitization

\`\`\`typescript
// Server-side validation with Zod
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(50),
  age: z.number().int().min(18).max(100),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = userSchema.parse(body);
    // Process validated data
  } catch (error) {
    return Response.json({ error: 'Invalid input' }, { status: 400 });
  }
}
\`\`\`

## Authentication and Authorization

\`\`\`typescript
// Secure session management
import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
\`\`\`

## XSS Prevention

\`\`\`typescript
// Sanitize user input
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHTML(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href'],
  });
}

// React: Use dangerouslySetInnerHTML carefully
<div dangerouslySetInnerHTML={{ __html: sanitizeHTML(userContent) }} />
\`\`\`

## CSRF Protection

\`\`\`typescript
// Generate CSRF token
import { randomBytes } from 'crypto';

export function generateCSRFToken() {
  return randomBytes(32).toString('hex');
}

// Verify CSRF token
export function verifyCSRFToken(token: string, sessionToken: string) {
  return token === sessionToken;
}
\`\`\`

## SQL Injection Prevention

\`\`\`typescript
// Use parameterized queries
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Safe
const user = await prisma.user.findUnique({
  where: { email: userEmail }, // Parameterized
});

// Never do this
// const query = \`SELECT * FROM users WHERE email = '\${email}'\`;
\`\`\`

## Security Headers

\`\`\`typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
\`\`\`

## Environment Variables Security

\`\`\`typescript
// Never expose secrets in client code
// Use server-side only

// .env.local (never commit)
DATABASE_URL=...
JWT_SECRET=...
API_KEY=...

// Only expose public vars
NEXT_PUBLIC_API_URL=...
\`\`\`

## QA Testing Strategies

### Unit Testing

\`\`\`typescript
// __tests__/utils.test.ts
import { sanitizeInput } from '@/utils/security';

describe('sanitizeInput', () => {
  it('should remove script tags', () => {
    const input = '<script>alert("xss")</script>Hello';
    expect(sanitizeInput(input)).toBe('Hello');
  });
});
\`\`\`

### Integration Testing

\`\`\`typescript
// __tests__/api/auth.test.ts
import { POST } from '@/app/api/auth/route';

describe('POST /api/auth', () => {
  it('should reject invalid credentials', async () => {
    const response = await POST(new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid', password: 'wrong' }),
    }));
    
    expect(response.status).toBe(401);
  });
});
\`\`\`

### Security Audits

\`\`\`bash
# Run security audits
npm audit
npm audit fix

# Use Snyk for vulnerability scanning
npx snyk test
\`\`\`

## Content Security Policy

\`\`\`typescript
// Implement CSP
const cspHeader = \`
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self';
\`;

// Add to headers
{
  key: 'Content-Security-Policy',
  value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
}
\`\`\`

Build secure applications with confidence using these practices.`,
    date: "2024-01-25",
    category: "Security",
    readTime: "22 min read",
  },
  {
    id: 11,
    title: "Exploring Web3 and Blockchain: A Developer's Journey",
    excerpt: "An introduction to Web3 development, Ethereum ecosystem, and building decentralized applications.",
    content: `Web3 and blockchain technology represent the next evolution of the internet. This guide introduces developers to the Web3 ecosystem, Ethereum, and building decentralized applications.

## Understanding Web3

Web3 is the vision of a decentralized internet built on blockchain technology, where users have ownership and control over their data and digital assets.

### Key Concepts

- **Decentralization**: No single point of control
- **Blockchain**: Immutable, distributed ledger
- **Smart Contracts**: Self-executing code on blockchain
- **Cryptocurrency**: Digital assets and tokens
- **dApps**: Decentralized applications

## Ethereum Ecosystem

### What is Ethereum?

Ethereum is a decentralized platform that enables smart contracts and decentralized applications (dApps).

### Key Technologies

- **Solidity**: Programming language for smart contracts
- **Web3.js / Ethers.js**: JavaScript libraries for interacting with Ethereum
- **MetaMask**: Browser wallet for Ethereum
- **IPFS**: Decentralized file storage

## Getting Started with Web3 Development

### Setting Up Development Environment

\`\`\`bash
# Install Node.js and npm
# Install Hardhat for Ethereum development
npm install --save-dev hardhat

# Initialize Hardhat project
npx hardhat init
\`\`\`

### Your First Smart Contract

\`\`\`solidity
// contracts/SimpleStorage.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public storedData;
    
    function set(uint256 x) public {
        storedData = x;
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}
\`\`\`

## Connecting Frontend to Blockchain

### Using Ethers.js

\`\`\`typescript
// lib/web3.ts
import { ethers } from 'ethers';

export async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  }
  throw new Error('MetaMask not installed');
}

export async function getContract(contractAddress: string, abi: any) {
  const { signer } = await connectWallet();
  return new ethers.Contract(contractAddress, abi, signer);
}
\`\`\`

### React Hook for Web3

\`\`\`typescript
// hooks/useWeb3.ts
import { useState, useEffect } from 'react';
import { connectWallet } from '@/lib/web3';

export function useWeb3() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    checkConnection();
  }, []);
  
  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    }
  };
  
  const connect = async () => {
    try {
      const { address } = await connectWallet();
      setAccount(address);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };
  
  return { account, isConnected, connect };
}
\`\`\`

## Building a dApp

\`\`\`typescript
// components/Web3Button.tsx
'use client';

import { useWeb3 } from '@/hooks/useWeb3';

export function Web3Button() {
  const { account, isConnected, connect } = useWeb3();
  
  if (!isConnected) {
    return (
      <button onClick={connect} className="btn-primary">
        Connect Wallet
      </button>
    );
  }
  
  return (
    <div>
      <p>Connected: {account?.slice(0, 6)}...{account?.slice(-4)}</p>
    </div>
  );
}
\`\`\`

## Ethereum Scaling Solutions

### Layer 2 Solutions

- **Arbitrum**: Optimistic rollup for Ethereum
- **Polygon**: Sidechain solution
- **Optimism**: Another optimistic rollup

### Why Scaling Matters

Ethereum mainnet can be slow and expensive. Layer 2 solutions provide:
- Faster transactions
- Lower gas fees
- Better user experience

## Learning Resources

1. **Ethereum.org**: Official documentation
2. **Solidity Documentation**: Learn smart contract development
3. **OpenZeppelin**: Secure smart contract libraries
4. **Hardhat**: Development environment
5. **Remix**: Online IDE for Solidity

## Future of Web3

Web3 is still evolving, with exciting developments in:
- DeFi (Decentralized Finance)
- NFTs (Non-Fungible Tokens)
- DAOs (Decentralized Autonomous Organizations)
- Metaverse applications

## Getting Started

1. Install MetaMask browser extension
2. Get test ETH from a faucet
3. Explore existing dApps
4. Start building your first smart contract
5. Connect your frontend to the blockchain

The Web3 ecosystem offers endless possibilities for innovation. Start exploring today!`,
    date: "2024-03-15",
    category: "Web3",
    readTime: "25 min read",
  },
];

export function getBlogPostById(id: number): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

