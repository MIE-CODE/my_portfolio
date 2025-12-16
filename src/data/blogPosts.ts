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
    title: "Getting Started with Next.js 14",
    excerpt: "Learn the fundamentals of Next.js 14 and how to build modern React applications with server-side rendering.",
    content: `Next.js 14 introduces powerful new features that make building React applications more efficient than ever. In this comprehensive guide, we'll explore the App Router, Server Components, and the latest performance optimizations.

## Setting Up Your First Project

To get started with Next.js 14, you'll need Node.js 18.17 or later installed. Create a new project using the create-next-app command:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

The setup wizard will guide you through configuring TypeScript, ESLint, Tailwind CSS, and other options. Choose the App Router when prompted, as it's the recommended approach for new projects.

## Understanding the App Router

The App Router is Next.js 14's new routing system based on the file system. Each folder in the \`app\` directory represents a route segment. To create a page, simply add a \`page.tsx\` file inside a folder.

For example:
- \`app/page.tsx\` → Home page (/)
- \`app/about/page.tsx\` → About page (/about)
- \`app/blog/[id]/page.tsx\` → Dynamic route (/blog/123)

## Server Components by Default

One of the biggest changes is that components are Server Components by default. This means they render on the server, reducing the JavaScript bundle size sent to the client. Server Components can directly access databases, file systems, and other server-side resources.

To create a Client Component (for interactivity), add \`"use client"\` at the top of your file.

## Data Fetching Strategies

Next.js 14 offers several data fetching methods:

1. **Server Components**: Fetch data directly in Server Components using async/await
2. **Route Handlers**: Create API endpoints in \`app/api\` directory
3. **Server Actions**: Define server-side functions that can be called from Client Components

## Performance Optimizations

Next.js 14 includes automatic optimizations:
- Automatic code splitting
- Image optimization with next/image
- Font optimization
- Static generation for better performance

## Deployment

Deploy your Next.js 14 app easily to Vercel, Netlify, or any Node.js hosting platform. The framework handles all the optimizations automatically.

Whether you're new to Next.js or upgrading from a previous version, this guide will help you leverage the full power of Next.js 14.`,
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
];

export function getBlogPostById(id: number): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

