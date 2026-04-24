export const curriculumData = [
  // MAIN PATH (Extra Spacious Horizontal - 1000px spacing)
  {
    id: 1,
    subject: 'Python',
    chapter: 'Level 1',
    topic_name: 'Programming Basics',
    difficulty_level: 'easy',
    xp_reward: 100,
    track_type: 'core',
    position: { x: 600, y: 800 }, // Moved down to allow for branches above
    status: 'in_progress',
    progress: 0,
    modules: ['1.1 What is Programming?', '1.2 Variables', '1.3 Data Types', '1.4 Input / Output']
  },
  {
    id: 2,
    subject: 'Python',
    chapter: 'Level 2',
    topic_name: 'Logic Building',
    prerequisite_topic_id: 1,
    difficulty_level: 'medium',
    xp_reward: 200,
    track_type: 'core',
    position: { x: 1600, y: 800 }, // 1000px horizontal spacing
    status: 'in_progress',
    progress: 40,
    modules: ['2.1 Conditions (if-else)', '2.2 Loops (for, while)', '2.3 Loop Practice']
  },
  {
    id: 3,
    subject: 'Python',
    chapter: 'Level 3',
    topic_name: 'Functions & Errors',
    prerequisite_topic_id: 2,
    difficulty_level: 'medium',
    xp_reward: 350,
    track_type: 'core',
    position: { x: 2600, y: 800 },
    status: 'locked',
    modules: ['3.1 Functions', '3.2 Parameters', '3.3 Return Values', '3.5 Exceptions']
  },
  {
    id: 4,
    subject: 'Python',
    chapter: 'Level 4',
    topic_name: 'Data Structures',
    prerequisite_topic_id: 3,
    difficulty_level: 'hard',
    xp_reward: 500,
    track_type: 'core',
    position: { x: 3600, y: 800 },
    status: 'locked',
    modules: ['4.1 Lists', '4.2 Tuples', '4.3 Sets', '4.4 Dictionaries']
  },
  {
    id: 5,
    subject: 'Python',
    chapter: 'Level 5',
    topic_name: 'Problem Solving',
    prerequisite_topic_id: 4,
    difficulty_level: 'hard',
    xp_reward: 700,
    track_type: 'core',
    position: { x: 4600, y: 800 },
    status: 'locked',
    modules: ['5.1 Linear Search', '5.2 Sorting', '5.3 Recursion']
  },
  {
    id: 6,
    subject: 'Python',
    chapter: 'Level 6',
    topic_name: 'OOP Basics',
    prerequisite_topic_id: 5,
    difficulty_level: 'hard',
    xp_reward: 1000,
    track_type: 'core',
    position: { x: 5600, y: 800 },
    status: 'locked',
    modules: ['6.1 Classes', '6.2 Methods', '6.3 Inheritance', '6.4 Encapsulation']
  },

  // SIDE BRANCHES (Staggered Horizontally to prevent vertical overlap)
  {
    id: 101,
    subject: 'HTML',
    chapter: 'Side Branch',
    topic_name: 'Web Fundamentals',
    prerequisite_topic_id: 1, 
    difficulty_level: 'easy',
    xp_reward: 150,
    track_type: 'frontend',
    position: { x: 1100, y: 200 }, // Positioned IN BETWEEN L1 and L2 horizontally
    status: 'unlocked',
    modules: ['H1 Intro', 'H2 Basic Tags', 'H3 Links', 'H5 Forms']
  },
  {
    id: 102,
    subject: 'CSS',
    chapter: 'Side Branch',
    topic_name: 'Styling & Design',
    prerequisite_topic_id: 101, 
    difficulty_level: 'medium',
    xp_reward: 250,
    track_type: 'frontend',
    position: { x: 2100, y: 200 }, // Positioned IN BETWEEN L2 and L3 horizontally
    status: 'locked',
    modules: ['C1 CSS Basics', 'C2 Selectors', 'C3 Box Model', 'C4 Flexbox']
  },
  {
    id: 201,
    subject: 'SQL',
    chapter: 'Side Branch',
    topic_name: 'Database Mastery',
    prerequisite_topic_id: 3, 
    difficulty_level: 'medium',
    xp_reward: 400,
    track_type: 'sql',
    position: { x: 3100, y: 1400 }, // Far below the main path
    status: 'locked',
    modules: ['S1 SQL Intro', 'S2 Basics', 'S3 SELECT', 'S5 CRUD']
  }
];
