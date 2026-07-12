import React, { useState } from "react";
import { Users, Search, Target, Award, Github, CheckCircle, RefreshCw } from "lucide-react";

export default function TeammateFinder({ profile }) {
  const [targetCompany, setTargetCompany] = useState("");
  const [matchedPartners, setMatchedPartners] = useState([]);
  const [isMatching, setIsMatching] = useState(false);

  // Mock student database for matching
  const peerDatabase = [
    { name: "Rohit Sharma", target: "Google", language: "C++", level: "Intermediate", cgpa: 8.2, github: "rohit-s", skills: ["Arrays", "Graphs", "DBMS"] },
    { name: "Ananya Iyer", target: "Google", language: "Java", level: "Advanced", cgpa: 9.1, github: "ananya-codes", skills: ["Trees", "OOPs", "System Design"] },
    { name: "Aditya Verma", target: "Amazon", language: "C++", level: "Beginner", cgpa: 7.9, github: "aditya-v", skills: ["Recursion", "OS", "SQL"] },
    { name: "Meera Nair", target: "Microsoft", language: "Python", level: "Advanced", cgpa: 8.8, github: "meera-n", skills: ["Dynamic Programming", "System Design", "Docker"] },
    { name: "Siddharth Sen", target: "Amazon", language: "Java", level: "Intermediate", cgpa: 8.4, github: "sid-sen", skills: ["Linked List", "DBMS", "Computer Networks"] },
    { name: "Nikhil Gupta", target: "TCS", language: "C++", level: "Beginner", cgpa: 7.5, github: "nikhil-g", skills: ["Arrays", "SQL", "OOPs"] },
    { name: "Ishita Roy", target: "Google", language: "C++", level: "Advanced", cgpa: 9.3, github: "ishita-r", skills: ["Dynamic Programming", "Graphs", "System Design"] }
  ];

  const runMatchingAlgorithm = () => {
    setIsMatching(true);
    setMatchedPartners([]);

    setTimeout(() => {
      // Calculate matching score for each peer
      const scored = peerDatabase.map(peer => {
        let score = 50; // base score

        // 1. Target Company Match
        if (targetCompany && peer.target.toLowerCase() === targetCompany.toLowerCase()) {
          score += 25;
        } else if (!targetCompany && peer.target === "Google") {
          score += 15; // default match
        }

        // 2. Programming Language Match
        if (peer.language === profile.language) {
          score += 15;
        }

        // 3. Level alignment
        if (peer.level === profile.dsaLevel) {
          score += 10;
        }

        return { ...peer, matchScore: Math.min(score, 100) };
      });

      // Sort by match score
      const sorted = scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
      setMatchedPartners(sorted);
      setIsMatching(false);
    }, 1200);
  };

  return (
    <div className="teammate-finder-view">
      <div className="page-header">
        <h1>Teammate Matching System 👥</h1>
        <p>Connect with peers targeting the same placement roles based on target companies and skill matching.</p>
      </div>

      <div className="grid-cols-2" style={{ marginBottom: "32px" }}>
        {/* Preference Input */}
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3>🎯 Find Placement Partners</h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Enter your target company below. Our system will analyze languages, core topics, and study levels to recommend peers.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "bold" }}>Target Placement Company</label>
            <input 
              type="text" 
              className="search-input"
              style={{ width: "100%", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
              placeholder="e.g. Google, Amazon, Microsoft..."
              value={targetCompany}
              onChange={(e) => setTargetCompany(e.target.value)}
            />
          </div>

          <button 
            className="btn btn-primary"
            style={{ 
              width: "100%", 
              justifyContent: "center", 
              display: "flex", 
              gap: "8px", 
              marginTop: "10px",
              backgroundColor: "#000000",
              color: "#ffffff",
              border: "1px solid #ffffff",
              fontWeight: "bold"
            }}
            onClick={runMatchingAlgorithm}
            disabled={isMatching}
          >
            {isMatching ? (
              <>
                <RefreshCw className="spinner" size={16} />
                Scanning Peers Database...
              </>
            ) : (
              <>
                <Users size={16} />
                Match Me with Partners
              </>
            )}
          </button>
        </div>

        {/* Algorithm status */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "4px solid var(--success)" }}>
          <h4 style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
            <Target size={18} style={{ color: "var(--success)" }} />
            Matchmaker Algorithm Active
          </h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
            Matches are calculated based on:<br />
            • Target Company alignment (+25% score)<br />
            • Common coding language (+15% score)<br />
            • Level congruence (+10% score)<br />
            Connect directly via GitHub credentials.
          </p>
        </div>
      </div>

      {/* Scored Matches Results */}
      <div>
        <h3>Matching Partner Recommendations</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "16px" }}>
          {matchedPartners.length > 0 ? (
            matchedPartners.map((peer, idx) => (
              <div 
                key={idx} 
                className="card" 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "12px", 
                  border: "1px solid var(--border-color)",
                  position: "relative",
                  animation: "fadeIn 0.3s ease",
                  backgroundColor: "#000000",
                  color: "#ffffff"
                }}
              >
                {/* Match Score Tag */}
                <div style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#10b981",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: "bold"
                }}>
                  {peer.matchScore}% Match
                </div>

                <div>
                  <h4 style={{ margin: 0, color: "#ffffff" }}>{peer.name}</h4>
                  <span style={{ fontSize: "0.75rem", color: "#cccccc" }}>Targets: <strong>{peer.target}</strong></span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.8rem", padding: "8px", backgroundColor: "#000000", borderRadius: "4px" }}>
                  <span><strong>Language:</strong> {peer.language}</span>
                  <span><strong>Level:</strong> {peer.level}</span>
                  <span><strong>CGPA:</strong> {peer.cgpa}</span>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>Skills focus:</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {peer.skills.map(s => (
                      <span key={s} className="badge badge-primary" style={{ fontSize: "0.65rem", padding: "2px 6px" }}>{s}</span>
                    ))}
                  </div>
                </div>

                <a 
                  href={`https://github.com/${peer.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                  style={{ width: "100%", justifyContent: "center", display: "flex", gap: "8px", marginTop: "4px" }}
                >
                  <Github size={14} /> Connect on GitHub
                </a>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
              <span>Click "Match Me with Partners" above to query placement candidates.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
