import { useState } from "react";

export const useGetStream = () => {
  const [userStream, setUserStream] = useState<MediaStream | null>(null);
  const getStream = async () => {
    if (navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setUserStream(stream);
    }
    getStream();

    return { stream: userStream };
  };
};
