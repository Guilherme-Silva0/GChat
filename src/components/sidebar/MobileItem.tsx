"use client";

import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface MobileItemProps {
  icon: LucideIcon;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem = ({ icon: Icon, href, onClick, active }: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      onClick={handleClick}
      href={href}
      className={clsx(
        "group flex gap-x-3 text-sm leading-6 font-semibold rounded-full justify-center p-3 text-gray-500 transition-all hover:bg-white hover:text-slate-900 dark:hover:text-gray-200 dark:hover:bg-slate-950 hover:shadow",
        active &&
          "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-gray-200"
      )}
    >
      <Icon className="w-6 h-6" />
    </Link>
  );
};

export default MobileItem;
