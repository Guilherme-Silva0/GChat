"use client";

import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 transition-all hover:text-slate-900 hover:bg-white",
          active && "bg-white text-slate-900"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
