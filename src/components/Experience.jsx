import React, { useRef, useEffect } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

// Dummy styles (replace with your styles if needed)
const styles = {
  sectionSubText: "text-gray-400 text-sm",
  sectionHeadText: "text-3xl font-bold text-white",
};

// Example experiences data
const experiences = [
  {
    title: "Frontend Developer",
    company_name: "Tech Corp",
    date: "Jan 2023 - Dec 2023",
    icon: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    iconBg: "#383E56",
    points: [
      "Built responsive UI components",
      "Integrated APIs with React",
      "Optimized performance for mobile",
    ],
    projects: [1, 2, 3, 2, 1], // Heatmap
    skills: [70, 50, 90], // Skill bars (%)
    learning: [2, 4, 6, 8, 10, 8, 6], // Learning curve
    teamSize: 4, // Team size
  },
  {
    title: "Backend Developer",
    company_name: "Data Solutions",
    date: "Jan 2022 - Dec 2022",
    icon: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
    iconBg: "#FF5733",
    points: ["Built REST APIs", "Database optimization", "Implemented authentication"],
    projects: [2, 3, 4, 3, 2],
    skills: [80, 60, 70],
    learning: [3, 5, 7, 9, 7, 5, 3],
    teamSize: 3,
  },
];

// Animated background component
const GraphBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const points = [];
    const pointCount = 25;

    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: (width / (pointCount - 1)) * i,
        y: height / 2 + Math.random() * 100 - 50,
        vy: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const midX = (points[i - 1].x + points[i].x) / 2;
        const midY = (points[i - 1].y + points[i].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, midX, midY);
      }
      ctx.strokeStyle = "#915EFF";
      ctx.lineWidth = 2;
      ctx.stroke();

      points.forEach((p) => {
        p.y += p.vy;
        if (p.y > height || p.y < 0) p.vy *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

// Single timeline card
const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
          {experience.company_name}
        </p>
      </div>

      {/* Mini Graph / Heatmap */}
      <div className="mt-4 space-y-2">
        <div className="flex space-x-1 items-center">
          <span className="text-white-200 text-sm w-24">Projects:</span>
          {experience.projects.map((count, idx) => (
            <motion.div
              key={idx}
              className="h-3 rounded-sm"
              style={{ width: 10, backgroundColor: "#915EFF" }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 3 * count }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            />
          ))}
        </div>

        <div className="flex items-center">
          <span className="text-white-200 text-sm w-24">Skills:</span>
          <div className="flex-1 flex space-x-1">
            {experience.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                className="flex-1 rounded-sm bg-[#6EE7B7]"
                initial={{ width: 0 }}
                animate={{ width: `${skill}%` }}
                transition={{ duration: 1, delay: idx * 0.2 }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center mt-1">
          <span className="text-white-200 text-sm w-24">Learning:</span>
          <svg className="flex-1 h-6">
            <polyline
              fill="none"
              stroke="#915EFF"
              strokeWidth="2"
              points={experience.learning.map((p, i) => `${i * 15},${20 - p}`).join(" ")}
            />
          </svg>
        </div>

        <div className="flex items-center mt-1">
          <span className="text-white-200 text-sm w-24">Team:</span>
          <div className="flex space-x-1">
            {Array.from({ length: experience.teamSize }).map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-[#FACC15]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

// Main Experience section with background
const ExperienceSection = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <GraphBackground />

      <motion.div className="relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col relative z-10">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default ExperienceSection;
