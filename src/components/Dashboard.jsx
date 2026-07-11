import React, { useState, useEffect } from "react";
import { 
  BookOpen, Calendar, CheckSquare, Award, Flame, 
  ChevronRight, AlertCircle, Play, CheckCircle, Github, Code, ExternalLink, RefreshCw 
} from "lucide-react";
import { generateDailyRoutine } from "../utils/routineGenerator";

export default function Dashboard({ 
  profile,
  updateProfile,
  dsaState, 
  playlistState, 
  companies, 
  events, 
  onNavigate 
}) {
  const [syncing, setSyncing] = useState({ github: false, leetcode: false, coding: false });
  const [todayTasks, setTodayTasks] = useState({ theory: false, coding: false, sync: false });
  const [showCelebration, setShowCelebration] = useState(false);

  const [completedQuestions, setCompletedQuestions] = useState(() => {
    const saved = localStorage.getItem(`dashboard_questions_day_${profile.currentDay}`);
    return saved ? JSON.parse(saved) : { 0: false, 1: false, 2: false, 3: false, 4: false };
  });

  useEffect(() => {
    localStorage.setItem(`dashboard_questions_day_${profile.currentDay}`, JSON.stringify(completedQuestions));
  }, [completedQuestions, profile.currentDay]);

  useEffect(() => {
    const saved = localStorage.getItem(`dashboard_questions_day_${profile.currentDay}`);
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    } else {
      setCompletedQuestions({ 0: false, 1: false, 2: false, 3: false, 4: false });
    }
  }, [profile.currentDay]);

  const getPastYearQuestions = (topic) => {
    const questions = {
      "DSA": [
        { q: "What is the difference between Array and Linked List? (Amazon)", type: "Theory" },
        { q: "How do you detect a cycle in a Linked List? (Microsoft)", type: "Algorithm" },
        { q: "Explain the working of Binary Search with time complexity. (Google)", type: "Theory" },
        { q: "Write code to reverse a Linked List. (Adobe)", type: "Coding" },
        { q: "What is spaced repetition in DSA preparation? (Generic)", type: "Theory" }
      ],
      "CS Fundamentals": [
        { q: "What are the four pillars of Object-Oriented Programming? (TCS)", type: "Theory" },
        { q: "Explain normalization and its types (1NF, 2NF, 3NF). (Infosys)", type: "Theory" },
        { q: "What is the difference between TCP and UDP? (Cisco)", type: "Theory" },
        { q: "What are ACID properties in a database? (Amazon)", type: "Theory" },
        { q: "Explain compilation vs interpretation. (Generic)", type: "Theory" }
      ],
      "Aptitude": [
        { q: "A train crosses a pole in 15 seconds. Find its speed... (Wipro)", type: "Quantitative" },
        { q: "Find the number of ways to arrange the letters of 'LEADER'... (Cognizant)", type: "Logical" },
        { q: "What is the probability of getting a sum of 9 with two dice? (Capgemini)", type: "Quantitative" },
        { q: "A sum of money doubles itself in 8 years at simple interest... (Accenture)", type: "Quantitative" },
        { q: "Logical series deduction: A, C, F, J, ...? (Generic)", type: "Logical" }
      ],
      "System Design": [
        { q: "What is Load Balancing and how does it prevent servers from crashing? (Netflix)", type: "HLD" },
        { q: "Explain vertical vs horizontal scaling with pros/cons. (Meta)", type: "HLD" },
        { q: "What is a Content Delivery Network (CDN) and when to use it? (Twitter)", type: "HLD" },
        { q: "How does Database Sharding differ from Partitioning? (Uber)", type: "HLD" },
        { q: "Design a URL shortening service like Bit.ly. (Microsoft)", type: "System Design" }
      ],
      "Cloud & DevOps": [
        { q: "Explain the difference between Virtual Machines and Docker Containers. (Amazon)", type: "DevOps" },
        { q: "What is AWS IAM and how does role delegation work? (Goldman Sachs)", type: "AWS" },
        { q: "What is the purpose of a Kubernetes Ingress Controller? (Uber)", type: "DevOps" },
        { q: "How do you secure static content hosted on AWS S3? (JPMorgan)", type: "AWS" },
        { q: "Explain continuous integration vs continuous deployment. (Microsoft)", type: "DevOps" }
      ],
      "Project Build": [
        { q: "How does JWT-based session authentication work in REST APIs? (PayPal)", type: "Fullstack" },
        { q: "Explain the Virtual DOM and reconciliation in React. (Meta)", type: "Frontend" },
        { q: "What are the advantages of MongoDB over relational databases? (Coinbase)", type: "Database" },
        { q: "How do you handle CORS errors between frontend and backend? (Generic)", type: "Fullstack" },
        { q: "How do you optimize static asset loads in React? (Netflix)", type: "Frontend" }
      ]
    };
    return questions[topic] || questions["DSA"];
  };

  // Load routine recommendations based on level, current day, and preferred language
  const routine = generateDailyRoutine(profile.dsaLevel, profile.currentDay, profile.timelineDays, profile.language);
  const dailyQuestions = getPastYearQuestions(routine.topic);
  const solvedCount = Object.values(completedQuestions).filter(Boolean).length;

  // Compute Stats
  const totalDsa = Object.keys(dsaState).filter(key => dsaState[key].completed).length;
  const totalVideosCompleted = Object.keys(playlistState).filter(key => playlistState[key]).length;
  
  const totalVideosInMock = 19;
  const learningProgress = Math.round((totalVideosCompleted / totalVideosInMock) * 100);

  const spacedRepList = Object.keys(dsaState)
    .filter(key => dsaState[key].needsSpacedRepetition)
    .map(key => dsaState[key]);

  const heatmapWeeks = Array.from({ length: 7 }, (_, day) => {
    return Array.from({ length: 24 }, (_, week) => {
      const seedVal = (day * week + 3) % 5;
      const dateStr = `Day ${day + 1}, Week ${week + 1}`;
      return { level: seedVal, date: dateStr };
    });
  });

  const handleSync = (platform) => {
    setSyncing(prev => ({ ...prev, [platform]: true }));
    setTimeout(() => {
      setSyncing(prev => ({ ...prev, [platform]: false }));
      setTodayTasks(prev => ({ ...prev, sync: true }));
    }, 1500);
  };

  const handleAdvanceDay = () => {
    setShowCelebration(true);
    setTimeout(() => {
      updateProfile({
        ...profile,
        currentDay: profile.currentDay + 1
      });
      setTodayTasks({ theory: false, coding: false, sync: false });
      setShowCelebration(false);
    }, 2000);
  };

  const completedCount = Object.values(todayTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 3) * 100);

  return (
    <div className="dashboard-view">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Welcome Back, {profile.name}! 🚀</h1>
          <p>Prep track: <strong>{profile.dsaLevel} Level</strong> ({profile.timelineDays} days timeline)</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Profile Badges */}
          <span className="badge badge-warning" style={{ fontSize: "0.8rem", padding: "6px 12px" }}>
            {profile.language}
          </span>
          <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="badge badge-primary" style={{ display: "flex", gap: "6px", alignItems: "center", textTransform: "none", fontSize: "0.8rem", padding: "6px 12px" }}>
            <Github size={14} /> @{profile.github.split("/").pop()}
          </a>
          <a href={`https://leetcode.com/${profile.leetcode}`} target="_blank" rel="noopener noreferrer" className="badge badge-success" style={{ display: "flex", gap: "6px", alignItems: "center", textTransform: "none", fontSize: "0.8rem", padding: "6px 12px" }}>
            <Code size={14} /> @{profile.leetcode.split("/").pop()}
          </a>
        </div>
      </div>

      {/* Celebration Overlay */}
      {showCelebration && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(255,255,255,0.9)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          animation: "fadeIn 0.3s ease-out"
        }}>
          <CheckCircle size={80} style={{ color: "var(--success)", marginBottom: "16px" }} />
          <h2>Day {profile.currentDay} Routine Completed! 🎉</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Moving forward to Day {profile.currentDay + 1}...</p>
        </div>
      )}

      {/* Daily Timetable and Tasks Widget */}
      <div className="card" style={{ marginBottom: "32px", borderTop: "4px solid var(--primary)", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: "6px" }}>Day {profile.currentDay} of {profile.timelineDays} Timetable</span>
            <h2>Today's Focus: {routine.topic}</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Today's Tasks Progress: {progressPercent}%</span>
            <div className="progress-track" style={{ width: "150px", height: "6px", marginTop: "4px" }}>
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Tasks Checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          {/* Task 1: Theory */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            backgroundColor: todayTasks.theory ? "var(--primary-light)" : "var(--bg-primary)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-color)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={todayTasks.theory} 
                  onChange={() => setTodayTasks(prev => ({ ...prev, theory: !prev.theory }))} 
                />
                <div className="custom-checkbox">
                  {todayTasks.theory && <Play size={10} fill="var(--primary)" style={{ color: "var(--primary)" }} />}
                </div>
              </label>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}>THEORY TASK</span>
                <p style={{ fontWeight: 600, margin: 0 }}>Watch: {routine.video.title}</p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Duration: {routine.video.duration}</span>
              </div>
            </div>
            <a 
              href={`https://www.youtube.com/watch?v=${routine.video.youtubeId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: "6px 12px", fontSize: "0.8rem" }}
              onClick={() => setTodayTasks(prev => ({ ...prev, theory: true }))}
            >
              Start Lecture <Play size={12} />
            </a>
          </div>

          {/* Task 2: Code Practice */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            backgroundColor: todayTasks.coding ? "var(--primary-light)" : "var(--bg-primary)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-color)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={todayTasks.coding} 
                  onChange={() => setTodayTasks(prev => ({ ...prev, coding: !prev.coding }))} 
                />
                <div className="custom-checkbox">
                  {todayTasks.coding && <CheckCircle size={10} style={{ color: "var(--primary)" }} />}
                </div>
              </label>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: 600 }}>CODING PRACTICE</span>
                <p style={{ fontWeight: 600, margin: 0 }}>Solve: {routine.problem.title}</p>
                <span className={`badge ${routine.problem.difficulty === "Easy" ? "badge-success" : "badge-warning"}`} style={{ fontSize: "0.6rem", marginTop: "4px" }}>
                  {routine.problem.difficulty}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button 
                className="btn btn-primary"
                style={{ padding: "6px 12px", fontSize: "0.8rem", backgroundColor: "#2563eb", border: "1px solid #2563eb", color: "#ffffff" }}
                onClick={() => onNavigate("visualizer", routine.topic)}
              >
                Visualize <Play size={12} style={{ marginLeft: "4px" }} />
              </button>
              <a 
                href={routine.problem.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                onClick={() => setTodayTasks(prev => ({ ...prev, coding: true }))}
              >
                Solve on LeetCode <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Task 3: Profile/Stats Sync */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            backgroundColor: todayTasks.sync ? "var(--primary-light)" : "var(--bg-primary)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-color)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={todayTasks.sync} 
                  onChange={() => setTodayTasks(prev => ({ ...prev, sync: !prev.sync }))} 
                />
                <div className="custom-checkbox">
                  {todayTasks.sync && <CheckCircle size={10} style={{ color: "var(--primary)" }} />}
                </div>
              </label>
              <div>
                <span style={{ fontSize: "0.8rem", color: "var(--warning)", fontWeight: 600 }}>PLATFORM SYNC</span>
                <p style={{ fontWeight: 600, margin: 0 }}>Sync your LeetCode & GitHub submissions progress</p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Verifies commits & solved status</span>
              </div>
            </div>
            <button 
              className="btn btn-secondary" 
              style={{ padding: "6px 12px", fontSize: "0.8rem", display: "inline-flex", gap: "6px" }}
              onClick={() => handleSync("leetcode")}
              disabled={syncing.leetcode}
            >
              {syncing.leetcode ? (
                <>Syncing... <RefreshCw size={12} className="spin-animation" /></>
              ) : (
                <>Fetch Submissions <RefreshCw size={12} /></>
              )}
            </button>
          </div>
        </div>

        {/* Advance Day Action */}
        <button 
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: "0.95rem" }}
          disabled={completedCount < 3}
          onClick={handleAdvanceDay}
        >
          {completedCount < 3 ? "Complete All Tasks to Unlock Next Day" : `Advance to Day ${profile.currentDay + 1}`}
        </button>
      </div>

      {/* Daily Past Year Interview Questions (5 Tasks) */}
      <div className="card" style={{ marginBottom: "32px", borderTop: "4px solid var(--success)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div>
            <span className="badge badge-success" style={{ marginBottom: "6px" }}>Daily Past Year Interview Questions</span>
            <h2>Topic: {routine.topic} (5 PYQs)</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Completed: {solvedCount} / 5</span>
            <div className="progress-track" style={{ width: "150px", height: "6px", marginTop: "4px" }}>
              <div className="progress-fill" style={{ width: `${Math.round((solvedCount / 5) * 100)}%`, backgroundColor: "var(--success)" }}></div>
            </div>
          </div>
        </div>

        {/* 5 Questions Checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {dailyQuestions.map((qObj, index) => (
            <div 
              key={index} 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                backgroundColor: completedQuestions[index] ? "var(--success-light)" : "var(--bg-primary)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)",
                transition: "background-color 0.2s ease"
              }}
            >
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={completedQuestions[index] || false} 
                  onChange={() => setCompletedQuestions(prev => ({ ...prev, [index]: !prev[index] }))} 
                />
                <div className="custom-checkbox">
                  {completedQuestions[index] && <CheckCircle size={10} style={{ color: "var(--success)" }} />}
                </div>
              </label>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 600 }}>{qObj.type}</span>
                <p style={{ margin: "2px 0 0 0", fontSize: "0.9rem", color: "var(--text-primary)" }}>{qObj.q}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of the Dashboard (Stats & Heatmap) */}
      <div className="grid-cols-4" style={{ marginBottom: "32px" }}>
        <div className="card" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "var(--primary-light)", color: "var(--primary)" }}>
            <Award size={24} />
          </div>
          <div>
            <h5 style={{ color: "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase" }}>DSA Solved</h5>
            <h2 style={{ fontSize: "1.75rem", margin: "2px 0 0 0" }}>{totalDsa} <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "normal" }}>/ 15</span></h2>
          </div>
        </div>

        <div className="card" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "var(--success-light)", color: "var(--success)" }}>
            <BookOpen size={24} />
          </div>
          <div>
            <h5 style={{ color: "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Video Progress</h5>
            <h2 style={{ fontSize: "1.75rem", margin: "2px 0 0 0" }}>{learningProgress}%</h2>
          </div>
        </div>

        <div className="card" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "var(--warning-light)", color: "var(--warning)" }}>
            <Flame size={24} />
          </div>
          <div>
            <h5 style={{ color: "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Coding Streak</h5>
            <h2 style={{ fontSize: "1.75rem", margin: "2px 0 0 0" }}>8 Days</h2>
          </div>
        </div>

        <div className="card" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ padding: "12px", borderRadius: "12px", backgroundColor: "var(--danger-light)", color: "var(--danger)" }}>
            <Calendar size={24} />
          </div>
          <div>
            <h5 style={{ color: "var(--text-secondary)", fontSize: "0.85rem", textTransform: "uppercase" }}>Upcoming Deadlines</h5>
            <h2 style={{ fontSize: "1.75rem", margin: "2px 0 0 0" }}>{events.length} Events</h2>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h3>Your Coding Activity Heatmap</h3>
            <p style={{ fontSize: "0.875rem" }}>Tracks problems solved and video lectures completed daily.</p>
          </div>
          <div style={{ display: "flex", gap: "8px", fontSize: "0.75rem", alignItems: "center", color: "var(--text-secondary)" }}>
            <span>Less</span>
            <div style={{ width: "12px", height: "12px", backgroundColor: "#f1f5f9", borderRadius: "2px" }}></div>
            <div style={{ width: "12px", height: "12px", backgroundColor: "#d8f3dc", borderRadius: "2px" }}></div>
            <div style={{ width: "12px", height: "12px", backgroundColor: "#b7e4c7", borderRadius: "2px" }}></div>
            <div style={{ width: "12px", height: "12px", backgroundColor: "#74c69d", borderRadius: "2px" }}></div>
            <div style={{ width: "12px", height: "12px", backgroundColor: "#2d6a4f", borderRadius: "2px" }}></div>
            <span>More</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {heatmapWeeks.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", gap: "4px" }}>
              {row.map((cell, cellIndex) => (
                <div 
                  key={cellIndex}
                  className="heatmap-cell"
                  data-level={cell.level}
                  data-tooltip={`${cell.date} - ${cell.level * 2} activities`}
                  style={{ width: "100%", height: "14px", borderRadius: "3px" }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid-cols-2">
        <div className="card" style={{ display: "flex", flex: "1", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <AlertCircle size={20} style={{ color: "var(--warning)" }} />
            <h3>Weak Areas & Spaced Repetition</h3>
          </div>
          {spacedRepList.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-muted)" }}>
              <p>Looking solid! No pending problems flagged for revision.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexGrow: "1" }}>
              {spacedRepList.map(problem => (
                <div 
                  key={problem.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    backgroundColor: "var(--bg-primary)",
                    borderRadius: "var(--radius-sm)",
                    borderLeft: "4px solid var(--warning)"
                  }}
                >
                  <div>
                    <h5 style={{ margin: 0 }}>{problem.title}</h5>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Resurfaced for Spaced Repetition</span>
                  </div>
                  <button 
                    className="btn btn-secondary" 
                    style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                    onClick={() => onNavigate("dsa")}
                  >
                    Solve Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card" style={{ display: "flex", flex: "1", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3>Calendar Snapshots</h3>
            <button 
              className="btn btn-ghost" 
              style={{ padding: "4px 8px", fontSize: "0.85rem" }}
              onClick={() => onNavigate("calendar")}
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexGrow: "1" }}>
            {events.slice(0, 3).map(event => (
              <div 
                key={event.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)"
                }}
              >
                <div>
                  <h5 style={{ margin: 0 }}>{event.title}</h5>
                  <span className={`badge ${event.type === "Exam" ? "badge-danger" : "badge-success"}`} style={{ marginTop: "4px", fontSize: "0.65rem" }}>
                    {event.type}
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontWeight: 700, color: "var(--danger)" }}>{event.daysLeft} days</span>
                  <p style={{ fontSize: "0.7rem", margin: 0 }}>left to register</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
