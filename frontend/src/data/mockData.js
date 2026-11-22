export const profileData = {
  name: "Aleena",
  email: "aleena@example.com",
  phone: "+91 9876543210",
  location: "Kerala, India",
  dob: "2002-05-14",
  gender: "Female",
  education: "B.Com",
  branch: "Commerce",
  year: "Graduate",
  college: "Jyothis College",
  skills: ["JavaScript", "React", "Python", "HTML", "CSS", "SQL"],
  interests: ["Web Development", "Artificial Intelligence", "Software Development"],
  careerGoal: "Full Stack Developer",
};

export const careers = [
  { id: 1, title: "Full Stack Developer", score: 92, demand: "High", salary: "₹5L – ₹14L", description: "Build complete web applications across frontend, backend and databases.", skills: ["React", "Node.js", "Express.js", "PostgreSQL", "Git"] },
  { id: 2, title: "Frontend Developer", score: 88, demand: "High", salary: "₹4L – ₹12L", description: "Create responsive, accessible and interactive web interfaces.", skills: ["HTML", "CSS", "JavaScript", "React", "Git"] },
  { id: 3, title: "Software Engineer", score: 82, demand: "High", salary: "₹5L – ₹16L", description: "Design, build, test and maintain reliable software systems.", skills: ["Programming", "DSA", "Git", "SQL", "APIs"] },
  { id: 4, title: "AI / ML Engineer", score: 76, demand: "High", salary: "₹6L – ₹18L", description: "Build intelligent systems using machine learning and AI techniques.", skills: ["Python", "ML", "SQL", "APIs", "Statistics"] },
];

export const roadmap = [
  { step: 1, title: "Strengthen JavaScript", description: "Revise modern JavaScript, async programming, modules and clean coding.", status: "Completed" },
  { step: 2, title: "Learn Node.js", description: "Learn server-side JavaScript, HTTP, modules and REST API fundamentals.", status: "In Progress" },
  { step: 3, title: "Learn Express.js", description: "Build structured REST APIs with routing, middleware and validation.", status: "Upcoming" },
  { step: 4, title: "Learn PostgreSQL", description: "Practice relational database design, SQL and joins.", status: "Upcoming" },
  { step: 5, title: "Build Real Projects", description: "Build and deploy production-style full-stack applications.", status: "Upcoming" },
  { step: 6, title: "Interview Preparation", description: "Prepare DSA, technical questions, projects and behavioral interviews.", status: "Upcoming" },
];

export const chatMessages = [
  { id: 1, role: "assistant", text: "Hello! I’m your AI Career Assistant. Tell me what you want to achieve and I’ll help you plan the next step." },
  { id: 2, role: "user", text: "What should I learn next for Full Stack Development?" },
  { id: 3, role: "assistant", text: "Based on your current profile, focus next on Node.js, Express.js and PostgreSQL. Then build one complete REST API project." },
];
