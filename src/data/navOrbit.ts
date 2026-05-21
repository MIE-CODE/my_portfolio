import type { NavRouteIconId } from "../svg/navIcons";

export type NavOrbitNode = {
  href: string;
  label: string;
  icon: NavRouteIconId;
};

export const NAV_ORBIT_NODES: NavOrbitNode[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/about", label: "About", icon: "about" },
  { href: "/services", label: "Services", icon: "services" },
  { href: "/experience", label: "Experience", icon: "experience" },
  { href: "/projects", label: "Projects", icon: "projects" },
  { href: "/blog", label: "Blog", icon: "blog" },
  { href: "/contact", label: "Contact", icon: "contact" },
];

export const ORBIT_NODE_COUNT = NAV_ORBIT_NODES.length;
