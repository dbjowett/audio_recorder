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
import { useASR } from "@/lib/hooks/useASR";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PageHeader } from "@/components/ui/page";

export const Recorder = () => {
  const scrollRef = useRef(null);
  const contentRef = useRef(null);

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

  const { startListening, stopListening, transcript } = useASR();

  const handleStop = () => {
    stopListening();
    stopRecording();
    resetRecorder();
  };

  const handleStart = () => {
    startListening("en-US");
    startRecording();
  };

  const handleResume = () => {
    resumeRecording();
    startListening("en-US");
  };

  const handlePause = () => {
    stopListening();
    pauseRecording();
  };

  const btnMap: Record<RecorderState, ReactNode> = {
    not_started: (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleStart} size="icon">
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
        <Button onClick={handleResume}>
          <Mic size={15} />
        </Button>
        <Button onClick={handleStop} size={"icon"}>
          <StopCircle size={15} />
        </Button>
      </>
    ),
    recording: (
      <>
        <Button onClick={handlePause}>
          <PauseIcon size={15} />
        </Button>
      </>
    ),
  };

  useEffect(() => {
    if (scrollRef.current && contentRef.current) {
      const scrollContainer = scrollRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (!scrollContainer) return;

      scrollContainer.scrollTo({
        top: contentRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  }, [transcript]);

  return (
    <>
      <div className="flex h-16 mt-12 mb-6 rounded-md relative w-full items-center justify-center gap-2 max-w-5xl border p-1">
        <Timer isRecording={isRecording} />
        <Visualizer
          stream={stream}
          isRecording={isRecording}
          mediaRecorderRef={recorderRef}
        />
        <div className="flex gap-2">{btnMap[recorderState]}</div>
      </div>

      <div className="mb-1 items-center w-32 -top-12 left-0  justify-center gap-0.5 border p-1.5 rounded-md font-mono font-medium text-foreground flex">
        <span className="font-mono rounded-md bg-background p-0.5 text-foreground">
          Transcript
        </span>
      </div>
      <ScrollArea
        id="scroll-area"
        ref={scrollRef}
        className="h-32 w-full rounded-md border mb-12 p-3 "
      >
        <div ref={contentRef} className="text-center font-mono text-pretty">
          {transcript || "Start recording to see the transcript"}
        </div>
      </ScrollArea>
    </>
  );
};
