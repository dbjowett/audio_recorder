import { toast } from 'sonner';

export const useGetStream = (deviceId: string | null) => {
  const getStream = async (): Promise<MediaStream | undefined> => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
        },
        video: false,
      });
      return newStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast('Failed to access audio input device. Please check your permissions.', {
        description: 'Ensure that the browser has permission to access the microphone.',
      });
    }
  };

  return { getStream };
};
