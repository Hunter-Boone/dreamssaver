export const siteConfig = {
  name: "Dreams Saver",
  description: "Track your dreams and unlock their secrets with AI insights",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/og.jpg`,
  links: {
    twitter: "https://twitter.com/dreamssaver",
    github: "https://github.com/dreamssaver/dreamssaver",
  },
};

export type SiteConfig = typeof siteConfig;

export const mainNav = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "New Dream",
    href: "/dashboard/new",
  },
  {
    title: "Settings",
    href: "/settings/profile",
  },
];
