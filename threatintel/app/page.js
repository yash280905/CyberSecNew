"use client"
import React, {useEffect, useRef} from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Eye } from "lucide-react";

export default function Home() {
  const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);
      let fontSize = 16;
      let columns = Math.floor(width / fontSize);
      let drops = Array(columns).fill(1);
  
      const draw = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, width, height);
  
        ctx.fillStyle = "#00ff00"; // Matrix green
        ctx.font = `${fontSize}px monospace`;
  
        for (let i = 0; i < drops.length; i++) {
          const text = Math.random() > 0.5 ? "1" : "0";
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
  
          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };
  
      const interval = setInterval(draw, 50);
  
      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        clearInterval(interval);
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    
    return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />
      <div className="absolute top-10 left-10 opacity-10 rotate-12">
        <ShieldCheck size={100} className="text-indigo-500" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 -rotate-12">
        <Eye size={100} className="text-pink-500" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-7xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 text-center drop-shadow-2xl leading-tight pb-2"
      >
        <span className="inline-block">Sanjay</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-6 max-w-xl text-center text-xl md:text-2xl text-gray-200 font-semibold drop-shadow-lg backdrop-blur-sm"
      >
        Know all about your Cyber Battles
      </motion.p>

      {/* Decorative Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-8 h-1 bg-gradient-to-r from-green-500 via-indigo-600 to-green-500 rounded-full shadow-md"
      />
      </div>
    </div>

  );
}
