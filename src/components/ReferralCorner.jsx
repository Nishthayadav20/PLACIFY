import React, { useState } from "react";
import { Users, Search, ExternalLink, Copy, CheckCircle, Award } from "lucide-react";

export default function ReferralCorner() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanyType, setSelectedCompanyType] = useState("All");
  const [copiedId, setCopiedId] = useState(null);

  const hrDirectory = [
    {
      id: "hr-1",
      name: "Sarah Jenkins",
      title: "Senior Technical Recruiter",
      company: "Google",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/sarah-jenkins-recruits",
      color: "#4285F4",
      template: "Hi Sarah, I hope you're doing well. I recently graduated with a B.Tech in CS and have solved over 450+ DSA problems. I saw an opening for the Software Engineer (L3) role at Google (Req ID: SWE-2026) and would love to be considered. Could we connect to discuss a potential referral? Here is my resume: [Resume Link]. Thank you!"
    },
    {
      id: "hr-2",
      name: "Arjun Mehta",
      title: "Talent Acquisition Specialist",
      company: "Amazon",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/arjun-mehta-talent",
      color: "#FF9900",
      template: "Dear Arjun, I am writing to express my interest in the SDE-1 role at Amazon. I have strong foundations in C++, STL, and System Design. I would be highly grateful for a referral. Please find my portfolio and GitHub here: [Portfolio Link]. Let me know if we can connect. Best regards."
    },
    {
      id: "hr-3",
      name: "Emily Watson",
      title: "University Relations Manager",
      company: "Microsoft",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/emily-watson-msft",
      color: "#00A4EF",
      template: "Hello Emily, I hope this message finds you well. I am a CS student passionate about building scalable cloud systems. I am seeking a referral for Microsoft's Associate Software Engineer role. I have attached my credentials and profile here: [Profile Link]. Thank you for your time!"
    },
    {
      id: "hr-4",
      name: "Priya Sharma",
      title: "Lead SWE Recruiter",
      company: "Adobe",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/priya-sharma-adobe",
      color: "#FF0000",
      template: "Hi Priya, I hope you are having a great week. I am an active competitive coder (CodeChef 4-star) and love building graphic rendering tools. I am highly interested in the Member Technical Staff (MTS) position at Adobe. Could you please review my profile for a referral? [Resume Link]. Thanks!"
    },
    {
      id: "hr-5",
      name: "Karan Johar",
      title: "HR Manager - Tech Hiring",
      company: "Paytm",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/karan-johar-paytm",
      color: "#002E7E",
      template: "Hello Karan, I hope you are well. I have solved 150+ SQL queries and built full-stack fintech apps in React & Node. I am looking for a referral for the Associate Software Engineer role at Paytm. Here is my application link: [Resume Link]. Thank you!"
    },
    {
      id: "hr-6",
      name: "Sneha Reddy",
      title: "Lead Talent Acquisition",
      company: "Myntra",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/sneha-reddy-myntra",
      color: "#FF3F6C",
      template: "Hi Sneha, I hope you're doing well. I'm a frontend specialist with 3+ projects in React and Next.js. I would love to contribute to Myntra's core marketplace team as an Associate Software Engineer. Could you refer me for the role? Here are my project links: [Portfolio Link]. Thank you!"
    },
    {
      id: "hr-7",
      name: "Rajesh Pillai",
      title: "Talent Acquisition Head",
      company: "TCS",
      type: "Service-Based",
      linkedin: "https://www.linkedin.com/in/rajesh-pillai-tcs",
      color: "#1E3A8A",
      template: "Respected Rajesh, I have cleared the TCS NQT national assessment and am seeking a Specialist Programmer / Digital role referral. Here are my credentials: [Credentials Link]. I would appreciate a brief connection. Thank you."
    },
    {
      id: "hr-8",
      name: "Deepika Rao",
      title: "Graduate Recruitment Specialist",
      company: "Infosys",
      type: "Service-Based",
      linkedin: "https://www.linkedin.com/in/deepika-rao-infosys",
      color: "#007CC3",
      template: "Hello Deepika, I am seeking a referral for the Specialist Programmer position at Infosys. I have cleared the HackWithInfy rounds and have built robust Web & DBMS projects. Please find my portfolio here: [Portfolio Link]. Thank you!"
    },
    {
      id: "hr-9",
      name: "Aditya Das",
      title: "Lead Campus Recruiter",
      company: "Accenture",
      type: "Service-Based",
      linkedin: "https://www.linkedin.com/in/aditya-das-accenture",
      color: "#A100FF",
      template: "Hi Aditya, I am a B.Tech CS graduate seeking a referral for the Associate Software Engineer role at Accenture. I have strong foundations in DBMS, OS, and OOPs. Here is my resume: [Resume Link]. Thank you!"
    },
    {
      id: "hr-10",
      name: "Nisha Jain",
      title: "Senior Tech Recruiter",
      company: "Razorpay",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/nisha-jain-razorpay",
      color: "#0A2540",
      template: "Hello Nisha, I am seeking a referral for the SDE-1 role at Razorpay. I have built secure payment gateways and solved 400+ problems on LeetCode. Would love to share my portfolio: [Portfolio Link]. Thank you!"
    },
    {
      id: "hr-11",
      name: "Deepak Singhal",
      title: "HR Head",
      company: "Rapipay",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/deepak-singhal-rapipay",
      color: "#FF4500",
      template: "Dear Deepak, I am a software engineer seeking an Associate Software Engineer role referral at Rapipay. I have experience in Java, Spring Boot, and database management. Here is my resume: [Resume Link]. Thanks!"
    },
    {
      id: "hr-12",
      name: "Shruti Malhotra",
      title: "Lead Talent Manager",
      company: "Juspay",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/shruti-malhotra-juspay",
      color: "#4B0082",
      template: "Hi Shruti, I hope you are doing well. I am a passionate programmer seeking a referral for the Member Technical Staff role at Juspay. I love solving complex Graph algorithms. My profile: [Profile Link]. Thank you!"
    },
    {
      id: "hr-13",
      name: "Rahul Mehra",
      title: "Head of Recruitment",
      company: "JTG (Josh Technology Group)",
      type: "Product-Based",
      linkedin: "https://www.linkedin.com/in/rahul-mehra-jtg",
      color: "#2C3E50",
      template: "Hello Rahul, I am highly interested in the Software Developer role at Josh Technology Group. I have solid foundations in Data Structures, OS, and Networks. Please review my profile for a referral: [Resume Link]. Thanks!"
    }
  ];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDirectory = hrDirectory.filter(hr => {
    const matchesSearch = hr.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hr.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hr.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedCompanyType === "All" || hr.type === selectedCompanyType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="referral-corner-view">
      <div className="page-header">
        <h1>Referral Corner & HR Directory 💼</h1>
        <p>Connect directly with talent acquisition managers from top SDE recruiters. Copy optimized messages to boost your referral response rates.</p>
      </div>

      {/* Controls Card */}
      <div className="card" style={{ marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: "240px", display: "flex", gap: "10px", alignItems: "center", backgroundColor: "#000000", border: "1px solid var(--border-color)", borderRadius: "4px", padding: "4px 12px" }}>
          <Search size={16} style={{ color: "var(--text-muted)" }} />
          <input 
            type="text" 
            placeholder="Search by recruiter name, title, or company..." 
            className="search-input"
            style={{ width: "100%", border: "none", outline: "none", backgroundColor: "transparent", color: "#ffffff", padding: "8px 0" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select 
          className="filter-select"
          style={{ padding: "10px", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff", borderRadius: "4px" }}
          value={selectedCompanyType}
          onChange={(e) => setSelectedCompanyType(e.target.value)}
        >
          <option value="All">All Company Types</option>
          <option value="Product-Based">Product-Based Companies</option>
          <option value="Service-Based">Service-Based Companies</option>
        </select>
      </div>

      {/* Recruiter Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {filteredDirectory.length > 0 ? (
          filteredDirectory.map(hr => (
            <div 
              key={hr.id} 
              className="card" 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "16px", 
                backgroundColor: "#000000", 
                border: "1px solid var(--border-color)", 
                borderRadius: "6px",
                padding: "20px"
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "50%", 
                  backgroundColor: hr.color, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#ffffff", 
                  fontWeight: "bold",
                  fontSize: "1.2rem"
                }}>
                  {hr.company[0]}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 2px 0", color: "#ffffff" }}>{hr.name}</h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block" }}>{hr.title}</span>
                  <span style={{ 
                    marginTop: "4px", 
                    backgroundColor: "rgba(255, 255, 255, 0.1)", 
                    border: `1px solid ${hr.color}`, 
                    color: hr.color, 
                    padding: "2px 6px", 
                    borderRadius: "4px", 
                    fontSize: "0.65rem", 
                    display: "inline-block",
                    fontWeight: "bold"
                  }}>
                    {hr.company}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                <a 
                  href={hr.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                  style={{ flex: 1.2, justifyContent: "center", display: "inline-flex", gap: "6px", backgroundColor: "#0077B5", borderColor: "#0077B5", color: "#ffffff", fontWeight: "bold" }}
                >
                  <ExternalLink size={14} /> Connect on LinkedIn
                </a>
                <button 
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: "center", display: "inline-flex", gap: "6px", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
                  onClick={() => handleCopy(hr.id, hr.template)}
                >
                  {copiedId === hr.id ? (
                    <>
                      <CheckCircle size={14} style={{ color: "var(--success)" }} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Pitch
                    </>
                  )}
                </button>
              </div>

              {/* Cold Email Pitch Box */}
              <div style={{ backgroundColor: "#0b0f19", border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "4px", padding: "12px" }}>
                <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: "bold", display: "block", marginBottom: "6px" }}>
                  💡 Referral Pitch Template
                </span>
                <p style={{ fontSize: "0.75rem", color: "#dddddd", margin: 0, lineHeight: "1.4", fontStyle: "italic" }}>
                  "{hr.template}"
                </p>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
            <span>No recruiters found matching the filters.</span>
          </div>
        )}
      </div>
    </div>
  );
}
