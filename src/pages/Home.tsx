import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import waveBottomLeft from "../assets/wave-bottom-left.png";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-accent/10 to-primary/10 py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Emergency Response
              <span className="text-primary block">Redefined</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Introducing E.L.S.A - Emergency Link for Smart Alert. A context-aware emergency response system designed to provide immediate help in critical situations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/elsa">Learn About E.L.S.A</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section - MODIFIED FOR WAVE BACKGROUND */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* The wave image is now inside this section, positioned absolutely */}
        <img
          src={waveBottomLeft}
          alt="Decorative wave"
          className="absolute -bottom-20 -left-20 w-2/3 md:w-1/2 opacity-20 pointer-events-none z-0"
        />

        {/* The container for the content is now positioned relatively on top of the wave */}
        <div className="container px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Life-Saving Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our emergency solutions are designed to save lives through intelligent automation and instant response capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Context-Aware</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Smart button that understands emergency types and communicates specific details to responders.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Instant Response</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Immediate alert dispatch with no delays, ensuring emergency teams arrive better prepared.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Smart Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Seamless integration with smart environments for comprehensive safety coverage.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Scalable Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  From individual homes to entire communities - our technology scales to protect everyone.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Emergency Response?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join us in building a safer, smarter, and more connected world with E.L.S.A technology.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;