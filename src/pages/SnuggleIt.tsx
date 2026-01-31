import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, HeartPulse } from "lucide-react";
import smartbedImage from "../assets/smartbed-sketch.png";
import AnimatedPage from "../components/AnimatedPage";

const SnuggleIt = () => {
  return (
    <AnimatedPage>
      {/* SEO META TAGS */}
      <Helmet>
        <title>SnuggleIt Smart Pet Bed | Plugged In (PLGDIN)</title>
        <meta
          name="description"
          content="SnuggleIt by Plugged In (PLGDIN) is a smart pet bed with aromatherapy, soothing sounds, climate control, and intelligent health monitoring to improve your pet’s comfort and wellbeing."
        />
      </Helmet>

      <div className="min-h-screen bg-white font-lato">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="font-sans tracking-wider uppercase text-[10px] bg-black text-[#E7BB55]">
                    Revolutionary Pet Comfort
                  </Badge>
                  {/* Heading: Playfair Display */}
                  <h1 className="font-playfair text-4xl md:text-6xl font-bold text-balance leading-tight text-black">
                    The Ultimate Comfort for Your Pet
                  </h1>
                  {/* Description: Geometric Sans tracking-wider */}
                  <p className="font-sans tracking-wider text-xl text-black/70 text-pretty leading-relaxed">
                    Introducing SnuggleIt - the world's first pet bed with built-in aromatherapy and soothing sounds. Give
                    your furry friend the luxury they deserve.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-card rounded-2xl p-8 shadow-lg border border-black/10">
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
        <section id="features" className="py-20 px-4 bg-white border-t border-black/5">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              {/* Heading: Playfair Display */}
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black">Revolutionary Features</h2>
              {/* Description: Geometric Sans tracking-wider */}
              <p className="font-sans tracking-wider text-lg text-black/60 max-w-2xl mx-auto text-pretty">
                More than a bed, SnuggleIt is a smart wellness experience, actively caring for your pet's comfort, health, and emotional wellbeing.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-black/10 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-[#E7BB55]" />
                  </div>
                  <CardTitle className="font-playfair text-2xl text-black">Adaptive Climate Control</CardTitle>
                  <CardDescription className="font-sans tracking-wider text-black/70">
                    Automatically regulates its temperature for perfect year-round comfort and restorative sleep.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm font-sans tracking-wider text-black/60">
                    <li>Soothing warmth on cold nights; cooling relief on hot days.</li>
                    <li>Engineered for India's diverse climate conditions.</li>
                    <li>Vital support for young, senior, or sensitive pets.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-black/10 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-[#E7BB55]" />
                  </div>
                  <CardTitle className="font-playfair text-2xl text-black">Durable & Sustainable</CardTitle>
                  <CardDescription className="font-sans tracking-wider text-black/70">
                    Engineered for exceptional longevity with innovative and eco-friendly materials.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm font-sans tracking-wider text-black/60">
                    <li>Self-healing top layer repairs minor scratches</li>
                    <li>Eco-friendly construction</li>
                    <li>Removable & machine-washable cover</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-black/10 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                    <HeartPulse className="h-8 w-8 text-[#E7BB55]" />
                  </div>
                  <CardTitle className="font-playfair text-2xl text-black">Intelligent Monitoring</CardTitle>
                  <CardDescription className="font-sans tracking-wider text-black/70"> 
                    Smart sensors track key wellness indicators, turning the bed into a proactive health guardian.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm font-sans tracking-wider text-black/60">
                    <li>Monitors sleep quality and activity.</li>
                    <li>Tracks weight changes for health detection.</li>
                    <li>Delivers simple, actionable insights to the app.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-black">Why Pets Love SnuggleIt</h2>
              <p className="font-sans tracking-wider text-lg text-black/60 max-w-2xl mx-auto text-pretty">
                Scientifically designed to promote better sleep, reduce anxiety, and enhance your pet's overall wellbeing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-black">
                <div className="space-y-2">
                  <h3 className="font-playfair text-2xl font-semibold">Better Sleep Quality</h3>
                  <p className="font-sans tracking-wider text-black/70 leading-relaxed">
                    The combination of memory foam support, calming scents, and soothing sounds creates the perfect
                    environment for deep, restorative sleep.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-playfair text-2xl font-semibold">Reduced Anxiety</h3>
                  <p className="font-sans tracking-wider text-black/70 leading-relaxed">
                    Soothe your pet with calming aromatherapy, relaxing soundscapes, and your own recorded voice.
                  </p>
                </div>
              </div>

              <div className="bg-black rounded-2xl p-8 border border-[#E7BB55]/20">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="font-playfair text-4xl font-bold text-[#E7BB55]">94%</div>
                    <div className="font-sans tracking-wider text-xs text-white/60">of pets sleep better</div>
                  </div>
                  <div className="text-center">
                    <div className="font-playfair text-4xl font-bold text-[#E7BB55]">87%</div>
                    <div className="font-sans tracking-wider text-xs text-white/60">less anxiety reported</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-black text-[#E7BB55]">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="space-y-8">
              {/* Heading: Playfair Display */}
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-balance">Give Your Pet the Comfort They Deserve</h2>
              {/* Description: Geometric Sans tracking-wider */}
              <p className="font-sans tracking-wider text-xl text-white/80 max-w-2xl mx-auto text-pretty">
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