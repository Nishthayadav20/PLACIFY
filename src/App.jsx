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
import { 
  LayoutDashboard, GraduationCap, Building2, Calendar, Award, Lock, BookOpenCheck, Eye, Code 
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
    const saved = localStorage.getItem("company_list");
    return saved ? JSON.parse(saved) : mockCompanies;
  });

  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("playlist_list");
    return saved ? JSON.parse(saved) : mockPlaylists;
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
    return <Onboarding onComplete={handleOnboardingComplete} />;
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
            onNavigate={setActiveView}
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
        return <AlgoVisualizer />;
      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container" style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }} onClick={handleLogout}>
          <Code size={22} style={{ color: "var(--success)" }} />
          <span className="logo-text">
            <span style={{ color: "var(--success)" }}>P</span>LACIFY
          </span>
        </div>

        <ul className="nav-links">
          {sessionMode === "premium" && (
            <li 
              className={`nav-item ${activeView === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveView("dashboard")}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </li>
          )}
          <li 
            className={`nav-item ${activeView === "learning" ? "active" : ""}`}
            onClick={() => setActiveView("learning")}
          >
            <GraduationCap size={20} />
            <span>Learning Hub</span>
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
    </div>
  );
}
