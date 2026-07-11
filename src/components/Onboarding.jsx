import React, { useState, useEffect } from "react";
import { GraduationCap, Github, Award, Terminal, Code, ArrowLeft } from "lucide-react";

export default function Onboarding({ onComplete, onBack }) {
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
    if (!github.trim()) {
      setErrorMsg("Please enter your GitHub username.");
      return;
    }
    if (!leetcode.trim()) {
      setErrorMsg("Please enter your LeetCode username.");
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
      backgroundColor: "#000000",
      color: "#ffffff",
      padding: "20px"
    }}>
      <div className="card" style={{
        maxWidth: "600px",
        width: "100%",
        backgroundColor: "#000000",
        border: "none",
        padding: "40px",
        borderRadius: "8px"
      }}>
        {/* Back Button */}
        {onBack && (
          <button 
            type="button"
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: "#cbd5e1",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.9rem",
              padding: "0 0 20px 0",
              fontWeight: 500
            }}
            onMouseEnter={(e) => e.target.style.color = "#ffffff"}
            onMouseLeave={(e) => e.target.style.color = "#cbd5e1"}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        )}

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          {/* Logo Representation P</> */}
          <div style={{
            fontSize: "2.8rem",
            fontWeight: "900",
            fontFamily: "var(--font-headings)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2px",
            marginBottom: "16px"
          }}>
            <span style={{ color: "var(--success)" }}>P</span>
            <span style={{ display: "flex", alignItems: "center", gap: "1px" }}>
              <span style={{ color: "var(--danger)" }}>&lt;</span>
              <span style={{ color: "#ffffff" }}>/</span>
              <span style={{ color: "var(--danger)" }}>&gt;</span>
            </span>
          </div>
          <h1 style={{ fontSize: "2rem", marginBottom: "8px", color: "#ffffff" }}>Welcome to PLACIFY</h1>
          <p style={{ color: "#cbd5e1" }}>Set up your profile, load your coding accounts, and start your tailored routine.</p>
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
            <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "6px", color: "#ffffff" }}>Full Name *</label>
            <input 
              type="text" 
              className="search-input" 
              placeholder="e.g. Nishtha Yadav"
              style={{ width: "100%", backgroundColor: "#000000", border: "1px solid #ffffff", color: "#ffffff" }}
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          {/* Social Profiles Grid */}
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "8px", color: "#ffffff" }}>
              Coding Profiles (GitHub & LeetCode * required, others optional)
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #ffffff", borderRadius: "var(--radius-sm)", padding: "0 10px", backgroundColor: "#000000" }}>
                <Github size={16} style={{ color: "#ffffff", marginRight: "8px" }} />
                <input 
                  type="text" 
                  placeholder="GitHub Username *" 
                  style={{ border: "none", outline: "none", padding: "10px 0", width: "100%", fontSize: "0.85rem", backgroundColor: "transparent", color: "#ffffff" }}
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", border: "1px solid #ffffff", borderRadius: "var(--radius-sm)", padding: "0 10px", backgroundColor: "#000000" }}>
                <Code size={16} style={{ color: "#ffffff", marginRight: "8px" }} />
                <input 
                  type="text" 
                  placeholder="LeetCode Username *" 
                  style={{ border: "none", outline: "none", padding: "10px 0", width: "100%", fontSize: "0.85rem", backgroundColor: "transparent", color: "#ffffff" }}
                  value={leetcode}
                  onChange={(e) => setLeetcode(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", border: "1px solid #ffffff", borderRadius: "var(--radius-sm)", padding: "0 10px", backgroundColor: "#000000" }}>
                <Award size={16} style={{ color: "#ffffff", marginRight: "8px" }} />
                <input 
                  type="text" 
                  placeholder="HackerRank Username" 
                  style={{ border: "none", outline: "none", padding: "10px 0", width: "100%", fontSize: "0.85rem", backgroundColor: "transparent", color: "#ffffff" }}
                  value={hackerrank}
                  onChange={(e) => setHackerrank(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", border: "1px solid #ffffff", borderRadius: "var(--radius-sm)", padding: "0 10px", backgroundColor: "#000000" }}>
                <Terminal size={16} style={{ color: "#ffffff", marginRight: "8px" }} />
                <input 
                  type="text" 
                  placeholder="CodeChef Username" 
                  style={{ border: "none", outline: "none", padding: "10px 0", width: "100%", fontSize: "0.85rem", backgroundColor: "transparent", color: "#ffffff" }}
                  value={codechef}
                  onChange={(e) => setCodechef(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Level Selector */}
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "6px", color: "#ffffff" }}>Your DSA Level *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {["Beginner", "Basic", "Intermediate", "Advanced"].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  style={{ 
                    padding: "8px 0", 
                    width: "100%", 
                    fontSize: "0.85rem",
                    backgroundColor: dsaLevel === lvl ? "#ffffff" : "#000000",
                    color: dsaLevel === lvl ? "#000000" : "#ffffff",
                    border: "1px solid #ffffff",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: dsaLevel === lvl ? "bold" : "normal"
                  }}
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
              <label style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>Target Days to Complete DSA *</label>
              <span style={{ fontSize: "0.75rem", color: "var(--danger)", fontWeight: 600 }}>{getMinDaysHint()}</span>
            </div>
            <input 
              type="number" 
              className="search-input" 
              style={{ width: "100%", backgroundColor: "#000000", border: "1px solid #ffffff", color: "#ffffff" }}
              value={timelineDays}
              onChange={(e) => setTimelineDays(e.target.value)}
              min={dsaLevel === "Advanced" ? 45 : dsaLevel === "Intermediate" ? 60 : 90}
              required 
            />
          </div>

          {/* Language Selector */}
          <div>
            <label style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: "6px", color: "#ffffff" }}>Preferred Programming Language *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
              {["C++", "Java", "Python", "JavaScript"].map(lang => (
                <button
                  key={lang}
                  type="button"
                  style={{ 
                    padding: "8px 0", 
                    width: "100%", 
                    fontSize: "0.85rem",
                    backgroundColor: language === lang ? "#ffffff" : "#000000",
                    color: language === lang ? "#000000" : "#ffffff",
                    border: "1px solid #ffffff",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: language === lang ? "bold" : "normal"
                  }}
                  onClick={() => setLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit" 
            style={{ 
              width: "100%", 
              padding: "12px", 
              fontSize: "1rem", 
              marginTop: "12px",
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "1px solid #ffffff",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Initialize Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
