import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 1. Import the new images from the assets folder
import anshajImage from "../assets/team/Anshaj.jpg";
import georgeImage from "../assets/team/George.jpg";
import alanImage from "../assets/team/Alan.jpg";
import adityaImage from "../assets/team/Aditya.jpg";
import adithyanImage from "../assets/team/Adithyan.jpg";

// 2. Add an 'image' property to each team member
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
        <section className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet the Team
            </h1>
            <p className="text-xl text-muted-foreground">
              The passionate student developers behind PluggedIn and E.L.S.A.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center overflow-hidden">
                {/* 3. Add the <img> tag to display the photo */}
                <div className="bg-muted h-48 flex items-center justify-center">
                  <img src={member.image} alt={`Photo of ${member.name}`} className="h-full w-full object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                </CardHeader>
                <CardContent className="-mt-4">
                  <p className="text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;