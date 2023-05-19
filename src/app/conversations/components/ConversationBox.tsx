"use client";

import Avatar from "@/app/components/Avatar";
import Text from "@/components/Text";
import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationType } from "@/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationBoxProps {
  item: FullConversationType;
  selected?: boolean;
}

const ConversationBox = ({ item, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(item);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`conversations/${item.id}`);
  }, [router, item.id]);

  const lastMessage = useMemo(() => {
    const messages = item.messages || [];

    return messages[messages.length - 1];
  }, [item.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) return "Sent an image";

    if (lastMessage?.body) return lastMessage?.body;

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "flex items-center relative w-full space-x-3 p-3 rounded-lg transition-all cursor-pointer dark:hover:bg-slate-800 hover:bg-gray-300",
        selected && "dark:bg-slate-800 bg-gray-300"
      )}
    >
      <Avatar user={otherUser} />
      <div className="min-w-0 flex-1 mb-1">
        <div className="flex justify-between items-center">
          <Text className="font-medium whitespace-nowrap overflow-hidden text-ellipsis text-lg">
            {item.name || otherUser.name}
          </Text>
          {lastMessage?.createdAt && (
            <Text className="text-xs font-light">
              {format(new Date(lastMessage.createdAt), "p")}
            </Text>
          )}
        </div>
        <Text
          className={clsx(
            "text-sm whitespace-nowrap overflow-hidden text-ellipsis",
            hasSeen
              ? "text-gray-500 dark:text-gray-500"
              : "text-slate-900 font-medium dark:text-gray-100"
          )}
        >
          {lastMessageText}
        </Text>
      </div>
    </div>
  );
};

export default ConversationBox;
