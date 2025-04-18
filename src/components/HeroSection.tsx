"use client"

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';


export function HeroSection() {

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotate icon based on cursor position
  const rotateX = useTransform(y, [0, 1], [15, -15]);
  const rotateY = useTransform(x, [0, 1], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width;
    const yVal = (e.clientY - rect.top) / rect.height;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };


  return (
    <section className="container min-h-screen flex items-center pt-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-sora font-bold text-balance">
            I'm <span className="text-primary">Jawad Boulmal </span>,<br />Web Developer
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-4xl font-sora text-primary">+3</span>
              <span className="text-sm ml-2">Years<br />Experience</span>
            </div>
            {/* <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div> */}
          </div>
          <p className="text-muted-foreground max-w-md">
          a skilled web developer proficient in HTML, CSS, JavaScript, PHP, MySQL, jQuery, Bootstrap, and Laravel. I specialize in creating interactive and user-friendly websites. Let's work together to bring your digital ideas to life! 
          </p>
          <div className="flex gap-4">
            <a href="#portfolio" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Portfolio →
            </a>
            <a href="#hire-me" className="px-6 py-3 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
              Hire me
            </a>
          </div>
        </div>
        <div className="hidden md:flex relative   justify-center ">
            <div className="flex justify-self-center h-[300px] w-[300px] justify-center items-center  " >
              <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  width: 100,
                  height: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  perspective: 1000,
                }}
              >
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/20 blur-[20px]  "></div>
                  <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className='flex justify-self-center h-[300px] w-[300px]  '
                >
            
                  <img 
                    src="/images/profile.jpg"
                    alt="Profile" 
                    className="   rounded-full  max-w-md mx-auto animate-fade-in"
                  />
                </motion.div>
              </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
}
