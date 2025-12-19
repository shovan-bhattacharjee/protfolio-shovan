"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = ({ code, language = "javascript" }: { code: string; language?: string }) => {
  return (
    <div className="rounded-lg overflow-hidden w-full border border-gray-800 bg-[#0d1117] shadow-2xl">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-gray-500 font-mono">shovan@dev:~</span>
      </div>

      {/* Scrollable Code Area */}
      <div className="overflow-auto max-h-96"> {/* Adjust max-h-96 as needed: 96 = ~384px */}
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            background: "transparent",
            margin: 0,
            padding: "1.5rem",
            fontSize: "0.85rem",
            lineHeight: "1.5",
          }}
          showLineNumbers={true}
          wrapLongLines={true} // Wraps long lines softly
          lineNumberStyle={{ color: "#555", paddingRight: "1rem" }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};