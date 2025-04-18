
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

export function Header() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") setDarkMode(true);
    else if (storedTheme === "") setDarkMode(false);
  }, []);

  // Save to localStorage and update DOM class
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "");
    document.documentElement.classList.toggle("dark", darkMode); // applies 'dark' class to <html>
  }, [darkMode]);

  return (
    <header className="dark:bg-black/0 fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50">
      <nav className="container flex items-center justify-between py-4">
        <a href="#" className="text-xl font-sora font-bold text-primary">Jawad Boulmal</a>
        <ul className="hidden md:flex items-center gap-8">
          <li><a href="#services" className="text-sm hover:text-primary transition-colors">My Resume</a></li>
          <li><a href="#experience" className="text-sm hover:text-primary transition-colors">Experiences</a></li>
          <li><a href="#hire-me" className="text-sm hover:text-primary transition-colors">Hire Me</a></li>
        </ul>
        
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-lightbulb"></i>}
        </button>
        <Button className="bg-primary hover:bg-primary/90">Contact</Button>
      </nav>
    </header>
  );
}
