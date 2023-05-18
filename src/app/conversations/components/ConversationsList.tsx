"use client";

import Text from "@/components/Text";
import ThemeButton from "@/components/ThemeButton";
import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import clsx from "clsx";
import { Users2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConversationBox from "./ConversationBox";

interface ConversationsListProps {
  initialItems: FullConversationType[];
}

const ConversationsList = ({ initialItems }: ConversationsListProps) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lb:block overflow-y-auto border-r border-gray-300 block w-full left-0 dark:border-slate-950",
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div className="px-5">
        <div className="flex justify-between items-center py-4">
          <Text paragraph className="text-2xl font-bold ">
            Messages
          </Text>
          <div className="flex items-center gap-5">
            <div className="cursor-pointer rounded-full p-2 text-gray-500 transition-all hover:opacity-70">
              <Users2Icon />
            </div>
            <ThemeButton className="p-2 text-gray-500 transition-all dark:text-gray-500 hover:opacity-70" />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            item={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationsList;
