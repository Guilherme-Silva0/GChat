import { LogOutIcon, MessageCircleIcon, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "chat",
        href: "/conversations",
        icon: MessageCircleIcon,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: User2Icon,
        active: pathname === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: LogOutIcon,
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
