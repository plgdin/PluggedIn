import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Shield, DollarSign, Zap, Users, CheckCircle, PawPrint, Siren } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Innovative Products for Comfort & Safety
          </Badge>
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-balance">
            Building Products That
            <span className="text-primary block">Matter</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            At PluggedIn, we're focused on creating innovative products that enhance comfort and safety. From SnuggleIt
            pet beds to E.L.S.A. emergency devices—we're building solutions that make a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 transition-transform duration-300 ease-in-out hover:scale-105" asChild>
              <Link to="/snuggleit">Explore Products <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent transition-transform duration-300 ease-in-out hover:scale-105" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl md:text-4xl mb-4">Why Choose PluggedIn?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to creating products that combine innovation with practicality, comfort with reliability.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Comfort First</CardTitle>
                <CardDescription>
                  Every product is designed with comfort and user experience as the top priority.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Safety & Reliability</CardTitle>
                <CardDescription>
                  Built with safety in mind, ensuring reliable performance when it matters most.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-sm transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Budget-Conscious</CardTitle>
                <CardDescription>
                  Quality products without the premium price tag—innovation for everyone.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl mb-4">Our Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From prototype to innovation—meet SnuggleIt and E.L.S.A., our flagship products designed for comfort and
              safety.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <PawPrint className="h-16 w-16 text-primary/60" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">SnuggleIt</CardTitle>
                <CardDescription className="text-base">
                  The ultimate comfort pet bed designed with your furry friend's needs in mind. Premium materials,
                  thoughtful design, and unmatched coziness.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Premium comfort materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Durable & easy to clean</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Multiple sizes available</span>
                  </li>
                </ul>
                <Button className="w-full transition-transform duration-300 ease-in-out hover:scale-105" asChild>
                  <Link to="/snuggleit">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                <Siren className="h-24 w-24 text-primary/60" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">E.L.S.A.</CardTitle>
                <CardDescription className="text-base">
                  Enhanced emergency button with advanced features beyond traditional panic buttons. Reliable,
                  feature-rich, and designed for when every second counts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Instant emergency alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Enhanced features beyond basic buttons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">Reliable when it matters most</span>
                  </li>
                </ul>
                <Button className="w-full transition-transform duration-300 ease-in-out hover:scale-105" asChild>
                  <Link to="/elsa">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bold text-3xl md:text-4xl mb-6">Small Team, Big Vision</h2>
              <p className="text-lg text-muted-foreground mb-6">
                We're not a big team yet—but we're focused, committed, and learning fast. We've already built working
                systems, tested early versions, and are eager to take SnuggleIt and E.L.S.A. from prototype to something
                truly innovative.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="font-medium">Focused Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="font-medium">Rapid Innovation</span>
                </div>
              </div>
              <Button size="lg" className="transition-transform duration-300 ease-in-out hover:scale-105" asChild>
                <Link to="/team">Join Our Journey <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">PluggedIn</div>
                  <div className="text-muted-foreground">Building Products That Matter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl mb-6">Ready to Learn More?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us in building innovative products that enhance comfort and safety. Get updates on our latest
            developments and be the first to know when our products are available.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="text-lg px-8 transition-transform duration-300 ease-in-out hover:scale-105" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
};

export default Home;