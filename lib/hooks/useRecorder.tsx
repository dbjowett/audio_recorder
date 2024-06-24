import { useRef, useState } from "react";
import useRecorderState from "./useRecorderState";

export const useRecorder = () => {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
    } catch (error) {
      console.error("Error accessing the microphone:", error);
    }
  };

  const startRecording = async () => {
    if (!streamRef.current) {
      await getStream();
    }
    try {
      if (!streamRef.current) return;
      recorderRef.current = new MediaRecorder(streamRef.current);
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
    streamRef.current?.getTracks().forEach((t) => t.stop());
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
    stream: streamRef.current,
  };
};
