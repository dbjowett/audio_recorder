import { useRef, useState } from "react";
import { useRecorderState } from "./useRecorderState";
import { useGetStream } from "./useGetStream";

export const useRecorder = () => {
  const recorderRef = useRef<MediaRecorder | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recordedDataRef = useRef<Blob[]>([]);

  const { stream } = useGetStream();

  const startRecording = async () => {
    try {
      if (!stream) return;
      recorderRef.current = new MediaRecorder(stream);
      recorderRef.current.start();
      recorderRef.current.ondataavailable = (e) => {
        console.log(e);
        recordedDataRef.current.push(e.data);
      };

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

  const resetRecorder = () => {
    recorderRef.current = null;
  };

  console.log(recordedDataRef.current);

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    isRecording,
    recordedBlob: recordedDataRef.current,
    recorderRef,
    recorderState,
    stream,
    resetRecorder,
  };
};
