
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left - Name and tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-sora font-bold mb-2">Jawad Boulmal</h3>
            <p className="text-sm text-muted-foreground">Full Stack Developer</p>
          </div>

          {/* Center - Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#Works" className="hover:text-primary transition-colors">Works</a>
            <a href="#Skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#Experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#Resume" className="hover:text-primary transition-colors">Resume</a>
            <a href="#Contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Right - Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Github size={18} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Twitter size={18} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="mailto:me@jawadboulmal.com"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Jawad Boulmal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
