import { useEffect, useState } from "react";

const options = {
  audio: true,
};

export const useGetStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const getStream = async () => {
      if (!navigator.mediaDevices) return;
      const stream = await navigator.mediaDevices.getUserMedia(options);
      setStream(stream);
    };
    getStream();
  }, []);

  return { stream };
};
