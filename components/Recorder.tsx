"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CloudCog, Mic, PauseIcon, StopCircle } from "lucide-react";
import { Visualizer } from "./Visualizer";
import { Timer } from "./Timer";
import { useRecorder } from "@/lib/hooks/useRecorder";
import { RecorderState } from "@/lib/hooks/useRecorderState";
import { useIndexedDb } from "@/lib/hooks/useIndexedDb";

export const Recorder = () => {
  const {
    stream,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    recorderRef,
    recorderState,
    isRecording,
    resetRecorder,
  } = useRecorder();

  const handleStop = () => {
    stopRecording();
    if (!recorderRef.current) return;
    resetRecorder();
  };

  const btnMap: Record<RecorderState, ReactNode> = {
    not_started: (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={startRecording} size="icon">
            <Mic size={15} />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="m-2">
          <span>Start recording</span>
        </TooltipContent>
      </Tooltip>
    ),
    paused: (
      <>
        <Button onClick={resumeRecording}>
          <Mic size={15} />
        </Button>
        <Button onClick={handleStop} size={"icon"}>
          <StopCircle size={15} />
        </Button>
      </>
    ),
    recording: (
      <>
        <Button onClick={pauseRecording}>
          <PauseIcon size={15} />
        </Button>
      </>
    ),
  };

  return (
    <div className="flex h-16 my-12 rounded-md relative w-full items-center justify-center gap-2 max-w-5xl border p-1">
      <Timer isRecording={isRecording} />
      <Visualizer
        stream={stream}
        isRecording={isRecording}
        mediaRecorderRef={recorderRef}
      />
      <div className="flex gap-2">{btnMap[recorderState]}</div>
    </div>
  );
};
