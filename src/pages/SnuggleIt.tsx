import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Volume2, Sparkles, Shield, Truck } from "lucide-react";
import smartbedImage from "../assets/smartbed-sketch.png";

const SnuggleIt = () => {
  return (
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
              SnuggleIt isn't just a pet bed - it's a complete comfort experience designed with your pet's wellbeing in
              mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-background">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Scent Pocket</CardTitle>
                <CardDescription>
                  Built-in aromatherapy compartment for calming lavender or your pet's favorite scents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Removable scent cartridges</li>
                  <li>Natural calming aromatherapy</li>
                  <li>Reduces anxiety and stress</li>
                  <li>Long-lasting fragrance release</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Volume2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Built-in Speaker</CardTitle>
                <CardDescription>Wireless Bluetooth speaker for soothing sounds, music, or white noise</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Bluetooth 5.0 connectivity</li>
                  <li>8-hour battery life</li>
                  <li>Pre-loaded calming sounds</li>
                  <li>Volume control via app</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-background">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Premium Materials</CardTitle>
                <CardDescription>Memory foam cushioning with washable, hypoallergenic fabric cover</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Medical-grade memory foam</li>
                  <li>Machine washable covers</li>
                  <li>Anti-bacterial treatment</li>
                  <li>Durable construction</li>
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
                  Aromatherapy and white noise help calm nervous pets, especially during storms, fireworks, or when left
                  alone.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Joint Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Medical-grade memory foam provides orthopedic support for aging pets and those with joint issues or
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

      {/* Reviews Section */}
      <section id="reviews" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What Pet Parents Say</h2>
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-primary" />
              ))}
              <span className="ml-2 text-lg font-semibold">4.9/5 from 2,847 reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Max used to have terrible anxiety during thunderstorms. Since getting SnuggleIt, he sleeps peacefully
                  through even the loudest storms!"
                </p>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-muted-foreground">Golden Retriever Owner</div>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The memory foam has been amazing for Luna's hip dysplasia. She's moving better and seems so much more
                  comfortable."
                </p>
                <div className="font-semibold">Mike R.</div>
                <div className="text-sm text-muted-foreground">German Shepherd Owner</div>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "I love that I can play calming music through the speaker. Bella falls asleep so much faster now, and
                  the lavender scent is divine!"
                </p>
                <div className="font-semibold">Jennifer L.</div>
                <div className="text-sm text-muted-foreground">French Bulldog Owner</div>
              </CardContent> {/* This closing tag was fixed */}
            </Card>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Order Now - $149
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                30-Day Money Back Guarantee
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Made with Love</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
};

export default SnuggleIt;