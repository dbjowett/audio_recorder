import { useRef, useState } from "react";
import useRecorderState from "./useRecorderState";
import { useGetStream } from "./useGetStream";
import { CloudCog } from "lucide-react";

export const useRecorder = () => {
  const recorderRef = useRef<MediaRecorder | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const { stream } = useGetStream();

  const startRecording = async () => {
    try {
      if (!stream) return;
      recorderRef.current = new MediaRecorder(stream);
      recorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting the recording:", error);
    }
  };

  const pauseRecording = () => {
    if (recorderRef.current) {
      setIsRecording(false);
      recorderRef.current.pause();
    }
  };

  const resumeRecording = () => {
    if (recorderRef.current) {
      setIsRecording(true);
      recorderRef.current.resume();
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;
    setIsRecording(false);
    recorderRef.current.onstop = () => {};
    stream?.getTracks().forEach((t) => t.stop());
    recorderRef.current.stop();
  };

  const recorderState = useRecorderState(isRecording);

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    isRecording,
    recordedBlob,
    recorderRef,
    recorderState,
    stream,
  };
};
