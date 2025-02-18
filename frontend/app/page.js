"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!query.trim()) return;
    const userMessage = { sender: "user", text: query };
    setChatHistory((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      const botMessage = { sender: "bot", text: data.answer };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "Error: " + error.message },
      ]);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-lightGray py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#E5E5E5] to-primary p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-secondary mb-2">BLT Bot</h1>
          <p className="text-secondary/70 text-lg font-medium mb-3">Ask questions about BLT 3D Printers</p>
          <div className="inline-block bg-secondary/10 px-4 py-2 rounded-full">
            <p className="text-secondary/90 text-sm font-medium">Work in Progress: Errors are Expected</p>
          </div>
        </header>
        
        {/* Chat Interface */}
        <div id="chat-log" className="flex flex-col gap-6 p-6 overflow-y-auto bg-lightGray min-h-[400px] max-h-[600px]">
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[80%] px-6 py-4 rounded-2xl shadow-sm ${
                msg.sender === "user"
                  ? "self-end bg-primary text-white"
                  : "self-start bg-white text-secondary"
              }`}
            >
              <p className="text-sm font-medium mb-1 opacity-80">
                {msg.sender === "user" ? "You" : "BLT Assistant"}
              </p>
              <p className="text-base leading-relaxed">{msg.text}</p>
            </div>
          ))}
          {loading && (
            <div className="self-center p-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="p-6 border-t border-lightGray bg-white">
          <div className="flex items-center gap-4">
            <input 
              type="text" 
              placeholder="Ask about BLT metal 3D printers..." 
              className="flex-1 px-6 py-4 bg-lightGray border-0 rounded-full text-secondary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button 
              onClick={sendMessage}
              className="px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
