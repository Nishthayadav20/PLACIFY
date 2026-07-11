import React, { useState } from "react";
import { Play, Check, Flame, ThumbsUp, Search, ExternalLink } from "lucide-react";

export default function LearningHub({ playlists, playlistState, toggleVideoWatched, upvotePlaylist }) {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Live YouTube search states
  const [liveQuery, setLiveQuery] = useState("");
  const [liveVideos, setLiveVideos] = useState([]);
  const [selectedYtVideo, setSelectedYtVideo] = useState(null);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [searchError, setSearchError] = useState("");

  React.useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLiveSearch = async (queryStr) => {
    if (!queryStr.trim()) return;
    setIsSearchingLive(true);
    setSearchError("");
    
    const instances = [
      "https://invidious.nerdvpn.de",
      "https://yewtu.be",
      "https://vid.puffyan.us",
      "https://inv.tux.im",
      "https://invidious.flokinet.to"
    ];

    let success = false;
    for (const instance of instances) {
      try {
        const res = await fetch(`${instance}/api/v1/search?q=${encodeURIComponent(queryStr)}&type=video`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const items = data.slice(0, 10).map(item => ({
              id: item.videoId,
              title: item.title,
              creator: item.author,
              thumbnail: item.videoThumbnails?.find(t => t.quality === "medium")?.url || item.videoThumbnails?.[0]?.url || `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`,
              url: `https://www.youtube.com/watch?v=${item.videoId}`
            }));
            setLiveVideos(items);
            if (items.length > 0) {
              setSelectedYtVideo(items[0].id);
            }
            success = true;
            break;
          }
        }
      } catch (err) {
        console.warn(`Mirror ${instance} failed:`, err);
      }
    }

    if (!success) {
      setSearchError("All search mirrors currently busy. Please try search terms again in a moment.");
    }
    setIsSearchingLive(false);
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
          </div>

          {/* YouTube Live Search Results & Player Window Panel */}
          <div style={{ flex: 1.5, minWidth: "480px", backgroundColor: "#000000", border: "1px solid var(--border-color)", borderRadius: "6px", overflow: "hidden", minHeight: "300px", display: "flex" }}>
            {liveVideos.length > 0 ? (
              <div style={{ display: "flex", width: "100%", height: "300px" }}>
                {/* Left: Scrollable Search Results (Just like YouTube Search!) */}
                <div style={{ flex: 1, borderRight: "1px solid var(--border-color)", overflowY: "auto", padding: "10px", display: "flex", flexDirection: "column", gap: "8px", backgroundColor: "#07090e" }}>
                  <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--text-secondary)", fontWeight: "bold", paddingBottom: "4px", borderBottom: "1px solid var(--border-color)" }}>
                    Search Results ({liveVideos.length})
                  </span>
                  {liveVideos.map(video => (
                    <div 
                      key={video.id}
                      onClick={() => setSelectedYtVideo(video.id)}
                      style={{
                        display: "flex",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "6px",
                        borderRadius: "4px",
                        backgroundColor: selectedYtVideo === video.id ? "rgba(255, 255, 255, 0.1)" : "transparent",
                        transition: "background-color 0.2s ease"
                      }}
                    >
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        style={{ width: "80px", height: "45px", objectFit: "cover", borderRadius: "4px" }}
                      />
                      <div style={{ overflow: "hidden" }}>
                        <h5 style={{ margin: 0, fontSize: "0.75rem", color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {video.title}
                        </h5>
                        <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{video.creator}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right: Embedded Video Player */}
                <div style={{ flex: 1.5, position: "relative", backgroundColor: "#000000" }}>
                  {selectedYtVideo ? (
                    <iframe
                      title="Live YouTube Search Player"
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${selectedYtVideo}?autoplay=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      Select a video to play
                    </div>
                  )}
                </div>
              </div>
            ) : (
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
                    <div className="youtube-hover-menu-container">
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
                        style={{ display: openDropdown === `${playlist.id}-youtube` ? "flex" : undefined }}
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

                    {/* Docs & Practice Sheets Hover Menu */}
                    {playlist.studyResources && playlist.studyResources.length > 0 && (
                      <div className="youtube-hover-menu-container">
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
                          style={{ display: openDropdown === `${playlist.id}-docs` ? "flex" : undefined }}
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
                  <span>Progress ({progress.completed}/{progress.total} watched)</span>
                  <span>{progress.percent}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress.percent}%` }}></div>
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
