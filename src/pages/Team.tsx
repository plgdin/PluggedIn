import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Import your images from the assets folder
import anshajImage from "../assets/team/Anshaj.jpg";
import georgeImage from "../assets/team/George.jpg";
import alanImage from "../assets/team/Alan.jpg";
import adityaImage from "../assets/team/Aditya.jpg";
import adithyanImage from "../assets/team/Adithyan.jpg";

const teamMembers = [
  { name: "Anshaj Shaji", role: "Chief Executive Officer", image: anshajImage },
  { name: "George Joseph", role: "Chief Marketing Officer", image: georgeImage },
  { name: "Alan Biji Alex", role: "Chief Operating Officer", image: alanImage },
  { name: "Aditya R", role: "Chief Technology Officer", image: adityaImage },
  { name: "Adithyan S.M", role: "Chief Financial Officer", image: adithyanImage },
];

const Team = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container px-4">
        <section className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet the Team
            </h1>
            <p className="text-xl text-muted-foreground">
              The passionate student developers behind PluggedIn and E.L.S.A.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            
            {/* First Row (3 Members) */}
            <div className="flex flex-wrap justify-center gap-8 w-full">
              {teamMembers.slice(0, 3).map((member) => (
                <Card key={member.name} className="text-center overflow-hidden flex-1 min-w-[250px]">
                  {/* The class here is changed to enforce a 4:5 aspect ratio */}
                  <div className="bg-muted aspect-[4/5] flex items-center justify-center">
                    <img src={member.image} alt={`Photo of ${member.name}`} className="h-full w-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="-mt-4 pb-4">
                    <p className="text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Second Row (2 Members) */}
            <div className="flex flex-wrap justify-center gap-8 w-full md:w-2/3">
              {teamMembers.slice(3, 5).map((member) => (
                <Card key={member.name} className="text-center overflow-hidden flex-1 min-w-[250px]">
                  {/* The class here is changed to enforce a 4:5 aspect ratio */}
                  <div className="bg-muted aspect-[4/5] flex items-center justify-center">
                    <img src={member.image} alt={`Photo of ${member.name}`} className="h-full w-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="-mt-4 pb-4">
                    <p className="text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;