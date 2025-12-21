"use client";
import { useState } from "react";

export function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group my-6">
      <div className="flex items-center justify-between bg-muted-800 dark:bg-muted-900 px-4 py-2 rounded-t-lg border-b border-muted-700">
        {language && (
          <span className="text-xs text-muted-400 dark:text-muted-500 font-mono uppercase">
            {language}
          </span>
        )}
        <button
          onClick={handleCopy}
          className="ml-auto px-3 py-1.5 text-xs font-medium text-muted-300 dark:text-muted-400 hover:text-muted-50 dark:hover:text-muted-200 bg-muted-700 dark:bg-muted-800 hover:bg-muted-600 dark:hover:bg-muted-700 rounded transition-colors duration-200 flex items-center gap-2"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-muted-900 dark:bg-muted-950 p-4 sm:p-5 rounded-b-lg overflow-x-auto border border-muted-700 border-t-0">
        <code className="text-muted-200 dark:text-muted-300 font-mono text-xs sm:text-sm block whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
}

