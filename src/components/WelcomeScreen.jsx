import React from "react";
import { PlayCircle, ShieldCheck } from "lucide-react";

export default function WelcomeScreen({ onSelect }) {
  return (
    <div style={{ 
      backgroundColor: "#000000", 
      color: "#ffffff", 
      minHeight: "100vh", 
      position: "relative",
      overflow: "hidden" 
    }}>
      
      {/* Full Screen Background Image */}
      <div style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        overflow: "hidden", 
        zIndex: 0 
      }}>
        <img 
          src="/bg-image.jpg" 
          alt="Background"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover" 
          }} 
        />
        {/* Transparent overlay for text legibility while keeping image visible */}
        <div style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%)",
          pointerEvents: "none"
        }} />
      </div>

      {/* PLACIFY Title and Tagline (Centered below GitHub Icon) */}
      <div style={{
        position: "absolute",
        top: "28%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "600px",
        padding: "0 20px"
      }}>
        {/* Title PLACIFY (Green 'P' and Solid White) */}
        <h1 
          className="hover-shake-motion"
          style={{ 
            fontSize: "4.5rem", 
            fontWeight: 950, 
            lineHeight: 0.9, 
            letterSpacing: "-0.05em",
            textTransform: "uppercase", 
            margin: "0 0 12px 0",
            color: "#ffffff"
          }}
        >
          <span style={{ color: "var(--success)" }}>P</span>LACIFY
        </h1>
        
        {/* Tagline (Golden) */}
        <h2 
          className="hover-float-motion"
          style={{ 
            color: "#ffd700", 
            fontSize: "1.25rem", 
            fontWeight: 700, 
            letterSpacing: "0.15em", 
            textTransform: "uppercase", 
            margin: 0
          }}
        >
          Success is just next step
        </h2>
      </div>

      {/* Monochromatic Action Buttons (Centered above the bottom 'while' statement) */}
      <div style={{ 
        position: "absolute",
        bottom: "18%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex", 
        gap: "16px", 
        width: "90%",
        maxWidth: "480px",
        zIndex: 2
      }}>
        {/* Guest Option: Black background, white border */}
        <button 
          className="btn" 
          style={{ 
            padding: "14px 28px", 
            fontSize: "0.95rem", 
            flex: 1, 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            backgroundColor: "#000000",
            border: "1px solid #ffffff",
            color: "#ffffff",
            borderRadius: "6px",
            cursor: "pointer"
          }}
          onClick={() => onSelect("guest")}
        >
          <PlayCircle size={18} /> Explore as Guest
        </button>

        {/* Premium Option: Solid white background, black text */}
        <button 
          className="btn" 
          style={{ 
            padding: "14px 28px", 
            fontSize: "0.95rem", 
            flex: 1, 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            backgroundColor: "#ffffff",
            border: "1px solid #ffffff",
            color: "#000000",
            borderRadius: "6px",
            fontWeight: 700,
            cursor: "pointer"
          }}
          onClick={() => onSelect("premium")}
        >
          <ShieldCheck size={18} /> Setup Tailored Plan
        </button>
      </div>
    </div>
  );
}
