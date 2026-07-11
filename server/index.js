import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. Onboarding or Login API
app.post("/api/auth/onboard", (req, res) => {
  const { name, github, leetcode, hackerrank, codechef, dsaLevel, timelineDays, currentDay, isLoggedIn } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  // Use name/github combo as a simple unique identifier
  const id = name.trim().toLowerCase().replace(/\s+/g, "-");

  db.get("SELECT * FROM users WHERE id = ?", [id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (user) {
      // User exists, return profile details
      return res.json({ message: "Welcome back!", profile: user });
    } else {
      // Create new user profile
      const query = `INSERT INTO users (id, name, github, leetcode, hackerrank, codechef, dsaLevel, timelineDays, currentDay, isLoggedIn)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.run(query, [id, name, github, leetcode, hackerrank, codechef, dsaLevel, timelineDays, currentDay, isLoggedIn ? 1 : 0], function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
          message: "Profile created!",
          profile: { id, name, github, leetcode, hackerrank, codechef, dsaLevel, timelineDays, currentDay, isLoggedIn }
        });
      });
    }
  });
});

// 2. Fetch User Profile
app.get("/api/profile/:id", (req, res) => {
  db.get("SELECT * FROM users WHERE id = ?", [req.params.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: "User profile not found" });
    }
    res.json(user);
  });
});

// 3. Update User Profile
app.put("/api/profile", (req, res) => {
  const { id, name, github, leetcode, hackerrank, codechef, dsaLevel, timelineDays, currentDay, isLoggedIn } = req.body;
  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  const query = `UPDATE users SET 
                 name = ?, github = ?, leetcode = ?, hackerrank = ?, codechef = ?, 
                 dsaLevel = ?, timelineDays = ?, currentDay = ?, isLoggedIn = ?
                 WHERE id = ?`;
  db.run(query, [name, github, leetcode, hackerrank, codechef, dsaLevel, timelineDays, currentDay, isLoggedIn ? 1 : 0, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Profile updated successfully!" });
  });
});

// 4. Fetch Progress State
app.get("/api/progress/:userId", (req, res) => {
  db.all("SELECT * FROM progress WHERE userId = ?", [req.params.userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Map list to a key-value object to match frontend state structure
    const playlistState = {};
    const dsaState = {};

    rows.forEach(row => {
      if (row.itemType === "video") {
        playlistState[row.itemId] = row.completed === 1;
      } else if (row.itemType === "dsa") {
        dsaState[row.itemId] = { id: row.itemId, completed: row.completed === 1 };
      }
    });

    res.json({ playlistState, dsaState });
  });
});

// 5. Save/Toggle Progress Status
app.post("/api/progress", (req, res) => {
  const { userId, itemType, itemId, completed } = req.body;
  if (!userId || !itemType || !itemId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const query = `INSERT INTO progress (userId, itemType, itemId, completed)
                 VALUES (?, ?, ?, ?)
                 ON CONFLICT(userId, itemType, itemId) DO UPDATE SET completed = excluded.completed`;
  db.run(query, [userId, itemType, itemId, completed ? 1 : 0], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Progress status saved!" });
  });
});

// 6. Fetch Companies & Experiences
app.get("/api/companies", (req, res) => {
  db.all("SELECT * FROM companies", [], (err, comps) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.all("SELECT * FROM experiences", [], (err, exps) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Group experiences inside companies
      const data = comps.map(c => {
        const companyExps = exps
          .filter(e => e.companyId === c.id)
          .map(e => ({
            ...e,
            tags: JSON.parse(e.tags || "[]")
          }));
        return {
          ...c,
          experiences: companyExps
        };
      });

      res.json(data);
    });
  });
});

// 7. Post Placement Experience
app.post("/api/companies/experience", (req, res) => {
  const { companyId, user, title, tags, content, difficulty, date } = req.body;
  if (!companyId || !user || !title || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const id = "exp-" + Date.now();
  const query = `INSERT INTO experiences (id, companyId, user, title, tags, content, difficulty, date)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [id, companyId, user, title, JSON.stringify(tags || []), content, difficulty || "Medium", date || "Today"], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Experience shared!", id });
  });
});

app.listen(PORT, () => {
  console.log(`PLACIFY Local Server running on http://localhost:${PORT}`);
});
