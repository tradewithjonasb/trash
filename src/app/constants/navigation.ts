import { LucideIcon } from "lucide-react";
import { Home, Wallet, PieChart, Settings, HelpCircle } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  current?: boolean;
}

export const MAIN_NAV: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Vaults", href: "/vaults", icon: Wallet },
  { name: "Portfolio", href: "/portfolio", icon: PieChart },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const SECONDARY_NAV: NavItem[] = [
  { name: "Help Center", href: "/help", icon: HelpCircle },
];

export const FOOTER_LINKS = [
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
  { name: "Terms", href: "/terms" },
  { name: "Privacy", href: "/privacy" },
  { name: "Contact", href: "/contact" },
];