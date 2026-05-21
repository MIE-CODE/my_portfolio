const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export type NavRouteIconId =
  | "home"
  | "about"
  | "services"
  | "experience"
  | "projects"
  | "blog"
  | "contact";

export function NavRouteIcon({
  id,
  className,
}: {
  id: NavRouteIconId;
  className?: string;
}) {
  const cn = className ?? "h-[18px] w-[18px]";

  switch (id) {
    case "home":
      return (
        <svg {...base} className={cn}>
          <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "about":
      return (
        <svg {...base} className={cn}>
          <circle cx="12" cy="8" r="3.25" />
          <path d="M6 20v-.75c0-2.9 2.69-4.25 6-4.25s6 1.35 6 4.25V20" />
        </svg>
      );
    case "services":
      return (
        <svg {...base} className={cn}>
          <path d="M12 2 2 7l10 5 10-5-10-5z" />
          <path d="M2 12l10 5 10-5" />
          <path d="M2 17l10 5 10-5" />
        </svg>
      );
    case "experience":
      return (
        <svg {...base} className={cn}>
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <rect x="4" y="7" width="16" height="13" rx="2" />
          <path d="M8 12h8M8 16h5" />
        </svg>
      );
    case "projects":
      return (
        <svg {...base} className={cn}>
          <path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        </svg>
      );
    case "blog":
      return (
        <svg {...base} className={cn}>
          <path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
          <path d="M14 4v4h4M8 12h8M8 16h5" />
        </svg>
      );
    case "contact":
      return (
        <svg {...base} className={cn}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 3V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 10h8M8 13h5" />
        </svg>
      );
    default:
      return null;
  }
}

export function NavBarLayoutIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className ?? "h-[18px] w-[18px]"}>
      <path d="M4 7h16M4 12h10M4 17h14" />
    </svg>
  );
}

export function NavTechModeIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className ?? "h-[16px] w-[16px]"}>
      <rect x="5" y="5" width="14" height="14" rx="1.5" />
      <path d="M9 9h2M13 9h2M9 13h2M13 13h2" />
    </svg>
  );
}

export function NavPlayModeIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className ?? "h-[16px] w-[16px]"}>
      <path d="M8 8h8v3H8zM6 14h12v2H6z" />
      <circle cx="9.5" cy="10" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="10" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function NavWhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "h-[18px] w-[18px]"}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
