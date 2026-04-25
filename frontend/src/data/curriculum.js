export const curriculumData = [
  {
    id: 1,
    subject: 'Python',
    chapter: 'Genin Trials',
    topic_name: 'The Scroll of Variables',
    subtitle: 'Variables',
    storyDescription: 'The ancient scroll contains the memories of the digital realm. Master the art of storing data to preserve the world\'s history.',
    difficulty_level: 'easy',
    xp_reward: 100,
    track_type: 'core',
    position: { x: 1000, y: 1500 },
    status: 'in_progress',
    progress: 0,
    modules: [
      {
        title: '1.1 What is Programming?',
        theory: "### 🚀 What is Programming?\n\nProgramming is the process of creating a set of instructions that tell a computer how to perform a task. Imagine you are giving a recipe to a friend who has never cooked before—you need to be very precise! \n\n**Key Concepts:**\n*   **Algorithms:** A step-by-step procedure for solving a problem.\n*   **Code:** The language we use to write these algorithms.\n*   **Python:** A high-level language that is easy to read and powerful enough for NASA, Google, and AI research.",
        questions: [
          { type: 'mcq', question_text: "Master Kai needs a plan to bypass the Phantom's lock. What is a step-by-step procedure called?", options: ["A type of computer", "An algorithm", "Software", "Hardware"], correct_answer: "An algorithm" },
          { type: 'mcq', question_text: "The academy recruits use a language that reads like English. Which language is this?", options: ["Java", "Python", "C++", "Binary"], correct_answer: "Python" },
          { type: 'fill_blank', question_text: "The defense gate awaits your command. Programming is the art of giving ___ to a computer.", correct_answer: "instructions" },
          { type: 'fill_blank', question_text: "The spell structure is broken. The strict set of rules for writing code is called ___.", correct_answer: "syntax" },
          { type: 'mcq', question_text: "The archive contains a fake spell. Which of these is NOT a programming language?", options: ["Python", "Java", "C++", "Google"], correct_answer: "Google" }
        ]
      },
      {
        title: '1.2 Variables',
        theory: "### 📦 Variables: Storage for Data\n\nIn programming, a **variable** is like a labeled box. You can store information inside it and use the label to find it later.\n\n**Example:**\n```python\nplayer_name = \"Alex\"\nscore = 10\n```\nHere, `player_name` is the label, and `\"Alex\"` is the value inside. You can change the value anytime: `score = 20`.",
        questions: [
          { type: 'mcq', question_text: "A warrior's name is fading from the archive. Which concept is used to store data?", options: ["Functions", "Variables", "Loops", "Syntax"], correct_answer: "Variables" },
          { type: 'mcq', question_text: "You find the spell 'shield_power = 10'. What is 'shield_power'?", options: ["The value", "The operator", "The variable name", "A function"], correct_answer: "The variable name" },
          { type: 'fill_blank', question_text: "To store an energy value into a variable, you use the ___ sign.", correct_answer: "=" },
          { type: 'fill_blank', question_text: "Master Kai warns you: A variable name cannot start with a ___.", correct_answer: "number" },
          { type: 'mcq', question_text: "A warrior's power level increased. Can you change a variable's value after creating it?", options: ["Yes", "No", "Only if it's a number", "Only during battles"], correct_answer: "Yes" }
        ]
      },
      {
        title: '1.3 Data Types',
        theory: "### 🧩 Data Types\n\nPython needs to know what *kind* of data you are storing. The four most common types are:\n\n1.  **Integers (int):** Whole numbers like `5` or `-10`.\n2.  **Floats (float):** Decimal numbers like `3.14`.\n3.  **Strings (str):** Text wrapped in quotes, like `\"Hello\"`.\n4.  **Booleans (bool):** `True` or `False` values.",
        questions: [
          { type: 'mcq', question_text: "The scanner needs to log a hero's identity. Which data type stores text?", options: ["Integer", "Float", "String", "Boolean"], correct_answer: "String" },
          { type: 'mcq', question_text: "The teleport gate needs an exact decimal. Which of these is a Float?", options: ["5", "3.14", "\"Hello\"", "True"], correct_answer: "3.14" },
          { type: 'fill_blank', question_text: "The gate sensor is either active or inactive. A True/False variable is a ___.", correct_answer: "Boolean" },
          { type: 'fill_blank', question_text: "You must count the surviving warriors. Whole numbers use the ___ data type.", correct_answer: "Integer" },
          { type: 'mcq', question_text: "A scroll shows the value '\"123\"' wrapped in quotes. What is its data type?", options: ["Integer", "String", "Float", "None"], correct_answer: "String" }
        ]
      },
      {
        title: 'Memory Leak Boss',
        isBoss: true,
        theory: "### 👾 Memory Leak Boss: Input / Output\n\nThe Memory Leak Boss is draining the scroll's energy! You must master communication with the system to stabilize the memory banks.\n\n*   **Output:** Use the `print()` function to show things on the screen.\n*   **Input:** Use the `input()` function to ask the user for information.\n\n**Example:**\n```python\nname = input(\"What is your name? \")\nprint(\"Hello, \" + name)\n```",
        questions: [
          { type: 'mcq', question_text: "The boss broke the communication system. Which Python function shows output on the screen?", options: ["input()", "show()", "print()", "display()"], correct_answer: "print()" },
          { type: 'mcq', question_text: "You ask the recruit for an override code. What data type does input() return by default?", options: ["An Integer", "A Boolean", "A String", "A Float"], correct_answer: "A String" },
          { type: 'fill_blank', question_text: "To ask a scout for the enemy's power level, you use the ___() function.", correct_answer: "input" },
          { type: 'fill_blank', question_text: "To broadcast a welcome signal, you write ___(\"Welcome\").", correct_answer: "print" },
          { 
            type: 'coding', 
            question_text: "The boss is draining the energy crystals. Write code to calculate total_energy and output it.",
            starter_code: "warrior_1 = 4500\nwarrior_2 = 5500\n\n# Calculate total_energy and use print() to output it!\ntotal_energy = ",
            correct_answer: "coding_complete"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    subject: 'Python',
    chapter: 'Chunin Exams',
    topic_name: 'Infinite Loop Grounds',
    subtitle: 'Loops',
    storyDescription: 'You are trapped inside a time loop dungeon. Master loops to escape and break the cycle of infinity.',
    prerequisite_topic_id: 1,
    difficulty_level: 'medium',
    xp_reward: 200,
    track_type: 'core',
    position: { x: 2500, y: 1500 },
    status: 'locked',
    modules: [
      {
        title: '2.1 Conditions (if-else)',
        theory: "### 🚦 Decision Making: if-else\n\nPrograms use **conditions** to make decisions. If a condition is true, the program does one thing; if false, it can do something else.\n\n**Syntax:**\n```python\nage = 18\nif age >= 18:\n    print(\"You can vote!\")\nelse:\n    print(\"Too young to vote.\")\n```",
        questions: [
          { type: 'mcq', question_text: "What happens if the condition in an 'if' statement is False?", options: ["The program crashes", "The 'else' block runs (if present)", "The 'if' block runs anyway", "The computer restarts"], correct_answer: "The 'else' block runs (if present)" },
          { type: 'mcq', question_text: "Which operator is used to check if two values are exactly equal?", options: ["=", "==", "!=", ">="], correct_answer: "==" },
          { type: 'fill_blank', question_text: "The keyword used to check an additional condition if the first 'if' fails is ___.", correct_answer: "elif" },
          { type: 'fill_blank', question_text: "Indentation is ___ in Python for defining blocks of code.", correct_answer: "required" },
          { type: 'mcq', question_text: "Which of these checks if 'x' is NOT equal to 5?", options: ["x == 5", "x != 5", "x <> 5", "x =! 5"], correct_answer: "x != 5" }
        ]
      },
      {
        title: '2.2 Loops (for, while)',
        theory: "### 🔄 Loops: Doing it Again\n\nLoops allow you to repeat a block of code multiple times.\n\n*   **for loops:** Best for iterating over a sequence.\n*   **while loops:** Best for repeating until a condition is met.\n\n**Example:**\n```python\nfor i in range(3):\n    print(\"Looping...\")\n```",
        questions: [
          { type: 'mcq', question_text: "Which loop is used when you know the number of iterations?", options: ["while", "if", "for", "repeat"], correct_answer: "for" },
          { type: 'mcq', question_text: "What will 'while True:' do?", options: ["Run once", "Run never", "Run forever", "Cause an error"], correct_answer: "Run forever" },
          { type: 'fill_blank', question_text: "To skip to the next iteration of a loop, use ___.", correct_answer: "continue" },
          { type: 'fill_blank', question_text: "To exit a loop completely, use ___.", correct_answer: "break" },
          { type: 'mcq', question_text: "What does range(3) produce?", options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[3]"], correct_answer: "[0, 1, 2]" }
        ]
      },
      {
        title: 'Infinite Loop Boss',
        isBoss: true,
        theory: "### 🌀 Infinite Loop Boss\n\nThe dungeon is collapsing! Use your mastery of nested loops and flow control to stabilize the time-space continuum.\n\n**Example:**\n```python\nfor i in range(3):\n    for j in range(2):\n        print(f\"Stablizing {i},{j}...\")\n```",
        questions: [
          { type: 'mcq', question_text: "What is a loop inside another loop called?", options: ["Double loop", "Nested loop", "Multi loop", "Grid loop"], correct_answer: "Nested loop" },
          { type: 'mcq', question_text: "Which keyword helps you loop through a list and get the index?", options: ["index()", "enumerate()", "count()", "list()"], correct_answer: "enumerate()" },
          { type: 'fill_blank', question_text: "A loop that never ends is an ___ loop.", correct_answer: "infinite" },
          { type: 'fill_blank', question_text: "To combine two lists in a loop, use the ___() function.", correct_answer: "zip" },
          { type: 'mcq', question_text: "Can a for loop have an 'else' block?", options: ["Yes", "No", "Only if it is a while loop", "Only in Java"], correct_answer: "Yes" }
        ]
      }
    ]
  },
  {
    id: 3,
    subject: 'Python',
    chapter: 'Jonin Missions',
    topic_name: 'Summoning Functions',
    subtitle: 'Functions',
    storyDescription: 'Learn reusable coding spells to summon powerful logic and defeat enemies efficiently.',
    prerequisite_topic_id: 2,
    difficulty_level: 'medium',
    xp_reward: 350,
    track_type: 'core',
    position: { x: 4000, y: 1500 },
    status: 'locked',
    modules: [
      {
        title: '3.1 Functions',
        theory: "### 🧩 Functions: Reusable Code\n\nFunctions are blocks of code that only run when called. They help keep code 'DRY' (Don't Repeat Yourself).\n\n**Example:**\n```python\ndef greet():\n    print(\"Hello!\")\n```",
        questions: [
          { type: 'mcq', question_text: "Which keyword defines a function?", options: ["func", "def", "define", "function"], correct_answer: "def" },
          { type: 'mcq', question_text: "How do you call a function named 'start'?", options: ["start", "call start", "start()", "run start"], correct_answer: "start()" },
          { type: 'fill_blank', question_text: "The values passed into a function are called ___.", correct_answer: "parameters" },
          { type: 'fill_blank', question_text: "To send a value back from a function, use the ___ keyword.", correct_answer: "return" },
          { type: 'mcq', question_text: "Can a function call itself?", options: ["Yes, it's called recursion", "No", "Only on Sundays", "Only in Level 5"], correct_answer: "Yes, it's called recursion" }
        ]
      },
      {
        title: 'The Great Summoner Boss',
        isBoss: true,
        theory: "### 🧙‍♂️ The Great Summoner Boss\n\nProve your mastery of summoning techniques by passing complex arguments and managing multiple parameters to defeat the Great Summoner.",
        questions: [
          { type: 'mcq', question_text: "What is an argument?", options: ["A coding error", "A value sent to a function", "A variable inside a function", "A type of loop"], correct_answer: "A value sent to a function" },
          { type: 'mcq', question_text: "Can a function have multiple parameters?", options: ["Yes", "No", "Only two", "Only if they are strings"], correct_answer: "Yes" },
          { type: 'fill_blank', question_text: "Default parameters are used when no ___ is provided.", correct_answer: "argument" },
          { type: 'fill_blank', question_text: "Parameters are listed inside the ___ after the function name.", correct_answer: "parentheses" },
          { type: 'mcq', question_text: "What is *args used for?", options: ["Passing a variable number of arguments", "Multiplying numbers", "Creating lists", "Deleting variables"], correct_answer: "Passing a variable number of arguments" }
        ]
      }
    ]
  },
  {
    id: 4,
    subject: 'Python',
    chapter: 'S-Rank Missions',
    topic_name: 'Data Structure Dimension',
    subtitle: 'Data Structures',
    storyDescription: 'The world is not what it seems. Master complex data structures to navigate the distorted realities of the Mirror Dimension.',
    prerequisite_topic_id: 3,
    difficulty_level: 'hard',
    xp_reward: 500,
    track_type: 'core',
    position: { x: 5500, y: 1500 },
    status: 'locked',
    modules: [
      {
        title: 'Fractal List Boss',
        isBoss: true,
        theory: "### 📜 Fractal List Boss\n\nLists in the Mirror Dimension are infinite and self-similar. Master list indexing and manipulation to find your way out.\n\n**Example:**\n```python\nfruits = [\"apple\", \"banana\", \"cherry\"]\n```",
        questions: [
          { type: 'mcq', question_text: "How do you access the first item in a list?", options: ["list[1]", "list[0]", "list.first()", "list.get(0)"], correct_answer: "list[0]" },
          { type: 'mcq', question_text: "Which method adds an item to the end of a list?", options: ["add()", "insert()", "append()", "push()"], correct_answer: "append()" },
          { type: 'fill_blank', question_text: "Lists are created using ___ brackets.", correct_answer: "square" },
          { type: 'fill_blank', question_text: "To remove an item by its value, use the ___() method.", correct_answer: "remove" },
          { type: 'mcq', question_text: "Are lists mutable (changeable)?", options: ["Yes", "No", "Only if they contain numbers", "Only in Python 2"], correct_answer: "Yes" }
        ]
      }
    ]
  },
  {
    id: 5,
    subject: 'Web',
    chapter: 'Quest',
    topic_name: 'Realm of HTML',
    subtitle: 'HTML',
    storyDescription: 'Construct the foundations of the digital world. You are the architect of reality.',
    difficulty_level: 'easy',
    xp_reward: 80,
    xp_required: 100,
    track_type: 'side_quest',
    position: { x: 2500, y: 800 },
    status: 'locked',
    modules: [
      {
        title: '5.1 HTML Structure',
        theory: "### 🌐 HTML Structure\n\nHTML (HyperText Markup Language) is the backbone of every webpage. Every site you visit is built on HTML.\n\n**Basic Structure:**\n```html\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n  </body>\n</html>\n```",
        questions: [
          { type: 'mcq', question_text: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Link", "Home Tool Markup Language"], correct_answer: "HyperText Markup Language" },
          { type: 'mcq', question_text: "Which tag is used for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<big>"], correct_answer: "<h1>" },
          { type: 'fill_blank', question_text: "The root element of an HTML page is ___.", correct_answer: "html" },
          { type: 'fill_blank', question_text: "The ___ tag defines the body of an HTML document.", correct_answer: "body" },
          { type: 'mcq', question_text: "Which tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct_answer: "<a>" }
        ]
      },
      {
        title: 'Structural Integrity Boss',
        isBoss: true,
        theory: "### 🏗️ Structural Integrity Boss\n\nThe realm is unstable! Use proper HTML tags to reinforce the structure of the world before it collapses.",
        questions: [
          { type: 'mcq', question_text: "Which tag is used to insert an image?", options: ["<picture>", "<image>", "<img>", "<src>"], correct_answer: "<img>" },
          { type: 'fill_blank', question_text: "A ___ tag does not have a closing tag.", correct_answer: "self-closing" },
          { type: 'mcq', question_text: "Which tag creates an unordered list?", options: ["<ol>", "<list>", "<ul>", "<li>"], correct_answer: "<ul>" },
          { type: 'mcq', question_text: "What does the <div> element do?", options: ["Creates a heading", "Makes text bold", "Defines a block-level container", "Adds a link"], correct_answer: "Defines a block-level container" },
          { type: 'fill_blank', question_text: "The ___ attribute specifies the URL of a link.", correct_answer: "href" }
        ]
      }
    ]
  },
  {
    id: 6,
    subject: 'Web',
    chapter: 'Quest',
    topic_name: 'Sanctuary of CSS',
    subtitle: 'CSS',
    storyDescription: 'Infuse your creations with visual essence. Master the spectrum of styles to bring beauty to the realm.',
    difficulty_level: 'medium',
    xp_reward: 150,
    xp_required: 200,
    track_type: 'side_quest',
    position: { x: 3800, y: 800 },
    status: 'locked',
    modules: [
      {
        title: '6.1 CSS Selectors',
        theory: "### 🎨 CSS Selectors\n\nCSS (Cascading Style Sheets) controls how HTML elements look. A **selector** targets the element you want to style.\n\n```css\n/* Element selector */\np { color: blue; }\n\n/* Class selector */\n.card { background: white; }\n\n/* ID selector */\n#header { font-size: 2rem; }\n```",
        questions: [
          { type: 'mcq', question_text: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Color Style Script"], correct_answer: "Cascading Style Sheets" },
          { type: 'mcq', question_text: "Which selector targets an element by class?", options: ["#class", ".class", "*class", "@class"], correct_answer: ".class" },
          { type: 'fill_blank', question_text: "To select an element by ID in CSS, use the ___ symbol.", correct_answer: "#" },
          { type: 'fill_blank', question_text: "The CSS property to change text color is ___.", correct_answer: "color" },
          { type: 'mcq', question_text: "Which property sets the background color?", options: ["bg-color", "background-color", "color-background", "fill"], correct_answer: "background-color" }
        ]
      },
      {
        title: 'Prism Overlord Boss',
        isBoss: true,
        theory: "### 🌈 Prism Overlord Boss\n\nThe Overlord has drained all color! Master the CSS Box Model and Layout techniques to restore the vibrant spectrum of the world.",
        questions: [
          { type: 'mcq', question_text: "Which property creates space INSIDE an element's border?", options: ["margin", "spacing", "padding", "border-gap"], correct_answer: "padding" },
          { type: 'mcq', question_text: "Which CSS value makes elements sit side by side?", options: ["display: block", "display: flex", "display: none", "display: inner-flex"], correct_answer: "display: flex" },
          { type: 'fill_blank', question_text: "The CSS property that creates space OUTSIDE an element is ___.", correct_answer: "margin" },
          { type: 'fill_blank', question_text: "To make an element invisible but still take space, use visibility: ___.", correct_answer: "hidden" },
          { type: 'mcq', question_text: "What does 'display: none' do?", options: ["Makes element transparent", "Removes element from layout", "Hides only the text", "Changes the color to white"], correct_answer: "Removes element from layout" }
        ]
      }
    ]
  },
  {
    id: 7,
    subject: 'SQL',
    chapter: 'Quest',
    topic_name: 'SQL Keeper Trials',
    subtitle: 'SQL',
    storyDescription: 'Enter the hidden vaults of information. Master the language of databases to unlock the world\'s secrets.',
    difficulty_level: 'hard',
    xp_reward: 200,
    xp_required: 300,
    track_type: 'side_quest',
    position: { x: 5500, y: 800 },
    status: 'locked',
    modules: [
      {
        title: '7.1 SELECT Queries',
        theory: "### 🗄️ SQL SELECT Queries\n\nSQL (Structured Query Language) lets you communicate with databases. The most common command is `SELECT`.\n\n```sql\n-- Get all columns from a table\nSELECT * FROM students;\n\n-- Get specific columns\nSELECT name, grade FROM students;\n\n-- Filter results\nSELECT name FROM students WHERE grade > 80;\n```",
        questions: [
          { type: 'mcq', question_text: "What does SQL stand for?", options: ["Simple Query Language", "Structured Query Language", "Standard Question Language", "System Query Logic"], correct_answer: "Structured Query Language" },
          { type: 'mcq', question_text: "Which keyword retrieves all columns?", options: ["ALL", "EVERYTHING", "*", "FULL"], correct_answer: "*" },
          { type: 'fill_blank', question_text: "To filter rows in SQL, use the ___ clause.", correct_answer: "WHERE" },
          { type: 'fill_blank', question_text: "The SQL command to read data from a table is ___.", correct_answer: "SELECT" },
          { type: 'mcq', question_text: "Which clause sorts the result set?", options: ["SORT BY", "ORDER BY", "ARRANGE BY", "GROUP BY"], correct_answer: "ORDER BY" }
        ]
      },
      {
        title: 'The Grand Archivist Boss',
        isBoss: true,
        theory: "### 📚 The Grand Archivist Boss\n\nThe Archivist is rewriting history! Master data modification commands to correct the records and secure the data vaults.",
        questions: [
          { type: 'mcq', question_text: "Which command adds a new row to a table?", options: ["ADD", "INSERT INTO", "CREATE ROW", "APPEND"], correct_answer: "INSERT INTO" },
          { type: 'mcq', question_text: "Which command modifies existing data?", options: ["MODIFY", "CHANGE", "UPDATE", "EDIT"], correct_answer: "UPDATE" },
          { type: 'fill_blank', question_text: "The SQL command to remove rows from a table is ___.", correct_answer: "DELETE" },
          { type: 'fill_blank', question_text: "In an UPDATE statement, the ___ clause specifies which rows to modify.", correct_answer: "WHERE" },
          { type: 'mcq', question_text: "What happens if you run DELETE without a WHERE clause?", options: ["Only the first row is deleted", "Nothing happens", "All rows are deleted", "It throws an error"], correct_answer: "All rows are deleted" }
        ]
      }
    ]
  }
];
