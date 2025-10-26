import { useEffect, useState } from "react";

export function useRoomCheck(roomId?: string) {
  const [roomExists, setRoomExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!roomId) {
      setRoomExists(false);
      return;
    }

    const checkRoom = async () => {
      try {
        const res = await fetch(`/stream-service/api/rooms/${roomId}`);
        if (!res.ok) throw new Error("Room not found");

        const data = await res.json();
        setRoomExists(!!data?.id);
      } catch {
        setRoomExists(false);
      }
    };

    checkRoom();
  }, [roomId]);

  return { roomExists };
}
