import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, HeartPulse } from "lucide-react";
import smartbedImage from "../assets/smartbed-sketch.png";
import AnimatedPage from "../components/AnimatedPage";

const SnuggleIt = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary">
                    Revolutionary Pet Comfort
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
                    The Ultimate Comfort for Your Pet
                  </h1>
                  <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                    Introducing SnuggleIt - the world's first pet bed with built-in aromatherapy and soothing sounds. Give
                    your furry friend the luxury they deserve.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-card rounded-2xl p-8 shadow-lg">
                  <img
                    src={smartbedImage}
                    alt="SnuggleIt Pet Bed with scent pocket and speaker features"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Revolutionary Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                More than a bed, SnuggleIt is a smart wellness experience, actively caring for your pet's comfort, health, and emotional wellbeing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-border bg-background transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Adaptive Climate Control</CardTitle>
                  <CardDescription>
                    Automatically regulates its temperature for perfect year-round comfort and deeper, more restorative sleep.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    <li>Soothing warmth on cold nights; cooling relief on hot days.</li>
                    <li>Engineered for India's diverse climate conditions.</li>
                    <li>Vital support for young, senior, or sensitive pets.</li>
                    <li>Control manually or set to automatic via the app.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border bg-background transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Durable & Sustainable Design</CardTitle>
                  <CardDescription>Engineered for exceptional longevity with innovative and eco-friendly materials.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    <li>Self-healing top layer repairs minor scratches</li>
                    <li>Eco-friendly construction</li>
                    <li>Removable & machine-washable cover</li>
                    <li>Built for exceptional longevity</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border bg-background transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <HeartPulse className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Intelligent Health Monitoring</CardTitle>
                  <CardDescription> Smart sensors track key wellness indicators, turning the bed into a proactive health guardian for your peace of mind.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    <li>Monitors sleep quality, restlessness, and activity.</li>
                    <li>Tracks weight changes for early health detection.</li>
                    <li>Delivers simple, actionable insights to the app.</li>
                    <li>Get smart alerts for any unusual changes.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Why Pets Love SnuggleIt</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Scientifically designed to promote better sleep, reduce anxiety, and enhance your pet's overall wellbeing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Better Sleep Quality</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The combination of memory foam support, calming scents, and soothing sounds creates the perfect
                    environment for deep, restorative sleep.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Reduced Anxiety</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Soothe your pet with calming aromatherapy, relaxing soundscapes, and your own recorded voice.
These features ease separation anxiety and stress, ensuring they always feel safe and calm.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Joint Support</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Hydrogel with medical-grade memory foam provides orthopedic support for aging pets and those with joint issues or
                    arthritis.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">94%</div>
                    <div className="text-sm text-muted-foreground">of pets sleep better</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">87%</div>
                    <div className="text-sm text-muted-foreground">less anxiety reported</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">92%</div>
                    <div className="text-sm text-muted-foreground">owner satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Give Your Pet the Comfort They Deserve</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto text-pretty">
                Join thousands of happy pet parents who've transformed their pet's sleep and wellbeing with SnuggleIt.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default SnuggleIt;
