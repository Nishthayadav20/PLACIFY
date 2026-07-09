// Routine Generator for PlacementOS
// Generates theory and coding practice tasks based on user level, current track day, and programming language.

import { mockPlaylists, mockDsaSheet } from "../data/mockData";

export function generateDailyRoutine(level, day, totalDays, language = "C++") {
  // Find language-specific DSA playlist
  const dsaPlaylist = mockPlaylists.find(p => p.topic === "DSA" && p.language === language) || mockPlaylists[0];
  
  // Find CS fundamentals playlists
  const oopsPlaylist = mockPlaylists.find(p => p.id === "pl-oops") || mockPlaylists[4];
  const dbmsPlaylist = mockPlaylists.find(p => p.id === "pl-dbms") || mockPlaylists[5];
  const cnPlaylist = mockPlaylists.find(p => p.id === "pl-cn") || mockPlaylists[6];

  let topic = "Arrays & Hashing";
  let videoRecommend = null;
  let dsaRecommend = null;

  // Determine current focus topic based on level and day
  if (level === "Beginner" || level === "Basic") {
    // 90+ days roadmap
    if (day <= Math.floor(totalDays * 0.3)) {
      topic = "Arrays & Hashing";
      videoRecommend = dsaPlaylist.videos[0] || dsaPlaylist.videos[0];
      dsaRecommend = mockDsaSheet[0].problems[0]; // Two Sum
    } else if (day <= Math.floor(totalDays * 0.5)) {
      topic = "Two Pointers & Sliding Window";
      videoRecommend = dsaPlaylist.videos[1] || dsaPlaylist.videos[0];
      dsaRecommend = mockDsaSheet[1].problems[0]; // Valid Palindrome
    } else if (day <= Math.floor(totalDays * 0.7)) {
      topic = "Linked List";
      videoRecommend = dsaPlaylist.videos[3] || dsaPlaylist.videos[0];
      dsaRecommend = mockDsaSheet[2].problems[0]; // Reverse Linked List
    } else if (day <= Math.floor(totalDays * 0.85)) {
      topic = "Recursion & CS Fundamentals (OOPs)";
      videoRecommend = oopsPlaylist.videos[1]; // Encapsulation & Abstraction
      dsaRecommend = mockDsaSheet[3].problems[0]; // Subsets
    } else {
      topic = "DBMS & Dynamic Programming";
      videoRecommend = dbmsPlaylist.videos[1]; // SQL Queries
      dsaRecommend = mockDsaSheet[4].problems[0]; // Climbing Stairs
    }
  } else if (level === "Intermediate") {
    // 60 days roadmap
    if (day <= Math.floor(totalDays * 0.25)) {
      topic = "Arrays & Two Pointers";
      videoRecommend = dsaPlaylist.videos[1] || dsaPlaylist.videos[0];
      dsaRecommend = mockDsaSheet[0].problems[1]; // Sort Colors
    } else if (day <= Math.floor(totalDays * 0.5)) {
      topic = "Linked List & Sliding Window";
      videoRecommend = dsaPlaylist.videos[3] || dsaPlaylist.videos[0];
      dsaRecommend = mockDsaSheet[1].problems[1]; // 3Sum
    } else if (day <= Math.floor(totalDays * 0.75)) {
      topic = "CS Fundamentals (OOPs & DBMS)";
      videoRecommend = oopsPlaylist.videos[2]; // Inheritance
      dsaRecommend = mockDsaSheet[3].problems[0]; // Subsets
    } else {
      topic = "Computer Networks & DP";
      videoRecommend = cnPlaylist.videos[0]; // OSI Reference Model
      dsaRecommend = mockDsaSheet[4].problems[0]; // Climbing Stairs
    }
  } else {
    // Advanced (45 days roadmap)
    if (day <= Math.floor(totalDays * 0.2)) {
      topic = "Arrays & Sliding Window";
      videoRecommend = dsaPlaylist.videos[1] || dsaPlaylist.videos[0];
      dsaRecommend = mockDsaSheet[0].problems[0]; // Two Sum
    } else if (day <= Math.floor(totalDays * 0.45)) {
      topic = "Linked List Problems";
      videoRecommend = dsaPlaylist.videos[3] || dsaPlaylist.videos[0];
      dsaRecommend = mockDsaSheet[2].problems[1]; // Detect Loop
    } else if (day <= Math.floor(totalDays * 0.7)) {
      topic = "Advanced OOPs & System Design";
      videoRecommend = oopsPlaylist.videos[3]; // Polymorphism
      dsaRecommend = mockDsaSheet[3].problems[0]; // Subsets
    } else {
      topic = "DBMS Transaction Control & DP";
      videoRecommend = dbmsPlaylist.videos[3]; // ACID Properties
      dsaRecommend = mockDsaSheet[4].problems[0]; // Climbing Stairs
    }
  }

  // Fallbacks if mapping goes out of range
  if (!videoRecommend) videoRecommend = dsaPlaylist.videos[0];
  if (!dsaRecommend) dsaRecommend = mockDsaSheet[0].problems[0];

  return {
    topic,
    video: videoRecommend,
    problem: dsaRecommend
  };
}
