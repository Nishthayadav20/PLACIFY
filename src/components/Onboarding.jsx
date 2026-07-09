import React, { useState, useEffect } from "react";
import { GraduationCap, Github, Award, Terminal, Code } from "lucide-react";

export default function Onboarding({ onComplete }) {
  const [name, setName] = useState("");
  const [github, setGithub] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [hackerrank, setHackerrank] = useState("");
  const [codechef, setCodechef] = useState("");
  const [dsaLevel, setDsaLevel] = useState("Beginner");
  const [timelineDays, setTimelineDays] = useState(90);
  const [language, setLanguage] = useState("C++");
  const [errorMsg, setErrorMsg] = useState("");

  // Handle automatic duration adjustments based on level
  useEffect(() => {
    if (dsaLevel === "Beginner" || dsaLevel === "Basic") {
      if (timelineDays < 90) setTimelineDays(90);
    } else if (dsaLevel === "Intermediate") {
      if (timelineDays < 60) setTimelineDays(60);
    } else if (dsaLevel === "Advanced") {
      if (timelineDays < 45) setTimelineDays(45);
    }
  }, [dsaLevel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    // Explicit validation rules check
    if ((dsaLevel === "Beginner" || dsaLevel === "Basic") && timelineDays < 90) {
      setErrorMsg("Beginner/Basic track requires at least 90 days of practice.");
      return;
    }
    if (dsaLevel === "Intermediate" && timelineDays < 60) {
      setErrorMsg("Intermediate track requires at least 60 days of practice.");
      return;
    }
    if (dsaLevel === "Advanced" && timelineDays < 45) {
      setErrorMsg("Advanced / Refresh track requires at least 45 days of practice.");
      return;
    }

    onComplete({
      name,
      github: github.trim() || "github.com/username",
      leetcode: leetcode.trim() || "leetcode.com/username",
      hackerrank: hackerrank.trim() || "hackerrank.com/username",
      codechef: codechef.trim() || "codechef.com/username",
      dsaLevel,
      timelineDays: Number(timelineDays),
      language,
      currentDay: 1,
      isLoggedIn: true
    });
  };

  const getMinDaysHint = () => {
    if (dsaLevel === "Beginner" || dsaLevel === "Basic") return "Min 90 days required";
    if (dsaLevel === "Intermediate") return "Min 60 days required";
    return "Min 45 days required";
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--bg-primary)",
      padding: "20px"
    }}>
      <div className="card" style={{
        maxWidth: "600px",
        width: "100%",
        boxShadow: "var(--shadow-xl)",
        border: "1px solid var(--border-color)",
        padding: "40px"
      }}>
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            backgroundColor: "var(--primary-light)",
            color: "var(--primary)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px"
          }}>
            <GraduationCap size={32} />
          </div>
          <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Welcome to PlacementOS</h1>
          <p style={{ color: "var(--text-secondary)" }}>Set up your profile, load your coding accounts, and start your tailored routine.</p>
        </div>

        {errorMsg && (
          <div className="badge badge-danger" style={{ 
            width: "100%", 
            justifyContent: "center", 
            padding: "10px", 
            marginBottom: "20px",
            borderRadius: "var(--radius-sm)",
            textTransform: "none"
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Name */}
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>Full Name *</label>
            <input 
              type="text" 
              className="search-input" 
              placeholder="e.g. Nishtha Yadav"
              style={{ width: "100%" }}
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          {/* Social Profiles Grid */}
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "8px" }}>Coding profiles (Optional)</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", padding: "0 10px", backgroundColor: "#1e293b" }}>
                <Github size={16} style={{ color: "var(--text-muted)", marginRight: "8px" }} />
                <input 
                  type="text" 
                  placeholder="GitHub Username" 
                  style={{ border: "none", outline: "none", padding: "10px 0", width: "100%", fontSize: "0.85rem", backgroundColor: "transparent", color: "#f8fafc" }}
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", padding: "0 10px", backgroundColor: "#1e293b" }}>
                <Code size={16} style={{ color: "var(--text-muted)", marginRight: "8px" }} />
                <input 
                  type="text" 
                  placeholder="LeetCode Username" 
                  style={{ border: "none", outline: "none", padding: "10px 0", width: "100%", fontSize: "0.85rem", backgroundColor: "transparent", color: "#f8fafc" }}
                  value={leetcode}
                  onChange={(e) => setLeetcode(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", padding: "0 10px", backgroundColor: "#1e293b" }}>
                <Award size={16} style={{ color: "var(--text-muted)", marginRight: "8px" }} />
                <input 
                  type="text" 
                  placeholder="HackerRank Username" 
                  style={{ border: "none", outline: "none", padding: "10px 0", width: "100%", fontSize: "0.85rem", backgroundColor: "transparent", color: "#f8fafc" }}
                  value={hackerrank}
                  onChange={(e) => setHackerrank(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", padding: "0 10px", backgroundColor: "#1e293b" }}>
                <Terminal size={16} style={{ color: "var(--text-muted)", marginRight: "8px" }} />
                <input 
                  type="text" 
                  placeholder="CodeChef Username" 
                  style={{ border: "none", outline: "none", padding: "10px 0", width: "100%", fontSize: "0.85rem", backgroundColor: "transparent", color: "#f8fafc" }}
                  value={codechef}
                  onChange={(e) => setCodechef(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Level Selector */}
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>Your DSA Level *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {["Beginner", "Basic", "Intermediate", "Advanced"].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  className={`btn ${dsaLevel === lvl ? "btn-primary" : "btn-secondary"}`}
                  style={{ padding: "8px 0", width: "100%", fontSize: "0.85rem" }}
                  onClick={() => setDsaLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Days */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Target Days to Complete DSA *</label>
              <span style={{ fontSize: "0.75rem", color: "var(--danger)", fontWeight: 600 }}>{getMinDaysHint()}</span>
            </div>
            <input 
              type="number" 
              className="search-input" 
              style={{ width: "100%" }}
              value={timelineDays}
              onChange={(e) => setTimelineDays(e.target.value)}
              min={dsaLevel === "Advanced" ? 45 : dsaLevel === "Intermediate" ? 60 : 90}
              required 
            />
          </div>

          {/* Language Selector */}
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "6px" }}>Preferred Programming Language *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {["C++", "Java", "Python", "JavaScript"].map(lang => (
                <button
                  key={lang}
                  type="button"
                  className={`btn ${language === lang ? "btn-primary" : "btn-secondary"}`}
                  style={{ padding: "8px 0", width: "100%", fontSize: "0.85rem" }}
                  onClick={() => setLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px", fontSize: "1rem", marginTop: "12px" }}>
            Initialize Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
