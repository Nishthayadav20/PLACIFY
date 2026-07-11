import React, { useState } from "react";
import { Search, MapPin, DollarSign, Award, GraduationCap, X, Send, PlusCircle } from "lucide-react";

export default function CompanyDatabase({ companies, addExperience }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  // New Experience Form State
  const [showForm, setShowForm] = useState(false);
  const [newExpUser, setNewExpUser] = useState("");
  const [newExpTitle, setNewExpTitle] = useState("");
  const [newExpTags, setNewExpTags] = useState("");
  const [newExpContent, setNewExpContent] = useState("");
  const [newExpDifficulty, setNewExpDifficulty] = useState("Medium");

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          company.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || 
                        (typeFilter === "On-Campus" && company.visitingCollege === "On-Campus") ||
                        (typeFilter === "Off-Campus / Pool" && company.visitingCollege !== "On-Campus");
    return matchesSearch && matchesType;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newExpUser || !newExpTitle || !newExpContent) {
      alert("Please fill in all required fields.");
      return;
    }
    
    const newExperience = {
      id: `exp-${Date.now()}`,
      user: newExpUser,
      title: newExpTitle,
      tags: newExpTags.split(",").map(tag => tag.trim()).filter(t => t.length > 0),
      content: newExpContent,
      difficulty: newExpDifficulty,
      date: "Just Now"
    };

    addExperience(selectedCompany.id, newExperience);

    // Reset Form
    setNewExpUser("");
    setNewExpTitle("");
    setNewExpTags("");
    setNewExpContent("");
    setNewExpDifficulty("Medium");
    setShowForm(false);
  };

  return (
    <div className="company-database-view">
      <div className="page-header">
        <h1>Company Intelligence Database 🏢</h1>
        <p>Eligibility criteria, packages, and crowdsourced interview experiences.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="search-filter-bar">
        <input 
          type="text" 
          className="search-input"
          placeholder="Search by company name or job role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className="filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Placement Types</option>
          <option value="On-Campus">On-Campus Only</option>
          <option value="Off-Campus / Pool">Off-Campus / Pool Only</option>
        </select>
      </div>

      {/* Company Grid */}
      <div className="grid-cols-2">
        {filteredCompanies.map(company => (
          <div key={company.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: company.color,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "1.5rem"
                }}>
                  {company.logo}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{company.name}</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{company.role}</span>
                </div>
              </div>
              <span className={`badge ${company.visitingCollege === "On-Campus" ? "badge-success" : "badge-primary"}`}>
                {company.visitingCollege}
              </span>
            </div>

            {/* Key info table/grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "12px", backgroundColor: "var(--bg-primary)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <DollarSign size={16} style={{ color: "var(--success)" }} />
                <span><strong>CTC:</strong> {company.ctc}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <GraduationCap size={16} style={{ color: "var(--primary)" }} />
                <span><strong>CGPA Cutoff:</strong> {company.cgpaCutoff === 0 ? "No Cutoff" : `${company.cgpaCutoff}+`}</span>
              </div>
            </div>

            {/* Allowed Branches */}
            <div>
              <p style={{ fontSize: "0.85rem", marginBottom: "4px" }}><strong>Eligible Branches:</strong></p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {company.branchesAllowed.map(branch => (
                  <span key={branch} style={{ fontSize: "0.75rem", padding: "4px 8px", backgroundColor: "#000000", border: "1px solid var(--border-color)", borderRadius: "4px", color: "#ffffff" }}>
                    {branch}
                  </span>
                ))}
              </div>
            </div>

            <button 
              className="btn btn-secondary" 
              style={{ marginTop: "auto", width: "100%", justifyContent: "center" }}
              onClick={() => setSelectedCompany(company)}
            >
              View Interview Experiences ({company.experiences.length})
            </button>
          </div>
        ))}
      </div>

      {/* Details Side-Drawer */}
      {selectedCompany && (
        <div className="drawer-overlay" onClick={() => { setSelectedCompany(null); setShowForm(false); }}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: selectedCompany.color,
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1.1rem"
                }}>
                  {selectedCompany.logo}
                </div>
                <h3>{selectedCompany.name} Details</h3>
              </div>
              <button className="btn btn-ghost" style={{ padding: "6px" }} onClick={() => { setSelectedCompany(null); setShowForm(false); }}>
                <X size={20} />
              </button>
            </div>

            <div className="drawer-body">
              {/* Hiring Rounds */}
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ marginBottom: "12px" }}>Hiring Rounds</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedCompany.hiringRounds.map((round, index) => (
                    <div key={index} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <div style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                        fontSize: "0.8rem"
                      }}>
                        {index + 1}
                      </div>
                      <span style={{ fontSize: "0.95rem" }}>{round}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crowdsourced Experiences */}
              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h4>Interview Experiences ({selectedCompany.experiences.length})</h4>
                  <button 
                    className="btn btn-primary" 
                    style={{ padding: "6px 12px", fontSize: "0.85rem" }}
                    onClick={() => setShowForm(!showForm)}
                  >
                    <PlusCircle size={14} /> Add Yours
                  </button>
                </div>

                {/* Form to add experience */}
                {showForm && (
                  <form onSubmit={handleFormSubmit} style={{
                    backgroundColor: "var(--bg-primary)",
                    padding: "16px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div>
                        <label style={{ fontSize: "0.8rem", fontWeight: 600 }}>Your Name *</label>
                        <input 
                          type="text" 
                          className="search-input" 
                          style={{ padding: "8px", marginTop: "4px" }}
                          value={newExpUser} 
                          onChange={(e) => setNewExpUser(e.target.value)} 
                          required 
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.8rem", fontWeight: 600 }}>Difficulty *</label>
                        <select 
                          className="filter-select" 
                          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                          value={newExpDifficulty} 
                          onChange={(e) => setNewExpDifficulty(e.target.value)}
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600 }}>Experience Title *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. SDE-1 On Campus Experience" 
                        className="search-input" 
                        style={{ padding: "8px", marginTop: "4px" }}
                        value={newExpTitle} 
                        onChange={(e) => setNewExpTitle(e.target.value)} 
                        required 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600 }}>DSA Topics / Tags (comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Graphs, DP, Trees" 
                        className="search-input" 
                        style={{ padding: "8px", marginTop: "4px" }}
                        value={newExpTags} 
                        onChange={(e) => setNewExpTags(e.target.value)} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600 }}>Your Experience *</label>
                      <textarea 
                        className="search-input" 
                        placeholder="Describe the rounds, coding questions asked, and your suggestions..." 
                        style={{ padding: "8px", marginTop: "4px", minHeight: "100px", resize: "vertical" }}
                        value={newExpContent} 
                        onChange={(e) => setNewExpContent(e.target.value)} 
                        required 
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ justifyContent: "center" }}>
                      <Send size={14} /> Submit Experience
                    </button>
                  </form>
                )}

                {/* Experiences List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {selectedCompany.experiences.map(exp => (
                    <div key={exp.id} className="card" style={{ padding: "16px", backgroundColor: "#ffffff", border: "1px solid var(--border-color)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <div>
                          <h5 style={{ margin: 0, fontSize: "0.95rem" }}>{exp.title}</h5>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Submitted by {exp.user} • {exp.date}</span>
                        </div>
                        <span className={`badge ${
                          exp.difficulty === "Easy" ? "badge-success" : 
                          exp.difficulty === "Medium" ? "badge-warning" : "badge-danger"
                        }`} style={{ fontSize: "0.6rem" }}>
                          {exp.difficulty}
                        </span>
                      </div>

                      <p style={{ fontSize: "0.875rem", marginBottom: "12px", whiteSpace: "pre-line" }}>
                        {exp.content}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {exp.tags.map(tag => (
                          <span key={tag} style={{ fontSize: "0.7rem", padding: "2px 8px", backgroundColor: "var(--primary-light)", color: "var(--primary)", borderRadius: "4px", fontWeight: 600 }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
