import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface ButtonAuthSocialProps {
  icon: LucideIcon | "google";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  media: "google" | "github";
}

const ButtonAuthSocial: React.FunctionComponent<ButtonAuthSocialProps> = ({
  icon: Icon,
  onClick,
  media,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex flex-1 justify-center items-center gap-2 py-2 rounded text-gray-200 capitalize active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-500",
        media === "github" && "bg-zinc-900",
        media === "google" && "bg-red-400"
      )}
    >
      {Icon === "google" ? (
        <Image
          alt="google icon"
          src="/google.svg"
          width={25}
          height={25}
          className="drop-shadow"
        />
      ) : (
        <Icon className="drop-shadow" />
      )}
      {media}
    </button>
  );
};

export default ButtonAuthSocial;
