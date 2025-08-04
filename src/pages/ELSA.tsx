import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Brain,
  Database,
  Layers,
  Monitor,
  Mic,
  Activity,
  Users,
} from "lucide-react";

const ELSA = () => {
  const features = [
    {
      number: "1",
      title: "Context-Aware Emergency Input",
      description: "A single smart button that understands the emergency situation. Single-click, double-click, triple-click, and long-press - the intelligent design can instantly communicate the specific nature of their emergency.",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      number: "2",
      title: "Data-Enriched Alerts for First Responders",
      description: "Alerts sent to hospitals or emergency services automatically include key medical details like allergies or pre-existing conditions. Emergency teams arrive not just faster - but better prepared.",
      icon: <Database className="h-6 w-6" />,
    },
    {
      number: "3",
      title: "Tiered & Targeted Escalation Workflow",
      description: "Alerts are escalated in a smart sequence - first to on-site caretakers, then to emergency services with a short cancellation window in between. This prevents panic-driven false alarms while ensuring immediate human attention.",
      icon: <Layers className="h-6 w-6" />,
    },
    {
      number: "4",
      title: "Centralized, Real-Time Management",
      description: "A single dashboard displays live device status, alert activity, and allows remote acknowledgment and resolution of incidents. Caretakers can monitor, respond, and manage all flats from one place.",
      icon: <Monitor className="h-6 w-6" />,
    },
    {
      number: "5",
      title: "Easy Setup & Seamless Expansion",
      description: "Devices are ready to use and can be easily installed in any home or flat without special skills. Instant deployability makes it simple to scale across apartments, buildings, or even entire communities.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      number: "6",
      title: "Voice-Activated Emergency Triggers",
      description: "Residents can activate emergency alerts with their voice - no need to press the button. Ideal for situations where physical access to the button is not possible. Hands-free, fast, and accessible.",
      icon: <Mic className="h-6 w-6" />,
    },
    {
      number: "7",
      title: "Automatic Fall Detection in Bathrooms",
      description: "A discreet sensor placed in bathrooms detects falls based on motion and impact patterns. Falls - especially in bathrooms - often lead to delayed responses. This system ensures that emergencies are detected even if no button is pressed.",
      icon: <Activity className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container px-4">
        {/* Header Section */}
        <section className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
            <AlertTriangle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            What is E.L.S.A?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            One of the core innovations we're developing is ELSA - Emergency Link for Smart Alert, a context-aware emergency response system designed to provide immediate help in critical situations.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-lg text-foreground leading-relaxed">
              With a single or double press of a discreet button, users can trigger alerts to medical services or law enforcement, depending on the situation. ELSA's intelligent design ensures minimal false alarms, fast communication, and seamless integration with smart environments—making it a life-saving layer of security in modern homes.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            Features of E.L.S.A
          </h2>

          <div className="grid gap-8">
            {features.map((feature, index) => (
              <Card key={feature.number} className={`${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:flex items-center overflow-hidden`}>
                <div className="md:w-1/2 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {feature.number}
                    </Badge>
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl md:text-2xl mb-4">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </div>
                <div className="md:w-1/2 bg-primary/5 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-primary opacity-20">
                    {React.cloneElement(feature.icon, { className: "h-24 w-24 md:h-32 md:w-32" })}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* The Contact Us section that was here has been removed */}

      </div>
    </div>
  );
};

export default ELSA;