import React, { useState } from "react";
import { Play, Check, Flame, ThumbsUp, Search, ExternalLink } from "lucide-react";

export default function LearningHub({ playlists, playlistState, toggleVideoWatched, upvotePlaylist }) {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePlaylistId, setActivePlaylistId] = useState(null);

  // Filter topics
  const topics = ["All", "DSA", "System Design", "Aptitude", "CS Fundamentals"];

  const filteredPlaylists = playlists.filter(playlist => {
    const matchesTopic = selectedTopic === "All" || playlist.topic === selectedTopic;
    const matchesSearch = playlist.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          playlist.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

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
        <h1 style={{ color: "#ffd700" }}>Never Give Up 🎓</h1>
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
          {topics.map(topic => (
            <button
              key={topic}
              className={`btn ${selectedTopic === topic ? "btn-primary" : "btn-secondary"}`}
              style={{ padding: "8px 16px", borderRadius: "var(--radius-full)" }}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </button>
          ))}
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
                  <span className="badge badge-primary" style={{ marginBottom: "8px" }}>{playlist.topic}</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>{playlist.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>by {playlist.creator}</p>
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
