import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import anshajImage from "../assets/team/Anshaj.jpg";
import georgeImage from "../assets/team/George.jpg";
import karanImage from "../assets/team/Karan.jpg";
import alanImage from "../assets/team/Alan.jpg";
import adityaImage from "../assets/team/Aditya.jpg";
import adithyanImage from "../assets/team/Adithyan.jpg";
import AnimatedPage from "../components/AnimatedPage";

// Board Members / Co-Founders (The original 5)
const boardMembers = [
  { name: "Anshaj Shaji", role: "Chief Executive Officer", image: anshajImage },
  { name: "George Joseph", role: "Chief Marketing Officer", image: georgeImage },
  { name: "Alan Biji Alex", role: "Chief Operating Officer", image: alanImage },
  { name: "Aditya R", role: "Chief Technology Officer", image: adityaImage },
  { name: "Adithyan S.M", role: "Chief Financial Officer", image: adithyanImage },
];

// Management Team (All 6 members with descriptions)
const managementTeam = [
  { name: "Anshaj Shaji", role: "Chief Executive Officer", image: anshajImage, description: "Leading the overall vision and strategy for PluggedIn." },
  { name: "George Joseph", role: "Chief Marketing Officer", image: georgeImage, description: "Driving market awareness and customer acquisition strategies." },
  { name: "Alan Biji Alex", role: "Chief Operating Officer", image: alanImage, description: "Overseeing daily operations and ensuring efficient execution." },
  { name: "Aditya R", role: "Chief Technology Officer", image: adityaImage, description: "Guiding the technical direction and development of our products." },
  { name: "Adithyan S.M", role: "Chief Financial Officer", image: adithyanImage, description: "Managing financial planning, reporting, and investment activities." },
  { name: "Karan A S", role: "Chief Design Officer", image: karanImage, description: "Leading the design vision and user experience for all PluggedIn products." },
];

const Team = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen py-20 bg-white font-lato">
        <div className="container px-4">

          {/* --- Board Members Section --- */}
          <section className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-16">
              {/* Heading: Playfair Display */}
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-black mb-6">
                Board of Directors
              </h1>
              {/* Description: Geometric Sans tracking-wider */}
              <p className="font-sans tracking-wider text-xl text-black/70">
                Co-Founders behind PluggedIn.
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-wrap justify-center gap-8 w-full">
                {boardMembers.slice(0, 3).map((member) => (
                  <Card
                    key={member.name + "-board"}
                    className="text-center overflow-hidden w-full border-black/10 bg-white min-w-[250px] sm:w-auto sm:flex-1 md:basis-[calc(33.333%-22px)] md:grow-0 md:shrink transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  >
                    <div className="bg-black/5 aspect-[4/5] flex items-center justify-center">
                      <img src={member.image} alt={`Photo of ${member.name}`} className="h-full w-full object-cover" />
                    </div>
                    <CardHeader>
                      {/* Card Title: Playfair Display */}
                      <CardTitle className="font-playfair text-2xl text-black">{member.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="-mt-4 pb-4">
                      {/* Role: Geometric Sans tracking-wider */}
                      <p className="font-sans tracking-wider text-black/60 text-sm">{member.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 w-full">
                {boardMembers.slice(3, 5).map((member) => (
                  <Card
                    key={member.name + "-board"}
                    className="text-center overflow-hidden w-full border-black/10 bg-white min-w-[250px] sm:w-auto sm:flex-1 md:basis-[calc(33.333%-22px)] md:grow-0 md:shrink transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  >
                    <div className="bg-black/5 aspect-[4/5] flex items-center justify-center">
                      <img src={member.image} alt={`Photo of ${member.name}`} className="h-full w-full object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-playfair text-2xl text-black">{member.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="-mt-4 pb-4">
                      <p className="font-sans tracking-wider text-black/60 text-sm">{member.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <hr className="my-20 border-black/5" />

          {/* --- Management Team Section --- */}
          <section className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              {/* Heading: Playfair Display */}
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black mb-6">
                Management Team
              </h2>
              {/* Description: Geometric Sans tracking-wider */}
              <p className="font-sans tracking-wider text-xl text-black/70">
                The minds guiding our product and strategy.
              </p>
            </div>
            
            <div className="space-y-12">
              {managementTeam.map((member) => (
                <div
                  key={member.name + "-management"}
                  className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white border border-black/10 rounded-lg p-6 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="w-48 h-60 md:w-56 md:h-72 flex-shrink-0 rounded overflow-hidden border border-black/5">
                    <img
                      src={member.image}
                      alt={`Photo of ${member.name}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    {/* Name: Playfair Display */}
                    <h3 className="font-playfair text-2xl font-semibold mb-1 text-black">{member.name}</h3>
                    {/* Role: Geometric Sans tracking-wider */}
                    <p className="font-sans tracking-wider text-[#E7BB55] font-medium mb-4">{member.role}</p>
                    {member.description && (
                      /* Description: Geometric Sans tracking-wider */
                      <p className="font-sans tracking-wider text-black/60 text-pretty leading-relaxed">
                        {member.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </AnimatedPage>
  );
};

export default Team;