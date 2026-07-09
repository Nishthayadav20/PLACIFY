import React, { useState } from "react";
import { Calendar, Clock, ExternalLink, Users, PlusCircle, UserPlus, Tag, BookOpen } from "lucide-react";

export default function CalendarTracker({ events }) {
  const [selectedTab, setSelectedTab] = useState("All");
  
  // Team Finder State
  const [teamPosts, setTeamPosts] = useState([
    {
      id: "tp-1",
      creator: "Karan Johar",
      hackathon: "Smart India Hackathon",
      skills: ["React", "Node.js", "AI/ML Enthusiast"],
      desc: "Looking for a backend developer and someone who has experience in hardware integration (IoT). We want to solve the traffic optimization problem statement.",
      contact: "karan.j@gmail.com"
    },
    {
      id: "tp-2",
      creator: "Priya Nair",
      hackathon: "Devfolio Buildout",
      skills: ["Solidity", "Web3", "UI/UX Designer"],
      desc: "Already have 2 members. Need a Solidity smart contract auditor/developer to join our decentralized finance project. Let's build something epic!",
      contact: "priya.nair@outlook.com"
    }
  ]);

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [newTeamCreator, setNewTeamCreator] = useState("");
  const [newTeamHackathon, setNewTeamHackathon] = useState("");
  const [newTeamSkills, setNewTeamSkills] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [newTeamContact, setNewTeamContact] = useState("");

  const filteredEvents = events.filter(event => {
    if (selectedTab === "All") return true;
    return event.type === selectedTab;
  });

  const handlePostTeam = (e) => {
    e.preventDefault();
    if (!newTeamCreator || !newTeamHackathon || !newTeamDesc || !newTeamContact) {
      alert("Please fill in all required fields.");
      return;
    }

    const newPost = {
      id: `tp-${Date.now()}`,
      creator: newTeamCreator,
      hackathon: newTeamHackathon,
      skills: newTeamSkills.split(",").map(s => s.trim()).filter(s => s.length > 0),
      desc: newTeamDesc,
      contact: newTeamContact
    };

    setTeamPosts([newPost, ...teamPosts]);

    // Reset Form
    setNewTeamCreator("");
    setNewTeamHackathon("");
    setNewTeamSkills("");
    setNewTeamDesc("");
    setNewTeamContact("");
    setShowTeamForm(false);
  };

  return (
    <div className="calendar-tracker-view">
      <div className="page-header">
        <h1>Exam & Hackathon Drive Calendar 📅</h1>
        <p>Stay updated with company drives, competitive exams, national hackathons, and find teammates.</p>
      </div>

      {/* Tabs */}
      <div className="tab-container">
        <button 
          className={`tab-button ${selectedTab === "All" ? "active" : ""}`}
          onClick={() => setSelectedTab("All")}
        >
          All Events
        </button>
        <button 
          className={`tab-button ${selectedTab === "Exam" ? "active" : ""}`}
          onClick={() => setSelectedTab("Exam")}
        >
          Competitive Exams
        </button>
        <button 
          className={`tab-button ${selectedTab === "Hackathon" ? "active" : ""}`}
          onClick={() => setSelectedTab("Hackathon")}
        >
          Hackathons
        </button>
      </div>

      {/* Events List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
        {filteredEvents.map(event => (
          <div key={event.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "stretch", gap: "20px" }}>
            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className={`badge ${event.type === "Exam" ? "badge-danger" : "badge-success"}`}>
                  {event.type}
                </span>
                <h3 style={{ margin: 0, fontSize: "1.25rem" }}>{event.title}</h3>
              </div>

              {event.description && <p style={{ fontSize: "0.95rem" }}>{event.description}</p>}
              
              {event.syllabus && (
                <div style={{ fontSize: "0.85rem", backgroundColor: "var(--bg-primary)", padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", fontWeight: 600 }}>
                    <BookOpen size={14} style={{ color: "var(--primary)" }} />
                    <span>Syllabus & Pattern Breakdown</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.85rem" }}>{event.syllabus}</p>
                </div>
              )}

              {event.techStack && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Focus Areas:</span>
                  {event.techStack.split(",").map(tech => (
                    <span key={tech} className="badge badge-primary" style={{ fontSize: "0.65rem" }}>{tech.trim()}</span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ minWidth: "180px", borderLeft: "1px solid var(--border-color)", paddingLeft: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--danger)", fontWeight: 700, fontSize: "1.1rem" }}>
                  <Clock size={16} />
                  <span>{event.daysLeft} Days Left</span>
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Deadline: {event.date}</span>
              </div>

              <a 
                href={event.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Apply Now <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Team Finder Dashboard section */}
      <div className="card" style={{ borderTop: "4px solid var(--primary)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h3>Team Formation Board 👥</h3>
            <p style={{ fontSize: "0.875rem" }}>Post looking-for-teammates requests or find teams for national hackathons.</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowTeamForm(!showTeamForm)}
          >
            <PlusCircle size={16} /> Post Teammate Request
          </button>
        </div>

        {/* Create Post Form */}
        {showTeamForm && (
          <form onSubmit={handlePostTeam} style={{
            backgroundColor: "var(--bg-primary)",
            padding: "20px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-color)",
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Your Name *</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: "100%", marginTop: "4px", padding: "8px" }}
                  value={newTeamCreator} 
                  onChange={(e) => setNewTeamCreator(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Target Hackathon *</label>
                <input 
                  type="text" 
                  placeholder="e.g. SIH 2026" 
                  className="search-input" 
                  style={{ width: "100%", marginTop: "4px", padding: "8px" }}
                  value={newTeamHackathon} 
                  onChange={(e) => setNewTeamHackathon(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Skills Required (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g. React, Python, UI" 
                  className="search-input" 
                  style={{ width: "100%", marginTop: "4px", padding: "8px" }}
                  value={newTeamSkills} 
                  onChange={(e) => setNewTeamSkills(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Project Concept / Teammate Requirements *</label>
              <textarea 
                className="search-input" 
                placeholder="Briefly describe what you're planning to build and who you need..." 
                style={{ width: "100%", marginTop: "4px", padding: "8px", minHeight: "80px", resize: "vertical" }}
                value={newTeamDesc} 
                onChange={(e) => setNewTeamDesc(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Contact Email or Phone *</label>
              <input 
                type="text" 
                placeholder="e.g. contact@domain.com" 
                className="search-input" 
                style={{ width: "100%", marginTop: "4px", padding: "8px" }}
                value={newTeamContact} 
                onChange={(e) => setNewTeamContact(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-end" }}>
              <UserPlus size={16} /> Publish Post
            </button>
          </form>
        )}

        {/* Team Posts Grid */}
        <div className="grid-cols-2">
          {teamPosts.map(post => (
            <div key={post.id} className="card" style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-color)", padding: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div>
                  <h4 style={{ margin: 0 }}>{post.hackathon}</h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Posted by {post.creator}</span>
                </div>
                <Users size={18} style={{ color: "var(--text-muted)" }} />
              </div>
              
              <p style={{ fontSize: "0.875rem", marginBottom: "12px", minHeight: "60px" }}>{post.desc}</p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                {post.skills.map(skill => (
                  <span key={skill} style={{ fontSize: "0.7rem", padding: "2px 8px", backgroundColor: "var(--success-light)", color: "var(--success)", borderRadius: "4px", fontWeight: 600 }}>
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "12px", fontSize: "0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Contact: <strong>{post.contact}</strong></span>
                <a href={`mailto:${post.contact}`} className="btn btn-ghost" style={{ padding: "4px 8px", fontSize: "0.75rem", border: "1px solid var(--border-color)", borderRadius: "4px" }}>
                  Connect
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
