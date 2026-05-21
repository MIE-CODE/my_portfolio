/** Compact stack icons — glyphs for tools without a dedicated brand SVG in index. */

type GlyphProps = {
  abbr: string;
  bg: string;
  fg?: string;
};

export function StackGlyphIcon({ abbr, bg, fg = "#ffffff" }: GlyphProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      className="transition-transform duration-300 hover:rotate-6"
      aria-hidden
    >
      <rect width="48" height="48" rx="10" fill={bg} />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fontSize={abbr.length > 3 ? "9" : "11"}
        fontWeight="700"
        fill={fg}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {abbr}
      </text>
    </svg>
  );
}

export const NodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden>
    <rect width="48" height="48" rx="10" fill="#339933" />
    <path
      fill="#fff"
      d="M24 8c-6.2 0-11.2 4.2-11.2 9.4 0 4 2.8 7.5 7 8.8l-.5 2.8c-.1.5.4.9.8.7l3.2-1.7c.4-.2.9-.2 1.3 0 1 .4 2.1.6 3.4.6 6.2 0 11.2-4.2 11.2-9.4S30.2 8 24 8zm-1.2 14.2h-2.4v-7h3.6c2.2 0 3.4 1.1 3.4 2.9 0 1.2-.5 2.1-1.4 2.6l2.2 3.5h-2.7l-1.9-3.2h-1.2v3.2zm1.2-5.2c1 0 1.5-.5 1.5-1.3s-.5-1.3-1.5-1.3h-1.2v2.6h1.2zm8.4 5.2h-2.5l-3.6-7h2.6l2.3 4.8 2.3-4.8h2.5l-3.6 7z"
    />
  </svg>
);

export const PostgreSQLIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden>
    <rect width="48" height="48" rx="10" fill="#336791" />
    <path
      fill="#fff"
      d="M30.5 18.2c-.4-2.6-2.4-4.2-5.5-4.2-1.3 0-2.5.3-3.4.8l.6 2.8c.8-.4 1.7-.6 2.7-.6 1.8 0 2.8.9 3 2.6l.3 1.8h-3.8c-3.4 0-5.4 1.6-5.8 4.5-.4 2.7 1.2 4.5 4.2 4.5 1.5 0 2.8-.4 3.7-1.1l-.1 1h2.6l1.1-6.8c.3-2.1-.5-3.5-2-4.5zm-4.1 8.5c-1.5 0-2.3-.7-2.1-2.1.2-1.3 1.2-2 2.9-2h3.3l-.3 1.8c-.4 1.4-1.6 2.3-3.8 2.3zM17 32.5h2.8l1.4-8.6H18.4l-1.4 8.6z"
    />
  </svg>
);

export const RedisIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden>
    <rect width="48" height="48" rx="10" fill="#DC382D" />
    <path
      fill="#fff"
      d="M36 20.5L24 14 12 20.5v7L24 34l12-6.5v-7zm-2 5.8L24 31.2 14 26.3v-4.2l10-5 10 5v4.2z"
    />
  </svg>
);

export const DockerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden>
    <rect width="48" height="48" rx="10" fill="#2496ED" />
    <path
      fill="#fff"
      d="M14 26h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm-8-4h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm4 0h3v3h-3v-3zm8 1.5c-.8-1-2-1.8-3.5-2.2l.8-3.5-1.8-.4-.7 3.1c-.5-.1-1-.1-1.5-.1H10v12c0 2.2 1.8 4.5 5.5 4.5 4.2 0 7.8-1.7 9.5-4.2 1.8.3 3.5.2 4.8-.8 1-.8 1.7-2 2.2-3.5l-6.5-.3z"
    />
  </svg>
);

export const PrismaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden>
    <rect width="48" height="48" rx="10" fill="#0C344B" />
    <path fill="#2D3748" d="M24 10L10 34h8l6-12 6 12h8L24 10z" />
    <path fill="#5A67D8" d="M24 14l-8 16h5l3-6 3 6h5l-8-16z" />
  </svg>
);

export const GraphQLIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden>
    <rect width="48" height="48" rx="10" fill="#E10098" />
    <circle cx="24" cy="10" r="3" fill="#fff" />
    <circle cx="14" cy="32" r="3" fill="#fff" />
    <circle cx="34" cy="32" r="3" fill="#fff" />
    <path stroke="#fff" strokeWidth="2" d="M24 13v8M17 30l5-9M31 30l-5-9" />
  </svg>
);

export const JestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden>
    <rect width="48" height="48" rx="10" fill="#C21325" />
    <path
      fill="#fff"
      d="M14 30c2.5 2 5.5 3 10 3s7.5-1 10-3c-1.5-6-4.5-10-10-10s-8.5 4-10 10zm10-12c3.5 0 6.5 2.5 8 6-2.5-1.5-5-2-8-2s-5.5.5-8 2c1.5-3.5 4.5-6 8-6z"
    />
  </svg>
);

export const SocketIoIcon = () => (
  <StackGlyphIcon abbr="io" bg="#010101" />
);

export const ZodIcon = () => (
  <StackGlyphIcon abbr="Zod" bg="#3068B7" />
);

export const FastifyIcon = () => (
  <StackGlyphIcon abbr="Fst" bg="#000000" fg="#ffffff" />
);

export const StripeIcon = () => (
  <StackGlyphIcon abbr="$$" bg="#635BFF" />
);

export const PaystackIcon = () => (
  <StackGlyphIcon abbr="Pay" bg="#00C3F7" fg="#041E42" />
);

export const AxiosIcon = () => (
  <StackGlyphIcon abbr="Ax" bg="#5A29E4" />
);

export const BullMQIcon = () => (
  <StackGlyphIcon abbr="Bull" bg="#B45309" />
);

export const RabbitMQIcon = () => (
  <StackGlyphIcon abbr="RMQ" bg="#FF6600" />
);

export const KafkaIcon = () => (
  <StackGlyphIcon abbr="Kfk" bg="#231F20" />
);

export const ElasticsearchIcon = () => (
  <StackGlyphIcon abbr="ES" bg="#005571" />
);

export const SwaggerIcon = () => (
  <StackGlyphIcon abbr="API" bg="#85EA2D" fg="#173647" />
);

export const GrpcIcon = () => (
  <StackGlyphIcon abbr="gRPC" bg="#244C5A" />
);

export const JwtIcon = () => (
  <StackGlyphIcon abbr="JWT" bg="#d63a3a" />
);

export const LinuxIcon = () => (
  <StackGlyphIcon abbr="Ln" bg="#FCC624" fg="#111" />
);

export const AwsIcon = () => (
  <StackGlyphIcon abbr="AWS" bg="#FF9900" fg="#232F3E" />
);

export const NginxIcon = () => (
  <StackGlyphIcon abbr="ngx" bg="#009639" />
);

export const PnpmIcon = () => (
  <StackGlyphIcon abbr="pnpm" bg="#F69220" fg="#1a1a1a" />
);

export const VitestIcon = () => (
  <StackGlyphIcon abbr="Vit" bg="#729B1B" fg="#fff" />
);

export const GitHubActionsIcon = () => (
  <StackGlyphIcon abbr="GHA" bg="#2088FF" />
);

export const ReduxToolkitIcon = () => (
  <StackGlyphIcon abbr="RTK" bg="#764ABC" />
);

export const ZustandIcon = () => (
  <StackGlyphIcon abbr="Zus" bg="#443E38" />
);

export const PiniaIcon = () => (
  <StackGlyphIcon abbr="Pin" bg="#FFD859" fg="#1a1a1a" />
);

export const FramerMotionStackIcon = () => (
  <StackGlyphIcon abbr="FM" bg="#0055FF" />
);

export const WebSocketIcon = () => (
  <StackGlyphIcon abbr="WS" bg="#010101" />
);
