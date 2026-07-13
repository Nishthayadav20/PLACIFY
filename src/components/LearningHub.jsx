import React, { useState } from "react";
import { Play, Check, Flame, ThumbsUp, Search, ExternalLink } from "lucide-react";

export default function LearningHub({ playlists, playlistState, toggleVideoWatched, upvotePlaylist }) {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  // Live YouTube search states
  const [liveQuery, setLiveQuery] = useState("");
  const [liveVideos, setLiveVideos] = useState([]);
  const [selectedYtVideo, setSelectedYtVideo] = useState(null);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Guided search TV states
  const [liveSearchStep, setLiveSearchStep] = useState(null); // 'language' | 'playlist' | 'video'
  const [selectedSearchLang, setSelectedSearchLang] = useState(null);
  const [selectedSearchEducator, setSelectedSearchEducator] = useState(null);

  React.useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLiveSearch = (queryStr) => {
    if (!queryStr.trim()) return;
    setIsSearchingLive(true);
    setSearchError("");
    
    setTimeout(() => {
      setLiveSearchStep("language");
      setSelectedSearchLang(null);
      setSelectedSearchEducator(null);
      setIsSearchingLive(false);
    }, 300);
  };

  const resolveGuidedVideo = (topic, lang, educator) => {
    const cleanT = topic.toLowerCase().trim();
    const cleanL = lang;
    const cleanE = educator.toLowerCase();
    
    const db = {
      recursion: {
        "C++": {
          "love babbar": { id: "Ke8X3A1_L34", title: "Recursion in C++ (Lec 31) | Placement Series", creator: "CodeHelp - Love Babbar", views: "1.8M views" },
          "striver": { id: "3Pri9y0_zQ0", title: "Recursion Introduction | takeUforward", creator: "takeUforward", views: "2.1M views" },
          "kunal kushwaha": { id: "57k4rS3_E8Q", title: "Recursion Concepts & Implementation", creator: "Kunal Kushwaha", views: "820K views" },
          "coder's army": { id: "QEaGQc_RNYN", title: "Recursion Basics & Call Stack", creator: "Coder's Army", views: "650K views" }
        },
        "Java": {
          "kunal kushwaha": { id: "57k4rS3_E8Q", title: "Recursion & Backtracking in Java", creator: "Kunal Kushwaha", views: "1.2M views" },
          "striver": { id: "3Pri9y0_zQ0", title: "Recursion Basics | SDE Track", creator: "takeUforward", views: "1.5M views" },
          "apna college": { id: "yVdKoB_E2X4", title: "Recursion in Java (One Shot)", creator: "Apna College", views: "1.1M views" }
        },
        "Python": {
          "kunal kushwaha": { id: "57k4rS3_E8Q", title: "Recursion Concepts (Java/Python)", creator: "Kunal Kushwaha", views: "820K views" },
          "code with harry": { id: "wdyGe07NCS4", title: "Recursion in Python Course", creator: "Code With Harry", views: "540K views" },
          "apna college": { id: "yVdKoB_E2X4", title: "Recursion Basics in Python", creator: "Apna College", views: "610K views" }
        },
        "JavaScript": {
          "kunal kushwaha": { id: "57k4rS3_E8Q", title: "Recursion & Backtracking Bootcamp", creator: "Kunal Kushwaha", views: "710K views" },
          "code with harry": { id: "zL1DPYuQDqg", title: "Recursion in JavaScript | Web Dev", creator: "Code With Harry", views: "480K views" },
          "chai aur code": { id: "zL1DPYuQDqg", title: "Recursion and Scope in JS", creator: "Chai aur Code", views: "340K views" }
        }
      },
      array: {
        "C++": {
          "love babbar": { id: "2iM4M-H_b9w", title: "Arrays in C++ | Placement Lecture 9", creator: "CodeHelp - Love Babbar", views: "2.5M views" },
          "striver": { id: "37E9ckMDdTk", title: "Arrays Coding Interview Questions", creator: "takeUforward", views: "1.9M views" },
          "coder's army": { id: "N70k_c2p6Sg", title: "Arrays Representation & Memory Map", creator: "Coder's Army", views: "720K views" }
        },
        "Java": {
          "kunal kushwaha": { id: "zL1DPYuQDqg", title: "Arrays & ArrayLists in Java", creator: "Kunal Kushwaha", views: "1.3M views" },
          "striver": { id: "37E9ckMDdTk", title: "Arrays Interview Prep | SDE Playlist", creator: "takeUforward", views: "1.1M views" },
          "apna college": { id: "hlGoQC3_E8Q", title: "Arrays & Multi-Dimensional Arrays in Java", creator: "Apna College", views: "1.4M views" }
        }
      },
      string: {
        "C++": {
          "love babbar": { id: "V7YhRs3_b6g", title: "Strings & Char Arrays in C++", creator: "CodeHelp - Love Babbar", views: "1.4M views" },
          "striver": { id: "zL1DPYuQDqg", title: "Introduction to Strings | SDE Sheet", creator: "takeUforward", views: "1.1M views" },
          "coder's army": { id: "V7YhRs3_b6g", title: "String Matching Algorithms C++", creator: "Coder's Army", views: "410K views" }
        },
        "Java": {
          "kunal kushwaha": { id: "zL1DPYuQDqg", title: "Strings & StringBuilder in Java", creator: "Kunal Kushwaha", views: "1.2M views" },
          "apna college": { id: "hlGoQC3_E8Q", title: "Strings in Java | One Shot", creator: "Apna College", views: "1.8M views" }
        }
      }
    };
    
    let category = db.recursion;
    if (cleanT.includes("array") || cleanT.includes("hash")) category = db.array;
    if (cleanT.includes("string")) category = db.string;
    
    const langBlock = category[cleanL] || category["C++"];
    
    let result = null;
    Object.keys(langBlock).forEach(key => {
      if (cleanE.includes(key)) {
        result = langBlock[key];
      }
    });
    
    if (!result) {
      const keys = Object.keys(langBlock);
      result = langBlock[keys[0]];
    }
    
    let playlistUrl = "https://www.youtube.com";
    if (cleanE.includes("babbar")) playlistUrl = "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtKBemfi6Qj5WYjRYnFg";
    else if (cleanE.includes("striver")) playlistUrl = "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m21w1dA31T47mjYX";
    else if (cleanE.includes("kunal")) playlistUrl = "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7gSn15g30tbkAyi";
    else if (cleanE.includes("college")) playlistUrl = "https://www.youtube.com/playlist?list=PLfqMhYy_bDFzyODS_Xp-6X9sI7hA9B5_u";
    else if (cleanE.includes("harry")) playlistUrl = "https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE4YL";
    else if (cleanE.includes("army")) playlistUrl = "https://www.youtube.com/playlist?list=PLQEaGQc_RNYN1V1H39p-8T_fL2Pgz71b7";
    else if (cleanE.includes("neetcode")) playlistUrl = "https://www.youtube.com/playlist?list=PLot-Xpkr5xvrk69zPjdfPcoV3Fz3a_D3W";
    else if (cleanE.includes("saini") || cleanE.includes("akshay")) playlistUrl = "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCgSeGzyVFAgSZg14";
    else if (cleanE.includes("roadside")) playlistUrl = "https://www.youtube.com/playlist?list=PLKhlp2qtUcSaCVJElJ9JAG7JgRE0JDJyT";

    return {
      ...result,
      playlistUrl,
      thumbnail: `https://img.youtube.com/vi/${result.id}/mqdefault.jpg`
    };
  };

  // Filter topics
  const topics = ["All", "DSA", "System Design", "Aptitude", "CS Fundamentals", "Cloud & DevOps", "Project Build"];

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesTopic = selectedTopic === "All" || playlist.topic === selectedTopic;
    const matchesSearch = playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          playlist.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  // Topic-wise matching videos search
  const matchedVideos = [];
  if (searchQuery.trim() !== "") {
    playlists.forEach(playlist => {
      playlist.videos.forEach(video => {
        if (
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          playlist.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
          playlist.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          matchedVideos.push({
            ...video,
            playlistId: playlist.id,
            playlistTitle: playlist.title,
            playlistCreator: playlist.creator,
            youtubePlaylists: playlist.youtubePlaylists,
            studyResources: playlist.studyResources
          });
        }
      });
    });
  }

  const getPlaylistProgress = (playlist) => {
    const totalVideos = playlist.videos.length;
    const completedVideos = playlist.videos.filter(v => playlistState[v.id]).length;
    return {
      completed: completedVideos,
      total: totalVideos,
      percent: totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0
    };
  };

  return (
    <div className="learning-hub-view">
      <div className="page-header">
        <h1>Never Give Up 🎓</h1>
        <p>Curated playlists tag-filtered by topic, difficulty, and community feedback.</p>
      </div>

      {/* Filters Bar */}
      <div className="search-filter-bar" style={{ marginBottom: "24px" }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search by topic, playlist, or creator..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div style={{ display: "flex", gap: "8px" }}>
          {topics.map(topic => {
            const isSelected = selectedTopic === topic;
            return (
              <button
                key={topic}
                className="btn"
                style={{ 
                  padding: "8px 16px", 
                  borderRadius: "4px", 
                  backgroundColor: "#000000", 
                  color: "#ffffff",
                  border: isSelected ? "1px solid #ffffff" : "1px solid var(--border-color)",
                  fontWeight: isSelected ? "bold" : "normal"
                }}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic-wise Search Results */}
      {matchedVideos.length > 0 && (
        <div style={{
          backgroundColor: "#0d1117",
          border: "1px solid var(--border-color)",
          borderRadius: "6px",
          padding: "20px",
          marginBottom: "32px",
          boxShadow: "var(--shadow-md)"
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "16px", color: "var(--success)" }}>
            Topic-wise Lessons Found ({matchedVideos.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {matchedVideos.map((video) => (
              <div 
                key={video.id} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "12px", 
                  backgroundColor: "#000000", 
                  border: "1px solid var(--border-color)", 
                  borderRadius: "4px" 
                }}
              >
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "0.95rem", color: "#ffffff" }}>
                    {video.title}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    From Course: {video.playlistTitle} ({video.playlistCreator})
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Renowned Course Dropdown */}
                  <div className="youtube-hover-menu-container">
                    <span className="youtube-subheading" style={{ fontSize: "0.8rem", color: "var(--danger)", fontWeight: "600", cursor: "pointer", borderBottom: "1px dashed var(--danger)" }}>
                      Playlists ▾
                    </span>
                    <div className="youtube-dropdown-links" style={{ right: 0, left: "auto" }}>
                      {video.youtubePlaylists && video.youtubePlaylists.map((yt, i) => (
                        <a 
                          key={i} 
                          href={yt.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            fontSize: "0.75rem", 
                            color: "var(--text-secondary)", 
                            textDecoration: "none",
                            padding: "4px 6px",
                            borderRadius: "2px",
                            display: "block"
                          }}
                          onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                          onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}
                        >
                          {yt.name}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Docs & Sheets Dropdown */}
                  {video.studyResources && video.studyResources.length > 0 && (
                    <div className="youtube-hover-menu-container">
                      <span className="youtube-subheading" style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: "600", cursor: "pointer", borderBottom: "1px dashed var(--success)" }}>
                        Docs/Sheets ▾
                      </span>
                      <div className="youtube-dropdown-links" style={{ right: 0, left: "auto" }}>
                        {video.studyResources.map((res, i) => (
                          <a 
                            key={i} 
                            href={res.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ 
                              fontSize: "0.75rem", 
                              color: "var(--text-secondary)", 
                              textDecoration: "none",
                              padding: "4px 6px",
                              borderRadius: "2px",
                              display: "block"
                            }}
                            onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                            onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}
                          >
                            {res.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Watch Button */}
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ 
                      padding: "6px 12px", 
                      fontSize: "0.8rem", 
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      border: "none",
                      fontWeight: "bold"
                    }}
                  >
                    <ExternalLink size={12} /> Watch Video
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live YouTube Search Section */}
      <div style={{
        backgroundColor: "#000000",
        border: "1px solid var(--border-color)",
        borderRadius: "6px",
        padding: "20px",
        marginBottom: "32px"
      }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
          Live YouTube Search & Player 🔍
        </h3>
        <p style={{ margin: "0 0 16px 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Search any placement topic. The live YouTube player will instantly load search results next to the input.
        </p>
        
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* Search Input Panel */}
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search topic (e.g. recursion striver, arrays babbar)..." 
                value={liveQuery}
                onChange={(e) => setLiveQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLiveSearch(liveQuery)}
                style={{ 
                  flex: 1, 
                  backgroundColor: "#000000", 
                  color: "#ffffff", 
                  border: "1px solid #ffffff",
                  padding: "10px 14px",
                  borderRadius: "4px"
                }}
              />
              <button 
                onClick={() => handleLiveSearch(liveQuery)} 
                className="btn btn-primary"
                style={{ 
                  padding: "10px 20px", 
                  backgroundColor: "#000000", 
                  color: "#ffffff", 
                  border: "1px solid #ffffff" 
                }}
                disabled={isSearchingLive}
              >
                {isSearchingLive ? "Searching..." : "Search Live"}
              </button>
            </div>
            
            {/* Quick search keywords by B.Tech CS Subjects (Visible only when user types in search bar) */}
            {liveQuery.trim() !== "" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px", animation: "fadeIn 0.2s ease" }}>
                {/* DSA Category */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "600", width: "130px" }}>DSA (Algorithms):</span>
                  {["Arrays & Hashing", "Linked Lists", "Recursion", "Trees & BST", "Graphs Algorithms", "Dynamic Programming"].map(topic => (
                    <button
                      key={topic}
                      className="btn btn-secondary"
                      style={{ padding: "4px 8px", fontSize: "0.7rem", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
                      onClick={() => {
                        setLiveQuery(topic + " striver");
                        handleLiveSearch(topic + " striver");
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                {/* Core CSE Theory Category */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: "600", width: "130px" }}>Core Theory:</span>
                  {["OOPs Concepts", "DBMS Normalization", "OS Process Scheduling", "OS Deadlocks", "OS Paging", "TOC Automata", "Computer Networks TCP/UDP"].map(topic => (
                    <button
                      key={topic}
                      className="btn btn-secondary"
                      style={{ padding: "4px 8px", fontSize: "0.7rem", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
                      onClick={() => {
                        setLiveQuery(topic);
                        handleLiveSearch(topic);
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                {/* System Design & Cloud Category */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--danger)", fontWeight: "600", width: "130px" }}>System & Cloud:</span>
                  {["System Design HLD", "Load Balancers", "Database Sharding", "AWS Cloud", "Docker & Kubernetes", "Git & GitHub"].map(topic => (
                    <button
                      key={topic}
                      className="btn btn-secondary"
                      style={{ padding: "4px 8px", fontSize: "0.7rem", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
                      onClick={() => {
                        setLiveQuery(topic);
                        handleLiveSearch(topic);
                      }}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Top SDE Educator Playlists */}
            <div style={{ marginTop: "24px", borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
              <h4 style={{ margin: "0 0 12px 0", fontSize: "0.8rem", color: "#ffffff", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>📚</span> Top DSA Playlists (Direct YouTube Links)
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[
                  { name: "Love Babbar (CodeHelp)", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTrytAR3SpOMBc0y30e0FiAK", color: "#ef4444" },
                  { name: "Striver (takeUforward)", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_B1y", color: "#3b82f6" },
                  { name: "Kunal Kushwaha", url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ", color: "#10b981" },
                  { name: "Apna College", url: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe3LtFWg91dxgLYxpsb95HC1", color: "#a855f7" },
                  { name: "Code With Harry", url: "https://www.youtube.com/playlist?list=PLu0W_9lII9ahIappRPN0gEE31dz5OySSg", color: "#06b6d4" },
                  { name: "Coder's Army", url: "https://www.youtube.com/playlist?list=PLQEaGQc_RNYN1V1H39p-8T_fL2Pgz71b7", color: "#eab308" }
                ].map(edu => (
                  <a 
                    key={edu.name}
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 10px",
                      borderRadius: "4px",
                      border: `1px solid ${edu.color}`,
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      textDecoration: "none",
                      transition: "transform 0.15s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.backgroundColor = "#000000";
                    }}
                  >
                    <span>{edu.name}</span>
                    <span style={{ color: edu.color }}>➔</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* YouTube Live Search Results & Player Window Panel */}
          <div style={{ flex: 1.5, minWidth: "480px", backgroundColor: "#000000", border: "1px solid var(--border-color)", borderRadius: "6px", overflow: "hidden", minHeight: "300px", display: "flex", flexDirection: "column", padding: "20px" }}>
            {liveSearchStep === "language" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%", justifyContent: "center", alignItems: "center", textAlign: "center", animation: "fadeIn 0.2s ease" }}>
                <span style={{ fontSize: "2rem" }}>💻</span>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#ffffff" }}>Preferred Language</h4>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-secondary)" }}>Select a programming language for "<strong>{liveQuery}</strong>"</p>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  {["C++", "Java", "Python", "JavaScript"].map(lang => (
                    <button
                      key={lang}
                      className="btn btn-primary"
                      style={{ padding: "10px 20px", backgroundColor: "#000000", border: "1px solid #ffffff", color: "#ffffff", fontWeight: "bold" }}
                      onClick={() => {
                        setSelectedSearchLang(lang);
                        setLiveSearchStep("playlist");
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {liveSearchStep === "playlist" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%", justifyContent: "center", alignItems: "center", textAlign: "center", animation: "fadeIn 0.2s ease" }}>
                <span style={{ fontSize: "2rem" }}>📚</span>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#ffffff" }}>Preferred SDE Playlist</h4>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-secondary)" }}>Choose an SDE educator playlist in <strong>{selectedSearchLang}</strong></p>
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                  {(() => {
                    const SdeMap = {
                      "C++": ["Love Babbar (CodeHelp)", "Striver (takeUforward)", "Coder's Army", "Code With Harry"],
                      "Java": ["Kunal Kushwaha", "Striver (takeUforward)", "Apna College"],
                      "Python": ["Kunal Kushwaha", "Code With Harry", "Apna College"],
                      "JavaScript": ["Kunal Kushwaha", "Code With Harry", "Chai aur Code"]
                    };
                    const options = SdeMap[selectedSearchLang] || SdeMap["C++"];
                    return options.map(edu => (
                      <button
                        key={edu}
                        className="btn btn-primary"
                        style={{ padding: "8px 16px", backgroundColor: "#000000", border: "1px solid #ffffff", color: "#ffffff", fontSize: "0.8rem" }}
                        onClick={() => {
                          setSelectedSearchEducator(edu);
                          setLiveSearchStep("video");
                        }}
                      >
                        {edu}
                      </button>
                    ));
                  })()}
                </div>
                <button 
                  className="btn btn-ghost" 
                  style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textDecoration: "underline" }}
                  onClick={() => setLiveSearchStep("language")}
                >
                  ➔ Change Language
                </button>
              </div>
            )}

            {liveSearchStep === "video" && (() => {
              const activeVid = resolveGuidedVideo(liveQuery, selectedSearchLang, selectedSearchEducator);
              return activeVid ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%", justifyContent: "space-between", animation: "fadeIn 0.3s ease" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--primary)", fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                      🎯 Resolved Recommended Lecture
                    </span>
                    <h4 style={{ margin: "0 0 6px 0", color: "#ffffff", fontSize: "0.95rem" }}>{activeVid.title}</h4>
                    <div style={{ display: "flex", gap: "12px", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                      <span>Educator: <strong>{activeVid.creator}</strong></span>
                      <span>•</span>
                      <span>Views: <strong>{activeVid.views}</strong></span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
                    {/* Thumbnail click to play on YouTube */}
                    <a 
                      href={`https://www.youtube.com/watch?v=${activeVid.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ position: "relative", width: "160px", height: "90px", borderRadius: "4px", overflow: "hidden", display: "block", border: "1px solid var(--border-color)" }}
                    >
                      <img 
                        src={activeVid.thumbnail} 
                        alt={activeVid.title} 
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "1.5rem", color: "#ffffff" }}>▶</span>
                      </div>
                    </a>

                    <div style={{ flex: 1, minWidth: "180px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      <a 
                        href={`https://www.youtube.com/watch?v=${activeVid.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-primary"
                        style={{ width: "100%", justifyContent: "center", display: "flex", gap: "8px", backgroundColor: "var(--danger)", borderColor: "var(--danger)", color: "#ffffff", fontWeight: "bold" }}
                      >
                        Play Video on YouTube ↗
                      </a>
                      <a 
                        href={activeVid.playlistUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-secondary"
                        style={{ width: "100%", justifyContent: "center", display: "flex", gap: "8px", backgroundColor: "#000000", border: "1px solid #ffffff", color: "#ffffff", fontWeight: "bold" }}
                      >
                        Open Full Playlist 📚
                      </a>

                      {/* Raw clickable SDE links */}
                      <div style={{ fontSize: "0.7rem", marginTop: "4px", display: "flex", flexDirection: "column", gap: "4px", textAlign: "left" }}>
                        <span style={{ color: "var(--text-secondary)" }}>Direct Video Link:</span>
                        <a 
                          href={`https://www.youtube.com/watch?v=${activeVid.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: "var(--primary)", textDecoration: "underline", wordBreak: "break-all" }}
                        >
                          {`https://www.youtube.com/watch?v=${activeVid.id}`}
                        </a>
                        <span style={{ color: "var(--text-secondary)", marginTop: "4px" }}>Direct Playlist Link:</span>
                        <a 
                          href={activeVid.playlistUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: "var(--success)", textDecoration: "underline", wordBreak: "break-all" }}
                        >
                          {activeVid.playlistUrl}
                        </a>
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ flex: 1, padding: "6px", fontSize: "0.7rem", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
                          onClick={() => setLiveSearchStep("playlist")}
                        >
                          Change Playlist
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ flex: 1, padding: "6px", fontSize: "0.7rem", backgroundColor: "#000000", border: "1px solid var(--border-color)", color: "#ffffff" }}
                          onClick={() => setLiveSearchStep("language")}
                        >
                          Change Language
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}

            {!liveSearchStep && (
              <div style={{ flex: 1, padding: "40px", textAlign: "center", color: "var(--text-muted)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "12px" }}>📺</span>
                {searchError ? (
                  <span style={{ color: "var(--danger)" }}>{searchError}</span>
                ) : (
                  <span>Type a topic and click "Search Live" to see the search results window here.</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Playlists Grid */}
      <div className="grid-cols-2">
        {filteredPlaylists.map(playlist => {
          const progress = getPlaylistProgress(playlist);
          const isActive = activePlaylistId === playlist.id;

          return (
            <div 
              key={playlist.id} 
              className={`card`} 
              style={{ 
                borderColor: isActive ? "var(--primary)" : "var(--border-color)",
                boxShadow: isActive ? "var(--shadow-lg)" : "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ 
                    marginBottom: "8px", 
                    backgroundColor: "#000000", 
                    border: "1px solid var(--border-color)", 
                    color: "#ffffff", 
                    padding: "4px 8px", 
                    borderRadius: "4px", 
                    fontSize: "0.75rem", 
                    display: "inline-block" 
                  }}>
                    {playlist.topic}
                  </span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{playlist.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", margin: 0 }}>by {playlist.creator}</p>
                  
                  {/* Dropdowns row */}
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "6px" }}>
                    {/* YouTube Hover Menu Subheading */}
                    <div 
                      className="youtube-hover-menu-container"
                      onMouseEnter={() => setHoveredDropdown(`${playlist.id}-youtube`)}
                      onMouseLeave={() => setHoveredDropdown(null)}
                    >
                      <span 
                        className="youtube-subheading" 
                        style={{ fontSize: "0.8rem", color: "var(--danger)", fontWeight: "600", cursor: "pointer", borderBottom: "1px dashed var(--danger)" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(openDropdown === `${playlist.id}-youtube` ? null : `${playlist.id}-youtube`);
                        }}
                      >
                        YouTube ▾
                      </span>
                      <div 
                        className="youtube-dropdown-links"
                        style={{ display: (openDropdown === `${playlist.id}-youtube` || hoveredDropdown === `${playlist.id}-youtube`) ? "flex" : "none" }}
                      >
                        {playlist.youtubePlaylists && playlist.youtubePlaylists.map((yt, i) => (
                          <a 
                            key={i} 
                            href={yt.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ 
                              fontSize: "0.75rem", 
                              color: "var(--text-secondary)", 
                              textDecoration: "none",
                              padding: "6px 8px",
                              borderRadius: "4px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                              borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                          >
                            <span style={{ fontWeight: "bold", color: "#ffffff" }}>{yt.name}</span>
                            <span style={{ fontSize: "0.625rem", color: "var(--primary)", textDecoration: "underline", wordBreak: "break-all" }}>{yt.url}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Docs & Practice Sheets Hover Menu */}
                    {playlist.studyResources && playlist.studyResources.length > 0 && (
                      <div 
                        className="youtube-hover-menu-container"
                        onMouseEnter={() => setHoveredDropdown(`${playlist.id}-docs`)}
                        onMouseLeave={() => setHoveredDropdown(null)}
                      >
                        <span 
                          className="youtube-subheading" 
                          style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: "600", cursor: "pointer", borderBottom: "1px dashed var(--success)" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(openDropdown === `${playlist.id}-docs` ? null : `${playlist.id}-docs`);
                          }}
                        >
                          Docs/Sheets ▾
                        </span>
                        <div 
                          className="youtube-dropdown-links"
                          style={{ display: (openDropdown === `${playlist.id}-docs` || hoveredDropdown === `${playlist.id}-docs`) ? "flex" : "none" }}
                        >
                          {playlist.studyResources.map((res, i) => (
                            <a 
                              key={i} 
                              href={res.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              style={{ 
                                fontSize: "0.75rem", 
                                color: "var(--text-secondary)", 
                                textDecoration: "none",
                                padding: "6px 8px",
                                borderRadius: "4px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                              <span style={{ fontWeight: "bold", color: "#ffffff" }}>{res.name}</span>
                              <span style={{ fontSize: "0.625rem", color: "var(--success)", textDecoration: "underline", wordBreak: "break-all" }}>{res.url}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  className="btn btn-ghost" 
                  style={{ display: "inline-flex", gap: "4px", padding: "6px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)" }}
                  onClick={() => upvotePlaylist(playlist.id)}
                >
                  <ThumbsUp size={14} /> {playlist.upvotes}
                </button>
              </div>

              {/* Progress */}
              <div className="progress-wrapper" style={{ margin: "0" }}>
                <div className="progress-info">
                  <span style={{ color: "var(--success)", fontWeight: "bold" }}>Progress ({progress.completed}/{progress.total} watched)</span>
                  <span style={{ color: "var(--success)", fontWeight: "bold" }}>{progress.percent}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress.percent}%`, backgroundColor: "var(--success)" }}></div>
                </div>
              </div>

              {/* Toggle Videos Button */}
              <div>
                <button 
                  className="btn btn-secondary" 
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={() => setActivePlaylistId(isActive ? null : playlist.id)}
                >
                  {isActive ? "Hide Playlist Videos" : "View Playlist Videos"}
                </button>
              </div>

              {/* Videos list */}
              {isActive && (
                <div 
                  style={{ 
                    borderTop: "1px solid var(--border-color)", 
                    paddingTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  {playlist.videos.map((video, idx) => {
                    const isWatched = playlistState[video.id];
                    return (
                      <div 
                        key={video.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 12px",
                          backgroundColor: "var(--bg-primary)",
                          borderRadius: "var(--radius-sm)",
                          border: isWatched ? "1px solid var(--primary-light)" : "1px solid transparent"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexGrow: 1 }}>
                          {/* Checkbox */}
                          <label className="checkbox-container">
                            <input 
                              type="checkbox" 
                              checked={!!isWatched} 
                              onChange={() => toggleVideoWatched(video.id)} 
                            />
                            <div className="custom-checkbox">
                              {isWatched && <Check size={12} strokeWidth={3} />}
                            </div>
                          </label>
                          <div>
                            <p style={{ 
                              fontWeight: 500, 
                              fontSize: "0.9rem",
                              color: isWatched ? "var(--text-muted)" : "var(--text-primary)",
                              textDecoration: isWatched ? "line-through" : "none"
                            }}>
                              {idx + 1}. {video.title}
                            </p>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Duration: {video.duration}</span>
                          </div>
                        </div>
                        <a 
                          href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-ghost" 
                          style={{ padding: "6px" }}
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
