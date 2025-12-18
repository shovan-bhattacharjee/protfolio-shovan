"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const CodeBlock = ({ code, language = "javascript" }: { code: string; language?: string }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-800 bg-[#0d1117] shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-auto text-xs text-gray-500 font-mono">shovan@dev:~</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{ background: "transparent", fontSize: "0.9rem", padding: "1.5rem" }}
        showLineNumbers={true}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};