import React, { useState } from "react";
import { Check, ExternalLink, Bookmark, Code, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

export default function DSATracker({ dsaSheet, dsaState, toggleProblemCompleted, toggleSpacedRepetition }) {
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [expandedProblemId, setExpandedProblemId] = useState(null);

  // Calculate overall metrics
  const totalProblems = dsaSheet.reduce((acc, topic) => acc + topic.problems.length, 0);
  const completedProblems = Object.keys(dsaState).filter(key => dsaState[key].completed).length;
  const overallPercent = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;

  const getTopicProgress = (topic) => {
    const total = topic.problems.length;
    const completed = topic.problems.filter(p => dsaState[p.id]?.completed).length;
    return {
      completed,
      total,
      percent: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  return (
    <div className="dsa-tracker-view">
      <div className="page-header">
        <h1>DSA & Coding Prep Tracker 🎯</h1>
        <p>Keep track of essential programming patterns, bookmark revisions, and study solutions.</p>
      </div>

      {/* Famous DSA Sheets & Resources Hyperlinks */}
      <div className="card" style={{ marginBottom: "24px", backgroundColor: "#000000", border: "1px solid var(--border-color)" }}>
        <h3 style={{ marginBottom: "12px", fontSize: "1.1rem", color: "#ffffff" }}>🔥 Famous DSA Practice Sheets & Handouts</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          <a 
            href="https://takeuforward.org/strivers-a-z-dsa-course-sheet-code-studio-problems/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", padding: "10px 14px", backgroundColor: "#ffd700", color: "#000000", fontWeight: "bold", border: "none" }}
          >
            <span>Striver's A-Z DSA Sheet</span>
            <ExternalLink size={14} color="#000000" />
          </a>
          <a 
            href="https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", padding: "10px 14px", backgroundColor: "#ffd700", color: "#000000", fontWeight: "bold", border: "none" }}
          >
            <span>Love Babbar 450 Sheet</span>
            <ExternalLink size={14} color="#000000" />
          </a>
          <a 
            href="https://github.com/kunal-kushwaha/DSA-Bootcamp-Java" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", padding: "10px 14px", backgroundColor: "#ffd700", color: "#000000", fontWeight: "bold", border: "none" }}
          >
            <span>Kunal Kushwaha Java Sheet</span>
            <ExternalLink size={14} color="#000000" />
          </a>
          <a 
            href="https://neetcode.io/practice" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", padding: "10px 14px", backgroundColor: "#ffd700", color: "#000000", fontWeight: "bold", border: "none" }}
          >
            <span>NeetCode 150 Tracker</span>
            <ExternalLink size={14} color="#000000" />
          </a>
        </div>
      </div>

      {/* Progress banner */}
      <div className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", borderLeft: "4px solid var(--primary)" }}>
        <div style={{ flexGrow: 1, marginRight: "40px" }}>
          <h3 style={{ marginBottom: "8px" }}>Overall Sheet Completion</h3>
          <div className="progress-track" style={{ height: "12px" }}>
            <div className="progress-fill" style={{ width: `${overallPercent}%` }}></div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", margin: 0, color: "var(--success)" }}>{overallPercent}%</h2>
          <span style={{ fontSize: "0.85rem", color: "var(--success)", fontWeight: "bold" }}>{completedProblems} of {totalProblems} Solved</span>
        </div>
      </div>

      {/* Topic Sheets Accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {dsaSheet.map(topic => {
          const progress = getTopicProgress(topic);
          const isTopicActive = activeTopicId === topic.id;

          return (
            <div 
              key={topic.id} 
              className="card" 
              style={{ 
                padding: "18px 24px",
                borderColor: isTopicActive ? "var(--primary)" : "var(--border-color)"
              }}
            >
              {/* Accordion Trigger */}
              <div 
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={() => setActiveTopicId(isTopicActive ? null : topic.id)}
              >
                <div style={{ flexGrow: 1 }}>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "4px" }}>{topic.topic}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--success)", fontWeight: "bold" }}>{progress.completed} of {progress.total} Solved</span>
                    <div style={{ width: "100px", height: "6px", backgroundColor: "var(--border-color)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${progress.percent}%`, backgroundColor: "var(--success)" }}></div>
                    </div>
                    <span style={{ color: "var(--success)", fontWeight: "bold" }}>{progress.percent}%</span>
                  </div>
                </div>
                {isTopicActive ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {/* Problems list */}
              {isTopicActive && (
                <div style={{ marginTop: "20px", borderTop: "1px solid var(--border-color)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {topic.problems.map(problem => {
                    const status = dsaState[problem.id] || { completed: false, needsSpacedRepetition: false };
                    const isExpanded = expandedProblemId === problem.id;

                    return (
                      <div key={problem.id} style={{ display: "flex", flexDirection: "column", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                        <div 
                          style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            padding: "12px 16px",
                            backgroundColor: status.completed ? "var(--primary-light)" : "#000000"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {/* Checkbox */}
                            <label className="checkbox-container">
                              <input 
                                type="checkbox" 
                                checked={status.completed} 
                                onChange={() => toggleProblemCompleted(problem.id, problem.title)} 
                              />
                              <div className="custom-checkbox">
                                {status.completed && <Check size={12} strokeWidth={3} />}
                              </div>
                            </label>
                            
                            <span style={{ 
                              fontWeight: 600, 
                              fontSize: "0.95rem",
                              textDecoration: status.completed ? "line-through" : "none",
                              color: status.completed ? "var(--text-secondary)" : "var(--text-primary)"
                            }}>
                              {problem.title}
                            </span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            {/* Difficulty */}
                            <span className={`badge ${
                              problem.difficulty === "Easy" ? "badge-success" : 
                              problem.difficulty === "Medium" ? "badge-warning" : "badge-danger"
                            }`} style={{ fontSize: "0.65rem" }}>
                              {problem.difficulty}
                            </span>

                            {/* Spaced Rep Tag */}
                            <button 
                              className="btn btn-ghost" 
                              style={{ 
                                padding: "6px",
                                color: status.needsSpacedRepetition ? "var(--warning)" : "var(--text-muted)"
                              }}
                              onClick={() => toggleSpacedRepetition(problem.id, problem.title)}
                              title={status.needsSpacedRepetition ? "Flagged for revision" : "Flag for spaced repetition"}
                            >
                              <Bookmark size={16} fill={status.needsSpacedRepetition ? "var(--warning)" : "none"} />
                            </button>

                            {/* Solution dropdown trigger */}
                            {problem.codeSnippet && (
                              <button 
                                className="btn btn-ghost" 
                                style={{ padding: "6px" }}
                                onClick={() => setExpandedProblemId(isExpanded ? null : problem.id)}
                              >
                                <Code size={16} />
                              </button>
                            )}

                            {/* External link */}
                            <a href={problem.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "6px" }}>
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        </div>

                        {/* Code snippet solution view */}
                        {isExpanded && problem.codeSnippet && (
                          <div style={{ backgroundColor: "#0f172a", color: "#f8fafc", padding: "16px", fontSize: "0.85rem", overflowX: "auto" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", borderBottom: "1px solid #334155", paddingBottom: "6px" }}>
                              <span style={{ color: "#38bdf8", fontWeight: 600 }}>C++ Solution Snippet</span>
                              <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Copy & paste as boilerplate</span>
                            </div>
                            <pre style={{ fontFamily: "Consolas, Monaco, monospace", margin: 0 }}>
                              {problem.codeSnippet}
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
