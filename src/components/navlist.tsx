"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavList = (props: {
  isOpen?: (event: boolean) => void;
  pathname?: string;
}) => {
  const routerPathname = usePathname();
  const pathname = props.pathname || routerPathname;
  const isMobileMenu = props.isOpen !== undefined;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const handleClick = () => {
    props.isOpen?.(false);
  };

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.href} className="navlist-item">
            <Link
              href={item.href}
              onClick={handleClick}
              className={
                isMobileMenu
                  ? `nav-link-mobile${isActive ? " nav-link-mobile--active" : ""}`
                  : `relative whitespace-nowrap pb-1.5 text-xs font-medium transition-all duration-300 lg:text-sm ${
                      isActive
                        ? "text-primary-700 dark:text-primary-400"
                        : "text-muted-600 dark:text-muted-400 hover:text-primary-700 dark:hover:text-primary-400"
                    }`
              }
            >
              <span>{item.label}</span>
              {!isMobileMenu && isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary-500 dark:bg-primary-400" />
              )}
              {!isMobileMenu && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 rounded-full bg-primary-500 transition-transform duration-300 hover:scale-x-100 dark:bg-primary-400" />
              )}
            </Link>
          </li>
        );
      })}
    </>
  );
};
