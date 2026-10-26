import type { Category } from "./types";

export const heroImage = {
  src: "/images/hero.jpg",
  alt: "Young professionals working together at a laptop",
  tone: "linear-gradient(135deg, #ffe0d1, #fff0e8)",
};

export const categoryImages: Record<Category, { src: string; alt: string; tone: string }> = {
  Jobs: { src: "/images/jobs.jpg", alt: "Team meeting in a modern office", tone: "linear-gradient(135deg, #ffe0d1, #fff0e8)" },
  Internships: { src: "/images/internships.jpg", alt: "Intern learning at a design desk", tone: "linear-gradient(135deg, #fff0e8, #ffe0d1)" },
  Scholarships: { src: "/images/scholarships.jpg", alt: "Student studying in a university library", tone: "linear-gradient(135deg, #ffe0d1, #f6f6f6)" },
  "Online Courses": { src: "/images/courses.jpg", alt: "Learner following a course on a laptop", tone: "linear-gradient(135deg, #f6f6f6, #ffe0d1)" },
  Volunteer: { src: "/images/volunteer.jpg", alt: "Volunteers working together at a community event", tone: "linear-gradient(135deg, #fff0e8, #f6f6f6)" },
  Competitions: { src: "/images/competitions.jpg", alt: "Teams presenting ideas at a competition", tone: "linear-gradient(135deg, #ffe0d1, #fff0e8)" },
  Grants: { src: "/images/grants.jpg", alt: "Small team planning a community project", tone: "linear-gradient(135deg, #fff0e8, #ffe0d1)" },
  Events: { src: "/images/events.jpg", alt: "Audience at a creative technology event", tone: "linear-gradient(135deg, #ffe0d1, #f6f6f6)" },
};
