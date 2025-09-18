import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";

const contacts = [
  { name: "Anshaj Shaji", phone: "+91 9778052356" },
  { name: "George Jose", phone: "+91 7907189204" },
  { name: "Alan Biji Alex", phone: "+91 9074297466" },
  { name: "Aditya R", phone: "+91 8590889282" },
  { name: "Adithyan S.M", phone: "+91 9778559818" },
];

const EmergencyContacts = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen py-20">
        <div className="container px-4">
          <section className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Emergency Contacts
              </h1>
              <p className="text-xl text-muted-foreground">
                For urgent matters, please contact a team member directly.
              </p>
            </div>

            <div className="space-y-6">
              {contacts.map((contact) => (
                <Card key={contact.name} className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                      <Phone className="h-6 w-6 text-primary" />
                      {contact.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground ml-10">
                      {contact.phone}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default EmergencyContacts;
