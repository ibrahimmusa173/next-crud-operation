
"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  const sendToWhatsApp = () => {
    if (!message.trim()) return;

    const phoneNumber = "923149500765";
    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    setMessage("");
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md overflow-hidden border">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-white text-green-600 rounded-full flex items-center justify-center font-bold text-xl">
            W
          </div>

          <div>
            <h1 className="font-bold text-lg">WhatsApp Chat</h1>
            <p className="text-sm text-green-100">
              Usually replies instantly
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="p-5 space-y-4 bg-gray-50 min-h-[300px]">
          <div className="bg-white p-3 rounded-xl shadow-sm max-w-[80%] border">
            <p className="text-gray-800">
              Hi 👋
              <br />
              How can we help you?
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2 bg-white">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 text-black"
          />

          <button
            onClick={sendToWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white px-5 rounded-xl font-semibold transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923149500765"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl transition"
      >
        💬
      </a>
    </main>
  );
}
