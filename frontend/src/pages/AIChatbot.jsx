import { useState } from "react";
import { FiSend, FiMessageCircle } from "react-icons/fi";

import SectionHeader from "../components/common/SectionHeader";
import api from "../services/api";

export default function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text:
        "Hi! I'm CareerGuide AI. Ask me about careers, skills, projects, interviews, or learning plans.",
    },
  ]);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    if (!text.trim() || loading) return;

    const question = text.trim();

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: question,
    };

    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);

    setText("");
    setError("");
    setLoading(true);

    try {
      /*
        Backend:
        POST /api/chat

        Sending:
        {
          message: "...",
          history: [...]
        }
      */

      const history = messages.map((message) => ({
        role: message.role,
        content: message.text,
      }));

      const response = await api.post("/chat", {
        message: question,
        history: history.slice(-10),
      });

      const reply =
        response.data?.reply ||
        response.data?.response ||
        response.data?.message ||
        response.data?.content ||
        "Sorry, I could not generate a response.";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: reply,
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);

      const message =
        err.response?.data?.detail ||
        "Failed to connect to CareerGuide AI.";

      setError(message);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text:
            "Sorry, I couldn't process your question right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SectionHeader
        title="AI Career Assistant"
        subtitle="Ask questions about careers, skills, projects, interviews and learning plans."
      />

      <div className="card overflow-hidden">
        <div className="grid min-h-[620px] lg:grid-cols-[230px_1fr]">

          {/* Suggested Questions */}
          <aside className="border-b border-slate-200 bg-slate-50 p-4 lg:border-b-0 lg:border-r">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Suggested questions
            </p>

            <div className="mt-4 space-y-2">
              {[
                "Best career for me?",
                "What should I learn next?",
                "Create a learning plan",
                "What projects should I build?",
                "How do I prepare for interviews?",
              ].map((question) => (
                <button
                  key={question}
                  onClick={() => setText(question)}
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 text-left text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </aside>

          {/* Chat Section */}
          <section className="flex min-h-[620px] flex-col">

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-7">

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide opacity-60">
                      {message.role === "assistant" && (
                        <FiMessageCircle size={11} />
                      )}

                      {message.role === "user"
                        ? "You"
                        : "CareerGuide AI"}
                    </div>

                    <div className="whitespace-pre-wrap">
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading */}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-slate-100 px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-slate-200 p-4">
              <div className="flex gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      send();
                    }
                  }}
                  disabled={loading}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50"
                  placeholder="Ask your career question..."
                />

                <button
                  onClick={send}
                  disabled={loading || !text.trim()}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiSend />
                </button>
              </div>

              <p className="mt-2 text-[11px] text-slate-400">
                Press Enter to send
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}