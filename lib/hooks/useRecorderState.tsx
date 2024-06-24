import { useEffect, useRef, useState } from "react";

export type RecorderState = "not_started" | "paused" | "recording";

const useRecorderState = (isRecording: boolean) => {
  const hasStartedRef = useRef<boolean>(false);
  const [recorderState, setRecorderState] =
    useState<RecorderState>("not_started");

  useEffect(() => {
    setRecorderState((prevState) => {
      if (isRecording) {
        hasStartedRef.current = true;
        return "recording";
      }

      if (!isRecording && hasStartedRef.current) {
        return "paused";
      }

      return prevState;
    });
  }, [isRecording]);

  return recorderState;
};

export default useRecorderState;
