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
import { useASR, LanguageType } from "@/lib/hooks/useASR";
import { useSummarize } from "@/lib/hooks/useSummarize";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";

export const Recorder = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>("en"); // Spoken Language

  const [summary, setSummary] = useState("");

  const transcriptScrollRef = useRef<HTMLDivElement>(null);
  const transcriptContentRef = useRef<HTMLDivElement>(null);

  const summaryScrollRef = useRef<HTMLDivElement>(null);
  const summaryContentRef = useRef<HTMLDivElement>(null);

  const { summarize, isLoading } = useSummarize();
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

  const handleStop = async () => {
    const summary = await summarize(transcript);
    setSummary(summary);
    stopListening();
    stopRecording();
    resetRecorder();
  };

  const handleStart = () => {
    startListening(selectedLanguage);
    startRecording();
  };

  const handleResume = () => {
    resumeRecording();
    startListening(selectedLanguage);
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
    if (transcriptScrollRef.current && transcriptContentRef.current) {
      const scrollContainer = transcriptScrollRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (!scrollContainer) return;

      scrollContainer.scrollTo({
        top: transcriptContentRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  }, [transcript]);

  useEffect(() => {
    if (summaryScrollRef.current && summaryContentRef.current) {
      const scrollContainer = summaryScrollRef.current?.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (!scrollContainer) return;
      scrollContainer.scrollTo({
        top: summaryContentRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  }, [summary]);

  return (
    <>
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <Timer isRecording={isRecording} />

          <div className="flex gap-2">
            <div>
              <Label className="text-foreground text-sm mb-1">Language</Label>
              <Select
                onValueChange={(e) => setSelectedLanguage(e as LanguageType)}
                value={selectedLanguage}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex mt-1 h-16  mb-6 rounded-md w-full items-center justify-center gap-2 max-w-5xl border p-1">
          <Visualizer
            stream={stream}
            isRecording={isRecording}
            mediaRecorderRef={recorderRef}
          />
          <div className="flex gap-2 m-2">{btnMap[recorderState]}</div>
        </div>
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
            ref={transcriptScrollRef}
            className=" h-32  rounded-md border mb-6 p-3 "
          >
            <div
              ref={transcriptContentRef}
              className="text-center  text-pretty h-full"
            >
              {transcript.length > 0 ? (
                transcript
              ) : (
                <div className="h-full flex items-center justify-center">
                  Transcript will appear here..
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Summary */}
        <div className="w-full sm:w-1/2">
          <div className="mb-1 items-center w-24  justify-center gap-0.5 border p-1.5 rounded-md font-mono font-medium text-foreground flex">
            <span className="font-mono rounded-md bg-background p-0.5 text-foreground">
              Summary
            </span>
          </div>
          <ScrollArea
            id="scroll-area"
            ref={summaryScrollRef}
            className=" h-32  rounded-md border mb-6 p-3 "
          >
            <div
              ref={summaryContentRef}
              className="text-center  text-pretty h-full"
            >
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
