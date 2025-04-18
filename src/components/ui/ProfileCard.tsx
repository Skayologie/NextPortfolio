"use client"
import { motion } from "framer-motion";
import { useState } from "react";

interface ProfileCardProps {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  skills: string[];
  avatarUrl: string;
}

const ProfileCard = ({
  name,
  title,
  bio,
  email,
  location,
  skills,
  avatarUrl,
}: ProfileCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative h-[500px] w-[340px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    <div className="absolute -z-10 top-[100px] left-20 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full bg-primary/20 blur-2xl"></div>

      {/* Code card (back) */}
      <motion.div
        className="absolute rounded-2xl bg-[#1A1F2C] p-6 w-full h-full shadow-xl"
        style={{ 
          zIndex: 1,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
        }}
        animate={{
          rotate: isHovered ? [5, -2] : 5,
          x: isHovered ? -100 : 5,
          y: isHovered ? -10 : 5,
          transition: { type: "spring", stiffness: 200, damping: 20 }
        }}
      >
        <div className="text-left font-mono text-sm text-green-400 mt-20 opacity-80">
          <div className="mb-2">
            <span className="text-[#BB86FC]">import</span> <span className="text-white">React</span> <span className="text-[#BB86FC]">from</span> <span className="text-green-300">'react'</span>;
          </div>
          <div className="mb-4">
            <span className="text-[#BB86FC]">import</span> <span className="text-white">&#123; useEffect &#125;</span> <span className="text-[#BB86FC]">from</span> <span className="text-green-300">'react'</span>;
          </div>
          <div className="mb-2">
            <span className="text-[#BB86FC]">const</span> <span className="text-yellow-300">handleCustomCursor</span> <span className="text-white">=</span> <span className="text-yellow-300">()</span> <span className="text-white">=&gt;</span> <span className="text-white">&#123;</span>
          </div>
          <div className="mb-2 pl-4">
            <span className="text-[#BB86FC]">const</span> <span className="text-white">cursor</span> <span className="text-white">=</span> <span className="text-yellow-300">document</span>.<span className="text-blue-300">querySelector</span>(<span className="text-green-300">'.cursor'</span>);
          </div>
          <div className="mb-2 pl-4">
            <span className="text-yellow-300">document</span>.<span className="text-blue-300">addEventListener</span>(<span className="text-green-300">'mousemove'</span>, <span className="text-yellow-300">(event)</span> <span className="text-white">=&gt;</span> <span className="text-white">&#123;</span>
          </div>
          <div className="mb-2 pl-8">
            <span className="text-white">cursor.style.x</span> <span className="text-white">=</span> <span className="text-white">event.x</span> <span className="text-white">+</span> <span className="text-green-300">'px'</span>;
          </div>
          <div className="mb-2 pl-4">
            <span className="text-white">&#125;);</span>
          </div>
          <div className="mb-2">
            <span className="text-white">&#125;;</span>
          </div>
        </div>

      </motion.div>

      {/* Profile card (front) */}
      <motion.div
        className="absolute rounded-2xl bg-white p-8 w-full h-full"
        style={{ 
          zIndex: 2,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
        }}
        animate={{
          rotate: isHovered ? [-5, 0] : -5,
          x: isHovered ? -20 : 0,
          y: isHovered ? 20 : 0,
          transition: { type: "spring", stiffness: 200, damping: 20 }
        }}
      >
        <div className="absolute -top-5 -right-5">
          <img 
            src={avatarUrl} 
            alt={name} 
            className="w-16 h-16 rounded-full border-4 border-white shadow-md"
          />
        </div>
        
        <div className="text-left">
          <h2 className="text-3xl font-bold tracking-tight text-red-500">{name}</h2>
          <p className="text-gray-600 mb-6">{title}</p>
          
          <p className="text-gray-700 mb-6 text-sm leading-relaxed">
            {bio}
          </p>
          
          <a 
            href={`mailto:${email}`} 
            className="text-gray-700 hover:underline block text-sm"
          >
            {email}
          </a>
          <p className="text-gray-600 mb-8 text-sm">{location}</p>
          
          <div>
            <h3 className="text-gray-700 font-bold tracking-wide uppercase text-sm mb-2">MY SKILLSET</h3>
            <p className="text-gray-600 text-sm">{skills.join(', ')}</p>
          </div>
        </div>
      </motion.div>
     
      </div>
    
  );
};

export default ProfileCard;