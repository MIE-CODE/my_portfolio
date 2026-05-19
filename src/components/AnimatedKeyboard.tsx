"use client";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "../hooks/useGSAP";
import gsap from "gsap";

const codeSnippets = [
  "const developer = { skills: ['React', 'Next.js', 'TypeScript'] };",
  "function buildPortfolio() { return <AmazingWebsite />; }",
  "const api = async () => { return await fetch('/data'); };",
  "import { useState } from 'react'; const [code, setCode] = useState('awesome');",
  "const stack = ['Frontend', 'Backend', 'Full Stack'];",
];

const keyboardLayout = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
  ["Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
  ["Ctrl", "Win", "Alt", "Space", "Alt", "Ctrl"],
];

// Key flex ratios - using flex instead of fixed widths for responsive scaling
const keyFlexRatios: Record<string, number> = {
  Backspace: 1.8,
  Tab: 1.2,
  "\\": 0.9,
  Caps: 1.4,
  Enter: 1.8,
  Shift: 2.2,
  Ctrl: 1.2,
  Win: 1.2,
  Alt: 1.2,
  Space: 5.0,
  // Default regular keys
  default: 1.0,
};

type AnimatedKeyboardProps = {
  /** Skip mount fade when parent hero timeline handles entrance */
  suppressEntrance?: boolean;
};

export const AnimatedKeyboard = ({ suppressEntrance = false }: AnimatedKeyboardProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const keyboardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef("");
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);

  useGSAP(() => {
    if (suppressEntrance || !keyboardRef.current) return;
    gsap.fromTo(
      keyboardRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      },
    );
  }, [suppressEntrance]);

  useEffect(() => {
    const snippet = codeSnippets[currentSnippetIndex];
    charIndexRef.current = 0;
    isDeletingRef.current = false;
    textRef.current = "";
    setCurrentText("");

    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (isDeletingRef.current) {
        // Delete characters
        if (textRef.current.length > 0) {
          // Press backspace
          setPressedKeys((prev) => new Set(prev).add("backspace"));
          
          setTimeout(() => {
            setPressedKeys((prev) => {
              const newSet = new Set(prev);
              newSet.delete("backspace");
              return newSet;
            });
            textRef.current = textRef.current.slice(0, -1);
            setCurrentText(textRef.current);
          }, 100);

          timeoutId = setTimeout(typeNextChar, 50 + Math.random() * 30);
        } else {
          // Finished deleting, move to next snippet
          isDeletingRef.current = false;
          setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
        }
      } else {
        // Type characters
        if (charIndexRef.current < snippet.length) {
          const char = snippet[charIndexRef.current];
          let keyToPress = char.toLowerCase();
          
          // Handle special characters
          if (char === " ") keyToPress = "space";
          if (char === "\n") keyToPress = "enter";
          if (char === "\t") keyToPress = "tab";
          
          const isSpecialChar = /[^a-z0-9\s]/.test(char);

          // Press the key
          setPressedKeys((prev) => new Set(prev).add(keyToPress));

          // Add character to text after a short delay
          setTimeout(() => {
            textRef.current += char;
            setCurrentText(textRef.current);
            charIndexRef.current++;
          }, 60);

          // Release the key
          setTimeout(() => {
            setPressedKeys((prev) => {
              const newSet = new Set(prev);
              newSet.delete(keyToPress);
              return newSet;
            });
          }, 100 + Math.random() * 40);

          // Type next character with variable speed
          const typingSpeed = isSpecialChar 
            ? 150 + Math.random() * 100  // Slower for special chars
            : 80 + Math.random() * 60;   // Faster for regular chars
          
          timeoutId = setTimeout(typeNextChar, typingSpeed);
        } else {
          // Finished typing, wait then start deleting
          isDeletingRef.current = true;
          timeoutId = setTimeout(typeNextChar, 2500);
        }
      }
    };

    // Start typing
    timeoutId = setTimeout(typeNextChar, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentSnippetIndex]);

  const getKeyDisplay = (key: string) => {
    if (key === "Space") return "";
    if (key.length > 1) return key;
    return key;
  };

  const isKeyPressed = (key: string) => {
    const normalizedKey = key.toLowerCase();
    // Handle special keys
    if (key === "Backspace") return pressedKeys.has("backspace");
    if (key === "Space") return pressedKeys.has("space");
    if (key === "Enter") return pressedKeys.has("enter");
    if (key === "Tab") return pressedKeys.has("tab");
    if (key === "Shift" || key === "Caps" || key === "Ctrl" || key === "Alt" || key === "Win") {
      return pressedKeys.has(normalizedKey);
    }
    return pressedKeys.has(normalizedKey);
  };

  return (
    <div
      ref={keyboardRef}
      data-keyboard-panel
      className="w-full max-w-4xl mx-auto mt-4 sm:mt-6 md:mt-8 px-2 xs:px-3 sm:px-4"
    >
      {/* Code Display */}
      <div className="mb-3 sm:mb-4 p-2 xs:p-2.5 sm:p-3 md:p-4 bg-muted-800/90 dark:bg-muted-800/50 rounded-lg border border-muted-300 dark:border-primary-500/20 font-mono text-[10px] xs:text-xs sm:text-sm text-muted-900 dark:text-primary-400 min-h-[50px] xs:min-h-[55px] sm:min-h-[60px] flex items-center overflow-x-auto shadow-md dark:shadow-none">
        <span className="text-primary-500 flex-shrink-0">$</span>
        <span className="ml-1.5 xs:ml-2 whitespace-nowrap text-muted-200">{currentText}</span>
        <span className="animate-pulse text-primary-600 dark:text-primary-400 ml-1 flex-shrink-0">|</span>
      </div>

      {/* Keyboard */}
      <div className="keyboard-container bg-muted-800/80 dark:bg-muted-900/80 rounded-lg sm:rounded-xl p-2 xs:p-2.5 sm:p-3 md:p-4 border border-muted-700 shadow-2xl w-full">
        {keyboardLayout.map((row, rowIndex) => {
          return (
            <div
              key={rowIndex}
              className="flex justify-center gap-0.5 xs:gap-1 sm:gap-1.5 mb-1 xs:mb-1.5 sm:mb-2 w-full"
            >
              {row.map((key, keyIndex) => {
                const isPressed = isKeyPressed(key);
                const flexRatio = keyFlexRatios[key] || keyFlexRatios.default;
                
                return (
                  <div
                    key={`${rowIndex}-${keyIndex}-${key}`}
                    style={{
                      flex: `${flexRatio} 1 0%`,
                      minWidth: '0',
                    }}
                    className={`
                      h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10
                      flex items-center justify-center
                      rounded sm:rounded-md
                      text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs
                      font-medium
                      transition-all duration-75 ease-out
                      ${
                        isPressed
                          ? "bg-gradient-to-b from-primary-400 to-primary-600 text-white scale-[0.92] shadow-lg shadow-primary-500/60 translate-y-0.5 border-primary-400"
                          : "bg-gradient-to-b from-muted-700 to-muted-800 dark:from-muted-800 dark:to-muted-900 text-muted-300 dark:text-muted-400 hover:from-muted-600 hover:to-muted-700 dark:hover:from-muted-700 dark:hover:to-muted-800"
                      }
                      border border-muted-600 dark:border-muted-700
                      select-none
                      relative
                      overflow-hidden
                    `}
                  >
                    {isPressed && (
                      <div className="absolute inset-0 bg-primary-400/20 animate-pulse" />
                    )}
                    <span className="relative z-10 truncate px-0.5 xs:px-1 text-center w-full">{getKeyDisplay(key)}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .keyboard-container {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

