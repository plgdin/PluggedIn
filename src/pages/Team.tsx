// FILE: src/pages/Team.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const teamMembers = [
  { name: "Anshaj Shaji", role: "Project Lead" },
  { name: "George Jose", role: "Frontend Developer" },
  { name: "Alan Biji Alex", role: "Backend Developer" },
  { name: "Aditya R", role: "UI/UX Designer" },
  { name: "Adithyan S.M", role: "System Architect" },
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
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <User className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
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