"use client";

import { useEffect, useState, useMemo } from "react";

interface MatrixColumn {
  id: number;
  x: number;
  chars: string[];
  speed: number;
  delay: number;
  opacity: number;
  length: number;
}

// Generate matrix characters (0s and 1s only for authentic Matrix look)
const generateChars = (length: number): string[] => {
  const chars: string[] = [];
  for (let i = 0; i < length; i++) {
    // Pure binary - only 0 and 1
    chars.push(Math.random() > 0.5 ? "1" : "0");
  }
  return chars;
};

// Create initial columns with unique IDs
const createColumns = (count: number): MatrixColumn[] => {
  const columns: MatrixColumn[] = [];
  for (let i = 0; i < count; i++) {
    const length = Math.floor(Math.random() * 20) + 8;
    columns.push({
      id: i,
      x: (i / count) * 100,
      chars: generateChars(length),
      speed: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.3,
      length: length,
    });
  }
  return columns;
};

export function MatrixRain() {
  const [columns, setColumns] = useState<MatrixColumn[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize on client and detect theme
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const columnCount = Math.floor(window.innerWidth / 25);
      setColumns(createColumns(columnCount));
      setIsClient(true);
      
      // Detect initial theme
      const checkDark = () => document.documentElement.classList.contains("dark");
      setIsDark(checkDark());
      
      // Watch for theme changes
      const observer = new MutationObserver(() => {
        setIsDark(checkDark());
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      
      return () => observer.disconnect();
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Handle resize
  useEffect(() => {
    if (!isClient) return;
    
    const handleResize = () => {
      const newColumnCount = Math.floor(window.innerWidth / 25);
      setColumns(createColumns(newColumnCount));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  // Random character updates for flickering effect
  useEffect(() => {
    if (!isClient || columns.length === 0) return;

    const interval = setInterval(() => {
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          chars: col.chars.map(() => {
            // Randomly change characters for flickering
            return Math.random() > 0.5 ? "1" : "0";
          }),
        }))
      );
    }, 150);

    return () => clearInterval(interval);
  }, [isClient, columns.length]);

  if (!isClient) {
    return <div className="matrix-bg" />;
  }

  return (
    <div className="matrix-bg" aria-hidden="true">
      {columns.map((column) => (
        <div
          key={column.id}
          className="matrix-column"
          style={{
            left: `${column.x}%`,
            animationDuration: `${column.speed}s`,
            animationDelay: `${column.delay}s`,
            opacity: isDark ? column.opacity : column.opacity * 0.7,
            fontSize: isDark ? '16px' : '14px',
          }}
        >
          {column.chars.map((char, index) => {
            // Leading characters are brighter
            const isBright = index < 3;
            // Random flicker effect
            const flicker = Math.random() > 0.95;
            
            return (
              <span
                key={index}
                className={`matrix-char ${isBright || flicker ? "matrix-bright" : ""}`}
                style={{
                  animationDelay: `${index * 0.03}s`,
                  opacity: isBright ? 1 : (flicker ? 1 : 0.7 + Math.random() * 0.3),
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      ))}
      {/* Subtle overlay for depth */}
      <div className="matrix-overlay" />
    </div>
  );
}
