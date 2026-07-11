import React, { useState } from "react";
import { Database, ExternalLink, CheckCircle } from "lucide-react";

export default function SqlPractice() {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("sql_practice_completed");
    return saved ? JSON.parse(saved) : {};
  });

  const toggleComplete = (id) => {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem("sql_practice_completed", JSON.stringify(next));
  };

  const categories = [
    {
      title: "Category 1: SQL Basic Select & Filtering Queries (1-1000 Range)",
      problems: [
        { id: "sql-1", name: "Recyclable and Low Fat Products", leetcode: "https://leetcode.com/problems/recyclable-and-low-fat-products/", difficulty: "Easy" },
        { id: "sql-2", name: "Find Customer Referee", leetcode: "https://leetcode.com/problems/find-customer-referee/", difficulty: "Easy" },
        { id: "sql-3", name: "Big Countries", leetcode: "https://leetcode.com/problems/big-countries/", difficulty: "Easy" },
        { id: "sql-4", name: "Article Views I", leetcode: "https://leetcode.com/problems/article-views-i/", difficulty: "Easy" },
        { id: "sql-5", name: "Invalid Tweets", leetcode: "https://leetcode.com/problems/invalid-tweets/", difficulty: "Easy" }
      ]
    },
    {
      title: "Category 2: Basic Joins & Multi-Table Queries (1001-2500 Range)",
      problems: [
        { id: "sql-6", name: "Replace Employee ID With The Unique Identifier", leetcode: "https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/", difficulty: "Easy" },
        { id: "sql-7", name: "Product Sales Analysis I", leetcode: "https://leetcode.com/problems/product-sales-analysis-i/", difficulty: "Easy" },
        { id: "sql-8", name: "Customer Who Visited but Did Not Make Any Transactions", leetcode: "https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/", difficulty: "Easy" },
        { id: "sql-9", name: "Rising Temperature", leetcode: "https://leetcode.com/problems/rising-temperature/", difficulty: "Easy" },
        { id: "sql-10", name: "Average Time of Process per Machine", leetcode: "https://leetcode.com/problems/average-time-of-process-per-machine/", difficulty: "Easy" }
      ]
    },
    {
      title: "Category 3: Basic Aggregate Functions & Grouping (2501-4000 Range)",
      problems: [
        { id: "sql-11", name: "Not Boring Movies", leetcode: "https://leetcode.com/problems/not-boring-movies/", difficulty: "Easy" },
        { id: "sql-12", name: "Average Selling Price", leetcode: "https://leetcode.com/problems/average-selling-price/", difficulty: "Easy" },
        { id: "sql-13", name: "Project Employees I", leetcode: "https://leetcode.com/problems/project-employees-i/", difficulty: "Easy" },
        { id: "sql-14", name: "Percentage of Users Attended a Contest", leetcode: "https://leetcode.com/problems/percentage-of-users-attended-a-contest/", difficulty: "Easy" },
        { id: "sql-15", name: "Queries Quality and Percentage", leetcode: "https://leetcode.com/problems/queries-quality-and-percentage/", difficulty: "Easy" }
      ]
    },
    {
      title: "Category 4: Advanced Select, Joins & Subqueries (4001-5000+ Range)",
      problems: [
        { id: "sql-16", name: "The Number of Employees Which Report to Each Employee", leetcode: "https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/", difficulty: "Medium" },
        { id: "sql-17", name: "Primary Department for Each Employee", leetcode: "https://leetcode.com/problems/primary-department-for-each-employee/", difficulty: "Easy" },
        { id: "sql-18", name: "Triangle Judgement", leetcode: "https://leetcode.com/problems/triangle-judgement/", difficulty: "Easy" },
        { id: "sql-19", name: "Consecutive Numbers", leetcode: "https://leetcode.com/problems/consecutive-numbers/", difficulty: "Medium" },
        { id: "sql-20", name: "Product Price at a Given Date", leetcode: "https://leetcode.com/problems/product-price-at-a-given-date/", difficulty: "Medium" }
      ]
    }
  ];

  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalProblems = categories.reduce((acc, cat) => acc + cat.problems.length, 0);
  const progressPercent = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;

  return (
    <div className="sql-practice-view">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#ffffff" }}>SQL 5000+ Practice Sheet 🗄️</h1>
          <p>Master SQL Query Interview Questions grouped by topics with direct LeetCode integration.</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontWeight: 600 }}>Solve Progress: {completedCount} / {totalProblems} solved</span>
          <div className="progress-track" style={{ width: "200px", height: "8px", marginTop: "4px" }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%`, backgroundColor: "var(--success)" }}></div>
          </div>
        </div>
      </div>

      {/* LeetCode Official SQL Hub Alert Banner */}
      <div style={{
        padding: "16px",
        backgroundColor: "#0d1117",
        border: "1px solid var(--border-color)",
        borderRadius: "6px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h4 style={{ margin: "0 0 4px 0", color: "#ffffff" }}>Official LeetCode 5000+ Database Track</h4>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>Access the complete LeetCode database study plans, exercises, and discussions.</p>
        </div>
        <a 
          href="https://leetcode.com/studyplan/top-sql-50/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
          style={{ padding: "8px 16px", backgroundColor: "#ffffff", color: "#000000", border: "none", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          Open LeetCode SQL 50 <ExternalLink size={14} />
        </a>
      </div>

      {/* Category Accordion */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="card" style={{ borderLeft: "4px solid var(--primary)", backgroundColor: "#0d1117" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "1.1rem", color: "#ffffff" }}>{cat.title}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {cat.problems.map((prob) => (
                <div 
                  key={prob.id} 
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
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={completed[prob.id] || false} 
                        onChange={() => toggleComplete(prob.id)} 
                      />
                      <div className="custom-checkbox">
                        {completed[prob.id] && <CheckCircle size={10} style={{ color: "var(--success)" }} />}
                      </div>
                    </label>
                    <div>
                      <span style={{ fontSize: "0.85rem", color: "#ffffff" }}>{prob.name}</span>
                      <span className={`badge ${prob.difficulty === "Easy" ? "badge-success" : "badge-warning"}`} style={{ fontSize: "0.6rem", marginLeft: "8px", verticalAlign: "middle" }}>
                        {prob.difficulty}
                      </span>
                    </div>
                  </div>
                  <a 
                    href={prob.leetcode} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary"
                    style={{ padding: "6px 12px", fontSize: "0.8rem", display: "inline-flex", gap: "6px" }}
                  >
                    Solve on LeetCode <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
