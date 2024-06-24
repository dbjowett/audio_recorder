import { useEffect, useMemo, useState } from "react";
import { padWithLeadingZeros } from "@/lib/utils";

export const Timer = ({ isRecording }: { isRecording: boolean }) => {
  const [timer, setTimer] = useState<number>(0);
  let timerTimeout: NodeJS.Timeout;

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;
  const [hourLeft, hourRight] = useMemo(
    () => padWithLeadingZeros(hours, 2).split(""),
    [hours]
  );
  const [minuteLeft, minuteRight] = useMemo(
    () => padWithLeadingZeros(minutes, 2).split(""),
    [minutes]
  );
  const [secondLeft, secondRight] = useMemo(
    () => padWithLeadingZeros(seconds, 2).split(""),
    [seconds]
  );

  useEffect(() => {
    if (isRecording) {
      timerTimeout = setTimeout(() => {
        setTimer(timer + 1);
      }, 1000);
    }
    return () => clearTimeout(timerTimeout);
  }, [isRecording, timer]);

  return (
    <div className="items-center -top-12 left-0 absolute justify-center gap-0.5 border p-1.5 rounded-md font-mono font-medium text-foreground flex">
      <span className="rounded-md bg-background p-0.5 text-foreground">
        {hourLeft}
      </span>
      <span className="rounded-md bg-background p-0.5 text-foreground">
        {hourRight}
      </span>
      <span>:</span>
      <span className="rounded-md bg-background p-0.5 text-foreground">
        {minuteLeft}
      </span>
      <span className="rounded-md bg-background p-0.5 text-foreground">
        {minuteRight}
      </span>
      <span>:</span>
      <span className="rounded-md bg-background p-0.5 text-foreground">
        {secondLeft}
      </span>
      <span className="rounded-md bg-background p-0.5 text-foreground ">
        {secondRight}
      </span>
    </div>
  );
};
