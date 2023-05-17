"use client";

import { User } from "@prisma/client";
import Image from "next/image";

const Avatar = ({ user }: { user?: User }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          alt="Avatar user"
          src={user?.image || "/images/placeholder.jpg"}
          fill
        />
      </div>
      <span className="absolute block rounded-full bg-green-600 ring-2 ring-gray-200 top-0 right-0 h-2 w-2 dark:ring-slate-900 md:h-3 md:w-3" />
    </div>
  );
};

export default Avatar;
