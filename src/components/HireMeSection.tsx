
export function HireMeSection() {
  return (
    <section id="hire-me" className="container py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-sora font-bold mb-4">
            Why <span className="text-primary">Hire me</span>?
          </h2>
          <p className="text-muted-foreground mb-8">
            I help companies create better products through attractive and functional designs while keeping the user in mind.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div className="glass-card p-6 rounded-2xl text-center">
              <p className="text-3xl font-sora font-bold text-primary mb-2">450+</p>
              <p className="text-sm text-muted-foreground">Projects completed</p>
            </div>
            <div className="glass-card p-6 rounded-2xl text-center">
              <p className="text-3xl font-sora font-bold text-primary mb-2">450+</p>
              <p className="text-sm text-muted-foreground">Happy clients</p>
            </div>
          </div>
          <button className="mt-8 px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Hire me
          </button>
        </div>
        <div className="relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-primary/20 blur-3xl"></div>
          {/* <img 
            src="/lovable-uploads/75b1b3aa-006b-449c-b61c-b4f59c50515c.png"
            alt="Profile" 
            className="w-full max-w-md mx-auto animate-fade-in"
          /> */}
        </div>
      </div>
    </section>
  );
}
