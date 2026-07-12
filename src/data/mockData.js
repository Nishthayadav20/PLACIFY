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
    youtubePlaylists: [
      { name: "Love Babbar C++ DSA (Best)", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtKBemfi6Qj5WYjRYnFg" },
      { name: "Striver A-Z DSA Course", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m21w1dA31T47mjYX" },
      { name: "Coders Army C++ Course", url: "https://www.youtube.com/playlist?list=PLQEaGQc_RNYN1V1H39p-8T_fL2Pgz71b7" },
      { name: "CodeWithHarry C++ Tutorial", url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE4YL" }
    ],
    studyResources: [
      { name: "GeeksforGeeks C++ Programming", url: "https://www.geeksforgeeks.org/c-plus-plus/" },
      { name: "LeetCode Top 150 Interview List", url: "https://leetcode.com/studyplan/top-interview-150/" },
      { name: "Learn C++ Interactive Site", url: "https://www.learncpp.com/" }
    ],
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
    youtubePlaylists: [
      { name: "Kunal Kushwaha Java+DSA (Best)", url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7gSn15g30tbkAyi" },
      { name: "Apni Kaksha Java Placement", url: "https://www.youtube.com/playlist?list=PLfqMhYy_bDFzyODS_Xp-6X9sI7hA9B5_u" },
      { name: "Telusko Core Java Lectures", url: "https://www.youtube.com/playlist?list=PLsyeobzWly7oAZgDccGgqO1eIexf94JDy" }
    ],
    studyResources: [
      { name: "JavaTpoint Core Java Guide", url: "https://www.javatpoint.com/java-tutorial" },
      { name: "Oracle Official Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/" },
      { name: "CodingBat Java Code Practice", url: "https://codingbat.com/java" }
    ],
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
    youtubePlaylists: [
      { name: "NeetCode Python DSA (Best)", url: "https://www.youtube.com/playlist?list=PLot-Xpkr5xvrk69zPjdfPcoV3Fz3a_D3W" },
      { name: "CodeWithHarry Python Core", url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agwh1FjGIqx5LYgA256s9rY" },
      { name: "Telusko Python Tutorials", url: "https://www.youtube.com/playlist?list=PLsyeobzWly7yT0t5f32sZ9R8W-uY2yvL4" }
    ],
    studyResources: [
      { name: "Python Official Docs & Tutorial", url: "https://docs.python.org/3/tutorial/" },
      { name: "Real Python Interview Guide", url: "https://realpython.com/" },
      { name: "HackerRank Python Exercises", url: "https://www.hackerrank.com/domains/python" }
    ],
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
    youtubePlaylists: [
      { name: "Akshay Saini Namaste JS (Best)", url: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCgSeGzyVFAgSZg14" },
      { name: "Roadside Coder JS DSA Course", url: "https://www.youtube.com/playlist?list=PLKhlp2qtUcSaCVJElJ9JAG7JgRE0JDJyT" },
      { name: "Hitesh Choudhary JS Playlist", url: "https://www.youtube.com/playlist?list=PLRAV69dS1uWSxUIk5o3vQY2-_dxnUJ-R4" }
    ],
    studyResources: [
      { name: "MDN JavaScript Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "JavaScript.info Modern Guide", url: "https://javascript.info/" },
      { name: "LeetCode 30 Days of JavaScript", url: "https://leetcode.com/studyplan/30-days-of-javascript/" }
    ],
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
    youtubePlaylists: [
      { name: "Saurabh Shukla OOPs (Best)", url: "https://www.youtube.com/playlist?list=PL52079CD748721BA7" },
      { name: "Love Babbar OOPs Placement", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtKBemfi6Qj5WYjRYnFg" },
      { name: "Kunal Kushwaha OOPs Java", url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7gSn15g30tbkAyi" }
    ],
    studyResources: [
      { name: "GeeksforGeeks OOPs Core Concepts", url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/" },
      { name: "Guru99 OOPs Design Principles", url: "https://www.guru99.com/java-oops-class-object.html" },
      { name: "W3Schools C++ OOPs Tutorials", url: "https://www.w3schools.com/cpp/cpp_oop.asp" }
    ],
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
    youtubePlaylists: [
      { name: "Gate Smashers DBMS (Best)", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I81C-MTtNTOmJHwS3c" },
      { name: "Knowledge Gate DBMS Course", url: "https://www.youtube.com/playlist?list=PLmXKhU9m_WfVzY8V87Lg64j92B54E6w58" },
      { name: "Sanchit Elaichi DBMS Lectures", url: "https://www.youtube.com/playlist?list=PLG9aCp4hyFLg6dG0uG-N9Jb9dZ" }
    ],
    studyResources: [
      { name: "Javatpoint DBMS Architecture", url: "https://www.javatpoint.com/dbms-tutorial" },
      { name: "GeeksforGeeks DBMS Notes", url: "https://www.geeksforgeeks.org/dbms/" },
      { name: "Tutorialspoint RDBMS Systems", url: "https://www.tutorialspoint.com/dbms/index.htm" }
    ],
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
    youtubePlaylists: [
      { name: "Gate Smashers CN (Best)", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_" },
      { name: "Knowledge Gate CN Lectures", url: "https://www.youtube.com/playlist?list=PLmXKhU9m_WfXzY8V87Lg64j92B54E6w58" },
      { name: "Neso Academy CN Tutorials", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx" }
    ],
    studyResources: [
      { name: "GeeksforGeeks Computer Networks", url: "https://www.geeksforgeeks.org/computer-network-tutorials/" },
      { name: "Javatpoint CN Layer Explanations", url: "https://www.javatpoint.com/computer-network" },
      { name: "Guru99 IP Subnetting Guide", url: "https://www.guru99.com/ip-addressing-subnetting-tutorials.html" }
    ],
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
    youtubePlaylists: [
      { name: "Ankit Bansal SQL Queries (Best)", url: "https://www.youtube.com/playlist?list=PLBTztxXCUhW3X5M6yI7c5mDkv3-UeC7Vn" },
      { name: "Sumit Mittal SQL Course", url: "https://www.youtube.com/playlist?list=PL01mXW5u5Y6mSjK9J7Oa7_V5T1Jj9J7Oa" },
      { name: "Kudvenkat SQL Developer", url: "https://www.youtube.com/playlist?list=PL08903FB7ACA1C2FB" }
    ],
    studyResources: [
      { name: "LeetCode Top SQL 50 Study Plan", url: "https://leetcode.com/studyplan/top-sql-50/" },
      { name: "W3Schools Interactive SQL Lessons", url: "https://www.w3schools.com/sql/" },
      { name: "SQLBolt Interactive Queries Lab", url: "https://sqlbolt.com/" }
    ],
    videos: [
      { id: "v-sql-1", title: "Top 50 SQL Queries Interview Questions", duration: "1:02:15", youtubeId: "sql-1" },
      { id: "v-sql-2", title: "Complex SQL Joins, Subqueries & CTEs", duration: "48:30", youtubeId: "sql-2" },
      { id: "v-sql-3", title: "Window Functions: Row_Number, Rank, Dense_Rank", duration: "55:10", youtubeId: "sql-3" },
      { id: "v-sql-4", title: "SQL Query Tuning, Optimization & Indexes", duration: "36:45", youtubeId: "sql-4" }
    ]
  },
  // Aptitude Track
  {
    id: "pl-aptitude",
    title: "Quantitative & Logical Aptitude Playlist",
    creator: "CareerRide",
    topic: "Aptitude",
    language: "All",
    difficulty: "Beginner to Intermediate",
    upvotes: 847,
    youtubePlaylists: [
      { name: "CareerRide Quantitative (Best)", url: "https://www.youtube.com/playlist?list=PLD1E8F2942F2D98D7" },
      { name: "Feel Free to Learn Aptitude", url: "https://www.youtube.com/playlist?list=PLmXKhU9m_WfUf-G0D" },
      { name: "FreshersWorld Aptitude Prep", url: "https://www.youtube.com/playlist?list=PL83E3CB494B" }
    ],
    studyResources: [
      { name: "IndiaBIX Placement Practice Sheets", url: "https://www.indiabix.com/aptitude/questions-and-answers/" },
      { name: "GeeksforGeeks Aptitude Sheets", url: "https://www.geeksforgeeks.org/aptitude-questions-and-answers/" },
      { name: "PrepInsta Placement Aptitude Dash", url: "https://prepinsta.com/aptitude/" }
    ],
    videos: [
      { id: "v-apt-1", title: "Time, Speed and Distance Shortcuts", duration: "35:10", youtubeId: "apt-1" },
      { id: "v-apt-2", title: "Permutation & Combination Rules & Tricks", duration: "42:15", youtubeId: "apt-2" },
      { id: "v-apt-3", title: "Probability & Dice Problems for Placements", duration: "38:40", youtubeId: "apt-3" },
      { id: "v-apt-4", title: "Data Interpretation & Logical Reasoning Cases", duration: "48:50", youtubeId: "apt-4" }
    ]
  },
  // System Design Track
  {
    id: "pl-system-design",
    title: "System Design (HLD & LLD) Crash Course",
    creator: "Gaurav Sen",
    topic: "System Design",
    language: "All",
    difficulty: "Intermediate to Advanced",
    upvotes: 1205,
    youtubePlaylists: [
      { name: "Gaurav Sen System Design HLD (Best)", url: "https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyPhX" },
      { name: "Arpit Bhayani System Design", url: "https://www.youtube.com/playlist?list=PLasdM5L9hXm1f7pWqOFrsQ3W_RpxgC7tN" },
      { name: "CodeKarle System Design Concepts", url: "https://www.youtube.com/playlist?list=PLkQkbY7G7vG31V" }
    ],
    studyResources: [
      { name: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer" },
      { name: "ByteByteGo System Design Blog", url: "https://bytebytego.com/" },
      { name: "GeeksforGeeks HLD Architecture Notes", url: "https://www.geeksforgeeks.org/system-design-tutorial/" }
    ],
    videos: [
      { id: "v-sys-1", title: "Introduction to Scaling & Load Balancers", duration: "28:15", youtubeId: "sys-1" },
      { id: "v-sys-2", title: "Caching Strategies (Redis, Memcached) & CDN", duration: "35:40", youtubeId: "sys-2" },
      { id: "v-sys-3", title: "Database Sharding & Replication Masterclass", duration: "44:10", youtubeId: "sys-3" },
      { id: "v-sys-4", title: "Designing WhatsApp / Messenger Chat System", duration: "52:20", youtubeId: "sys-4" }
    ]
  },
  // AWS Cloud Track
  {
    id: "pl-aws",
    title: "AWS Cloud Practitioner & Solutions Architect Course",
    creator: "freeCodeCamp",
    topic: "Cloud & DevOps",
    language: "Cloud",
    difficulty: "Beginner to Intermediate",
    upvotes: 1420,
    youtubePlaylists: [
      { name: "freeCodeCamp AWS Course (Best)", url: "https://www.youtube.com/watch?v=SOTamWGuDKc" },
      { name: "Stephane Maarek AWS Solutions", url: "https://www.youtube.com/playlist?list=PLB2j0-K6L8jL" },
      { name: "Edureka AWS Certification Prep", url: "https://www.youtube.com/playlist?list=PL9ooVrP1hQOG-iZ" }
    ],
    studyResources: [
      { name: "AWS Free Tier Documentation", url: "https://aws.amazon.com/free/" },
      { name: "AWS Whitepapers & Architect Guide", url: "https://aws.amazon.com/whitepapers/" },
      { name: "Tutorials Dojo AWS Cheat Sheets", url: "https://tutorialsdojo.com/aws-cheat-sheets/" }
    ],
    videos: [
      { id: "v-aws-1", title: "Introduction to Cloud Computing & AWS Services", duration: "45:12", youtubeId: "aws-1" },
      { id: "v-aws-2", title: "AWS EC2 (Elastic Compute Cloud) Deep Dive", duration: "55:30", youtubeId: "aws-2" },
      { id: "v-aws-3", title: "AWS S3 (Simple Storage Service) & IAM policies", duration: "38:40", youtubeId: "aws-3" },
      { id: "v-aws-4", title: "AWS RDS, DynamoDB & Serverless Lambda", duration: "50:15", youtubeId: "aws-4" }
    ]
  },
  // DevOps Track
  {
    id: "pl-devops",
    title: "DevOps BootCamp: Docker, Kubernetes & CI/CD",
    creator: "TechWorld with Nana",
    topic: "Cloud & DevOps",
    language: "DevOps",
    difficulty: "Intermediate",
    upvotes: 1680,
    youtubePlaylists: [
      { name: "TechWorld with Nana DevOps (Best)", url: "https://www.youtube.com/playlist?list=PLy7NrYWoggj" },
      { name: "Kunal Kushwaha DevOps Course", url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnoqDL" },
      { name: "freeCodeCamp Git & CI/CD Crash", url: "https://www.youtube.com/watch?v=R8_veQiYtgo" }
    ],
    studyResources: [
      { name: "Docker Official Reference Docs", url: "https://docs.docker.com/" },
      { name: "Kubernetes Interactive Documentation", url: "https://kubernetes.io/docs/home/" },
      { name: "GitHub Actions Automation Workflow Docs", url: "https://docs.github.com/en/actions" }
    ],
    videos: [
      { id: "v-dev-1", title: "Introduction to DevOps Culture & Tools", duration: "25:40", youtubeId: "dev-1" },
      { id: "v-dev-2", title: "Docker Containers, Images & Dockerfile Build", duration: "1:02:15", youtubeId: "dev-2" },
      { id: "v-dev-3", title: "Kubernetes Architecture, Pods & Deployments", duration: "1:15:30", youtubeId: "dev-3" },
      { id: "v-dev-4", title: "Setting up GitHub Actions CI/CD Pipelines", duration: "44:10", youtubeId: "dev-4" }
    ]
  },
  // Git & GitHub Track
  {
    id: "pl-git",
    title: "Git & GitHub Developer Masterclass",
    creator: "Kunal Kushwaha",
    topic: "Cloud & DevOps",
    language: "Git",
    difficulty: "Beginner to Intermediate",
    upvotes: 1530,
    youtubePlaylists: [
      { name: "Kunal Kushwaha Git Playlist (Best)", url: "https://www.youtube.com/playlist?list=PL9gnSGHSqcnoqDL" },
      { name: "freeCodeCamp Git Tutorial Video", url: "https://www.youtube.com/watch?v=R8_veQiYtgo" },
      { name: "Amigoscode Git & Github Course", url: "https://www.youtube.com/playlist?list=PLsyeobzWly7o" }
    ],
    studyResources: [
      { name: "GitHub Git Cheat Sheet PDF", url: "https://training.github.com/downloads/github-git-cheat-sheet.pdf" },
      { name: "Official Git SCM Documentation", url: "https://git-scm.com/doc" },
      { name: "GitHub Interactive Lab Skills", url: "https://skills.github.com/" }
    ],
    videos: [
      { id: "v-git-1", title: "Version Control Systems & Git Basics", duration: "22:15", youtubeId: "git-1" },
      { id: "v-git-2", title: "Git Branching, Merging & Merge Conflicts", duration: "38:40", youtubeId: "git-2" },
      { id: "v-git-3", title: "Git Push, Pull Requests, & GitHub Collaborations", duration: "31:10", youtubeId: "git-3" },
      { id: "v-git-4", title: "Advanced Git: Rebasing, Cherry-Picking & Stashing", duration: "45:20", youtubeId: "git-4" }
    ]
  },
  // Machine Learning Projects Track
  {
    id: "pl-ml",
    title: "Machine Learning Capstone Projects & Algorithms",
    creator: "Krish Naik",
    topic: "Project Build",
    language: "ML",
    difficulty: "Intermediate to Advanced",
    upvotes: 1350,
    youtubePlaylists: [
      { name: "Krish Naik ML Playlists (Best)", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPBtrgL3vyS7t5Kj21" },
      { name: "CampusX Machine Learning Course", url: "https://www.youtube.com/playlist?list=PLKnIA16_Rmvb" },
      { name: "freeCodeCamp ML for Beginners", url: "https://www.youtube.com/watch?v=GwIo3gToqA4" }
    ],
    studyResources: [
      { name: "Kaggle Learn Interactive Courses", url: "https://www.kaggle.com/learn" },
      { name: "Scikit-Learn User Guide Docs", url: "https://scikit-learn.org/stable/user_guide.html" },
      { name: "Andrew Ng Coursera Specialization Notes", url: "https://www.coursera.org/specializations/machine-learning-introduction" }
    ],
    videos: [
      { id: "v-ml-1", title: "Supervised vs Unsupervised Learning Algorithms", duration: "35:15", youtubeId: "ml-1" },
      { id: "v-ml-2", title: "End-to-End House Price Prediction Project", duration: "1:10:45", youtubeId: "ml-2" },
      { id: "v-ml-3", title: "Deep Learning Intro: Artificial Neural Networks", duration: "48:30", youtubeId: "ml-3" },
      { id: "v-ml-4", title: "Deploying ML Models with Streamlit & Docker", duration: "56:20", youtubeId: "ml-4" }
    ]
  },
  // Web Development Projects Track
  {
    id: "pl-web",
    title: "Full-Stack Web Projects (MERN Stack Guides)",
    creator: "JavaScript Mastery",
    topic: "Project Build",
    language: "Web",
    difficulty: "Beginner to Advanced",
    upvotes: 1850,
    youtubePlaylists: [
      { name: "JavaScript Mastery MERN Apps (Best)", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtK" },
      { name: "Clever Programmer Real-world Clones", url: "https://www.youtube.com/playlist?list=PLu0W_9lII9" },
      { name: "CodeWithHarry Web Dev Playlist", url: "https://www.youtube.com/playlist?list=PLu0W_9lII9agqFUAl" }
    ],
    studyResources: [
      { name: "MDN Web Docs Core Guide", url: "https://developer.mozilla.org/en-US/" },
      { name: "React Official Docs Guide", url: "https://react.dev/" },
      { name: "Frontend Mentor Design Challenges", url: "https://www.frontendmentor.io/" }
    ],
    videos: [
      { id: "v-web-1", title: "Designing RESTful APIs with Node.js & Express", duration: "38:15", youtubeId: "web-1" },
      { id: "v-web-2", title: "Building Modern Frontend using Tailwind CSS", duration: "45:30", youtubeId: "web-2" },
      { id: "v-web-3", title: "User Auth: JWT Login and Cookie Sessions", duration: "50:10", youtubeId: "web-3" },
      { id: "v-web-4", title: "Deploying MERN Apps on Render and Vercel", duration: "44:50", youtubeId: "web-4" }
    ]
  },
  // App Development Projects Track
  {
    id: "pl-app",
    title: "Mobile App Projects (React Native & Flutter)",
    creator: "Hitesh Choudhary",
    topic: "Project Build",
    language: "App",
    difficulty: "Intermediate",
    upvotes: 1410,
    youtubePlaylists: [
      { name: "Hitesh Choudhary React Native (Best)", url: "https://www.youtube.com/playlist?list=PLRAV69dS1uWSxUI" },
      { name: "Flutterly Flutter Beginners Course", url: "https://www.youtube.com/playlist?list=PLkQkbY7G7v" },
      { name: "Angela Yu iOS & Android Masterclass", url: "https://www.youtube.com/playlist?list=PLsyeobzW" }
    ],
    studyResources: [
      { name: "Android Developers Core Guides", url: "https://developer.android.com/guide" },
      { name: "Flutter Docs & Codelabs Library", url: "https://docs.flutter.dev/" },
      { name: "React Native Official Quickstart", url: "https://reactnative.dev/docs/environment-setup" }
    ],
    videos: [
      { id: "v-app-1", title: "React Native vs Flutter: Mobile Stack Choice", duration: "25:40", youtubeId: "app-1" },
      { id: "v-app-2", title: "Creating Mobile UI Layouts & Navigation Flows", duration: "48:15", youtubeId: "app-2" },
      { id: "v-app-3", title: "Local Storage & SQLite Mobile Database Setup", duration: "36:30", youtubeId: "app-3" },
      { id: "v-app-4", title: "Publishing Mobile Apps to Google Play Store", duration: "55:10", youtubeId: "app-4" }
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
