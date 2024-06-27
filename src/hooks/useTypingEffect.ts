"use client";

import { useEffect, useState } from "react";

export default function useTypingEffect(text: string, speed: number = 120) {
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, speed);
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return displayedText;
}
