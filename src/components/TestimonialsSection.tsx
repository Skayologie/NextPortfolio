
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Peter David",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Peter",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Peter David",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-zinc-950 text-white py-24">
      <div className="container">
        <h2 className="text-3xl font-sora font-bold mb-12">
          Testimonials That
          <br />
          Speak to My <span className="text-primary">Results</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-zinc-900/50 rounded-xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-gray-400 mb-4">{testimonial.text}</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
