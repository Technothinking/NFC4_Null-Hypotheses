// client/src/components/AgenticChat.jsx
import { useState } from "react";
import { educationAgent, agricultureAgent, healthcareAgent } from "./predefined_queries";

const AgenticChat = () => {
  const [userInput, setUserInput] = useState("");
  const [goal, setGoal] = useState(null);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState("en-IN");

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => console.log("Speech recognition started...");
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setUserInput(voiceText);
    };
    recognition.onerror = (event) => console.error("Speech recognition error:", event.error);
    recognition.onspeechend = () => console.log("Speech recognition ended.");

    recognition.start();
  };

  const fallbackOfflineAnswer = async (input) => {
    const lower = input.toLowerCase();
    if (lower.includes("education") || lower.includes("quiz") || lower.includes("math") || lower.includes("algebra") || lower.includes("trigonometry") || lower.includes("history") || lower.includes("science")) {
      return educationAgent(lower);
    }
    if (lower.includes("agriculture") || lower.includes("crop") || lower.includes("soil") || lower.includes("irrigation") || lower.includes("pest control")) {
      return agricultureAgent(lower);
    }
    if (lower.includes("health") || lower.includes("vaccine") || lower.includes("exercise") || lower.includes("nutrition") || lower.includes("disease prevention")) {
      return healthcareAgent(lower);
    }
    return "Sorry, I couldn't find relevant information offline. Try connecting to the internet.";
  };

  const sendToBackend = async (input, currentGoal) => {
    try {
      console.log("Sending to backend:", { input, currentGoal });
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ input, currentGoal })
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("Response from backend:", data);
      return data.response;
    } catch (error) {
      console.error("Error sending to backend:", error);
      return "⚠️ Unable to reach the server. Please check your connection or try again later.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    setMessages((prev) => [...prev, { from: "user", text: trimmedInput }]);

    if (!navigator.onLine) {
      const offlineResponse = await fallbackOfflineAnswer(trimmedInput);
      setMessages((prev) => [...prev, { from: "bot", text: offlineResponse }]);
      setUserInput("");
      return;
    }

    if (!goal) {
      const response = await sendToBackend(trimmedInput, null);
      const newSteps = response.split("\n").filter((line) => /^\d+\./.test(line.trim()));
      if (newSteps.length === 0) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "⚠️ Sorry, I couldn't generate a plan. Try a different goal." }
        ]);
        return;
      }
      setGoal(trimmedInput);
      setSteps(newSteps);
      setStepIndex(0);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "🎯 Goal set: " + trimmedInput },
        { from: "bot", text: "📋 Here's your plan:\n" + newSteps.join("\n") },
        { from: "bot", text: "👉 Start with this:\n" + newSteps[0] }
      ]);
    } else if (["done", "next", "completed"].includes(trimmedInput.toLowerCase())) {
      const next = stepIndex + 1;
      if (next < steps.length) {
        setStepIndex(next);
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "✅ Great! Here's your next step:\n" + steps[next] }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "🎉 You've completed the plan! Want to set a new goal?" }
        ]);
        setGoal(null);
        setSteps([]);
        setStepIndex(0);
      }
    } else {
      const response = await sendToBackend(trimmedInput, goal);
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
    }

    setUserInput("");
  };

  return (
    <div className="fixed right-6 bottom-6 w-full max-w-md z-50 md:max-w-sm">
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Select Language</label>
        <select
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
          className="w-full p-2 border rounded text-sm"
        >
          <option value="en-IN">English (India)</option>
          <option value="hi-IN">Hindi (India)</option>
          <option value="mr-IN">Marathi (India)</option>
          <option value="gu-IN">Gujarati (India)</option>
        </select>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-4">
        <h2 className="text-lg font-bold mb-3 text-center">🌾📚🩺 Rural Assistant Chatbot</h2>

        <div className="bg-gray-100 p-3 rounded h-60 overflow-y-auto mb-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"}`}
            >
              <span className="block font-semibold">
                {msg.from === "user" ? "🧑‍🌾 You" : "🤖 Bot"}
              </span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type or speak..."
            className="flex-1 p-2 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
          <button
            type="button"
            onClick={startListening}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-200"
          >
            🎤
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgenticChat;
