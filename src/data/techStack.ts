import type { ReactNode } from "react";
import {
  ApiIcon,
  ContentfulIcon,
  EthereumIcon,
  ExpressIcon,
  GithubIcon,
  GoogleAnalyticsIcon,
  GsapIcon,
  HubSpotIcon,
  JavaScriptIcon,
  MongoDBIcon,
  NestIcon,
  NextIcon,
  PostHogIcon,
  ReactIcon,
  ReactNativeIcon,
  SanityIcon,
  SassIcon,
  ShadcnIcon,
  TailwindcssIcon,
  TypeScriptIcon,
  VueIcon,
  Web3Icon,
} from "@/src/svg";
import {
  AxiosIcon,
  AwsIcon,
  BullMQIcon,
  DockerIcon,
  ElasticsearchIcon,
  FastifyIcon,
  FramerMotionStackIcon,
  GitHubActionsIcon,
  GraphQLIcon,
  GrpcIcon,
  JestIcon,
  JwtIcon,
  KafkaIcon,
  LinuxIcon,
  NginxIcon,
  NodeIcon,
  PaystackIcon,
  PiniaIcon,
  PnpmIcon,
  PostgreSQLIcon,
  PrismaIcon,
  RabbitMQIcon,
  RedisIcon,
  ReduxToolkitIcon,
  SocketIoIcon,
  StripeIcon,
  SwaggerIcon,
  VitestIcon,
  WebSocketIcon,
  ZodIcon,
  ZustandIcon,
} from "@/src/svg/techIcons";

export type TechStackCategory =
  | "frontend"
  | "backend"
  | "data"
  | "devops"
  | "tooling"
  | "integrations"
  | "analytics"
  | "web3";

export type TechStackItem = {
  id: string;
  name: string;
  category: TechStackCategory;
  xp: number;
  icon: () => ReactNode;
};

export const TECH_STACK_CATEGORIES: { id: TechStackCategory; label: string }[] = [
  { id: "frontend", label: "Frontend & UI" },
  { id: "backend", label: "Backend & APIs" },
  { id: "data", label: "Data & storage" },
  { id: "devops", label: "DevOps & cloud" },
  { id: "tooling", label: "Tooling & quality" },
  { id: "integrations", label: "Payments & integrations" },
  { id: "analytics", label: "Analytics & CMS" },
  { id: "web3", label: "Web3 (exploring)" },
];

/** HUD registry bay codes (tech home stack). */
export const TECH_STACK_BAY_CODES: Record<TechStackCategory, string> = {
  frontend: "FE",
  backend: "BE",
  data: "DB",
  devops: "DO",
  tooling: "TQ",
  integrations: "INT",
  analytics: "AN",
  web3: "W3",
};

export type StackModuleTier = "core" | "prod" | "ops" | "lab";

const STACK_MODULE_TIERS: {
  tier: StackModuleTier;
  label: string;
  pips: number;
  minXp: number;
}[] = [
  { tier: "core", label: "CORE", pips: 4, minXp: 8500 },
  { tier: "prod", label: "PROD", pips: 3, minXp: 7500 },
  { tier: "ops", label: "OPS", pips: 2, minXp: 6500 },
  { tier: "lab", label: "LAB", pips: 1, minXp: 0 },
];

/** HUD deployment tier + lit pips (no numeric score). */
export function getStackModuleTier(xp: number) {
  const match =
    STACK_MODULE_TIERS.find((t) => xp >= t.minXp) ??
    STACK_MODULE_TIERS[STACK_MODULE_TIERS.length - 1];
  return match;
}

/** Zero-padded channel index within a bay (01, 02, …). */
export function formatStackChannel(index: number) {
  return `CH-${String(index + 1).padStart(2, "0")}`;
}

export const TECH_STACK_ITEMS: TechStackItem[] = [
  // Frontend
  { id: "next", name: "Next.js", category: "frontend", xp: 9500, icon: NextIcon },
  { id: "react", name: "React", category: "frontend", xp: 9200, icon: ReactIcon },
  { id: "vue", name: "Vue / Nuxt", category: "frontend", xp: 9000, icon: VueIcon },
  { id: "typescript", name: "TypeScript", category: "frontend", xp: 8800, icon: TypeScriptIcon },
  { id: "javascript", name: "JavaScript", category: "frontend", xp: 9000, icon: JavaScriptIcon },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", xp: 8500, icon: TailwindcssIcon },
  { id: "sass", name: "SASS", category: "frontend", xp: 8000, icon: SassIcon },
  { id: "gsap", name: "GSAP", category: "frontend", xp: 8500, icon: GsapIcon },
  { id: "shadcn", name: "shadcn/ui", category: "frontend", xp: 8000, icon: ShadcnIcon },
  { id: "react-native", name: "React Native", category: "frontend", xp: 6500, icon: ReactNativeIcon },
  { id: "redux", name: "Redux Toolkit", category: "frontend", xp: 7800, icon: ReduxToolkitIcon },
  { id: "zustand", name: "Zustand", category: "frontend", xp: 7600, icon: ZustandIcon },
  { id: "pinia", name: "Pinia", category: "frontend", xp: 7400, icon: PiniaIcon },
  { id: "framer", name: "Framer Motion", category: "frontend", xp: 7200, icon: FramerMotionStackIcon },

  // Backend & APIs
  { id: "node", name: "Node.js", category: "backend", xp: 9200, icon: NodeIcon },
  { id: "nestjs", name: "NestJS", category: "backend", xp: 8500, icon: NestIcon },
  { id: "express", name: "Express", category: "backend", xp: 7800, icon: ExpressIcon },
  { id: "fastify", name: "Fastify", category: "backend", xp: 6800, icon: FastifyIcon },
  { id: "rest", name: "REST APIs", category: "backend", xp: 8200, icon: ApiIcon },
  { id: "graphql", name: "GraphQL", category: "backend", xp: 7500, icon: GraphQLIcon },
  { id: "grpc", name: "gRPC", category: "backend", xp: 6500, icon: GrpcIcon },
  { id: "jwt", name: "JWT / Auth", category: "backend", xp: 8000, icon: JwtIcon },
  { id: "socketio", name: "Socket.io", category: "backend", xp: 7600, icon: SocketIoIcon },
  { id: "websocket", name: "WebSockets", category: "backend", xp: 7400, icon: WebSocketIcon },
  { id: "axios", name: "Axios", category: "backend", xp: 7900, icon: AxiosIcon },
  { id: "zod", name: "Zod", category: "backend", xp: 8100, icon: ZodIcon },
  { id: "swagger", name: "OpenAPI / Swagger", category: "backend", xp: 7200, icon: SwaggerIcon },

  // Data
  { id: "mongodb", name: "MongoDB", category: "data", xp: 7000, icon: MongoDBIcon },
  { id: "postgres", name: "PostgreSQL", category: "data", xp: 8200, icon: PostgreSQLIcon },
  { id: "redis", name: "Redis", category: "data", xp: 7800, icon: RedisIcon },
  { id: "prisma", name: "Prisma", category: "data", xp: 8000, icon: PrismaIcon },
  { id: "elasticsearch", name: "Elasticsearch", category: "data", xp: 6800, icon: ElasticsearchIcon },

  // DevOps
  { id: "docker", name: "Docker", category: "devops", xp: 7600, icon: DockerIcon },
  { id: "aws", name: "AWS", category: "devops", xp: 7400, icon: AwsIcon },
  { id: "linux", name: "Linux", category: "devops", xp: 7500, icon: LinuxIcon },
  { id: "nginx", name: "Nginx", category: "devops", xp: 7000, icon: NginxIcon },
  { id: "git", name: "Git", category: "devops", xp: 8500, icon: GithubIcon },
  { id: "github-actions", name: "GitHub Actions", category: "devops", xp: 7300, icon: GitHubActionsIcon },
  { id: "pnpm", name: "pnpm", category: "devops", xp: 7700, icon: PnpmIcon },

  // Tooling
  { id: "jest", name: "Jest", category: "tooling", xp: 8000, icon: JestIcon },
  { id: "vitest", name: "Vitest", category: "tooling", xp: 7200, icon: VitestIcon },
  { id: "bullmq", name: "BullMQ", category: "tooling", xp: 7000, icon: BullMQIcon },
  { id: "rabbitmq", name: "RabbitMQ", category: "tooling", xp: 6500, icon: RabbitMQIcon },
  { id: "kafka", name: "Kafka", category: "tooling", xp: 6400, icon: KafkaIcon },

  // Integrations
  { id: "stripe", name: "Stripe", category: "integrations", xp: 7200, icon: StripeIcon },
  { id: "paystack", name: "Paystack", category: "integrations", xp: 7500, icon: PaystackIcon },

  // Analytics & CMS
  { id: "posthog", name: "PostHog", category: "analytics", xp: 6800, icon: PostHogIcon },
  { id: "hubspot", name: "HubSpot", category: "analytics", xp: 6500, icon: HubSpotIcon },
  { id: "ga", name: "Google Analytics", category: "analytics", xp: 7200, icon: GoogleAnalyticsIcon },
  { id: "sanity", name: "Sanity CMS", category: "analytics", xp: 7000, icon: SanityIcon },
  { id: "contentful", name: "Contentful", category: "analytics", xp: 6800, icon: ContentfulIcon },

  // Web3
  { id: "ethereum", name: "Ethereum", category: "web3", xp: 500, icon: EthereumIcon },
  { id: "web3", name: "Web3", category: "web3", xp: 500, icon: Web3Icon },
];

/** Flat tag list for About page chips and SEO. */
export const TECH_STACK_TAGS = TECH_STACK_ITEMS.map((item) => item.name);

/** Highlights shown when the About stack section is collapsed. */
export const ABOUT_STACK_PREVIEW_IDS: string[] = [
  "next",
  "react",
  "node",
  "nestjs",
  "typescript",
  "postgres",
  "docker",
  "prisma",
  "tailwind",
  "zod",
];

export function getTechStackByCategory(category: TechStackCategory) {
  return TECH_STACK_ITEMS.filter((item) => item.category === category);
}
