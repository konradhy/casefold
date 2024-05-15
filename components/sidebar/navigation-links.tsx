"use client";

import { Files, Home, LucideIcon, Settings } from "lucide-react";

export interface NavLink {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  onClick?: () => void;
  link?: string;
  hotkey?: string;
  name?: string;
}

export let initialTopLinks: NavLink[] = [
  {
    title: "Home",
    icon: Home,
    variant: "default",
    link: "/dashboard",
    name: "dashboard",
  },

  {
    title: "New Doc",
    icon: Files,
    variant: "default",
    link: "/files",
    name: "files",
  },
  {
    title: "Settings",
    icon: Settings,
    variant: "default",
    link: "/settings",
    name: "settings",
  },
];
