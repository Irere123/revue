export const IS_PROD = process.env.NODE_ENV === "production";
export const API_URL = IS_PROD
  ? "https://revue-ttwt.onrender.com"
  : "http://localhost:4000";

export const LANGUAGES = [
  { id: "javascript", name: "JavaScript", type: "Web", popularity: 1 },
  { id: "python", name: "Python", type: "General Purpose", popularity: 2 },
  { id: "java", name: "Java", type: "Enterprise", popularity: 3 },
  { id: "typescript", name: "TypeScript", type: "Web", popularity: 4 },
  { id: "cpp", name: "C++", type: "System", popularity: 5 },
  { id: "go", name: "Go", type: "System", popularity: 6 },
  { id: "rust", name: "Rust", type: "System", popularity: 7 },
  { id: "shell", name: "Shell", type: "Scripting", popularity: 8 },
  { id: "ruby", name: "Ruby", type: "Web", popularity: 9 },
  { id: "php", name: "PHP", type: "Web", popularity: 10 },
  { id: "swift", name: "Swift", type: "Mobile", popularity: 11 },
  { id: "kotlin", name: "Kotlin", type: "Mobile", popularity: 12 },
  { id: "c", name: "C", type: "System", popularity: 13 },
  { id: "scala", name: "Scala", type: "Enterprise", popularity: 14 },
  { id: "r", name: "R", type: "Data Science", popularity: 15 },
  { id: "dart", name: "Dart", type: "Mobile", popularity: 16 },
  { id: "haskell", name: "Haskell", type: "Functional", popularity: 17 },
  { id: "objective-c", name: "Objective-C", type: "Mobile", popularity: 18 },
  { id: "elixir", name: "Elixir", type: "Web", popularity: 19 },
  { id: "lua", name: "Lua", type: "Scripting", popularity: 20 },
  { id: "matlab", name: "MATLAB", type: "Scientific", popularity: 21 },
  { id: "kotlin", name: "Kotlin", type: "Mobile", popularity: 22 },
  { id: "groovy", name: "Groovy", type: "JVM", popularity: 23 },
  { id: "powershell", name: "PowerShell", type: "Scripting", popularity: 24 },
  { id: "delphi", name: "Delphi", type: "Enterprise", popularity: 25 },
  { id: "erlang", name: "Erlang", type: "Distributed", popularity: 26 },
  { id: "crystal", name: "Crystal", type: "System", popularity: 27 },
  { id: "fortran", name: "Fortran", type: "Scientific", popularity: 28 },
  { id: "julia", name: "Julia", type: "Scientific", popularity: 29 },
  { id: "nim", name: "Nim", type: "System", popularity: 30 },
];
