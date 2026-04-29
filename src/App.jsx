import { useState } from "react";
import "./App.css";

export default function App() {
  const [className, setClassName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [notes, setNotes] = useState("");
  const [score, setScore] = useState("");
  const [confidence, setConfidence] = useState("");
  const [result, setResult] = useState(null);

  const generateStudyPlan = () => {
    const numericScore = Number(score);
    const confidenceLower = confidence.toLowerCase();

    let weakness = "Medium";
    let recommendation = "Review your notes and practice key concepts.";
    let aiConfidence = "Moderate Confidence";

    if (numericScore < 70 || confidenceLower === "low") {
      weakness = "High";
      recommendation =
        "Focus heavily on weak topics, review basic definitions, and practice daily.";
      aiConfidence = "High Confidence";
    } else if (numericScore >= 85 && confidenceLower === "high") {
      weakness = "Low";
      recommendation =
        "You are doing well. Do light review and focus on practice questions.";
      aiConfidence = "High Confidence";
    }

    const summary =
      notes.trim().length > 0 ? notes : "No notes were entered.";

    const stopWords = [
      "the", "is", "are", "a", "an", "and", "or", "to", "of", "in", "on",
      "for", "with", "as", "by", "this", "that", "it", "from", "into",
      "while", "within", "automatically"
    ];

    const keywords = notes
      .toLowerCase()
      .replace(/[.,!?()]/g, "")
      .split(" ")
      .filter((word) => word.length > 2 && !stopWords.includes(word))
      .slice(0, 6);

    const topic1 = keywords[0] || "the main concept";
    const topic2 = keywords[1] || "another key concept";
    const topic3 = keywords[2] || "a related topic";
    const topic4 = keywords[3] || "an important term";

    const generateAnswer = (keyword) => {
      if (!notes) return "Answer not available.";

      const sentence = notes
        .split(".")
        .find((s) => s.toLowerCase().includes(keyword.toLowerCase()));

      return sentence
        ? sentence.trim()
        : `This concept relates to ${keyword} based on the study notes.`;
    };

    const plan = [
      {
        day: "Day 1",
        focus: `Review the basic meaning of ${topic1}, ${topic2}, and ${topic3}.`,
        questions: [
          {
            q: `What does ${topic1} mean?`,
            a: generateAnswer(topic1),
          },
          {
            q: `How would you explain ${topic2} in simple words?`,
            a: generateAnswer(topic2),
          },
          {
            q: `Why is ${topic3} important?`,
            a: generateAnswer(topic3),
          },
        ],
      },
      {
        day: "Day 2",
        focus: `Study how ${topic1} connects with ${topic2} and ${topic3}.`,
        questions: [
          {
            q: `How does ${topic1} relate to ${topic2}?`,
            a: generateAnswer(topic1),
          },
          {
            q: `What is the difference between ${topic2} and ${topic3}?`,
            a: generateAnswer(topic2),
          },
          {
            q: `Give one real-world example involving ${topic1}.`,
            a: generateAnswer(topic1),
          },
        ],
      },
      {
        day: "Day 3",
        focus: `Practice applying ${topic2}, ${topic3}, and ${topic4}.`,
        questions: [
          {
            q: `Create a sample problem using ${topic2}.`,
            a: generateAnswer(topic2),
          },
          {
            q: `What mistake could someone make when learning ${topic3}?`,
            a: generateAnswer(topic3),
          },
          {
            q: `How can ${topic4} be used in a real situation?`,
            a: generateAnswer(topic4),
          },
        ],
      },
      {
        day: "Day 4",
        focus: `Final review of ${topic1}, ${topic2}, ${topic3}, and ${topic4}.`,
        questions: [
          {
            q: `Summarize ${topic1} in one sentence.`,
            a: generateAnswer(topic1),
          },
          {
            q: `Explain the connection between ${topic2} and ${topic3}.`,
            a: generateAnswer(topic2),
          },
          {
            q: `What topic should you review most before the exam?`,
            a: `You should focus most on ${topic1}, ${topic2}, and any topic connected to your lowest confidence areas.`,
          },
        ],
      },
    ];

    const explanation = `The system created this study plan based on your quiz score of ${
      score || "not provided"
    }, your confidence level of ${
      confidence || "not provided"
    }, and the major terms found in your notes. Lower scores or lower confidence increase the weakness level and create a more focused review plan.`;

    setResult({
      summary,
      weakness,
      aiConfidence,
      keywords,
      plan,
      recommendation,
      explanation,
    });
  };

  return (
    <div className="app">
      <header className="navbar">
        <h2>StudyMe AI</h2>
        <span>AI-Powered Study Assistant</span>
      </header>

      <section className="hero">
        <div>
          <h1>Study smarter with StudyMe AI.</h1>
          <p>
            Enter your notes, quiz score, and confidence level. StudyMe AI
            creates a personalized study plan with questions, answers,
            confidence levels, and explainable reasoning.
          </p>
          <a href="#study-form">Start Studying</a>
        </div>
      </section>

      <section id="study-form" className="main-grid">
        <div className="form-card">
          <h2>Student Input</h2>

          <label>Class Name</label>
          <input
            type="text"
            placeholder="Example: Intro to AI"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

          <label>Exam Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />

          <label>Study Notes</label>
          <textarea
            placeholder="Paste your notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <label>Quiz Score</label>
          <input
            type="number"
            placeholder="Example: 75"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />

          <label>Confidence Level</label>
          <select
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
          >
            <option value="">Select confidence</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button onClick={generateStudyPlan}>Generate Study Plan</button>
        </div>

        <div className="dashboard">
          <h2>AI Dashboard</h2>

          {!result ? (
            <div className="empty-state">
              Your StudyMe AI plan will appear here after you submit your notes.
            </div>
          ) : (
            <>
              <div className="top-stats">
                <div className="stat-card">
                  <h3>Class</h3>
                  <p>{className || "Not entered"}</p>
                </div>

                <div className="stat-card">
                  <h3>Exam Date</h3>
                  <p>{examDate || "Not entered"}</p>
                </div>

                <div className="stat-card">
                  <h3>Weakness</h3>
                  <p>{result.weakness}</p>
                </div>
              </div>

              <div className="result-card">
                <h3>Summary</h3>
                <p>{result.summary}</p>
              </div>

              <div className="result-card">
                <h3>Detected Key Terms</h3>
                <div className="keyword-list">
                  {result.keywords.length > 0 ? (
                    result.keywords.map((word, index) => (
                      <span key={index}>{word}</span>
                    ))
                  ) : (
                    <p>No key terms detected.</p>
                  )}
                </div>
              </div>

              <div className="result-card">
                <h3>Study Plan + Practice Questions</h3>

                {result.plan.map((day, index) => (
                  <div className="day-card" key={index}>
                    <h4>{day.day}</h4>
                    <p>{day.focus}</p>

                    <strong>Practice Questions + Answers:</strong>
                    {day.questions.map((item, i) => (
                      <div className="qa" key={i}>
                        <p>
                          <strong>Q:</strong> {item.q}
                        </p>
                        <p>
                          <strong>A:</strong> {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="result-card">
                <h3>Recommendation</h3>
                <p>{result.recommendation}</p>
              </div>

              <div className="result-card confidence">
                <h3>AI Confidence</h3>
                <p>
                  The system estimates this recommendation has{" "}
                  <strong>{result.aiConfidence}</strong> based on the amount of
                  input provided, the quiz score, and the selected confidence
                  level.
                </p>
              </div>

              <div className="result-card explain">
                <h3>Explainable AI</h3>
                <p>{result.explanation}</p>
              </div>
            </>
          )}
        </div>
      </section>

      <footer className="footer">
        <strong>StudyMe AI Notice:</strong> This system provides study
        recommendations based on user input. It may not always be accurate and
        should be used as a supplemental study tool. Students should verify
        important information with course materials.
      </footer>
    </div>
  );
}

