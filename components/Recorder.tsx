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
import { useSummarize } from "@/lib/hooks/useSummarize";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export const Recorder = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { startListening, stopListening, transcript } = useASR();

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
  } = useRecorder(transcript);
  const [summary, setSummary] = useState("");

  const { summarize, isLoading } = useSummarize();

  const handleStop = async () => {
    const summary = await summarize(transcript);
    setSummary(summary);
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

  // useEffect(() => {}, [transcript]);

  return (
    <>
      <div className="flex h-16 mt-12 mb-6 rounded-md relative w-full items-center justify-center gap-2 max-w-5xl border p-1">
        <Timer isRecording={isRecording} />
        <Visualizer
          stream={stream}
          isRecording={isRecording}
          mediaRecorderRef={recorderRef}
        />
        <div className="flex gap-2 m-2">{btnMap[recorderState]}</div>
      </div>
      {/* "w-full sm:w-1/2" */}
      <div className="flex w-full sm:gap-6 flex-col sm:flex-row">
        {/* Transcript */}
        <div className="w-full sm:w-1/2">
          <div className="mb-1 items-center w-32 -top-12 left-0  justify-center gap-0.5 border p-1.5 rounded-md font-mono font-medium text-foreground flex">
            <span className="font-mono rounded-md bg-background p-0.5 text-foreground">
              Transcript
            </span>
          </div>

          <ScrollArea
            id="scroll-area"
            ref={scrollRef}
            className=" h-32  rounded-md border mb-6 p-3 "
          >
            <div ref={contentRef} className="text-center  text-pretty h-full">
              {transcript || (
                <div className="h-full flex items-center justify-center">
                  Transcript will appear here..
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Summary */}
        <div className="w-full sm:w-1/2">
          <div className="mb-1 items-center w-40 -top-12 left-0  justify-center gap-0.5 border p-1.5 rounded-md font-mono font-medium text-foreground flex">
            <span className="font-mono rounded-md bg-background p-0.5 text-foreground">
              Summarization
            </span>
          </div>
          <ScrollArea
            id="scroll-area"
            ref={scrollRef}
            className=" h-32  rounded-md border mb-6 p-3 "
          >
            <div ref={contentRef} className="text-center  text-pretty h-full">
              {isLoading ? (
                <div className="h-full flex mt-1 flex-col gap-2">
                  <Skeleton className="h-4 mx-2" />
                  <Skeleton className="h-4 mx-2" />
                  <Skeleton className="h-4 mx-2" />
                  <Skeleton className="h-4 mx-2" />
                </div>
              ) : (
                <div>
                  {summary ? (
                    summary
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      Summary will appear here..
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};
