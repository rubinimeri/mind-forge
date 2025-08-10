'use client';
import React, { useEffect, useState } from 'react';
const DELAY = 25;

export default function TypingEffect({ text, onDoneAction }: {
  text: string;
  onDoneAction: () => void;
}) {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (currentLetterIndex >= text.length) {
      setIsRunning(false);
    }
  }, [displayedText]);

  useEffect(() => {
    if (!isRunning) return onDoneAction();

    const interval = setInterval(() => {
      setCurrentLetterIndex((prev) => prev + 1);
      setDisplayedText((prev) => prev + text.charAt(currentLetterIndex));
    }, DELAY)

    return () => clearInterval(interval);
  }, [isRunning, currentLetterIndex]);

  return (
    <>
      {displayedText}
    </>
  );
}
