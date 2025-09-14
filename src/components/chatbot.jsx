import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import { useTheme } from "../context/theme";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I’m LeadBot 🤖. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      // Simulate API call (replace with your backend endpoint)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      // fallback if no backend yet
      let data;
      if (response.ok) {
        data = await response.json();
      } else {
        data = { reply: "Sorry, I couldn’t process that. (API not connected yet)" };
      }

      // Add bot reply
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Error connecting to server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <div className={`card shadow-lg rounded-4 ${theme === 'light'? "light": "dark"}`} style={{ width: "450px", height:"535px", overflow: "hidden" }}>
        {/* Header */}
        <div id="header">
          <div className="d-flex align-items-center">
            <div
              className="bg-light text-dark rounded-circle d-flex justify-content-center align-items-center me-2"
              style={{ width: "30px", height: "30px" }}
            >
              🤖
            </div>
            <div>
              <div className="fw-bold">LeadBot</div>
              <div className="small">● Online Now</div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={toggleTheme}
              className="btn btn-sm toggle-btn"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <div>⋮</div>

          </div>
        </div>

        {/* Messages */}
        <div className="p-3" style={{ height: "380px", overflowY: "auto" }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`d-flex mb-2 ${
                msg.from === "user" ? "justify-content-end" : "justify-content-start"
              }`}
            >
              <div
                className={`p-2 rounded-4 ${
                  msg.from === "user" ? "bg-theme text-white" : theme === 'light'? "light-chat": "dark-chat"
                }`}
                style={{ maxWidth: "75%" }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="d-flex justify-content-start">
              <div className="p-2 rounded-4 bg-white border small text-muted fst-italic">
                LeadBot is typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className={`message-field ${theme === 'dark'? "dark-field": ""}`}>
          <input
            type="text"
            placeholder="Reply to LeadBot..."
            className="form-control border-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSend} className="btn">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
