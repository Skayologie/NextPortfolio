"use client"

import ProfileCard from "./ui/ProfileCard";

const CardInfo = () => {
  return (
    <div className="mt-10 scale-[.8] md:scale-[1] flex items-center justify-center ">
      <div className="p-8">
        <ProfileCard 
          name="Jawad Boulmal"
          title="Full Stack Developer"
          bio="Full-Stack Web Developer passionate about crafting dynamic, user-centric web apps. Skilled in Laravel, JavaScript, React, and Node.js, with a strong focus on clean code, intuitive UI/UX, and real-world problem-solving."
          email="jawadboulmal@gmail.com"
          location="Casablanca, Morocco"
          skills={["React", "Next.js", "GSAP", "PHP", "MySQL"]}
          avatarUrl={"/images/482967159_18263929492257287_4751524404743054197_n.webp"}
        />
      </div>
    </div>
  );
};

export default CardInfo;
