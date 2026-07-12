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
  onNavigate,
  toggleVideoWatched,
  toggleProblemCompleted
}) {
  const [syncing, setSyncing] = useState({ github: false, leetcode: false, coding: false });
  const [todayTasks, setTodayTasks] = useState(() => {
    const saved = localStorage.getItem(`dashboard_tasks_completed_day_${profile.currentDay}`);
    return saved ? JSON.parse(saved) : { theory: false, coding: false, sync: false };
  });
  const [showCelebration, setShowCelebration] = useState(false);

  // Gemini AI Placement Planner States
  const [showAiPlanner, setShowAiPlanner] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: "gemini", text: `Hi! I am Gemini, your Personalized Placement Assistant. I see you are on Day ${profile.currentDay} of your ${profile.timelineDays}-day track using ${profile.language}. Ask me anything to customize your routine!` }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Load routine recommendations based on level, current day, and preferred language
  const routine = generateDailyRoutine(profile.dsaLevel, profile.currentDay, profile.timelineDays, profile.language);

  const isTheoryCompleted = !!playlistState[routine.video?.id] || !!playlistState[routine.video?.youtubeId];
  const isCodingCompleted = !!dsaState[routine.problem?.id]?.completed;
  const isSyncCompleted = !!todayTasks.sync;

  useEffect(() => {
    const updated = {
      theory: isTheoryCompleted,
      coding: isCodingCompleted,
      sync: isSyncCompleted
    };
    localStorage.setItem(`dashboard_tasks_completed_day_${profile.currentDay}`, JSON.stringify(updated));
    setTodayTasks(updated);
  }, [isTheoryCompleted, isCodingCompleted, isSyncCompleted, profile.currentDay]);

  const [activeQuestionIdx, setActiveQuestionIdx] = useState(null);
  const [showHintIdx, setShowHintIdx] = useState({});
  const [answersState, setAnswersState] = useState(() => {
    const saved = localStorage.getItem(`dashboard_answers_day_${profile.currentDay}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(`dashboard_answers_day_${profile.currentDay}`, JSON.stringify(answersState));
  }, [answersState, profile.currentDay]);

  useEffect(() => {
    const saved = localStorage.getItem(`dashboard_answers_day_${profile.currentDay}`);
    if (saved) {
      setAnswersState(JSON.parse(saved));
    } else {
      setAnswersState({});
    }
  }, [profile.currentDay]);

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
        { q: "What is the difference between Array and Linked List? (Amazon)", type: "Theory", hint: "Arrays are stored in contiguous memory and have O(1) random access. Linked Lists are non-contiguous and require traversal, making access O(N) but insertion/deletion O(1)." },
        { q: "How do you detect a cycle in a Linked List? (Microsoft)", type: "Algorithm", hint: "Use Floyd's Cycle-Finding Algorithm (Hare and Tortoise approach) with slow and fast pointers. If they meet, a cycle exists." },
        { q: "Explain the working of Binary Search with time complexity. (Google)", type: "Theory", hint: "Sort the array first. Divide and conquer by checking the middle element. Time complexity is O(log N)." },
        { q: "Write code to reverse a Linked List. (Adobe)", type: "Coding", hint: "Iterate through the list, changing the next pointer of each node to point to its previous node. Keep track of prev, curr, and next." },
        { q: "What is spaced repetition in DSA preparation? (Generic)", type: "Theory", hint: "Reviewing topics at increasing intervals (e.g., Day 1, Day 3, Day 7, Day 14) to enhance long-term memory." }
      ],
      "CS Fundamentals": [
        { q: "What are the four pillars of Object-Oriented Programming? (TCS)", type: "Theory", hint: "Encapsulation (data hiding), Abstraction (hiding implementation), Inheritance (reusing code), and Polymorphism (many forms)." },
        { q: "Explain normalization and its types (1NF, 2NF, 3NF). (Infosys)", type: "Theory", hint: "1NF: Atomic values. 2NF: No partial dependency. 3NF: No transitive dependency." },
        { q: "What is the difference between TCP and UDP? (Cisco)", type: "Theory", hint: "TCP is connection-oriented, reliable, and slower. UDP is connectionless, faster, but unreliable." },
        { q: "What are ACID properties in a database? (Amazon)", type: "Theory", hint: "Atomicity, Consistency, Isolation, Durability. Crucial for database transactions." },
        { q: "Explain compilation vs interpretation. (Generic)", type: "Theory", hint: "Compilers translate entire code to machine code at once (faster execution). Interpreters translate line-by-line (easier debugging)." }
      ],
      "Aptitude": [
        { q: "A train crosses a pole in 15 seconds. Find its speed... (Wipro)", type: "Quantitative", hint: "Use formula: Speed = Distance / Time. If length is not given, speed cannot be calculated without additional parameters." },
        { q: "Find the number of ways to arrange the letters of 'LEADER'... (Cognizant)", type: "Logical", hint: "Word LEADER has 6 letters: L, E, A, D, E, R (E repeats twice). Total arrangements = 6! / 2! = 720 / 2 = 360." },
        { q: "What is the probability of getting a sum of 9 with two dice? (Capgemini)", type: "Quantitative", hint: "Favorable outcomes: (3,6), (4,5), (5,4), (6,3) = 4. Total outcomes = 36. Probability = 4/36 = 1/9." },
        { q: "A sum of money doubles itself in 8 years at simple interest... (Accenture)", type: "Quantitative", hint: "If sum doubles, Simple Interest = Principal. SI = (P * R * T)/100 => P = (P * R * 8)/100 => R = 100/8 = 12.5%." },
        { q: "Logical series deduction: A, C, F, J, ...? (Generic)", type: "Logical", hint: "Pattern: A (+2) -> C (+3) -> F (+4) -> J (+5) -> O. The next letter is O." }
      ],
      "System Design": [
        { q: "What is Load Balancing and how does it prevent servers from crashing? (Netflix)", type: "HLD", hint: "Distributes incoming traffic across multiple backend servers using algorithms like Round Robin or Least Connections." },
        { q: "Explain vertical vs horizontal scaling with pros/cons. (Meta)", type: "HLD", hint: "Vertical = Adding resources/RAM to same server (limited scaling). Horizontal = Adding more servers/machines (highly scalable but complex)." },
        { q: "What is a Content Delivery Network (CDN) and when to use it? (Twitter)", type: "HLD", hint: "Cached static content distributed globally on edge servers to reduce latency for users." },
        { q: "How does Database Sharding differ from Partitioning? (Uber)", type: "HLD", hint: "Sharding is horizontal partitioning that splits database rows across multiple separate database servers." },
        { q: "Design a URL shortening service like Bit.ly. (Microsoft)", type: "System Design", hint: "Use base62 encoding (a-z, A-Z, 0-9) to generate short unique keys from incremental integer IDs." }
      ],
      "Cloud & DevOps": [
        { q: "Explain the difference between Virtual Machines and Docker Containers. (Amazon)", type: "DevOps", hint: "VMs virtualize hardware and run guest OS. Containers virtualize OS and share host kernel (lighter and faster)." },
        { q: "What is AWS IAM and how does role delegation work? (Goldman Sachs)", type: "AWS", hint: "Identity & Access Management. Role delegation uses temporary security credentials via STS AssumeRole API." },
        { q: "What is the purpose of a Kubernetes Ingress Controller? (Uber)", type: "DevOps", hint: "Manages external access to services in a K8s cluster, typically HTTP/HTTPS, routing traffic based on host/path." },
        { q: "How do you secure static content hosted on AWS S3? (JPMorgan)", type: "AWS", hint: "Use S3 Block Public Access, bucket policies, IAM roles, KMS encryption, and signed URLs." },
        { q: "Explain continuous integration vs continuous deployment. (Microsoft)", type: "DevOps", hint: "CI automates code build & tests on push. CD automatically deploys every successful commit to production." }
      ],
      "Project Build": [
        { q: "How does JWT-based session authentication work in REST APIs? (PayPal)", type: "Fullstack", hint: "Stateless authentication token containing header, payload (claims), and signature. Sent in Authorization header." },
        { q: "Explain the Virtual DOM and reconciliation in React. (Meta)", type: "Frontend", hint: "A lightweight copy of the real DOM. React updates the virtual DOM, compares it (diffing), and batches updates to the real DOM (reconciliation)." },
        { q: "What are the advantages of MongoDB over relational databases? (Coinbase)", type: "Database", hint: "NoSQL document store, schema-less, easily horizontally scalable, stores data in BSON format." },
        { q: "How do you handle CORS errors between frontend and backend? (Generic)", type: "Fullstack", hint: "Cross-Origin Resource Sharing. Solved by setting 'Access-Control-Allow-Origin' header on backend." },
        { q: "How do you optimize static asset loads in React? (Netflix)", type: "Frontend", hint: "Use lazy loading (React.lazy), code-splitting, WebP image formats, and CDN hosting." }
      ]
    };
    return questions[topic] || questions["DSA"];
  };

  // Load routine recommendations based on level, current day, and preferred language
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

  // Generate real daily completion values for the PLACIFY heatmap
  const heatmapCells = [];
  for (let d = 1; d <= profile.timelineDays; d++) {
    let completedCount = 0;
    if (d === profile.currentDay) {
      if (todayTasks.theory) completedCount++;
      if (todayTasks.coding) completedCount++;
    } else {
      const saved = localStorage.getItem(`dashboard_tasks_completed_day_${d}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theory) completedCount++;
        if (parsed.coding) completedCount++;
      }
    }

    let cellColor = "#1f2937"; // Future Day
    let label = `Day ${d}: Not Started`;

    if (d <= profile.currentDay) {
      if (completedCount === 2) {
        cellColor = "#22c55e"; // Green: All tasks completed
        label = `Day ${d}: All Tasks Completed`;
      } else if (completedCount === 1) {
        cellColor = "#2563eb"; // Blue: Half tasks completed
        label = `Day ${d}: Half Tasks Completed`;
      } else {
        cellColor = "#ef4444"; // Red: No tasks completed
        label = `Day ${d}: No Tasks Completed`;
      }
    }

    heatmapCells.push({ day: d, color: cellColor, label });
  }

  // Group into clean columns (7 rows corresponding to days of the week, up to weeks matching timelineDays)
  const heatmapWeeks = [];
  const totalDaysCount = profile.timelineDays;
  const numRows = 7;
  const numWeeks = Math.ceil(totalDaysCount / numRows);

  for (let r = 0; r < numRows; r++) {
    const row = [];
    for (let w = 0; w < numWeeks; w++) {
      const dayIndex = w * numRows + r;
      if (dayIndex < totalDaysCount) {
        row.push(heatmapCells[dayIndex]);
      } else {
        row.push({ day: null, color: "transparent", label: "" });
      }
    }
    heatmapWeeks.push(row);
  }

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

  const handleSendAiMessage = (customMsg = null) => {
    const msgText = customMsg || chatInput;
    if (!msgText.trim()) return;
    
    const updatedHistory = [...chatHistory, { role: "user", text: msgText }];
    setChatHistory(updatedHistory);
    setChatInput("");
    
    setTimeout(() => {
      let reply = "";
      const lower = msgText.toLowerCase();
      
      if (lower.includes("resource") || lower.includes("study") || lower.includes("today")) {
        reply = `Here is your customized study plan for Day ${profile.currentDay} (${routine.topic}):\n\n1. Watch the recommended theory video: "${routine.video.title}"\n2. Solve the primary coding problem: "${routine.problem.title}" on LeetCode.\n3. Solve the 5 Past Year Questions (PYQs) listed on your Dashboard.\n\nAdditional Free Resource: GeeksforGeeks placement handout on ${routine.topic}.`;
      } else if (lower.includes("dbms") || lower.includes("sql")) {
        reply = `To master DBMS & SQL for placements:\n\n- Study Normalization (1NF, 2NF, 3NF, BCNF) and Transaction ACID properties.\n- Practice top 50 SQL questions on LeetCode (e.g. Joins, Group By, Subqueries).\n- Learn index architectures (B-Trees and B+ Trees) frequently asked in SDE interviews.`;
      } else if (lower.includes("timeline") || lower.includes("optimize") || lower.includes("days")) {
        reply = `Since you have selected a ${profile.timelineDays}-day timeline, here is how you should balance it:\n\n- Days 1-30: Core Data Structures (Arrays, Lists, Stacks, Recursion).\n- Days 31-60: Advanced Algorithms (Trees, Graphs, DP) + Core CS (OOPs, DBMS, OS).\n- Days 61-${profile.timelineDays}: Mock Tests, Resume Building, and Mock Interviews.`;
      } else {
        reply = `For SDE roles at target companies (like Google/Amazon), ensure you master ${profile.language} concepts, dynamic programming, and system design basics.\n\nLet me know if you would like me to generate a mock interview question or detail an algorithm!`;
      }
      
      setChatHistory([...updatedHistory, { role: "gemini", text: reply }]);
    }, 1000);
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
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {/* Gemini AI Action */}
          <button 
            onClick={() => setShowAiPlanner(true)}
            className="btn btn-primary"
            style={{ fontSize: "0.8rem", padding: "6px 12px", display: "flex", gap: "6px", alignItems: "center", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
          >
            <span>🤖 Ask Gemini AI</span>
          </button>

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
          backgroundColor: "rgba(0,0,0,0.95)",
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
                  disabled
                />
                <div className="custom-checkbox" style={{ cursor: "not-allowed" }}>
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
              onClick={() => toggleVideoWatched(routine.video.id || routine.video.youtubeId)}
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
                  disabled
                />
                <div className="custom-checkbox" style={{ cursor: "not-allowed" }}>
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
                onClick={() => toggleProblemCompleted(routine.problem.id, routine.problem.title)}
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

      {/* Tailored Weekly Study Timetable (NEW) */}
      <div className="card" style={{ marginBottom: "32px", borderTop: "4px solid var(--primary)", backgroundColor: "#000000", border: "1px solid var(--border-color)", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <span className="badge badge-primary" style={{ marginBottom: "6px" }}>Personalized Routine Plan</span>
            <h2 style={{ color: "#ffffff", margin: 0 }}>Tailored Weekly Timetable ({profile.dailyHours || 4} Hrs/Day)</h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
              Customized track for <strong>{profile.dsaLevel} Level</strong> with weekend specialization in <strong>{profile.devTrack || "Web Development"}</strong>.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span className="badge badge-success" style={{ padding: "6px 12px", fontSize: "0.75rem", fontWeight: "bold" }}>
              Weekdays: DSA + Aptitude
            </span>
            <span className="badge badge-warning" style={{ padding: "6px 12px", fontSize: "0.75rem", fontWeight: "bold", backgroundColor: "rgba(255, 215, 0, 0.15)", color: "#ffd700", border: "1px solid #ffd700" }}>
              Weekends: {profile.devTrack || "Web Development"} + DSA
            </span>
          </div>
        </div>

        {/* Timetable Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", color: "#ffffff", fontSize: "0.85rem", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-color)", backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                <th style={{ padding: "12px 16px", fontWeight: "bold" }}>Day</th>
                <th style={{ padding: "12px 16px", fontWeight: "bold" }}>Core Topics & Lectures</th>
                <th style={{ padding: "12px 16px", fontWeight: "bold" }}>Practice Problems Target</th>
                <th style={{ padding: "12px 16px", fontWeight: "bold" }}>Daily Hours Distribution</th>
              </tr>
            </thead>
            <tbody>
              {/* Monday */}
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "12px 16px", fontWeight: "bold", color: "var(--primary)" }}>Monday</td>
                <td style={{ padding: "12px 16px" }}>
                  <strong>DSA:</strong> Basic Arrays & Strings (Lecture: Striver A-Z Arrays)<br />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}><strong>Aptitude:</strong> Quantitative Percentages & Averages</span>
                </td>
                <td style={{ padding: "12px 16px" }}>Solve 3 Array Problems + 5 Aptitude MCQs</td>
                <td style={{ padding: "12px 16px" }}>
                  ⏱️ {Math.max(2.5, ((profile.dailyHours || 4) * 0.6)).toFixed(1)} hrs DSA | {Math.max(1.5, ((profile.dailyHours || 4) * 0.4)).toFixed(1)} hrs Aptitude
                </td>
              </tr>
              {/* Tuesday */}
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "12px 16px", fontWeight: "bold", color: "var(--primary)" }}>Tuesday</td>
                <td style={{ padding: "12px 16px" }}>
                  <strong>DSA:</strong> Pointers & Recursion Basics (Lecture: Babbar Recursion)<br />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}><strong>Aptitude:</strong> Logical Blood Relations & Direction sense</span>
                </td>
                <td style={{ padding: "12px 16px" }}>Solve 2 Recursion Problems + 5 Logical Puzzles</td>
                <td style={{ padding: "12px 16px" }}>
                  ⏱️ {Math.max(2.5, ((profile.dailyHours || 4) * 0.6)).toFixed(1)} hrs DSA | {Math.max(1.5, ((profile.dailyHours || 4) * 0.4)).toFixed(1)} hrs Aptitude
                </td>
              </tr>
              {/* Wednesday */}
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "12px 16px", fontWeight: "bold", color: "var(--primary)" }}>Wednesday</td>
                <td style={{ padding: "12px 16px" }}>
                  <strong>DSA:</strong> Singly Linked List Insertion (Lecture: Kunal LL)<br />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}><strong>Aptitude:</strong> Quantitative Profit, Loss & Discounts</span>
                </td>
                <td style={{ padding: "12px 16px" }}>Solve 3 Linked List Problems + 5 Aptitude MCQs</td>
                <td style={{ padding: "12px 16px" }}>
                  ⏱️ {Math.max(2.5, ((profile.dailyHours || 4) * 0.6)).toFixed(1)} hrs DSA | {Math.max(1.5, ((profile.dailyHours || 4) * 0.4)).toFixed(1)} hrs Aptitude
                </td>
              </tr>
              {/* Thursday */}
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "12px 16px", fontWeight: "bold", color: "var(--primary)" }}>Thursday</td>
                <td style={{ padding: "12px 16px" }}>
                  <strong>DSA:</strong> Stacks & Queues Implementation (Lecture: Coders Army)<br />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}><strong>Aptitude:</strong> Logical Syllogisms & Seating Arrangement</span>
                </td>
                <td style={{ padding: "12px 16px" }}>Solve 2 Stack/Queue Problems + 5 Syllogism Questions</td>
                <td style={{ padding: "12px 16px" }}>
                  ⏱️ {Math.max(2.5, ((profile.dailyHours || 4) * 0.6)).toFixed(1)} hrs DSA | {Math.max(1.5, ((profile.dailyHours || 4) * 0.4)).toFixed(1)} hrs Aptitude
                </td>
              </tr>
              {/* Friday */}
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <td style={{ padding: "12px 16px", fontWeight: "bold", color: "var(--primary)" }}>Friday</td>
                <td style={{ padding: "12px 16px" }}>
                  <strong>DSA:</strong> Merge Sort & Quick Sort (Lecture: Striver Sorting)<br />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}><strong>Aptitude:</strong> Quantitative Time, Speed & Distance</span>
                </td>
                <td style={{ padding: "12px 16px" }}>Solve 3 Sorting Problems + 5 Velocity MCQs</td>
                <td style={{ padding: "12px 16px" }}>
                  ⏱️ {Math.max(2.5, ((profile.dailyHours || 4) * 0.6)).toFixed(1)} hrs DSA | {Math.max(1.5, ((profile.dailyHours || 4) * 0.4)).toFixed(1)} hrs Aptitude
                </td>
              </tr>
              {/* Saturday */}
              <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "rgba(255, 215, 0, 0.02)" }}>
                <td style={{ padding: "12px 16px", fontWeight: "bold", color: "#ffd700" }}>Saturday</td>
                <td style={{ padding: "12px 16px" }}>
                  <strong>DEV:</strong> {
                    (profile.devTrack || "Web Development") === "Web Development" ? "Frontend: Component Lifecycle & React Hooks" :
                    (profile.devTrack || "Web Development") === "App Development" ? "Mobile UI: Flutter Widgets & Screen Layouts" :
                    (profile.devTrack || "Web Development") === "Machine Learning" ? "Data Prep: NumPy & Pandas Exploratory Analysis" :
                    "Cloud: AWS EC2 Virtual Machines & VPC Setup"
                  }<br />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}><strong>Lecture:</strong> Specialization roadmap video course</span>
                </td>
                <td style={{ padding: "12px 16px" }}>Assemble Dev Project UI + 1 Weekly Mock Contest</td>
                <td style={{ padding: "12px 16px" }}>
                  ⏱️ {Math.max(3.0, ((profile.dailyHours || 4) * 0.7)).toFixed(1)} hrs Dev | {Math.max(1.0, ((profile.dailyHours || 4) * 0.3)).toFixed(1)} hrs Contest
                </td>
              </tr>
              {/* Sunday */}
              <tr style={{ backgroundColor: "rgba(255, 215, 0, 0.02)" }}>
                <td style={{ padding: "12px 16px", fontWeight: "bold", color: "#ffd700" }}>Sunday</td>
                <td style={{ padding: "12px 16px" }}>
                  <strong>DEV:</strong> {
                    (profile.devTrack || "Web Development") === "Web Development" ? "Backend: Node.js Express REST API integration" :
                    (profile.devTrack || "Web Development") === "App Development" ? "Mobile APIs: Firebase DB & Network Integration" :
                    (profile.devTrack || "Web Development") === "Machine Learning" ? "Model Training: Regression models in Scikit-Learn" :
                    "DevOps: Docker containers & GitHub Actions CI/CD"
                  }<br />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}><strong>Lecture:</strong> Database setup & continuous deployment course</span>
                </td>
                <td style={{ padding: "12px 16px" }}>Deploy weekend project code on GitHub + Revise DSA mistakes</td>
                <td style={{ padding: "12px 16px" }}>
                  ⏱️ {Math.max(3.0, ((profile.dailyHours || 4) * 0.7)).toFixed(1)} hrs Dev | {Math.max(1.0, ((profile.dailyHours || 4) * 0.3)).toFixed(1)} hrs DSA Revise
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
          {dailyQuestions.map((qObj, index) => {
            const isCompleted = completedQuestions[index];
            const isActive = activeQuestionIdx === index;
            const textAnswer = answersState[index] || "";

            return (
              <div 
                key={index} 
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "12px 16px",
                  backgroundColor: isCompleted ? "var(--success-light)" : "var(--bg-primary)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-color)",
                  transition: "background-color 0.2s ease"
                }}
              >
                <div 
                  style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", width: "100%" }}
                  onClick={() => setActiveQuestionIdx(isActive ? null : index)}
                >
                  <label className="checkbox-container" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={isCompleted || false} 
                      disabled
                    />
                    <div className="custom-checkbox" style={{ cursor: "not-allowed" }}>
                      {isCompleted && <CheckCircle size={10} style={{ color: "var(--success)" }} />}
                    </div>
                  </label>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: 600 }}>{qObj.type}</span>
                    <p style={{ margin: "2px 0 0 0", fontSize: "0.9rem", color: "var(--text-primary)" }}>{qObj.q}</p>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{isActive ? "Collapse ▴" : "Solve ▾"}</span>
                </div>

                {/* Submissions form (no manual checkbox tick) */}
                {isActive && (
                  <div style={{ marginTop: "12px", borderTop: "1px solid var(--border-color)", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                      <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Provide your solution writeup or code explanation to complete this task (min 10 characters):
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowHintIdx(prev => ({ ...prev, [index]: !prev[index] }))}
                        className="btn"
                        style={{
                          fontSize: "0.75rem",
                          padding: "4px 8px",
                          backgroundColor: "#000000",
                          border: "1px solid #ffffff",
                          color: "#ffffff",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          cursor: "pointer"
                        }}
                      >
                        💡 {showHintIdx[index] ? "Hide Hint & Solution" : "Show Hint & Solution"}
                      </button>
                    </div>

                    {showHintIdx[index] && qObj.hint && (
                      <div style={{
                        backgroundColor: "#0b0f19",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "4px",
                        padding: "12px",
                        fontSize: "0.825rem",
                        color: "#e2e8f0",
                        lineHeight: "1.4",
                        marginBottom: "4px"
                      }}>
                        <strong style={{ color: "var(--primary)" }}>💡 Study Hint & Explanation:</strong><br />
                        {qObj.hint}
                      </div>
                    )}

                    <textarea
                      rows={3}
                      style={{
                        width: "100%",
                        backgroundColor: "#000000",
                        border: "1px solid var(--border-color)",
                        borderRadius: "4px",
                        color: "#ffffff",
                        padding: "8px",
                        fontSize: "0.85rem",
                        fontFamily: "var(--font-body)",
                        resize: "vertical"
                      }}
                      placeholder="Type your explanation or pseudocode here..."
                      value={textAnswer}
                      onChange={(e) => setAnswersState(prev => ({ ...prev, [index]: e.target.value }))}
                    />
                    <button
                      className="btn btn-primary"
                      style={{
                        alignSelf: "flex-end",
                        padding: "6px 12px",
                        fontSize: "0.85rem",
                        backgroundColor: textAnswer.trim().length >= 10 ? "var(--success)" : "var(--border-color)",
                        borderColor: textAnswer.trim().length >= 10 ? "var(--success)" : "var(--border-color)",
                        color: "#ffffff",
                        cursor: textAnswer.trim().length >= 10 ? "pointer" : "not-allowed"
                      }}
                      disabled={textAnswer.trim().length < 10}
                      onClick={() => {
                        setCompletedQuestions(prev => ({ ...prev, [index]: true }));
                        setActiveQuestionIdx(null);
                      }}
                    >
                      Verify & Complete Task
                    </button>
                  </div>
                )}
              </div>
            );
          })}
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

      {/* Real PLACIFY Heatmap (Only visible on Tailored / Premium setup) */}
      {profile.github !== "guest" && (
        <div className="card" style={{ marginBottom: "32px", backgroundColor: "#000000" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3>Your PLACIFY Progress Heatmap</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Tracks daily learning schedule completions over your customized roadmap timeline.</p>
            </div>
            <div style={{ display: "flex", gap: "10px", fontSize: "0.75rem", alignItems: "center" }}>
              <span style={{ color: "var(--text-muted)" }}>Legend:</span>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "12px", height: "12px", backgroundColor: "#ef4444", borderRadius: "2px" }}></div>
                <span style={{ color: "#ef4444" }}>No Task</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "12px", height: "12px", backgroundColor: "#2563eb", borderRadius: "2px" }}></div>
                <span style={{ color: "#2563eb" }}>Half Completed</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "12px", height: "12px", backgroundColor: "#22c55e", borderRadius: "2px" }}></div>
                <span style={{ color: "#22c55e" }}>All Completed</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {heatmapWeeks.map((row, rowIndex) => (
              <div key={rowIndex} style={{ display: "flex", gap: "6px" }}>
                {row.map((cell, cellIndex) => (
                  <div 
                    key={cellIndex}
                    title={cell.label}
                    style={{ 
                      flex: 1,
                      height: "16px", 
                      borderRadius: "3px",
                      backgroundColor: cell.color,
                      transition: "all 0.2s ease",
                      cursor: cell.day ? "pointer" : "default",
                      opacity: cell.day ? 1 : 0
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Gemini AI study planner drawer */}
      {showAiPlanner && (
        <div style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: "420px",
          backgroundColor: "#000000",
          borderLeft: "1px solid var(--border-color)",
          zIndex: 1000,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          boxShadow: "var(--shadow-lg)",
          color: "#ffffff",
          animation: "slideIn 0.3s ease"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px" }}>
            <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <span>🤖 Gemini SDE Planner</span>
            </h3>
            <button 
              className="btn btn-ghost" 
              style={{ padding: "4px 8px", color: "#ffffff" }}
              onClick={() => setShowAiPlanner(false)}
            >
              ✕ Close
            </button>
          </div>

          {/* Chat history */}
          <div style={{ flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", paddingRight: "4px" }}>
            {chatHistory.map((chat, idx) => (
              <div 
                key={idx} 
                style={{
                  alignSelf: chat.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: chat.role === "user" ? "#ffffff" : "#111111",
                  color: chat.role === "user" ? "#000000" : "#ffffff",
                  padding: "10px 14px",
                  borderRadius: "6px",
                  maxWidth: "85%",
                  fontSize: "0.85rem",
                  whiteSpace: "pre-line",
                  border: chat.role === "user" ? "none" : "1px solid var(--border-color)"
                }}
              >
                {chat.text}
              </div>
            ))}
          </div>

          {/* Quick presets */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: "0.7rem", padding: "4px 8px", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
              onClick={() => handleSendAiMessage("Recommend study resources for today")}
            >
              📅 Today's Plan
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: "0.7rem", padding: "4px 8px", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
              onClick={() => handleSendAiMessage("Suggest DBMS study topics")}
            >
              💾 DBMS Strategy
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: "0.7rem", padding: "4px 8px", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
              onClick={() => handleSendAiMessage("Optimize my prep timeline")}
            >
              ⏳ Timeline Balance
            </button>
          </div>

          {/* Input field */}
          <div style={{ display: "flex", gap: "8px" }}>
            <input 
              type="text" 
              placeholder="Ask Gemini to customize plan..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
              style={{ flex: 1, backgroundColor: "#000000", border: "1px solid #ffffff", borderRadius: "4px", padding: "8px 12px", color: "#ffffff", fontSize: "0.85rem" }}
            />
            <button 
              onClick={() => handleSendAiMessage()}
              className="btn btn-primary"
              style={{ padding: "8px 16px", backgroundColor: "#000000", border: "1px solid #ffffff", color: "#ffffff" }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
