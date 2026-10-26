/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const p = "src/lib/data.ts";
let s = fs.readFileSync(p, "utf8");
if (s.includes("sample-community-volunteer")) { console.log("already added"); process.exit(0); }
const add = [
  '  { ...base, slug: "sample-community-volunteer", title: "Community Tech Volunteer", org: "Sample Community Group", category: "Volunteer", country: "Ethiopia", location: "Addis Ababa", mode: "Hybrid", deadline: "2026-12-05", timezone: "EAT", postedAt: "2026-10-20", skills: ["Teaching", "Mentoring"], eligibility: ["Open to students and graduates"], description: "Sample record. Help run weekend digital skills sessions for local learners.", documents: ["Short introduction note"], funding: null, lastVerified: "2026-10-21" },',
  '  { ...base, slug: "sample-design-build-competition", title: "Design and Build Competition", org: "Example Innovation Hub", category: "Competitions", country: "International", location: "Online", mode: "Remote", deadline: "2026-11-25", timezone: "UTC", postedAt: "2026-10-21", skills: ["Prototyping", "Teamwork"], eligibility: ["Teams of up to four people"], description: "Sample record. A short online competition to design and prototype a solution for a local problem.", documents: ["Team details", "Project summary"], funding: "Prize details not verified", lastVerified: null },',
  '  { ...base, slug: "sample-web-basics-course", title: "Web Development Basics", org: "Example Academy", category: "Online Courses", country: "International", location: "Online", mode: "Remote", deadline: null, timezone: null, postedAt: "2026-10-22", skills: ["HTML", "CSS", "JavaScript"], eligibility: ["Open to all learners"], description: "Sample record. A self-paced course covering the basics of building web pages.", documents: [], funding: "Fee not verified", lastVerified: "2026-10-22" },',
].join("\n");
const idx = s.indexOf("\n];");
s = s.slice(0, idx) + "\n" + add + s.slice(idx);
fs.writeFileSync(p, s);
console.log("added");
