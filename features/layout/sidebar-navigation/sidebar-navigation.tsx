import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { Routes } from "@config/routes";
import classNames from "classnames";
import { NavigationContext } from "./navigation-context";
import { MenuItemButton } from "./menu-item-button";
import { MenuItemLink } from "./menu-item-link";
import { Button } from "@features/ui";
import styles from "./sidebar-navigation.module.scss";
import Image from "next/image";
import { debounce } from "lodash";

const menuItems = [
  { text: "Projects", iconSrc: "/icons/projects.svg", href: Routes.projects },
  { text: "Issues", iconSrc: "/icons/issues.svg", href: Routes.issues },
  { text: "Alerts", iconSrc: "/icons/alert.svg", href: Routes.alerts },
  { text: "Users", iconSrc: "/icons/users.svg", href: Routes.users },
  { text: "Settings", iconSrc: "/icons/settings.svg", href: Routes.settings },
];

type SidebarNavigationProps = {
  className?: string;
};

export function SidebarNavigation({ className }: SidebarNavigationProps) {
  const router = useRouter();
  const { isSidebarCollapsed, toggleSidebar } = useContext(NavigationContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = debounce(() => {
      const isMobileView = window.matchMedia("(max-width: 64em)").matches;
      setIsMobileView(isMobileView);
    }, 100); // Debounce with a 100ms delay

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      handleResize.cancel(); // Cancel any pending executions
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openSupportMail = () => {
    window.open(
      "mailto:support@prolog-app.com?subject=Support Request:",
      "_blank",
    );
  };

  return (
    <div
      className={classNames(
        styles.container,
        isSidebarCollapsed && styles.isCollapsed,
        className,
      )}
    >
      <div
        className={classNames(
          styles.fixedContainer,
          isSidebarCollapsed && styles.isCollapsed,
        )}
      >
        <header className={styles.header}>
          {isMobileView ? (
            <Image
              src="/icons/logo-large.svg"
              alt="logo"
              width={118}
              height={33}
              className={styles.logo}
            />
          ) : (
            <Image
              src={
                isSidebarCollapsed
                  ? "/icons/logo-small.svg"
                  : "/icons/logo-large.svg"
              }
              alt="logo"
              width={isSidebarCollapsed ? 23 : 118}
              height={33}
              className={styles.logo}
            />
          )}
          <Button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.menuButton}
          >
            <Image
              src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              alt={isMobileMenuOpen ? "close menu" : "open menu"}
              width={isMobileMenuOpen ? 23 : 118} // Assuming similar dimensions for menu icons for simplicity
              height={33}
              className={styles.menuIcon}
            />
          </Button>
        </header>
        <div
          className={classNames(
            styles.menuOverlay,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        />
        <nav
          className={classNames(
            styles.nav,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        >
          <ul className={styles.linkList}>
            {menuItems.map((menuItem, index) => (
              <MenuItemLink
                key={index}
                {...menuItem}
                isCollapsed={isSidebarCollapsed}
                isActive={router.pathname === menuItem.href}
              />
            ))}
          </ul>
          <ul className={styles.list}>
            <MenuItemButton
              text="Support"
              iconSrc="/icons/support.svg"
              isCollapsed={isSidebarCollapsed}
              onClick={openSupportMail}
            />
            <MenuItemButton
              text="Collapse"
              iconSrc="/icons/arrow-left.svg"
              isCollapsed={isSidebarCollapsed}
              onClick={() => toggleSidebar()}
              className={classNames(styles.collapseMenuItem, {
                [styles.collapseIconRotated]: isSidebarCollapsed,
              })}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}
