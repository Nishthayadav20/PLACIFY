import React, { useState, useEffect, useRef } from "react";
import { 
  Play, RotateCcw, Activity, LayoutGrid, Network, Eye 
} from "lucide-react";

export default function AlgoVisualizer() {
  const [activeModule, setActiveModule] = useState("sorting"); // 'sorting' | 'pathfinding' | 'bst'
  
  // ==========================================
  // 1. SORTING VISUALIZER STATE & LOGIC
  // ==========================================
  const [sortArray, setSortArray] = useState([]);
  const [comparingIdxs, setComparingIdxs] = useState([]);
  const [sortedIdxs, setSortedIdxs] = useState([]);
  const [sorting, setSorting] = useState(false);
  const sortingTimeoutRef = useRef([]);

  const generateNewArray = () => {
    clearSortingTimeouts();
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push(Math.floor(Math.random() * 80) + 15);
    }
    setSortArray(arr);
    setComparingIdxs([]);
    setSortedIdxs([]);
    setSorting(false);
  };

  const clearSortingTimeouts = () => {
    sortingTimeoutRef.current.forEach(t => clearTimeout(t));
    sortingTimeoutRef.current = [];
  };

  useEffect(() => {
    generateNewArray();
    return () => clearSortingTimeouts();
  }, []);

  const runBubbleSort = async () => {
    if (sorting) return;
    setSorting(true);
    clearSortingTimeouts();

    let arr = [...sortArray];
    let animations = []; // entries: { type: 'compare'|'swap'|'sorted', indices: [i, j], val: [] }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push({ type: "compare", indices: [j, j + 1] });
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          animations.push({ type: "swap", indices: [j, j + 1], val: [...arr] });
        }
      }
      animations.push({ type: "sorted", indices: [arr.length - i - 1] });
    }

    // Play animations
    animations.forEach((step, idx) => {
      const timeout = setTimeout(() => {
        if (step.type === "compare") {
          setComparingIdxs(step.indices);
        } else if (step.type === "swap") {
          setSortArray(step.val);
          setComparingIdxs(step.indices);
        } else if (step.type === "sorted") {
          setSortedIdxs(prev => [...prev, ...step.indices]);
        }

        if (idx === animations.length - 1) {
          setComparingIdxs([]);
          setSorting(false);
        }
      }, idx * 100);
      sortingTimeoutRef.current.push(timeout);
    });
  };

  const runSelectionSort = async () => {
    if (sorting) return;
    setSorting(true);
    clearSortingTimeouts();

    let arr = [...sortArray];
    let animations = [];

    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        animations.push({ type: "compare", indices: [j, minIdx] });
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        animations.push({ type: "swap", indices: [i, minIdx], val: [...arr] });
      }
      animations.push({ type: "sorted", indices: [i] });
    }
    animations.push({ type: "sorted", indices: [arr.length - 1] });

    animations.forEach((step, idx) => {
      const timeout = setTimeout(() => {
        if (step.type === "compare") {
          setComparingIdxs(step.indices);
        } else if (step.type === "swap") {
          setSortArray(step.val);
          setComparingIdxs(step.indices);
        } else if (step.type === "sorted") {
          setSortedIdxs(prev => [...prev, ...step.indices]);
        }

        if (idx === animations.length - 1) {
          setComparingIdxs([]);
          setSorting(false);
        }
      }, idx * 120);
      sortingTimeoutRef.current.push(timeout);
    });
  };

  // ==========================================
  // 2. PATHFINDING STATE & LOGIC
  // ==========================================
  const GRID_ROWS = 12;
  const GRID_COLS = 20;
  const START_NODE = [2, 2];
  const END_NODE = [8, 16];

  const [grid, setGrid] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [pathNodes, setPathNodes] = useState(new Set());
  const [pathfinding, setPathfinding] = useState(false);
  const pathTimeoutRef = useRef([]);

  const initializeGrid = () => {
    clearPathfindingTimeouts();
    const rows = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      const row = [];
      for (let c = 0; c < GRID_COLS; c++) {
        row.push({
          row: r,
          col: c,
          isStart: r === START_NODE[0] && c === START_NODE[1],
          isEnd: r === END_NODE[0] && c === END_NODE[1],
          isWall: false
        });
      }
      rows.push(row);
    }
    setGrid(rows);
    setVisitedNodes(new Set());
    setPathNodes(new Set());
    setPathfinding(false);
  };

  const clearPathfindingTimeouts = () => {
    pathTimeoutRef.current.forEach(t => clearTimeout(t));
    pathTimeoutRef.current = [];
  };

  useEffect(() => {
    initializeGrid();
    return () => clearPathfindingTimeouts();
  }, []);

  const handleCellClick = (r, c) => {
    if (pathfinding) return;
    if ((r === START_NODE[0] && c === START_NODE[1]) || (r === END_NODE[0] && c === END_NODE[1])) return;

    setGrid(prev => {
      const copy = prev.map(row => row.map(cell => {
        if (cell.row === r && cell.col === c) {
          return { ...cell, isWall: !cell.isWall };
        }
        return cell;
      }));
      return copy;
    });
  };

  const runBFS = () => {
    if (pathfinding) return;
    setPathfinding(true);
    clearPathfindingTimeouts();
    setVisitedNodes(new Set());
    setPathNodes(new Set());

    const queue = [START_NODE];
    const visited = new Set([`${START_NODE[0]},${START_NODE[1]}`]);
    const parentMap = {};
    const orderVisited = [];
    let found = false;

    while (queue.length > 0) {
      const [r, c] = queue.shift();
      orderVisited.push([r, c]);

      if (r === END_NODE[0] && c === END_NODE[1]) {
        found = true;
        break;
      }

      // Check 4 directions
      const neighbors = [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1]
      ];

      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < GRID_ROWS && nc >= 0 && nc < GRID_COLS) {
          const isWall = grid[nr][nc].isWall;
          const key = `${nr},${nc}`;
          if (!isWall && !visited.has(key)) {
            visited.add(key);
            parentMap[key] = `${r},${c}`;
            queue.push([nr, nc]);
          }
        }
      }
    }

    // Animate Visited Nodes
    orderVisited.forEach(([vr, vc], idx) => {
      const t = setTimeout(() => {
        setVisitedNodes(prev => {
          const next = new Set(prev);
          next.add(`${vr},${vc}`);
          return next;
        });

        // Trigger shortest path drawing if finished and found
        if (idx === orderVisited.length - 1) {
          if (found) {
            drawPath(parentMap);
          } else {
            setPathfinding(false);
          }
        }
      }, idx * 25);
      pathTimeoutRef.current.push(t);
    });
  };

  const drawPath = (parentMap) => {
    const path = [];
    let curr = `${END_NODE[0]},${END_NODE[1]}`;
    while (curr) {
      path.unshift(curr);
      curr = parentMap[curr];
    }

    path.forEach((key, idx) => {
      const t = setTimeout(() => {
        setPathNodes(prev => {
          const next = new Set(prev);
          next.add(key);
          return next;
        });
        if (idx === path.length - 1) {
          setPathfinding(false);
        }
      }, idx * 40);
      pathTimeoutRef.current.push(t);
    });
  };

  // ==========================================
  // 3. BINARY SEARCH TREE STATE & LOGIC
  // ==========================================
  const treeNodes = [
    { id: 50, x: 250, y: 40, left: 30, right: 70 },
    { id: 30, x: 140, y: 120, left: 20, right: 40 },
    { id: 70, x: 360, y: 120, left: 60, right: 80 },
    { id: 20, x: 80, y: 200 },
    { id: 40, x: 200, y: 200 },
    { id: 60, x: 300, y: 200 },
    { id: 80, x: 420, y: 200 }
  ];

  const [activeBstNode, setActiveBstNode] = useState(null);
  const [bstTraversalOrder, setBstTraversalOrder] = useState([]);
  const [bstRunning, setBstRunning] = useState(false);
  const bstTimeoutRef = useRef([]);

  const runBstTraversal = (type) => {
    if (bstRunning) return;
    setBstRunning(true);
    setActiveBstNode(null);
    setBstTraversalOrder([]);
    bstTimeoutRef.current.forEach(t => clearTimeout(t));
    bstTimeoutRef.current = [];

    let order = [];
    if (type === "preorder") {
      order = [50, 30, 20, 40, 70, 60, 80];
    } else if (type === "inorder") {
      order = [20, 30, 40, 50, 60, 70, 80];
    } else {
      order = [20, 40, 30, 60, 80, 70, 50];
    }

    order.forEach((nodeId, idx) => {
      const t = setTimeout(() => {
        setActiveBstNode(nodeId);
        setBstTraversalOrder(prev => [...prev, nodeId]);
        if (idx === order.length - 1) {
          setBstRunning(false);
        }
      }, idx * 600);
      bstTimeoutRef.current.push(t);
    });
  };

  return (
    <div className="card" style={{ maxWidth: "1100px", margin: "24px auto", padding: "30px", minHeight: "560px" }}>
      
      {/* Selector Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, display: "flex", gap: "10px", alignItems: "center" }}>
            <Activity size={24} style={{ color: "var(--primary)" }} />
            Interactive 3D Algorithm Visualizer
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "4px" }}>
            Step through computational data models and see algorithms execute live in your browser.
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", backgroundColor: "#1e293b", padding: "4px", borderRadius: "8px" }}>
          <button 
            className="btn" 
            style={{ 
              fontSize: "0.85rem", 
              padding: "8px 14px", 
              border: "none",
              backgroundColor: activeModule === "sorting" ? "var(--primary)" : "transparent",
              color: activeModule === "sorting" ? "#ffffff" : "#94a3b8"
            }}
            onClick={() => setActiveModule("sorting")}
          >
            <Eye size={14} /> Array Sorting
          </button>
          <button 
            className="btn" 
            style={{ 
              fontSize: "0.85rem", 
              padding: "8px 14px", 
              border: "none",
              backgroundColor: activeModule === "pathfinding" ? "var(--primary)" : "transparent",
              color: activeModule === "pathfinding" ? "#ffffff" : "#94a3b8"
            }}
            onClick={() => setActiveModule("pathfinding")}
          >
            <LayoutGrid size={14} /> BFS Pathfinding
          </button>
          <button 
            className="btn" 
            style={{ 
              fontSize: "0.85rem", 
              padding: "8px 14px", 
              border: "none",
              backgroundColor: activeModule === "bst" ? "var(--primary)" : "transparent",
              color: activeModule === "bst" ? "#ffffff" : "#94a3b8"
            }}
            onClick={() => setActiveModule("bst")}
          >
            <Network size={14} /> Binary Trees
          </button>
        </div>
      </div>

      {/* MODULE 1: SORTING VISUALIZER */}
      {activeModule === "sorting" && (
        <div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <button className="btn btn-secondary" onClick={generateNewArray} disabled={sorting}>
              <RotateCcw size={14} /> Generate Array
            </button>
            <button className="btn btn-primary" onClick={runBubbleSort} disabled={sorting}>
              <Play size={14} /> Bubble Sort
            </button>
            <button className="btn btn-primary" style={{ backgroundColor: "var(--success)" }} onClick={runSelectionSort} disabled={sorting}>
              <Play size={14} /> Selection Sort
            </button>
          </div>

          <div style={{ 
            height: "320px", 
            backgroundColor: "#0f172a", 
            border: "1px solid #1e293b", 
            borderRadius: "8px", 
            display: "flex", 
            alignItems: "flex-end", 
            justifyContent: "center", 
            gap: "4px",
            padding: "20px" 
          }}>
            {sortArray.map((val, idx) => {
              const isComparing = comparingIdxs.includes(idx);
              const isSorted = sortedIdxs.includes(idx);
              let barColor = "var(--primary)";
              if (isComparing) barColor = "var(--warning)";
              if (isSorted) barColor = "var(--success)";

              return (
                <div 
                  key={idx}
                  style={{
                    height: `${val}%`,
                    width: "32px",
                    backgroundColor: barColor,
                    borderRadius: "4px 4px 0 0",
                    transition: "height 0.05s ease, background-color 0.1s ease",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "0.7rem",
                    paddingBottom: "6px",
                    fontWeight: 600
                  }}
                >
                  {val}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODULE 2: PATHFINDING GRID */}
      {activeModule === "pathfinding" && (
        <div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px", alignItems: "center" }}>
            <button className="btn btn-secondary" onClick={initializeGrid} disabled={pathfinding}>
              <RotateCcw size={14} /> Clear Grid
            </button>
            <button className="btn btn-primary" onClick={runBFS} disabled={pathfinding}>
              <Play size={14} /> BFS Search (Queue)
            </button>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              💡 Click on any grid cell to build or toggle walls. Start is 🟩, Target is 🟥.
            </span>
          </div>

          <div style={{ 
            backgroundColor: "#0f172a", 
            border: "1px solid #1e293b", 
            borderRadius: "8px", 
            padding: "16px",
            display: "flex",
            justifyContent: "center"
          }}>
            <div style={{
              display: "grid",
              gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
              gap: "2px"
            }}>
              {grid.map((row, rIdx) => (
                <div key={rIdx} style={{ display: "flex", gap: "2px" }}>
                  {row.map((cell, cIdx) => {
                    const key = `${rIdx},${cIdx}`;
                    const isVisited = visitedNodes.has(key);
                    const isPath = pathNodes.has(key);

                    let bgColor = "#1e293b";
                    if (cell.isStart) bgColor = "var(--success)";
                    else if (cell.isEnd) bgColor = "var(--danger)";
                    else if (cell.isWall) bgColor = "#020617";
                    else if (isPath) bgColor = "var(--warning)";
                    else if (isVisited) bgColor = "rgba(99, 102, 241, 0.4)";

                    return (
                      <div
                        key={cIdx}
                        style={{
                          width: "28px",
                          height: "28px",
                          backgroundColor: bgColor,
                          borderRadius: "4px",
                          cursor: "pointer",
                          transition: "background-color 0.15s ease"
                        }}
                        onClick={() => handleCellClick(rIdx, cIdx)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: BST CANVAS */}
      {activeModule === "bst" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "12px" }}>Tree Traversals</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <button className="btn btn-primary" onClick={() => runBstTraversal("preorder")} disabled={bstRunning}>
                Pre-order Traversal
              </button>
              <button className="btn btn-primary" style={{ backgroundColor: "var(--success)" }} onClick={() => runBstTraversal("inorder")} disabled={bstRunning}>
                In-order Traversal
              </button>
              <button className="btn btn-primary" style={{ backgroundColor: "var(--warning)", color: "#000000" }} onClick={() => runBstTraversal("postorder")} disabled={bstRunning}>
                Post-order Traversal
              </button>
            </div>

            <div style={{ marginTop: "24px" }}>
              <h4>Visited Path:</h4>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
                {bstTraversalOrder.map((val, idx) => (
                  <span 
                    key={idx}
                    className="badge badge-success"
                    style={{ fontSize: "1rem", padding: "8px 14px" }}
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ 
            height: "360px", 
            backgroundColor: "#0f172a", 
            border: "1px solid #1e293b", 
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden" 
          }}>
            {/* Draw connectors using simple SVG lines */}
            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {/* 50 -> 30 */}
              <line x1={250} y1={40} x2={140} y2={120} stroke="#334155" strokeWidth={2} />
              {/* 50 -> 70 */}
              <line x1={250} y1={40} x2={360} y2={120} stroke="#334155" strokeWidth={2} />
              
              {/* 30 -> 20 */}
              <line x1={140} y1={120} x2={80} y2={200} stroke="#334155" strokeWidth={2} />
              {/* 30 -> 40 */}
              <line x1={140} y1={120} x2={200} y2={200} stroke="#334155" strokeWidth={2} />

              {/* 70 -> 60 */}
              <line x1={360} y1={120} x2={300} y2={200} stroke="#334155" strokeWidth={2} />
              {/* 70 -> 80 */}
              <line x1={360} y1={120} x2={420} y2={200} stroke="#334155" strokeWidth={2} />
            </svg>

            {/* Render Nodes */}
            {treeNodes.map(node => {
              const isActive = activeBstNode === node.id;
              const hasVisited = bstTraversalOrder.includes(node.id);

              let nodeBg = "#1e293b";
              let nodeBorder = "2px solid #334155";
              if (isActive) {
                nodeBg = "var(--warning)";
                nodeBorder = "3px solid #ffffff";
              } else if (hasVisited) {
                nodeBg = "var(--success)";
                nodeBorder = "2px solid var(--success)";
              }

              return (
                <div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: `${node.x - 22}px`,
                    top: `${node.y - 22}px`,
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: nodeBg,
                    border: nodeBorder,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: (isActive && node.id === activeBstNode) ? "#000" : "#fff",
                    boxShadow: isActive ? "0 0 15px var(--warning)" : "none",
                    transition: "background-color 0.3s ease, border 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
                    zIndex: 2
                  }}
                >
                  {node.id}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
