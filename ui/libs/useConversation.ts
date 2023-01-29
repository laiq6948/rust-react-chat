import { useEffect, useState } from "react";

const fetchRoomData = async (room_id: string) => {
  if (!room_id) return;
  const url = `http://localhost:8080/conversations/${room_id}`;
  try {
    let resp = await fetch(url).then((res) => res.json());
    return resp;
  } catch (e) {
    console.log(e);
  }
};

export default function useConversations(room_id: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [messages, setMessages] = useState<any>([]);

  const updateMessages = (resp = []) => {
    setIsLoading(false);
    setMessages(resp);
  };

  const fetchConversations = (id: string) => {
    setIsLoading(true);
    fetchRoomData(id).then(updateMessages);
  };

  useEffect(() => fetchConversations(room_id), []);

  return [isLoading, messages, setMessages, fetchConversations];
}
