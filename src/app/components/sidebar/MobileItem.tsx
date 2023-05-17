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
        "group flex gap-x-3 text-sm leading-6 font-semibold rounded-full justify-center p-3 text-gray-500 transition-all hover:text-slate-900 hover:bg-white hover:shadow",
        active && "bg-white text-slate-900 shadow"
      )}
    >
      <Icon className="w-6 h-6" />
    </Link>
  );
};

export default MobileItem;
