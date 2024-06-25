"use client";

import { AudioFile } from "@/lib/hooks/useIndexedDb";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface AudioFileContextType {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  selectedFile: AudioFile | null;
  setSelectedFile: Dispatch<SetStateAction<AudioFile | null>>;
}

export const AudioFileContext = createContext<AudioFileContextType | undefined>(
  undefined
);

export const AudioFileProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFile, setSelectedFile] = useState<AudioFile | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <AudioFileContext.Provider
      value={{ selectedFile, setSelectedFile, isPlaying, setIsPlaying }}
    >
      {children}
    </AudioFileContext.Provider>
  );
};

export const useAudioFileContext = (): AudioFileContextType => {
  const context = useContext(AudioFileContext);
  if (!context) {
    throw new Error(
      "useAudioFileContext must be used within an AudioFileProvider"
    );
  }
  return context;
};
