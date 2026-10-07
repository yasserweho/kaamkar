"use client";

import { useState } from "react";
import { Shell } from "@/components/Shell";

export default function ToolsPage() {
  return <Shell><Tools /></Shell>;
}

function Tools() {
  const [slot, setSlot] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [score, setScore] = useState("4");
  return (
    <div className="wrap section">
      <div className="page-head"><h1>Hiring tools</h1></div>
      <div className="grid">
        <form className="card form" onSubmit={(e) => { e.preventDefault(); }}>
          <strong>Interview scheduler</strong>
          <input aria-label="Interview slot" value={slot} onChange={(e) => setSlot(e.target.value)} placeholder="Tue 11:00, Gulberg" />
          <button className="go" type="submit">Save slot</button>
          {slot && <p className="meta">Slot: {slot}</p>}
        </form>
        <form className="card form" onSubmit={(e) => { e.preventDefault(); setQuestions([question, ...questions]); setQuestion(""); }}>
          <strong>Test builder</strong>
          <input aria-label="Test question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Question" />
          <button className="go" type="submit">Add question</button>
          {questions.map((q) => <p className="meta" key={q}>{q}</p>)}
        </form>
        <form className="card form" onSubmit={(e) => e.preventDefault()}>
          <strong>Evaluation form</strong>
          <label htmlFor="score">Score 1–5</label>
          <input id="score" aria-label="Score 1 to 5" value={score} onChange={(e) => setScore(e.target.value)} />
          <p className="meta">Saved score {score}. Use the inbox to attach it to a person.</p>
        </form>
      </div>
    </div>
  );
}
