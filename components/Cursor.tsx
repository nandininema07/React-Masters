import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      className="fixed w-6 h-6 bg-blue-500 rounded-full pointer-events-none transition-transform duration-75 mix-blend-difference"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    ></div>
  );
};

export default Cursor;
