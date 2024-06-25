import { useRef, useState } from "react";
import { useRecorderState } from "./useRecorderState";
import { useGetStream } from "./useGetStream";
import { useIndexedDb } from "./useIndexedDb";

export const useRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const { saveToIndexedDB } = useIndexedDb();

  const { stream } = useGetStream();

  const startRecording = async () => {
    try {
      if (!stream) return;
      recorderRef.current = new MediaRecorder(stream);
      recorderRef.current.start();
      recorderRef.current.ondataavailable = ({ data }) => saveToIndexedDB(data);
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
    recorderRef.current.stop();
    setIsRecording(false);
    recorderRef.current.onstop = () => {};
    stream?.getTracks().forEach((t) => t.stop());
  };

  const recorderState = useRecorderState(isRecording);

  const resetRecorder = () => {
    recorderRef.current = null;
  };

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    isRecording,
    recorderRef,
    recorderState,
    stream,
    resetRecorder,
  };
};
