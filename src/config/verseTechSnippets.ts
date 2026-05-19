/** Route-adjacent “live code” strings for holo panels in the verse */
export const VERSE_TECH_SNIPPETS: Record<string, string[]> = {
  origin: [
    "export const Verse = () => {",
    "  useFrame((_, dt) => sim.integrate(dt));",
    "  return <Canvas gl={{ antialias: true }} />;",
    "};",
    "// R3F · WebGL · requestAnimationFrame",
  ],
  profile: [
    "type Stack = 'next' | 'r3f' | 'node';",
    "interface DevProfile {",
    "  craft: Stack[];",
    "  mode: 'systems' | 'product';",
    "}",
  ],
  build: [
    "const deploy = await pipeline.run({",
    "  target: 'edge',",
    "  cache: 'immutable',",
    "});",
    "// CI/CD · zero-downtime",
  ],
  chrono: [
    "timeline.map((role) => ({",
    "  ...role,",
    "  impact: measureOutcomes(role),",
    "}));",
  ],
  services: [
    "await agent.orchestrate({",
    "  tools: ['mcp', 'api', 'db'],",
    "  policy: 'least-privilege',",
    "});",
  ],
  stream: [
    "const posts = await mdx.loadAll();",
    "return posts.sort(byPublishedAt);",
    "// MDX · RSS · open graph",
  ],
  comms: [
    "const channel = openSecureSocket({",
    "  encrypt: 'TLS1.3',",
    "  readyState: 'OPEN',",
    "});",
  ],
};

export function getTechSnippet(landmarkId: string): string {
  const lines = VERSE_TECH_SNIPPETS[landmarkId] ?? VERSE_TECH_SNIPPETS.origin;
  return lines.join("\n");
}

export const VERSE_TELEMETRY = [
  "SYS::VERSE_ONLINE",
  "GPU::WEBGL2",
  "NET::EDGE_READY",
  "AUTH::SESSION_OK",
  "RENDER::60FPS_TARGET",
  "HUD::JARVIS_MODE",
];
