import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github, Code, Palette, Database, Smartphone, Star } from 'lucide-react';

export function ProjectsPage(){
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Qarib App",
      description: "Qarib is a Flutter app that connects users with local service providers for easy booking and real-time order tracking.",
      image: "https://qarib.ma/logo.jpeg",
      category: "mobile",
      technologies: ["Flutter", "Nest.js", "MySQL", "Digital Ocean", "Firebase"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      year: "07/07/2025"
    },
    {
      id: 2,
      title: "Code Space — Developer Community Platform",
      description: "Code Space is a community platform for developers to share knowledge, discuss programming topics, and collaborate on projects in a user-friendly environment.",
      image: "./projects/codespace.jpg",
      category: "fullstack",
      technologies: ["Laravel","PHP","Blade","MySQL", "JavaScript", "Tailwind", "AJAX"],
      liveUrl: "#",
      githubUrl: "https://github.com/Skayologie/CodeSpace/tree/develop",
      featured: false,
      year: "04/05/2025"
    },
    {
      id: 3,
      title: "Eventbrite-Inspired Event Management & Ticketing Platform",
      description: "An event management platform that enables users to create, discover, and manage events easily, with built-in ticket booking and promotion features.",
      image: "./projects/Eventbrite.png",
      category: "fullstack",
      technologies: ["PHP","HTML","CSS3", "JavaScript","AJAX", "Tailwind"],
      liveUrl: "#",
      githubUrl: "https://github.com/Skayologie/Eventbrite",
      featured: false,
      year: "18/01/2025"
    },
    {
      id: 4,
      title: "Scrum Board Tasks Manager ",
      description: "Scrum Board is an interactive, user-friendly Scrum Board task management application built with JavaScript Vanilla, HTML5, and CSS3 Bootstrap .",
      image: "https://raw.githubusercontent.com/aymanebenhima/YouCodeScrumBoard/refs/heads/main/design/desktop.png",
      category: "fullstack",
      technologies: ["HTML","CSS3", "JavaScript"],
      liveUrl: "#",
      githubUrl: "https://github.com/Skayologie/Scrum-Board",
      featured: false,
      year: "05/11/2024"
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects', icon: Code },
    { id: 'featured', label: 'Featured', icon: Star },
    { id: 'fullstack', label: 'Full Stack', icon: Database },
    { id: 'mobile', label: 'Mobile', icon: Smartphone }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    return project.category === activeFilter;
  });

  const ProjectCard = ({ project, index }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [3, -3]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3]);

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const xVal = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const yVal = (e.clientY - rect.top - rect.height / 2) / rect.height;
      x.set(xVal);
      y.set(yVal);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          ease: "easeOut"
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-500 cursor-pointer"
      >
        <div className="relative overflow-hidden">
          <div className="w-full h-48 bg-gradient-to-br from-orange-500/10 to-orange-600/5 flex items-center justify-center relative">
            <div className="text-orange-500/20 text-4xl font-bold">{project.title.split(' ')[0]}</div>
            <div className="absolute justify-center items-center flex inset-0 bg-gradient-to-t from-gray-900/80 to-transparent">
              <div className="absolute justify-center items-center flex inset-0  to-transparent">
                <img className='h-full' src={project.image}/>
              </div>
                <img className='' src={project.image}/>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={project.liveUrl}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-2 bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="p-2 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
            >
              <Github className="w-4 h-4 text-white" />
            </motion.a>
          </div>

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gray-800/80 text-gray-300 text-sm rounded-full backdrop-blur-sm">
              {project.year}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-500 text-xs font-medium rounded-full"
              >
                <Star className="w-3 h-3" />
                Featured
              </motion.div>
            )}
          </div>
          
          <p className="text-gray-400 mb-4 text-sm leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full hover:bg-orange-500/20 hover:text-orange-500 transition-all duration-300 border border-gray-700"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <div className="flex gap-3">
            <motion.a
              href={project.liveUrl}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-4 bg-orange-500 text-white text-center rounded-lg hover:bg-orange-600 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-orange-500/25"
            >
              Live Demo
            </motion.a>
            <motion.a
              href={project.githubUrl}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-4 bg-gray-800 text-gray-300 text-center rounded-lg hover:bg-gray-700 transition-all duration-300 text-sm font-medium border border-gray-700"
            >
              View Code
            </motion.a>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <section className="container pt-20 pb-16">
        <h2 className="text-3xl font-sora font-bold">
          My <span className="text-primary">Projects</span>
        </h2>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full bg-orange-500/5 blur-3xl"></div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            A showcase of my work in web development, featuring projects built with modern technologies
            and best practices. Each project represents my commitment to quality and innovation.
          </motion.p>
        </div>

        {/* Filter Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-orange-500 border border-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-600 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500">Try selecting a different filter</p>
          </motion.div>
        )}
      </section>

    </div>
  );
};

