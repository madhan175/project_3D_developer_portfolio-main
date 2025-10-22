import React, { useRef, useEffect } from "react";

const GraphBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const points = [];
    const pointCount = 30;

    // Initialize points
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: (width / (pointCount - 1)) * i,
        y: height / 2 + Math.random() * 100 - 50,
        vy: Math.random() * 0.3 + 0.1,
      });
    }

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#915EFF");
    gradient.addColorStop(0.5, "#6EE7B7");
    gradient.addColorStop(1, "#FF6EC7");

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw glowing wave line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const midX = (points[i - 1].x + points[i].x) / 2;
        const midY = (points[i - 1].y + points[i].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, midX, midY);
      }
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#915EFF";
      ctx.stroke();

      // Update points
      points.forEach(p => {
        p.y += p.vy;
        if (p.y > height || p.y < 0) p.vy *= -1;
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points.forEach((p, i) => (p.x = (width / (pointCount - 1)) * i));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

export default GraphBackground;
