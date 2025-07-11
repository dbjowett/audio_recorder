'use client';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
export type LanguageType = 'ko' | 'en';

type LanguageMap = 'ko-KR' | 'en-US';

const languageMap: Record<LanguageType, LanguageMap> = {
  ko: 'ko-KR',
  en: 'en-US',
};

export const useASR = () => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = (language: LanguageType) => {
    setIsListening(true);

    try {
      const SpeechRecognition = window?.SpeechRecognition || window?.webkitSpeechRecognition;

      recognitionRef.current = new SpeechRecognition();

      if (!recognitionRef.current) {
        throw new Error('Speech recognition is not supported');
      }

      recognitionRef.current.continuous = true;
      recognitionRef.current.lang = languageMap[language];

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let transcript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript = event.results[i][0].transcript + '\n';
        }
        setTranscript((prev) => prev + transcript);
      };

      recognitionRef.current.onerror = (error) => {
        setTranscript('Something went wrong. Please try again.');
        console.error('Error ', error);
        toast('Something went wrong during transcription.', {
          description: `Please try another browser if this issue continues.`,
        });
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (isListening) {
          console.log('Restarting');
          startListening(language); // ** Restart
        }
      };

      recognitionRef.current.start();
    } catch (err) {
      setTranscript('Speech recognition is not supported in this browser.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  return {
    startListening,
    stopListening,
    clearTranscript,
    transcript,
  };
};
