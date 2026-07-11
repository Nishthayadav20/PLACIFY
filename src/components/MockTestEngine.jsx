import React, { useState, useEffect, useRef } from "react";
import { 
  Award, ShieldAlert, Clock, Code, BookOpen, AlertTriangle, 
  CheckCircle, Lock, QrCode, CreditCard, Send, Check 
} from "lucide-react";

export default function MockTestEngine({ isPremium, profile }) {
  const [unlockedTests, setUnlockedTests] = useState(() => {
    const saved = localStorage.getItem("unlocked_tests");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeTest, setActiveTest] = useState(null); // Active test object
  const [testMode, setTestMode] = useState("directory"); // 'directory' | 'paying' | 'active' | 'results'
  const [compilerLang, setCompilerLang] = useState(profile?.language || "C++");
  
  // Payment gateway states
  const [payingTestId, setPayingTestId] = useState(null);
  const [paySimulating, setPaySimulating] = useState(false);

  // Test session states
  const [timer, setTimer] = useState(3600); // 60 minutes
  const [tabViolations, setTabViolations] = useState(0);
  const [showCheatWarning, setShowCheatWarning] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [codeAnswers, setCodeAnswers] = useState({ 0: "", 1: "", 2: "" });
  const [selectedCodingIdx, setSelectedCodingIdx] = useState(0);
  const [compiling, setCompiling] = useState(false);
  const [compileOutput, setCompileOutput] = useState("");

  // Results state
  const [resultsData, setResultsData] = useState(null);

  const timerRef = useRef(null);

  const tests = [
    {
      id: "test-w1",
      week: "Week 1",
      topic: "Arrays, Pointers & OOPs Basics",
      aptitudeCount: 20,
      codingCount: 3,
      difficulty: "Basic to Intermediate"
    },
    {
      id: "test-w2",
      week: "Week 2",
      topic: "DBMS, SQL & Sliding Window",
      aptitudeCount: 20,
      codingCount: 3,
      difficulty: "Intermediate"
    }
  ];

  // Dynamic code templates helper
  const getTemplate = (qIdx, lang) => {
    const templates = {
      0: { // Reverse Subarray
        "C++": "vector<int> reverseSubarray(vector<int>& arr, int L, int R) {\n    // Write your code here in C++\n    \n}",
        "Java": "class Solution {\n    public int[] reverseSubarray(int[] arr, int L, int R) {\n        // Write your code here in Java\n        return new int[]{};\n    }\n}",
        "Python": "def reverseSubarray(arr: list, L: int, R: int) -> list:\n    # Write your code here in Python\n    return []",
        "JavaScript": "function reverseSubarray(arr, L, R) {\n    // Write your code here in JavaScript\n    return [];\n}"
      },
      1: { // Missing Number
        "C++": "int missingNumber(vector<int>& nums) {\n    // Write your code here in C++\n    return 0;\n}",
        "Java": "class Solution {\n    public int missingNumber(int[] nums) {\n        // Write your code here in Java\n        return 0;\n    }\n}",
        "Python": "def missingNumber(nums: list) -> int:\n    # Write your code here in Python\n    return 0",
        "JavaScript": "function missingNumber(nums) {\n    // Write your code here in JavaScript\n    return 0;\n}"
      },
      2: { // Valid Parentheses
        "C++": "bool isValid(string s) {\n    // Write your code here in C++\n    return false;\n}",
        "Java": "class Solution {\n    public boolean isValid(String s) {\n        // Write your code here in Java\n        return false;\n    }\n}",
        "Python": "def isValid(s: str) -> bool:\n    # Write your code here in Python\n    return False",
        "JavaScript": "function isValid(s) {\n    // Write your code here in JavaScript\n    return false;\n}"
      }
    };
    return templates[qIdx][lang] || templates[qIdx]["C++"];
  };

  const codingQuestions = [
    {
      title: "1. Reverse a Subarray",
      desc: "Given an array of integers and a range [L, R], reverse the elements between indices L and R (0-indexed)."
    },
    {
      title: "2. Find Missing Number",
      desc: "Given an array containing n distinct numbers in the range [0, n], return the only number in the range that is missing."
    },
    {
      title: "3. Valid Parentheses",
      desc: "Given a string containing brackets, determine if the input string is valid (brackets must close in correct order)."
    }
  ];

  // Dummy questions covering: 10 Quant, 5 OOPs, 5 DBMS
  const aptitudeQuestions = [
    // Quant
    { id: "q-0", question: "1. A train crosses a pole in 9 seconds with a speed of 60 km/h. What is the length of the train?", options: ["150 meters", "120 meters", "180 meters", "324 meters"], correctIdx: 0 },
    { id: "q-1", question: "2. If a card is drawn from a pack of 52 cards, what is the probability of getting a king?", options: ["1/13", "2/13", "1/26", "1/52"], correctIdx: 0 },
    { id: "q-2", question: "3. What is 25% of 40% of 400?", options: ["40", "80", "160", "200"], correctIdx: 0 },
    { id: "q-3", question: "4. A sum of money doubles itself in 8 years at simple interest. What is the rate of interest?", options: ["12.5%", "10%", "15%", "8%"], correctIdx: 0 },
    { id: "q-4", question: "5. Two numbers are in ratio 3:5. If their LCM is 75, find the smaller number.", options: ["15", "25", "5", "30"], correctIdx: 0 },
    { id: "q-5", question: "6. A and B can do a piece of work in 12 days, B and C in 15 days, C and A in 20 days. How long will A take alone?", options: ["30 days", "24 days", "40 days", "20 days"], correctIdx: 0 },
    { id: "q-6", question: "7. Find the average of first 40 natural numbers.", options: ["20.5", "21", "20", "19.5"], correctIdx: 0 },
    { id: "q-7", question: "8. A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?", options: ["5", "4", "3", "6"], correctIdx: 0 },
    { id: "q-8", question: "9. Find the odd man out in series: 3, 5, 11, 14, 17, 21.", options: ["14", "21", "17", "3"], correctIdx: 0 },
    { id: "q-9", question: "10. In how many ways can the letters of the word 'LEADER' be arranged?", options: ["360", "720", "144", "240"], correctIdx: 0 },
    
    // OOPs
    { id: "q-10", question: "11. Which OOPs concept describes wrapping code and data together into a single unit?", options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"], correctIdx: 0 },
    { id: "q-11", question: "12. In C++, which operator is used for dynamic memory allocation?", options: ["new", "malloc", "alloc", "delete"], correctIdx: 0 },
    { id: "q-12", question: "13. What type of inheritance is not supported directly in Java but supported in C++?", options: ["Multiple Inheritance", "Multilevel Inheritance", "Hierarchical Inheritance", "Single Inheritance"], correctIdx: 0 },
    { id: "q-13", question: "14. Creating multiple methods with same name but different signatures in a class is called:", options: ["Method Overloading", "Method Overriding", "Dynamic Binding", "Late Binding"], correctIdx: 0 },
    { id: "q-14", question: "15. Which access modifier restricts visibility to the defining class and its subclasses?", options: ["protected", "private", "public", "default"], correctIdx: 0 },
    
    // DBMS
    { id: "q-15", question: "16. In DBMS, what does the 'C' in ACID properties stand for?", options: ["Consistency", "Concurrency", "Commit", "Coherence"], correctIdx: 0 },
    { id: "q-16", question: "17. Which SQL command is used to add columns to an existing table structure?", options: ["ALTER TABLE", "UPDATE TABLE", "MODIFY TABLE", "INSERT INTO"], correctIdx: 0 },
    { id: "q-17", question: "18. A relation is in 2NF if it is in 1NF and contains no:", options: ["Partial Dependencies", "Transitive Dependencies", "Multivalued Dependencies", "Join Dependencies"], correctIdx: 0 },
    { id: "q-18", question: "19. Which constraint uniquely identifies each row in a database table?", options: ["Primary Key", "Foreign Key", "Unique Key", "Check Key"], correctIdx: 0 },
    { id: "q-19", question: "20. What SQL clause is used to filter query results after aggregating with GROUP BY?", options: ["HAVING", "WHERE", "ORDER BY", "SELECT"], correctIdx: 0 }
  ];

  // Save payments
  useEffect(() => {
    localStorage.setItem("unlocked_tests", JSON.stringify(unlockedTests));
  }, [unlockedTests]);

  // Tab switch anti-cheat detector
  useEffect(() => {
    if (testMode !== "active") return;

    const handleBlur = () => {
      setTabViolations(prev => {
        const next = prev + 1;
        if (next >= 2) {
          // Force auto-submit
          setShowCheatWarning(false);
          submitTest();
          alert("Test Auto-Submitted due to multiple tab switch violations.");
        } else {
          setShowCheatWarning(true);
        }
        return next;
      });
    };

    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [testMode]);

  // Timer counter
  useEffect(() => {
    if (testMode === "active") {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            submitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [testMode]);

  const handleOpenUnlock = (testId) => {
    setPayingTestId(testId);
    setTestMode("paying");
  };

  const handleSimulatePayment = () => {
    setPaySimulating(true);
    setTimeout(() => {
      setUnlockedTests(prev => ({ ...prev, [payingTestId]: true }));
      setPaySimulating(false);
      setTestMode("directory");
      setPayingTestId(null);
    }, 1500);
  };

  const startTest = (test) => {
    setActiveTest(test);
    setTimer(3600);
    setTabViolations(0);
    setShowCheatWarning(false);
    setSelectedAnswers({});
    
    const userLang = profile?.language || "C++";
    setCompilerLang(userLang);
    setCodeAnswers({
      0: getTemplate(0, userLang),
      1: getTemplate(1, userLang),
      2: getTemplate(2, userLang)
    });
    setTestMode("active");
  };

  const handleLanguageChange = (newLang) => {
    setCompilerLang(newLang);
    setCodeAnswers(prev => ({
      ...prev,
      [selectedCodingIdx]: getTemplate(selectedCodingIdx, newLang)
    }));
  };

  const handleRunCode = () => {
    setCompiling(true);
    setCompileOutput("Compiling execution environment...");
    setTimeout(() => {
      setCompiling(false);
      setCompileOutput("✔ Compilation Success!\n✔ Test Case 1: Passed\n✔ Test Case 2: Passed\n✔ Test Case 3: Passed\n\nAll tests passed successfully.");
    }, 1200);
  };

  const submitTest = () => {
    // Grade MCQ answers
    let correctMcq = 0;
    aptitudeQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIdx) {
        correctMcq++;
      }
    });

    const results = {
      mcqCorrect: correctMcq,
      totalMcq: 20,
      codingScore: 3, // mock score
      percentage: Math.round(((correctMcq + 3) / 23) * 100),
      durationTaken: 3600 - timer
    };

    setResultsData(results);
    setTestMode("results");
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (!isPremium) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <Lock size={48} style={{ color: "var(--danger)", marginBottom: "16px" }} />
        <h2>Premium Access Required</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "450px", margin: "8px auto 24px auto" }}>
          Weekly topic-wise examinations are only available on the Tailored roadmap track. Please return to the onboarding portal to register.
        </p>
      </div>
    );
  }

  return (
    <div className="mock-test-engine">
      {testMode === "directory" && (
        <>
          <div className="page-header">
            <h1>Weekly Mock Test Engine 🏆</h1>
            <p>Aptitude and Technical assessments matching actual recruitment cycles.</p>
          </div>

          <div className="grid-cols-2">
            {tests.map(test => {
              const isUnlocked = unlockedTests[test.id];
              return (
                <div key={test.id} className="card" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="badge badge-primary">{test.week}</span>
                    <span className="badge badge-success">{test.difficulty}</span>
                  </div>
                  <h3>{test.topic}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    <span>• {test.aptitudeCount} Aptitude MCQs</span>
                    <span>• {test.codingCount} DSA Coding Questions</span>
                    <span>• 60-Minute Timed Session</span>
                  </div>

                  <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
                    {isUnlocked ? (
                      <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => startTest(test)}>
                        Start Test
                      </button>
                    ) : (
                      <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", display: "flex", gap: "8px" }} onClick={() => handleOpenUnlock(test.id)}>
                        <Lock size={16} /> Unlock Mock Test (₹30)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Payment Gateway Modal */}
      {testMode === "paying" && (
        <div style={{ maxWidth: "500px", margin: "40px auto" }} className="card">
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <QrCode size={40} style={{ color: "var(--primary)", marginBottom: "12px" }} />
            <h2>Payment Verification</h2>
            <p style={{ color: "var(--text-secondary)" }}>Verify ₹30 registration fee to unlock test workspace.</p>
          </div>

          <div style={{ backgroundColor: "var(--bg-primary)", padding: "16px", borderRadius: "var(--radius-sm)", marginBottom: "20px", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>Item:</span>
              <strong>Weekly MCQ & DSA Test Code</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Fee:</span>
              <strong style={{ color: "var(--success)" }}>₹30.00</strong>
            </div>
          </div>

          {/* Dummy QR Code UI */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{ width: "180px", height: "180px", border: "2px dashed var(--border-color)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff", position: "relative" }}>
              <QrCode size={120} style={{ opacity: 0.8 }} />
              <div style={{ position: "absolute", bottom: "8px", fontSize: "0.7rem", color: "var(--text-muted)" }}>Scan QR via BHIM UPI</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleSimulatePayment} disabled={paySimulating}>
              {paySimulating ? "Simulating Payment Transfer..." : "Confirm Mock Payment (₹30)"}
            </button>
            <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setTestMode("directory")}>
              Cancel Checkout
            </button>
          </div>
        </div>
      )}

      {/* TIMED TEST ENV */}
      {testMode === "active" && (
        <div style={{ animation: "fadeIn 0.2s ease-out" }}>
          {/* Header Panel */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", backgroundColor: "#000000", border: "1px solid var(--border-color)", marginBottom: "20px", borderRadius: "var(--radius-md)", color: "#ffffff" }}>
            <div>
              <h2 style={{ fontSize: "1.3rem" }}>{activeTest.topic} Test</h2>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Anti-Cheat Engine Active • Do not switch tabs</span>
            </div>

            <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: timer < 300 ? "var(--danger)" : "var(--primary)", fontWeight: 700 }}>
                <Clock size={20} />
                <span style={{ fontSize: "1.2rem" }}>{formatTime(timer)}</span>
              </div>
              <button className="btn btn-primary" style={{ backgroundColor: "var(--danger)" }} onClick={submitTest}>
                Submit Exam
              </button>
            </div>
          </div>

          {/* Anti-cheat tab Switch warning */}
          {showCheatWarning && (
            <div className="cheat-alert-overlay" onClick={() => setShowCheatWarning(false)}>
              <ShieldAlert size={64} style={{ marginBottom: "16px" }} />
              <h2>Anti-Cheat Alert! Tab Exit Detected.</h2>
              <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "8px 0 24px 0" }}>
                Switching tabs or minimizing the browser again will force auto-submission of your test answers. Please stay in the viewport.
              </p>
              <button className="btn btn-primary" style={{ backgroundColor: "#000000", border: "1px solid var(--danger)", color: "var(--danger)", fontWeight: 700 }} onClick={() => setShowCheatWarning(false)}>
                I Understand, Return to Test
              </button>
            </div>
          )}

          {/* Workspace Grid */}
          <div className="test-workspace-grid">
            {/* Aptitude list */}
            <div className="aptitude-panel">
              <h3 style={{ display: "flex", gap: "8px", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "16px" }}>
                <BookOpen size={20} style={{ color: "var(--primary)" }} />
                <span>Section 1: Aptitude (20 MCQs)</span>
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {aptitudeQuestions.map((q, idx) => (
                  <div key={q.id} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <p style={{ fontWeight: 600, color: "var(--text-primary)" }}>{q.question}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {q.options.map((opt, optIdx) => {
                        const isChecked = selectedAnswers[idx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            className="btn"
                            style={{
                              justifyContent: "flex-start",
                              padding: "10px 14px",
                              fontSize: "0.85rem",
                              backgroundColor: isChecked ? "var(--primary-light)" : "#000000",
                              borderColor: isChecked ? "var(--primary)" : "var(--border-color)",
                              color: isChecked ? "var(--primary)" : "var(--text-secondary)"
                            }}
                            onClick={() => setSelectedAnswers(prev => ({ ...prev, [idx]: optIdx }))}
                          >
                            <strong>{["A", "B", "C", "D"][optIdx]}.</strong> {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coding Panel */}
            <div className="coding-panel">
              <div style={{ display: "flex", backgroundColor: "#1e293b", borderBottom: "1px solid #334155" }}>
                {codingQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    className={`btn`}
                    style={{
                      borderRadius: 0,
                      border: "none",
                      padding: "14px 20px",
                      fontSize: "0.85rem",
                      backgroundColor: selectedCodingIdx === idx ? "#0f172a" : "#1e293b",
                      color: selectedCodingIdx === idx ? "#ffffff" : "#94a3b8",
                      borderBottom: selectedCodingIdx === idx ? "2px solid var(--primary)" : "none"
                    }}
                    onClick={() => setSelectedCodingIdx(idx)}
                  >
                    Code {idx + 1}
                  </button>
                ))}
              </div>

              {/* Editor Workspace */}
              <div className="coding-editor-wrapper">
                <div style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "12px" }}>
                  <h4 style={{ color: "#f8fafc", marginBottom: "6px" }}>{codingQuestions[selectedCodingIdx].title}</h4>
                  <p style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>{codingQuestions[selectedCodingIdx].desc}</p>
                </div>

                <textarea
                  className="code-textarea"
                  value={codeAnswers[selectedCodingIdx]}
                  onChange={(e) => setCodeAnswers(prev => ({ ...prev, [selectedCodingIdx]: e.target.value }))}
                />

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Compiler Language:</span>
                    <select
                      className="filter-select"
                      style={{ padding: "4px 8px", fontSize: "0.75rem", backgroundColor: "#1e293b", border: "1px solid #334155", color: "#f8fafc" }}
                      value={compilerLang}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                    >
                      <option value="C++">C++17</option>
                      <option value="Java">Java 11</option>
                      <option value="Python">Python 3.8</option>
                      <option value="JavaScript">Node JS (ES6)</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" onClick={handleRunCode} disabled={compiling}>
                    {compiling ? "Running Code..." : "Run Mock Code Tests"}
                  </button>
                </div>

                {compileOutput && (
                  <div style={{
                    backgroundColor: "#1e293b",
                    color: "#cbd5e1",
                    padding: "12px",
                    fontFamily: "monospace",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                    whiteSpace: "pre-line",
                    border: "1px solid #334155",
                    marginTop: "12px"
                  }}>
                    {compileOutput}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS DISPLAY PANEL */}
      {testMode === "results" && (
        <div style={{ maxWidth: "600px", margin: "40px auto" }} className="card">
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <Award size={48} style={{ color: "var(--success)", marginBottom: "12px" }} />
            <h2>Assessment Performance Summary</h2>
            <p style={{ color: "var(--text-secondary)" }}>Your weekly mock test breakdown analysis.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            <div className="card" style={{ padding: "16px", textAlign: "center", backgroundColor: "var(--bg-primary)" }}>
              <h5 style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>Aptitude Score</h5>
              <h2>{resultsData.mcqCorrect} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>/ 20</span></h2>
            </div>
            <div className="card" style={{ padding: "16px", textAlign: "center", backgroundColor: "var(--bg-primary)" }}>
              <h5 style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>Coding Questions</h5>
              <h2>{resultsData.codingScore} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>/ 3</span></h2>
            </div>
          </div>

          <div style={{ marginBottom: "24px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
            <div style={{ padding: "12px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)" }}>
              <span>Total Score Percentage:</span>
              <strong style={{ color: "var(--primary)" }}>{resultsData.percentage}%</strong>
            </div>
            <div style={{ padding: "12px", display: "flex", justifyContent: "space-between" }}>
              <span>Cheat Flag Violations:</span>
              <strong style={{ color: tabViolations > 0 ? "var(--danger)" : "var(--success)" }}>{tabViolations}</strong>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => setTestMode("directory")}>
            Return to Assessment Board
          </button>
        </div>
      )}
    </div>
  );
}
