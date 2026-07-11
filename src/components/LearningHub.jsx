import React, { useState } from "react";
import { Play, Check, Flame, ThumbsUp, Search, ExternalLink } from "lucide-react";

export default function LearningHub({ playlists, playlistState, toggleVideoWatched, upvotePlaylist }) {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Live YouTube search states
  const [liveVideos, setLiveVideos] = useState([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [liveQuery, setLiveQuery] = useState("");
  const [youtubeApiKey, setYoutubeApiKey] = useState(() => localStorage.getItem("yt_api_key") || "");

  React.useEffect(() => {
    const handleOutsideClick = () => setOpenDropdown(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleLiveSearch = async () => {
    if (!liveQuery.trim()) return;
    setIsSearchingLive(true);
    try {
      let url = "";
      if (youtubeApiKey) {
        url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(liveQuery)}&key=${youtubeApiKey}`;
      } else {
        url = `https://pipedapi.kavin.rocks/search?q=${encodeURIComponent(liveQuery)}&filter=videos`;
      }
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (youtubeApiKey) {
          const items = (data.items || []).map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            creator: item.snippet.channelTitle,
            thumbnail: item.snippet.thumbnails?.medium?.url,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`
          }));
          setLiveVideos(items);
        } else {
          // Piped API format
          const items = (data.items || []).slice(0, 6).map(item => {
            const videoId = item.url.includes("v=") ? item.url.split("v=")[1] : item.url;
            return {
              id: videoId,
              title: item.title,
              creator: item.uploaderName,
              thumbnail: item.thumbnail,
              url: `https://www.youtube.com${item.url}`
            };
          });
          setLiveVideos(items);
        }
      }
    } catch (err) {
      console.error("Live search error:", err);
    } finally {
      setIsSearchingLive(false);
    }
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
          playlist.language.toLowerCase().includes(searchQuery.toLowerCase())
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
        backgroundColor: "#0d1117",
        border: "1px solid var(--border-color)",
        borderRadius: "6px",
        padding: "20px",
        marginBottom: "32px"
      }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
          Live YouTube Search 🔍
        </h3>
        <p style={{ margin: "0 0 16px 0", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          Can't find a topic in our syllabus? Type below to fetch matching tutorials live from YouTube.
        </p>
        
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search any topic on YouTube live (e.g. dynamic programming striver)..." 
            value={liveQuery}
            onChange={(e) => setLiveQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLiveSearch()}
            style={{ flex: 1 }}
          />
          <button 
            onClick={handleLiveSearch} 
            className="btn btn-primary"
            style={{ padding: "10px 20px" }}
            disabled={isSearchingLive}
          >
            {isSearchingLive ? "Searching..." : "Search Live"}
          </button>
        </div>

        {/* API Key configuration input (Optional) */}
        <div style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>YouTube API Key (Optional):</span>
          <input 
            type="password"
            placeholder="Paste Google Console API Key to avoid limits..." 
            value={youtubeApiKey}
            onChange={(e) => {
              setYoutubeApiKey(e.target.value);
              localStorage.setItem("yt_api_key", e.target.value);
            }}
            style={{ 
              backgroundColor: "#000000", 
              border: "1px solid var(--border-color)", 
              color: "#ffffff", 
              fontSize: "0.75rem", 
              padding: "4px 8px", 
              borderRadius: "4px",
              width: "240px" 
            }}
          />
        </div>

        {liveVideos.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginTop: "16px" }}>
            {liveVideos.map(video => (
              <div 
                key={video.id} 
                className="card" 
                style={{ 
                  padding: "10px", 
                  backgroundColor: "#000000", 
                  border: "1px solid var(--border-color)", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between" 
                }}
              >
                {video.thumbnail && (
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "4px", marginBottom: "8px" }} 
                  />
                )}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h5 style={{ margin: "0 0 4px 0", fontSize: "0.85rem", color: "#ffffff", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {video.title}
                    </h5>
                    <p style={{ margin: "0 0 12px 0", fontSize: "0.75rem", color: "var(--text-muted)" }}>{video.creator}</p>
                  </div>
                  <a 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ padding: "6px 12px", fontSize: "0.75rem", width: "100%", textAlign: "center", display: "inline-flex", justifyContent: "center", gap: "6px" }}
                  >
                    Watch <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
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
