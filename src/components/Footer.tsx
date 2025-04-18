
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-white py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="flex-1">
            <h2 className="text-3xl font-sora font-bold mb-4">Lets Connect there</h2>
            <Button className="bg-primary hover:bg-primary/90">
              Hire me <ArrowRight className="ml-2" />
            </Button>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-orange-500 font-medium mb-4">Navigation</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="hover:text-primary">Home</a></li>
                  <li><a href="#about" className="hover:text-primary">About Us</a></li>
                  <li><a href="#services" className="hover:text-primary">Service</a></li>
                  <li><a href="#resume" className="hover:text-primary">Resume</a></li>
                  <li><a href="#projects" className="hover:text-primary">Project</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-orange-500 font-medium mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>+212 632773027</li>
                  <li className="break-all text-[15px]">jawadboulmal@gmail.com</li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h3 className="text-orange-500 font-medium mb-4">Get the latest information</h3>
                <div className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Email Address"
                    className="bg-zinc-900 border-zinc-800"
                  />
                  <Button size="icon" className="bg-primary hover:bg-primary/90">
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">Jawad Boulmal</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-primary"><Youtube size={20} /></a>
            </div>
          </div>


          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-400">
            <p>Copyright© 2025 Jawad Boulmal. All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary">User Terms & Conditions</a>
              <span>|</span>
              <a href="#" className="hover:text-primary">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
