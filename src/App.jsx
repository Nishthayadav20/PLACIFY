import React, { useState, useEffect } from "react";
import { 
  mockPlaylists, 
  mockCompanies, 
  mockCalendarEvents, 
  mockDsaSheet 
} from "./data/mockData";
import Dashboard from "./components/Dashboard";
import LearningHub from "./components/LearningHub";
import CompanyDatabase from "./components/CompanyDatabase";
import CalendarTracker from "./components/CalendarTracker";
import DSATracker from "./components/DSATracker";
import Onboarding from "./components/Onboarding";
import WelcomeScreen from "./components/WelcomeScreen";
import MockTestEngine from "./components/MockTestEngine";
import AlgoVisualizer from "./components/AlgoVisualizer";
import SqlPractice from "./components/SqlPractice";
import TeammateFinder from "./components/TeammateFinder";
import ReferralCorner from "./components/ReferralCorner";
import { 
  LayoutDashboard, GraduationCap, Building2, Calendar, Award, Lock, BookOpenCheck, Eye, Code, Database, Users, Briefcase, Bot
} from "lucide-react";

export default function App() {
  const [sessionMode, setSessionMode] = useState(() => {
    const savedMode = localStorage.getItem("session_mode");
    const savedProfile = localStorage.getItem("user_profile");
    const parsedProfile = savedProfile ? JSON.parse(savedProfile) : null;
    
    if (savedMode === "premium" && parsedProfile?.isLoggedIn) {
      return "premium";
    }
    if (savedMode === "guest") {
      return "guest";
    }
    return null;
  });

  const [activeView, setActiveView] = useState("learning");
  const [visualizerTopic, setVisualizerTopic] = useState(null);

  // Global SDE TechGuru Planner states
  const [showAiPlanner, setShowAiPlanner] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("gemini_api_key") || "");
  const [chatHistory, setChatHistory] = useState([
    { role: "gemini", text: "Hi! I am TechGuru, your SDE Placement Assistant. Ask me anything to customize your preparation!" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleSendAiMessage = async (customMsg = null) => {
    const msgText = customMsg || chatInput;
    if (!msgText.trim()) return;
    
    const updatedHistory = [...chatHistory, { role: "user", text: msgText }];
    setChatHistory(updatedHistory);
    setChatInput("");
    
    if (apiKey.trim()) {
      setChatHistory([...updatedHistory, { role: "gemini", text: "Thinking... 🤖" }]);
      
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `System context: You are TechGuru, a world-class SDE placement preparation AI assistant inside PLACIFY. The user's active language is ${profile.language || "Java"}. Their current DSA level is ${profile.dsaLevel || "Beginner"}. Timeline is ${profile.timelineDays || 90} days. Day ${profile.currentDay || 1}.\n\nUser Question: ${msgText}`
                    }
                  ]
                }
              ]
            })
          }
        );
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message || "API Error");
        }
        const replyText = data.candidates[0].content.parts[0].text;
        setChatHistory([...updatedHistory, { role: "gemini", text: replyText }]);
      } catch (err) {
        setChatHistory([
          ...updatedHistory,
          { role: "gemini", text: `❌ Error calling Gemini API: ${err.message}. Please verify your API Key.` }
        ]);
      }
    } else {
      setTimeout(() => {
        let reply = "";
        const lower = msgText.toLowerCase();
        
        if (lower.includes("resource") || lower.includes("study") || lower.includes("today")) {
          reply = `Here is a custom study plan:\n1. Watch the recommended SDE TV playlists for ${profile.language || "Java"}.\n2. Solve 5 practice questions daily on DSA Tracker.\n3. Participate in the Weekly Mock Tests.`;
        } else if (lower.includes("dbms") || lower.includes("sql")) {
          reply = `To master DBMS & SQL:\n- Practice joins, aggregations, and query optimizations on the SQL tab.\n- Study ACID properties and normalizations.`;
        } else {
          reply = `Focus on mastering ${profile.language || "Java"} object-oriented principles, DSA sheets, and mock tests to secure your placement!\nLet me know how else I can help you.`;
        }
        setChatHistory([...updatedHistory, { role: "gemini", text: reply }]);
      }, 1000);
    }
  };

  const handleNavigate = (view, topic = null) => {
    setActiveView(view);
    if (topic) {
      setVisualizerTopic(topic);
    }
  };

  // Profile configurations
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("user_profile");
    return saved ? JSON.parse(saved) : {
      name: "",
      github: "",
      leetcode: "",
      hackerrank: "",
      codechef: "",
      dsaLevel: "Beginner",
      timelineDays: 90,
      currentDay: 1,
      isLoggedIn: false
    };
  });

  const [dsaState, setDsaState] = useState(() => {
    const saved = localStorage.getItem("dsa_state");
    return saved ? JSON.parse(saved) : {};
  });

  const [playlistState, setPlaylistState] = useState(() => {
    const saved = localStorage.getItem("playlist_state");
    return saved ? JSON.parse(saved) : {};
  });

  const [companies, setCompanies] = useState(() => {
    localStorage.setItem("company_list", JSON.stringify(mockCompanies));
    return mockCompanies;
  });

  const [playlists, setPlaylists] = useState(() => {
    localStorage.setItem("playlist_list", JSON.stringify(mockPlaylists));
    return mockPlaylists;
  });

  // Default initial active view based on session type
  useEffect(() => {
    if (sessionMode === "premium" && profile.isLoggedIn) {
      setActiveView("dashboard");
    } else {
      setActiveView("learning");
    }
  }, [sessionMode, profile.isLoggedIn]);

  // Sync states to local storage
  useEffect(() => {
    if (sessionMode) localStorage.setItem("session_mode", sessionMode);
    else localStorage.removeItem("session_mode");
  }, [sessionMode]);

  useEffect(() => {
    localStorage.setItem("user_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("dsa_state", JSON.stringify(dsaState));
  }, [dsaState]);

  useEffect(() => {
    localStorage.setItem("playlist_state", JSON.stringify(playlistState));
  }, [playlistState]);

  useEffect(() => {
    localStorage.setItem("company_list", JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem("playlist_list", JSON.stringify(playlists));
  }, [playlists]);

  // Actions
  const handleSelectSession = (mode) => {
    setSessionMode(mode);
    if (mode === "guest") {
      setProfile({
        id: "guest-explorer",
        name: "Guest Explorer",
        github: "guest",
        leetcode: "guest",
        hackerrank: "",
        codechef: "",
        dsaLevel: "Beginner",
        timelineDays: 90,
        currentDay: 1,
        isLoggedIn: true
      });
      setActiveView("dashboard");
    } else if (mode === "premium") {
      setProfile({
        name: "",
        github: "",
        leetcode: "",
        hackerrank: "",
        codechef: "",
        dsaLevel: "Beginner",
        timelineDays: 90,
        currentDay: 1,
        isLoggedIn: false
      });
    }
  };

  const handleOnboardingComplete = (profileData) => {
    setProfile(profileData);
  };

  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  const toggleProblemCompleted = (problemId, title) => {
    setDsaState(prev => {
      const current = prev[problemId] || { id: problemId, title, completed: false, needsSpacedRepetition: false };
      return {
        ...prev,
        [problemId]: {
          ...current,
          completed: !current.completed
        }
      };
    });
  };

  const toggleSpacedRepetition = (problemId, title) => {
    setDsaState(prev => {
      const current = prev[problemId] || { id: problemId, title, completed: false, needsSpacedRepetition: false };
      return {
        ...prev,
        [problemId]: {
          ...current,
          needsSpacedRepetition: !current.needsSpacedRepetition
        }
      };
    });
  };

  const toggleVideoWatched = (videoId) => {
    setPlaylistState(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const upvotePlaylist = (playlistId) => {
    setPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        return { ...pl, upvotes: pl.upvotes + 1 };
      }
      return pl;
    }));
  };

  const addExperience = (companyId, experience) => {
    setCompanies(prev => prev.map(comp => {
      if (comp.id === companyId) {
        return {
          ...comp,
          experiences: [experience, ...comp.experiences]
        };
      }
      return comp;
    }));
  };

  const handleLogout = () => {
    // Reset local session variables
    setSessionMode(null);
    setProfile({
      name: "",
      github: "",
      leetcode: "",
      hackerrank: "",
      codechef: "",
      dsaLevel: "Beginner",
      timelineDays: 90,
      currentDay: 1,
      isLoggedIn: false
    });
    localStorage.removeItem("session_mode");
    localStorage.removeItem("user_profile");
  };

  // 1. Welcome Selection Screen Router
  if (sessionMode === null) {
    return <WelcomeScreen onSelect={handleSelectSession} />;
  }

  // 2. Onboarding validation router
  if (sessionMode === "premium" && !profile.isLoggedIn) {
    return <Onboarding onComplete={handleOnboardingComplete} onBack={() => setSessionMode(null)} />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <Dashboard 
            profile={profile}
            updateProfile={updateProfile}
            dsaState={dsaState}
            playlistState={playlistState}
            companies={companies}
            events={mockCalendarEvents}
            onNavigate={handleNavigate}
            toggleVideoWatched={toggleVideoWatched}
            toggleProblemCompleted={toggleProblemCompleted}
            onShowAiPlanner={setShowAiPlanner}
          />
        );
      case "learning":
        return (
          <LearningHub 
            playlists={playlists}
            playlistState={playlistState}
            toggleVideoWatched={toggleVideoWatched}
            upvotePlaylist={upvotePlaylist}
          />
        );
      case "companies":
        return (
          <CompanyDatabase 
            companies={companies}
            addExperience={addExperience}
          />
        );
      case "calendar":
        return (
          <CalendarTracker 
            events={mockCalendarEvents}
          />
        );
      case "dsa":
        return (
          <DSATracker 
            dsaSheet={mockDsaSheet}
            dsaState={dsaState}
            toggleProblemCompleted={toggleProblemCompleted}
            toggleSpacedRepetition={toggleSpacedRepetition}
          />
        );
      case "tests":
        return (
          <MockTestEngine 
            isPremium={sessionMode === "premium"}
            profile={profile}
          />
        );
      case "visualizer":
        return <AlgoVisualizer initialTopic={visualizerTopic} />;
      case "sql5000":
        return <SqlPractice />;
      case "teammates":
        return <TeammateFinder profile={profile} />;
      case "referrals":
        return <ReferralCorner />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }} onClick={handleLogout}>
          <span className="logo-text">
            <span style={{ color: "var(--success)" }}>P</span>LACIFY
          </span>
          <span style={{ display: "flex", alignItems: "center", fontSize: "1.35rem", fontWeight: "900", fontFamily: "var(--font-headings)", gap: "1px", marginLeft: "4px" }}>
            <span style={{ color: "var(--danger)" }}>&lt;</span>
            <span style={{ color: "#ffffff" }}>/</span>
            <span style={{ color: "var(--danger)" }}>&gt;</span>
          </span>
        </div>

        <ul className="nav-links">
          <li 
            className={`nav-item ${activeView === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveView("dashboard")}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </li>
          <li 
            className={`nav-item ${activeView === "learning" ? "active" : ""}`}
            onClick={() => setActiveView("learning")}
          >
            <GraduationCap size={20} />
            <span>Never Give Up</span>
          </li>
          <li 
            className={`nav-item ${activeView === "companies" ? "active" : ""}`}
            onClick={() => setActiveView("companies")}
          >
            <Building2 size={20} />
            <span>Company Intelligence</span>
          </li>
          <li 
            className={`nav-item ${activeView === "calendar" ? "active" : ""}`}
            onClick={() => setActiveView("calendar")}
          >
            <Calendar size={20} />
            <span>Drives Calendar</span>
          </li>
          <li 
            className={`nav-item ${activeView === "dsa" ? "active" : ""}`}
            onClick={() => setActiveView("dsa")}
          >
            <Award size={20} />
            <span>DSA Tracker</span>
          </li>
          <li 
            className={`nav-item ${activeView === "sql5000" ? "active" : ""}`}
            onClick={() => setActiveView("sql5000")}
          >
            <Database size={20} />
            <span>SQL 5000+ Practice</span>
          </li>
          <li 
            className={`nav-item ${activeView === "visualizer" ? "active" : ""}`}
            onClick={() => setActiveView("visualizer")}
          >
            <Eye size={20} />
            <span>Interactive Visuals</span>
          </li>
          <li 
            className={`nav-item ${activeView === "tests" ? "active" : ""}`}
            onClick={() => setActiveView("tests")}
            style={{ position: "relative" }}
          >
            <BookOpenCheck size={20} />
            <span>Weekly Mock Tests</span>
            {sessionMode !== "premium" && <Lock size={12} style={{ position: "absolute", right: "12px", color: "var(--text-muted)" }} />}
          </li>
          <li 
            className={`nav-item ${activeView === "teammates" ? "active" : ""}`}
            onClick={() => setActiveView("teammates")}
          >
            <Users size={20} />
            <span>Teammate Finder</span>
          </li>
          <li 
            className={`nav-item ${activeView === "referrals" ? "active" : ""}`}
            onClick={() => setActiveView("referrals")}
          >
            <Briefcase size={20} />
            <span>Referral Corner</span>
          </li>
          <li 
            className="nav-item"
            onClick={() => setShowAiPlanner(true)}
            style={{ 
              marginTop: "16px",
              borderTop: "1px solid var(--border-color)", 
              paddingTop: "12px", 
              color: "#3b82f6", 
              fontWeight: "bold" 
            }}
          >
            <Bot size={20} style={{ color: "#3b82f6" }} />
            <span>Ask TechGuru</span>
          </li>
        </ul>

        {/* User Footer Profile */}
        <div className="sidebar-footer" style={{ cursor: "pointer" }} onClick={handleLogout} title="Click to log out/reset">
          <div className="user-avatar">
            {sessionMode === "premium" ? profile.name.substring(0, 2).toUpperCase() : "G"}
          </div>
          <div className="user-info">
            <h5>{sessionMode === "premium" ? profile.name : "Guest Session"}</h5>
            <p>{sessionMode === "premium" ? `${profile.dsaLevel} Developer` : "Upgrade Available"}</p>
          </div>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="main-content">
        {renderActiveView()}
      </main>

      {/* Global TechGuru SDE Planner drawer */}
      {showAiPlanner && (
        <div style={{
          position: "fixed",
          top: 0, right: 0, bottom: 0,
          width: "420px",
          backgroundColor: "#000000",
          borderLeft: "1px solid var(--border-color)",
          zIndex: 10000,
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
              <span>🤖 TechGuru SDE Planner</span>
            </h3>
            <button 
              className="btn btn-ghost" 
              style={{ padding: "4px 8px", color: "#ffffff" }}
              onClick={() => setShowAiPlanner(false)}
            >
              ✕ Close
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", backgroundColor: "#0b0f19", padding: "12px", borderRadius: "4px", border: "1px solid var(--border-color)" }}>
            <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "bold" }}>🔑 Google Gemini API Key</label>
            <input 
              type="password" 
              placeholder="Paste your Gemini API Key..." 
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem("gemini_api_key", e.target.value);
              }}
              style={{
                width: "100%",
                padding: "6px 10px",
                fontSize: "0.8rem",
                backgroundColor: "#000000",
                border: "1px solid var(--border-color)",
                borderRadius: "4px",
                color: "#ffffff",
                outline: "none"
              }}
            />
            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
              Get a free API Key from <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>Google AI Studio</a>.
            </span>
            {apiKey && !apiKey.startsWith("AIzaSy") && (
              <span style={{ fontSize: "0.7rem", color: "var(--danger)", fontWeight: "bold", marginTop: "4px" }}>
                ⚠️ Warning: Your API Key does not start with "AIzaSy". Gemini API keys always start with "AIzaSy". Please check your key.
              </span>
            )}
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
              placeholder="Ask TechGuru to customize plan..." 
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
