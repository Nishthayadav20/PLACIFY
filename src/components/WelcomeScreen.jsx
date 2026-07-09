import React from "react";
import { 
  GraduationCap, BookOpen, Building2, Calendar, Award, 
  ArrowRight, Users, PlayCircle, ShieldCheck 
} from "lucide-react";

export default function WelcomeScreen({ onSelect }) {
  const handleScrollToCTA = () => {
    const ctaSec = document.getElementById("cta-section");
    if (ctaSec) {
      ctaSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      
      {/* Background Video */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "600px", overflow: "hidden", zIndex: 0 }}>
        <video 
          src="/bg-video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ 
          position: "absolute", 
          top: 0, left: 0, width: "100%", height: "100%", 
          background: "linear-gradient(180deg, rgba(11, 15, 25, 0.75) 0%, rgba(11, 15, 25, 1) 100%)" 
        }} />
      </div>

      {/* radial background glow */}
      <div className="radial-glow" style={{ zIndex: 1 }}></div>

      {/* Hero Section */}
      <header className="landing-hero" style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "14px",
          backgroundColor: "var(--primary-light)",
          color: "var(--primary)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px"
        }}>
          <GraduationCap size={30} />
        </div>
        <h1 style={{ fontSize: "4.25rem", fontWeight: 900, marginBottom: "8px", letterSpacing: "-0.04em", textTransform: "uppercase" }}>
          PLACIFY
        </h1>
        <p style={{ color: "var(--primary)", fontSize: "1.35rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "24px" }}>
          Success is just next step
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.20rem", maxWidth: "680px", margin: "0 auto 32px auto", lineHeight: 1.6 }}>
          PLACIFY orchestrates your DSA prep checklists, company eligibility databases, drive calendars, and weekly coding assessments in a premium dark dashboard.
        </p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button className="btn btn-primary" style={{ padding: "12px 24px" }} onClick={handleScrollToCTA}>
            Get Started <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary" style={{ padding: "12px 24px" }} onClick={handleScrollToCTA}>
            Explore Modules
          </button>
        </div>

        {/* Hero Stats */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "60px",
          marginTop: "60px",
          borderTop: "1px solid var(--border-color)",
          paddingTop: "32px"
        }}>
          <div>
            <h3 style={{ fontSize: "1.75rem", color: "var(--primary)" }}>4</h3>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Curated Streams</span>
          </div>
          <div>
            <h3 style={{ fontSize: "1.75rem", color: "var(--success)" }}>15+</h3>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Company Profiles</span>
          </div>
          <div>
            <h3 style={{ fontSize: "1.75rem", color: "var(--warning)" }}>100%</h3>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Personalized Schedules</span>
          </div>
        </div>
      </header>

      {/* Feature Showcase Grid */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <h2 className="feature-showcase-title">Core Modules Built inside PLACIFY</h2>
        
        <div className="landing-features-grid">
          {/* Card 1: Learning Hub */}
          <div className="landing-feature-card">
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <BookOpen size={20} />
            </div>
            <h3>Learning Hub</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              Access structured playlists by language (C++, Java, Python, JavaScript) covering DSA and CS Fundamentals (OOPs, DBMS, Networks) with checkboxes to keep track of watch progress.
            </p>
          </div>

          {/* Card 2: Company Intelligence */}
          <div className="landing-feature-card">
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "var(--success-light)",
              color: "var(--success)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Building2 size={20} />
            </div>
            <h3>Company Database</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              Check out recruitment cutoffs, CTC details, and hiring rounds for companies. Read through crowdsourced interview experiences and share your own interview reports in-memory.
            </p>
          </div>

          {/* Card 3: Drives Calendar */}
          <div className="landing-feature-card">
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "var(--warning-light)",
              color: "var(--warning)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Calendar size={20} />
            </div>
            <h3>Exam & Drives Calendar</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              Track registration deadlines for competitive exams and hackathons. Use our teammate board to recruit coders matching specific skill sets for national hackathons.
            </p>
          </div>

          {/* Card 4: Weekly Mock Tests */}
          <div className="landing-feature-card">
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: "var(--danger-light)",
              color: "var(--danger)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Award size={20} />
            </div>
            <h3>Weekly Mock Assessments</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>
              Take timed technical assessments simulating actual recruitment. Sectional timers, 20 Aptitude/CS MCQs, 3-question coding environment, and tab-switch anti-cheat validation.
            </p>
          </div>
        </div>

        {/* CTA Section at bottom */}
        <section className="cta-section" id="cta-section">
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "2.25rem", marginBottom: "12px", letterSpacing: "-0.02em" }}>Ready to Start Preparing?</h2>
            <p style={{ color: "var(--text-secondary)" }}>
              Choose your path to enter. Access normal features directly, or register to generate your daily preparation routine.
            </p>

            <div className="cta-buttons-container">
              {/* Option A: Guest */}
              <button 
                className="btn btn-secondary" 
                style={{ padding: "14px 28px", fontSize: "1rem", flex: 1, justifyContent: "center" }}
                onClick={() => onSelect("guest")}
              >
                <PlayCircle size={18} /> Explore as Guest
              </button>

              {/* Option B: Premium Login */}
              <button 
                className="btn btn-primary" 
                style={{ padding: "14px 28px", fontSize: "1rem", flex: 1, justifyContent: "center" }}
                onClick={() => onSelect("premium")}
              >
                <ShieldCheck size={18} /> Setup Tailored Plan
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
