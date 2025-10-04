import { useState, useEffect, useRef } from "react";
import "./Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const ws = useRef(null);
  const chatEndRef = useRef(null);

  // Quick questions for the bot
  const quickQuestions = ["Bidding", "Payment", "Shipping"];

  // Welcome message
  const welcomeMessage = "Welcome to Auction Buddy! 🤖 Ask me about bidding, payments, shipping, auction rules, or reminders.";

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onmessage = (event) => {
      // Replace "Typing..." with real bot message
      setMessages((prev) =>
        prev.map((m) =>
          m.text === "Typing..." ? { sender: "bot", text: event.data } : m
        )
      );
    };

    return () => ws.current?.close();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (msg = null) => {
    const messageText = msg || input;
    if (!messageText.trim()) return;

    // Add user message and "Typing..."
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: messageText },
      { sender: "bot", text: "Typing..." },
    ]);

    // Send to WebSocket
    ws.current?.send(messageText);
    setInput("");
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
  };

  const handleOpenChat = () => {
    setOpen(true);
    setMessages([{ sender: "bot", text: welcomeMessage }]); // Show welcome
  };

  const handleCloseChat = () => {
    setOpen(false);
    setMessages([]); // Clear messages
  };

  return (
    <div className="chat-wrapper">
      {/* Toggle button */}
      {!open && (
        <button className="chat-toggle" onClick={handleOpenChat}>
          💬
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="chat-box">
          {/* Header */}
          <div className="chat-header">
            <h2>Auction Buddy 🤖</h2>
            <button onClick={handleCloseChat}>✖</button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.sender === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick questions */}
          <div className="quick-questions">
            {quickQuestions.map((q, i) => (
              <button key={i} onClick={() => handleQuickQuestion(q)}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
