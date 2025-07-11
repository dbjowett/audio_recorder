'use client';
import { useEffect, useRef, useState } from 'react';

import { blobToAudio } from '@/lib/utils';

import { useAudioFileContext } from './providers/audio-context-provider';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export const AudioPlayer = () => {
  const { selectedFile, setIsPlaying, isPlaying } = useAudioFileContext();
  const [progress, setProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const updateProgress = () => {
      if (!audioRef.current) return;

      const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0;
      setProgress(Number(percent));
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);
    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, [selectedFile]);

  const handleSliderChange = (value: number[]) => {
    if (!audioRef.current || !audioRef.current.duration || audioRef.current.duration === Infinity)
      return;

    const percent = value[0];
    const newTime = (percent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(Number(percent));
  };

  useEffect(() => {
    if (audioRef.current && selectedFile?.blob) {
      const url = blobToAudio(selectedFile.blob) || '';
      audioRef.current.src = url;
      audioRef.current.load();

      setIsPlaying(false);
    }
  }, [selectedFile]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    audioRef.current.volume = 1;
    audioRef.current.muted = false;
    audioRef.current.loop = false;
    audioRef.current.preload = 'auto';

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio play error:', err);
      }
    }
  };
  return (
    <>
      <div className="fixed h-24 bg-transparent backdrop-blur-md bottom-0 w-full  text-white p-4 border-t-2 border-border">
        <div className="container mx-auto max-w-xl flex flex-col items-center justify-between gap-4">
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
          <div className="flex w-full items-center justify-between">
            <Button onClick={togglePlay} disabled={!selectedFile?.blob}>
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <div className="text-center flex-1">
              <p className="text-md">
                {selectedFile?.title
                  ? `Playing: ${selectedFile?.title}`
                  : 'Select Audio File to Start Playing'}
              </p>
            </div>
          </div>
          <audio autoPlay={false} ref={audioRef} />
        </div>
      </div>
      <div className="h-24" />
    </>
  );
};
