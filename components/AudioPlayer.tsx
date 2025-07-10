'use client';
import { useRef } from 'react';

import { blobToAudio } from '@/lib/utils';
import { useAudioFileContext } from './providers/audio-context-provider';
import { Button } from './ui/button';

export const AudioPlayer = () => {
  const { selectedFile, setIsPlaying, isPlaying } = useAudioFileContext();

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-0 w-full  text-white p-4 border-t-2 border-border">
      <div className="container mx-auto max-w-xl flex items-center justify-between">
        <Button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</Button>
        <div className="text-center flex-1">
          <p className="text-md">
            {selectedFile?.title
              ? `Playing: ${selectedFile?.title}`
              : 'Select Audio File to Start Playing'}
          </p>
        </div>
        <audio ref={audioRef} src={blobToAudio(selectedFile?.blob)} />
      </div>
    </div>
  );
};
