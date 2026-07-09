import React from "react";
import { 
  GraduationCap, ArrowRight, PlayCircle, ShieldCheck, CheckCircle2 
} from "lucide-react";

export default function WelcomeScreen({ onSelect }) {
  return (
    <div style={{ 
      backgroundColor: "var(--bg-primary)", 
      color: "var(--text-primary)", 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: "40px",
      position: "relative",
      overflow: "hidden" 
    }}>
      
      {/* Background Glow */}
      <div className="radial-glow" style={{ top: "-10%", left: "70%", opacity: 0.7 }}></div>

      {/* Main Split Container */}
      <div style={{ 
        maxWidth: "1280px", 
        width: "100%", 
        display: "flex", 
        gap: "60px", 
        alignItems: "center", 
        justifyContent: "space-between",
        zIndex: 2,
        flexWrap: "wrap"
      }}>
        
        {/* Left Content Column */}
        <div style={{ 
          flex: "1 1 480px", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "flex-start",
          textAlign: "left"
        }}>
          {/* Logo Badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "var(--primary-light)",
            padding: "8px 16px",
            borderRadius: "100px",
            color: "var(--primary)",
            marginBottom: "28px"
          }}>
            <GraduationCap size={18} />
            <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Placement Hub
            </span>
          </div>

          {/* Title and Tagline */}
          <h1 style={{ 
            fontSize: "4.5rem", 
            fontWeight: 950, 
            lineHeight: 0.95, 
            letterSpacing: "-0.05em",
            textTransform: "uppercase", 
            margin: "0 0 12px 0",
            background: "linear-gradient(135deg, #ffffff 60%, #a5b4fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            PLACIFY
          </h1>
          
          <h2 style={{ 
            color: "var(--primary)", 
            fontSize: "1.5rem", 
            fontWeight: 800, 
            letterSpacing: "0.15em", 
            textTransform: "uppercase", 
            margin: "0 0 24px 0" 
          }}>
            Success is just next step
          </h2>

          <p style={{ 
            color: "var(--text-secondary)", 
            fontSize: "1.1rem", 
            lineHeight: 1.6, 
            margin: "0 0 32px 0",
            maxWidth: "520px" 
          }}>
            PLACIFY is a unified prep environment containing customized study routines, local compilers, drive calendars, and company interview archives.
          </p>

          {/* Bullets List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
            {[
              "Dynamic language playlists (C++, Java, Python, JS)",
              "Weekly mock exams (20 MCQs + 3 coding tasks)",
              "Teammate finder & placement drive calendar",
              "Interactive 3D algorithm execution visualizers"
            ].map((text, idx) => (
              <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "0.95rem", color: "var(--text-primary)" }}>
                <CheckCircle2 size={16} style={{ color: "var(--success)" }} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div style={{ display: "flex", gap: "16px", width: "100%", maxWidth: "480px" }}>
            <button 
              className="btn btn-secondary" 
              style={{ padding: "14px 28px", fontSize: "0.95rem", flex: 1, justifyContent: "center" }}
              onClick={() => onSelect("guest")}
            >
              <PlayCircle size={18} /> Explore as Guest
            </button>

            <button 
              className="btn btn-primary" 
              style={{ padding: "14px 28px", fontSize: "0.95rem", flex: 1, justifyContent: "center" }}
              onClick={() => onSelect("premium")}
            >
              <ShieldCheck size={18} /> Setup Tailored Plan
            </button>
          </div>
        </div>

        {/* Right Video Mockup Column */}
        <div style={{ 
          flex: "1 1 540px", 
          display: "flex", 
          justifyContent: "center",
          alignItems: "center"
        }}>
          {/* Framed Video Player */}
          <div style={{ 
            width: "100%", 
            maxWidth: "600px",
            aspectRatio: "16/9", 
            borderRadius: "20px", 
            overflow: "hidden", 
            border: "1px solid rgba(255, 255, 255, 0.1)", 
            boxShadow: "0 25px 60px -15px rgba(99, 102, 241, 0.35)",
            backgroundColor: "#020617",
            position: "relative"
          }}>
            <video 
              src="/bg-video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover" 
              }} 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
