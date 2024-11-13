"use client";
import { useState } from "react";

export type LanguageType = "ko-KR" | "en-US";

export const useASR = () => {
  const [isListening, setIsListening] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const startListening = (language: LanguageType) => {
    setError("");
    setIsListening(true);

    try {
      const SpeechRecognition =
        window?.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.lang = language;

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript = event.results[i][0].transcript + "\n";
        }
        setTranscript((prev) => prev + transcript);
      };

      recognition.onerror = () => {
        setError("Something went wrong. Please try again.");
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (isListening) {
          startListening(language); // ** Restart
        }
      };

      recognition.start();
    } catch (err) {
      setError("Speech recognition is not supported in this browser.");
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  return {
    startListening,
    stopListening,
    clearTranscript,
    transcript,
    error,
  };
};
