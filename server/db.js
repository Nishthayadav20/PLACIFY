import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database at:", dbPath);
    initializeTables();
  }
});

function initializeTables() {
  db.serialize(() => {
    // 1. Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      github TEXT,
      leetcode TEXT,
      hackerrank TEXT,
      codechef TEXT,
      dsaLevel TEXT,
      timelineDays INTEGER,
      currentDay INTEGER,
      isLoggedIn INTEGER
    )`);

    // 2. Progress tracker table
    db.run(`CREATE TABLE IF NOT EXISTS progress (
      userId TEXT,
      itemType TEXT, -- 'video' or 'dsa'
      itemId TEXT,
      completed INTEGER,
      PRIMARY KEY (userId, itemType, itemId)
    )`);

    // 3. Companies table
    db.run(`CREATE TABLE IF NOT EXISTS companies (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      logo TEXT,
      color TEXT,
      ctc TEXT,
      cgpaCutoff REAL,
      visitingCollege TEXT,
      role TEXT
    )`);

    // 4. Experiences table
    db.run(`CREATE TABLE IF NOT EXISTS experiences (
      id TEXT PRIMARY KEY,
      companyId TEXT,
      user TEXT,
      title TEXT,
      tags TEXT, -- JSON string array
      content TEXT,
      difficulty TEXT,
      date TEXT,
      FOREIGN KEY(companyId) REFERENCES companies(id)
    )`);

    // Seed default companies if empty
    db.get("SELECT COUNT(*) as count FROM companies", (err, row) => {
      if (row && row.count === 0) {
        seedInitialData();
      }
    });
  });
}

function seedInitialData() {
  console.log("Seeding default company intelligence records...");
  const initialCompanies = [
    {
      id: "c-1",
      name: "Google",
      logo: "G",
      color: "#4285F4",
      ctc: "35 - 45 LPA",
      cgpaCutoff: 8.0,
      visitingCollege: "Off-Campus / Pool Campus",
      role: "Software Engineering Intern/Grad"
    },
    {
      id: "c-2",
      name: "Amazon",
      logo: "A",
      color: "#FF9900",
      ctc: "28 - 32 LPA",
      cgpaCutoff: 7.5,
      visitingCollege: "On-Campus (Tier-1/2), Pool (Tier-3)",
      role: "Software Development Engineer (SDE-1)"
    },
    {
      id: "c-3",
      name: "Microsoft",
      logo: "M",
      color: "#F25022",
      ctc: "30 - 36 LPA",
      cgpaCutoff: 8.0,
      visitingCollege: "Off-Campus / CodeWithoutBarriers",
      role: "Support / Software Engineer"
    },
    {
      id: "c-4",
      name: "TCS Digital",
      logo: "T",
      color: "#1B365D",
      ctc: "7.0 - 7.5 LPA",
      cgpaCutoff: 6.0,
      visitingCollege: "On-Campus (Tier-3 National Qualifier)",
      role: "Systems Engineer (Digital Track)"
    }
  ];

  const stmt = db.prepare("INSERT INTO companies (id, name, logo, color, ctc, cgpaCutoff, visitingCollege, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  initialCompanies.forEach(c => {
    stmt.run(c.id, c.name, c.logo, c.color, c.ctc, c.cgpaCutoff, c.visitingCollege, c.role);
  });
  stmt.finalize();

  const initialExps = [
    {
      id: "exp-1-1",
      companyId: "c-1",
      user: "Rohan Sharma",
      title: "SWE Intern Interview Experience",
      tags: JSON.stringify(["Graphs", "Segment Trees"]),
      content: "The OA was tough. Got 2 questions on Graphs (Shortest Path variations). In the technical rounds, they focused heavily on clean code and edge cases. One question was finding the lowest common ancestor in a custom tree format.",
      difficulty: "Hard",
      date: "June 2026"
    },
    {
      id: "exp-2-1",
      companyId: "c-2",
      user: "Ayush Verma",
      title: "SDE-1 Off-Campus Drive",
      tags: JSON.stringify(["DP", "Tries"]),
      content: "OA had 2 coding questions. One was Knapsack variant, other was Trie-based lookup prefix counts. In interviews, they asked about project structure, Git workflow, and 14 Leadership Principles.",
      difficulty: "Medium",
      date: "May 2026"
    }
  ];

  const stmtExp = db.prepare("INSERT INTO experiences (id, companyId, user, title, tags, content, difficulty, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  initialExps.forEach(e => {
    stmtExp.run(e.id, e.companyId, e.user, e.title, e.tags, e.content, e.difficulty, e.date);
  });
  stmtExp.finalize();
}

export default db;
