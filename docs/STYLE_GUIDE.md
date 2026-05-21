# Portfolio style guide — Tech + Gamify

Dual UI modes share one semantic color system; light/dark follows the OS only.

## Theme overview

| | **Tech (MARK VII)** | **Gamify (Quest UI)** |
|---|---|---|
| Vibe | HUD interface, tactical, precision | RPG, playful, achievement-driven |
| Toggle | Navbar **TECH** / **PLAY** | Same |
| Verse | ParallaxVerse (3D) on | Flat shell only |
| Default | — | **Gamify** |

## Core palettes

### Tech — Iron Man

| Token | Hex | Usage |
|-------|-----|--------|
| Navy | `#0a1520` | Dark background |
| Steel | `#2a3d52` | Borders, secondary |
| Arc | `#4ee8ff` | Primary accent, HUD glow |
| Gold | `#ffb347` | Warnings, highlights |
| Danger | `#e63946` | Errors, critical |

**Dark surfaces:** bg `#0a1520` · card `#141d2b` · border `#1e3048` · text high `#c8e6f5` · text dim `#4a6a85`

**Light surfaces:** bg `#f4f7fa` · card `#ffffff` · border `#c8d6e3` · primary `#1a5a8a` · gold `#d4900a`

### Gamify — Quest UI

| Token | Hex | Usage |
|-------|-----|--------|
| Void | `#12082a` | Dark background |
| Rogue | `#4a2472` | Surfaces, borders |
| Magic | `#a855f7` | Primary accent |
| Gold XP | `#fbbf24` | XP, rewards |
| Level Up | `#22c55e` | Success, progress |

**Dark surfaces:** bg `#12082a` · card `#2a1a48` · border `#6b3faa` · magic `#c084fc` · gold `#fbbf24` · level `#22c55e`

**Light surfaces:** bg `#faf5ff` · card `#ffffff` · border `#ddd6fe` · magic `#7c3aed` · gold `#ca8a04`

### Shared semantic (both modes)

| Role | Hex |
|------|-----|
| Success | `#228B22` |
| Warning | `#FFD700` |
| Error | `#B22222` |
| Info | `#1E90FF` |

Implemented as CSS variables `--color-success`, `--color-warning`, `--color-error`, `--color-info` in [`src/style/tokens.css`](../src/style/tokens.css).

## Typography

| Role | Tech | Gamify |
|------|------|--------|
| Display / HUD headings | JetBrains Mono | Fredoka One |
| Body | Rajdhani, Inter | Nunito |
| Labels | Mono, caps, wide tracking | Nunito semibold, friendly |

| Token | Size | Weight |
|-------|------|--------|
| Display | 32–36px | 700 |
| H1 | 24px | 600–700 |
| Body | 14px | 400 |
| Label | 10–12px | 500–600, often uppercase (tech) |

Utility classes: `.type-display`, `.type-h1`, `.type-body`, `.type-label`, `.hud-label` (tech adds `//` prefix).

## Spacing scale

`4 · 8 · 12 · 16 · 24 · 32 · 48` px — CSS vars `--space-1` … `--space-12`, Tailwind `spacing` extended in config.

## Border radius

| Token | Tech | Gamify |
|-------|------|--------|
| Sharp / HUD | `2px` (`--radius-sharp`) | — |
| Fields | `4px` (`--radius-field`) | `8px` |
| Cards | `4px` (`--radius-ui`) | `12px` (`--radius-quest`) |
| Pills | — | `9999px` |

## Motion

| Mode | Motion |
|------|--------|
| Tech | Scan-line sweep, fade-in from left, cyan focus glow on inputs |
| Gamify | Bounce-in, XP bar fill, confetti on contact submit |
| Mode switch | Scale + blur transition (both directions) |

Respects `prefers-reduced-motion`.

## Implementation map

| Concern | Location |
|---------|----------|
| Tokens | `src/style/tokens.css` |
| Global styles | `src/style/globals.css` |
| Tailwind | `tailwind.config.ts` |
| Fonts | `src/lib/fonts.ts` |
| Mode state | `src/contexts/ThemeContext.tsx` |
| Toggle | `src/components/ModeToggle.tsx` |

## Quick comparison

| Attribute | Iron Man (Tech) | Gamify |
|-----------|-----------------|--------|
| Corner radius | 2–4px sharp | 8–12px round |
| Typography | Mono + tracking | Rounded + bold display |
| Border | 1px HUD lines | 2px soft glow |
| Accent | Arc blue + gold | Purple + XP gold |
| Motion | Scan / flicker | Bounce / pulse |
