// PlacementOS Expanded Seed Data
// Includes Language-Specific DSA Playlists and expanded CS Fundamentals (OOPs, DBMS, Networks)

export const mockPlaylists = [
  // C++ DSA Track
  {
    id: "pl-cpp",
    title: "C++ DSA Mastery Playlist",
    creator: "CodeHelp - Love Babbar",
    topic: "DSA",
    language: "C++",
    difficulty: "Beginner to Advanced",
    upvotes: 942,
    videos: [
      { id: "v-cpp-1", title: "Introduction to Pointers in C++", duration: "42:15", youtubeId: "05t3_1443_0" },
      { id: "v-cpp-2", title: "Standard Template Library (STL) in C++", duration: "1:15:30", youtubeId: "05t3_1443_1" },
      { id: "v-cpp-3", title: "C++ Recursion and Recursion Tree", duration: "55:10", youtubeId: "05t3_1443_2" },
      { id: "v-cpp-4", title: "Linked List - C++ Implementation", duration: "1:05:00", youtubeId: "05t3_1443_3" },
      { id: "v-cpp-5", title: "Binary Trees & BST in C++", duration: "1:22:45", youtubeId: "05t3_1443_4" }
    ]
  },
  // Java DSA Track
  {
    id: "pl-java",
    title: "Java + DSA Bootcamp",
    creator: "Kunal Kushwaha",
    topic: "DSA",
    language: "Java",
    difficulty: "Beginner to Advanced",
    upvotes: 1104,
    videos: [
      { id: "v-java-1", title: "Introduction to Java Programming & IDE setup", duration: "50:20", youtubeId: "rZ41y63z_0" },
      { id: "v-java-2", title: "Java Memory Management & Arrays", duration: "1:08:15", youtubeId: "rZ41y63z_1" },
      { id: "v-java-3", title: "Recursion in Java: Basics to Advanced", duration: "1:20:45", youtubeId: "rZ41y63z_2" },
      { id: "v-java-4", title: "Custom Linked List in Java", duration: "58:30", youtubeId: "rZ41y63z_3" },
      { id: "v-java-5", title: "Binary Search Trees & Heap in Java", duration: "1:15:10", youtubeId: "rZ41y63z_4" }
    ]
  },
  // Python DSA Track
  {
    id: "pl-python",
    title: "Python Data Structures & Algorithms",
    creator: "NeetCode",
    topic: "DSA",
    language: "Python",
    difficulty: "Intermediate",
    upvotes: 823,
    videos: [
      { id: "v-py-1", title: "Python Lists, Tuples & Dictionaries Under the Hood", duration: "32:10", youtubeId: "y1_1456_0" },
      { id: "v-py-2", title: "Time & Space Complexity in Python", duration: "25:40", youtubeId: "y1_1456_1" },
      { id: "v-py-3", title: "Recursive Backtracking with Python Examples", duration: "48:15", youtubeId: "y1_1456_2" },
      { id: "v-py-4", title: "Python Class & Node - Linked List Build", duration: "41:30", youtubeId: "y1_1456_3" },
      { id: "v-py-5", title: "Graphs - DFS & BFS Traversals in Python", duration: "56:20", youtubeId: "y1_1456_4" }
    ]
  },
  // JavaScript DSA Track
  {
    id: "pl-js",
    title: "JavaScript Algorithms & Data Structures",
    creator: "Roadside Coder",
    topic: "DSA",
    language: "JavaScript",
    difficulty: "Beginner",
    upvotes: 412,
    videos: [
      { id: "v-js-1", title: "JavaScript Arrays, Objects & Big-O", duration: "28:10", youtubeId: "j1_1467_0" },
      { id: "v-js-2", title: "Recursion & Closures in JavaScript", duration: "35:40", youtubeId: "j1_1467_1" },
      { id: "v-js-3", title: "Linked List Implementation in JS (ES6 Classes)", duration: "44:15", youtubeId: "j1_1467_2" },
      { id: "v-js-4", title: "Binary Search Tree Traversals in JS", duration: "50:20", youtubeId: "j1_1467_3" }
    ]
  },

  // CS Fundamentals: OOPs
  {
    id: "pl-oops",
    title: "Object-Oriented Programming (OOPs) Masterclass",
    creator: "Saurabh Shukla",
    topic: "CS Fundamentals",
    language: "All",
    difficulty: "Beginner",
    upvotes: 756,
    videos: [
      { id: "v-oops-1", title: "OOPs Basics: Classes, Objects & Constructors", duration: "30:15", youtubeId: "op-1" },
      { id: "v-oops-2", title: "The Four Pillars: Encapsulation & Abstraction", duration: "38:40", youtubeId: "op-2" },
      { id: "v-oops-3", title: "Inheritance Types & Method Overriding", duration: "45:10", youtubeId: "op-3" },
      { id: "v-oops-4", title: "Polymorphism: Compile-time vs Runtime", duration: "42:25", youtubeId: "op-4" }
    ]
  },
  // CS Fundamentals: DBMS
  {
    id: "pl-dbms",
    title: "Database Management Systems (DBMS) for Placements",
    creator: "Gate Smashers",
    topic: "CS Fundamentals",
    language: "All",
    difficulty: "Beginner to Intermediate",
    upvotes: 912,
    videos: [
      { id: "v-dbms-1", title: "Introduction to Relational Databases & ER Models", duration: "24:10", youtubeId: "db-1" },
      { id: "v-dbms-2", title: "SQL Queries: Joins, Subqueries & Group By", duration: "42:30", youtubeId: "db-2" },
      { id: "v-dbms-3", title: "Database Normalization (1NF, 2NF, 3NF, BCNF)", duration: "38:15", youtubeId: "db-3" },
      { id: "v-dbms-4", title: "ACID Properties & Transaction Control", duration: "29:50", youtubeId: "db-4" }
    ]
  },
  // CS Fundamentals: Computer Networks
  {
    id: "pl-cn",
    title: "Computer Networks (CN) Crash Course",
    creator: "Knowledge Gate",
    topic: "CS Fundamentals",
    language: "All",
    difficulty: "Intermediate",
    upvotes: 684,
    videos: [
      { id: "v-cn-1", title: "OSI Reference Model vs TCP/IP Suite", duration: "32:15", youtubeId: "cn-1" },
      { id: "v-cn-2", title: "IP Addressing & Subnetting Explained", duration: "45:40", youtubeId: "cn-2" },
      { id: "v-cn-3", title: "Routing Protocols (RIP, OSPF, BGP)", duration: "36:20", youtubeId: "cn-3" },
      { id: "v-cn-4", title: "Application Layer Protocols: HTTP, DNS, SMTP", duration: "28:10", youtubeId: "cn-4" }
    ]
  },
  // SQL Practice Track
  {
    id: "pl-sql",
    title: "SQL Practice Sheet Video Playlist",
    creator: "Ankit Bansal",
    topic: "CS Fundamentals",
    language: "SQL",
    difficulty: "Beginner to Advanced",
    upvotes: 985,
    videos: [
      { id: "v-sql-1", title: "Top 50 SQL Queries Interview Questions", duration: "1:02:15", youtubeId: "sql-1" },
      { id: "v-sql-2", title: "Complex SQL Joins, Subqueries & CTEs", duration: "48:30", youtubeId: "sql-2" },
      { id: "v-sql-3", title: "Window Functions: Row_Number, Rank, Dense_Rank", duration: "55:10", youtubeId: "sql-3" },
      { id: "v-sql-4", title: "SQL Query Tuning, Optimization & Indexes", duration: "36:45", youtubeId: "sql-4" }
    ]
  }
];

export const mockCompanies = [
  {
    id: "c-1",
    name: "Google",
    logo: "G",
    color: "#4285F4",
    ctc: "35 - 45 LPA",
    cgpaCutoff: 8.0,
    branchesAllowed: ["CSE", "IT", "ECE"],
    hiringRounds: ["Online Assessment", "Technical Interview 1", "Technical Interview 2", "Googliness & Leadership"],
    visitingCollege: "Off-Campus / Pool Campus",
    role: "Software Engineering Intern/Grad",
    experiences: [
      {
        id: "exp-1-1",
        user: "Rohan Sharma",
        title: "SWE Intern Interview Experience",
        tags: ["Graphs", "Segment Trees"],
        content: "The OA was tough. Got 2 questions on Graphs (Shortest Path variations). In the technical rounds, they focused heavily on clean code and edge cases. One question was finding the lowest common ancestor in a custom tree format.",
        difficulty: "Hard",
        date: "June 2026"
      }
    ]
  },
  {
    id: "c-2",
    name: "Amazon",
    logo: "A",
    color: "#FF9900",
    ctc: "28 - 32 LPA",
    cgpaCutoff: 7.5,
    branchesAllowed: ["All B.Tech Branches"],
    hiringRounds: ["Online Coding Test + Work Style Assessment", "Technical Round 1", "Technical Round 2 (Bar Raiser)"],
    visitingCollege: "On-Campus",
    role: "SDE-1",
    experiences: [
      {
        id: "exp-2-1",
        user: "Vikram Sen",
        title: "Amazon SDE-1 On-Campus",
        tags: ["Trees", "Tries", "Amazon Leadership Principles"],
        content: "Questions were standard Leetcode Medium. 1 question on Trie auto-suggestions, and 1 on LCA of binary tree. The highlight was Leadership Principles (STAR method questions). Don't ignore leadership principles!",
        difficulty: "Medium",
        date: "July 2026"
      }
    ]
  }
];

export const mockCalendarEvents = [
  {
    id: "ev-1",
    title: "TCS NQT National Registration",
    type: "Exam",
    date: "2026-07-25",
    daysLeft: 16,
    link: "https://nextstep.tcs.com",
    syllabus: "Aptitude (Verbal, Quant, Logical), Basic Programming Concepts, Hands-on Coding (2 Questions: Easy & Medium).",
    ctc: "3.36 LPA (Ninja) / 7.0 LPA (Digital) / 9.0 LPA (Prime)"
  },
  {
    id: "ev-2",
    title: "Smart India Hackathon (SIH) Internal Hackathon",
    type: "Hackathon",
    date: "2026-08-05",
    daysLeft: 27,
    link: "https://sih.gov.in",
    description: "Submit your team ideas for ministries' problem statements. Teams must consist of 6 members with at least 1 female student.",
    techStack: "Open Web/Mobile, AI/ML, IoT, Hardware solutions"
  }
];

export const mockDsaSheet = [
  {
    id: "t-1",
    topic: "Arrays & Hashing",
    problems: [
      { 
        id: "p1-1", 
        title: "Two Sum", 
        difficulty: "Easy", 
        link: "https://leetcode.com/problems/two-sum/",
        boilerplates: {
          "C++": "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for(int i = 0; i < nums.size(); ++i) {\n        if(mp.count(target - nums[i])) return {mp[target - nums[i]], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}",
          "Java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}",
          "Python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        prevMap = {} # val -> index\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prevMap:\n                return [prevMap[diff], i]\n            prevMap[n] = i\n        return",
          "JavaScript": "var twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n};"
        }
      },
      { 
        id: "p1-2", 
        title: "Sort Colors (0s, 1s, 2s)", 
        difficulty: "Medium", 
        link: "https://leetcode.com/problems/sort-colors/",
        boilerplates: {
          "C++": "void sortColors(vector<int>& nums) {\n    int low = 0, mid = 0, high = nums.size() - 1;\n    while(mid <= high) {\n        if(nums[mid] == 0) swap(nums[low++], nums[mid++]);\n        else if(nums[mid] == 1) mid++;\n        else swap(nums[mid], nums[high--]);\n    }\n}",
          "Java": "class Solution {\n    public void sortColors(int[] nums) {\n        int low = 0, mid = 0, high = nums.length - 1;\n        while (mid <= high) {\n            if (nums[mid] == 0) {\n                swap(nums, low++, mid++);\n            } else if (nums[mid] == 1) {\n                mid++;\n            } else {\n                swap(nums, mid, high--);\n            }\n        }\n    }\n    private void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n}",
          "Python": "class Solution:\n    def sortColors(self, nums: List[int]) -> None:\n        low, mid, high = 0, 0, len(nums) - 1\n        while mid <= high:\n            if nums[mid] == 0:\n                nums[low], nums[mid] = nums[mid], nums[low]\n                low += 1\n                mid += 1\n            elif nums[mid] == 1:\n                mid += 1\n            else:\n                nums[mid], nums[high] = nums[high], nums[mid]\n                high -= 1",
          "JavaScript": "var sortColors = function(nums) {\n    let low = 0, mid = 0, high = nums.length - 1;\n    while (mid <= high) {\n        if (nums[mid] === 0) {\n            [nums[low], nums[mid]] = [nums[mid], nums[low]];\n            low++;\n            mid++;\n        } else if (nums[mid] === 1) {\n            mid++;\n        } else {\n            [nums[mid], nums[high]] = [nums[high], nums[mid]];\n            high--;\n        }\n    }\n};"
        }
      }
    ]
  },
  {
    id: "t-2",
    topic: "Two Pointers & Sliding Window",
    problems: [
      { id: "p2-1", title: "Valid Palindrome", difficulty: "Easy", link: "https://leetcode.com/problems/valid-palindrome/" },
      { id: "p2-2", title: "3Sum", difficulty: "Medium", link: "https://leetcode.com/problems/3sum/" }
    ]
  },
  {
    id: "t-3",
    topic: "Linked List",
    problems: [
      { id: "p3-1", title: "Reverse a Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-linked-list/" },
      { id: "p3-2", title: "Detect Loop in Linked List", difficulty: "Easy", link: "https://leetcode.com/problems/linked-list-cycle/" }
    ]
  },
  {
    id: "t-4",
    topic: "Recursion & Backtracking",
    problems: [
      { id: "p4-1", title: "Subsets / Power Set", difficulty: "Medium", link: "https://leetcode.com/problems/subsets/" }
    ]
  },
  {
    id: "t-5",
    topic: "Dynamic Programming",
    problems: [
      { id: "p5-1", title: "Climbing Stairs", difficulty: "Easy", link: "https://leetcode.com/problems/climbing-stairs/" }
    ]
  }
];
