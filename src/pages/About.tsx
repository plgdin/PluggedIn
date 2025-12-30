import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <>
      {/* SEO META TAGS */}
      <Helmet>
        <title>About Us | Plugged In (PLGDIN)</title>
        <meta
          name="description"
          content="Learn about Plugged In (PLGDIN), founded in Trivandrum by computer science engineers from Marian Engineering College, focused on building smart, affordable, life-saving technology."
        />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container px-4">
          {/* Who Are We Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Who Are We?
              </h1>
              <p className="text-xl text-muted-foreground">
                PluggedIn was founded in Trivandrum by five passionate Computer Science students from Marian Engineering College.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16 items-center">
              
              {/* Card 1: Our Mission */}
              <Card className="text-center h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    To develop practical, affordable tech that genuinely helps people and makes everyday living smarter, safer, and more secure.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Card 2: Our Team (Now contains a button) */}
              <Card className="text-center h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Our Team</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4">
                  <CardDescription>
                    United by a vision to save lives through technology.
                  </CardDescription>
                  <Button asChild className="transition-transform duration-300 ease-in-out hover:scale-105">
                    <Link to="/team">Meet the Team</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Card 3: Our Innovation */}
              <Card className="text-center h-full transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Our Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    E.L.S.A represents our commitment to intelligent, secure, and budget-conscious automation for everyone.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Our Vision Section */}
          <section className="bg-card rounded-lg p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8">
                Our Vision
              </h2>
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg">
                <p className="text-lg text-foreground leading-relaxed">
                  "We're building more than just products—we're creating life-saving solutions that make everyday living smarter, safer, and more secure."
                </p>
              </div>
              <div className="mt-8 space-y-6 text-muted-foreground">
                <p className="text-lg">
                  At PluggedIn, we're not just creating products; we're focused on building a smarter, more connected living experience that can scale across homes and buildings alike. Our aim is to bring intelligent, secure, and budget-conscious automation into the hands of everyone—without compromising on quality or reliability.
                </p>
                <p className="text-lg">
                  We believe that technology should serve humanity, especially in moments when it matters most. That's why E.L.S.A isn't just an emergency button—it's a comprehensive safety ecosystem designed to save lives and provide peace of mind.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  Constantly pushing the boundaries of what's possible in emergency response technology.
                </p>
              </div>
              <div className="p-6 border rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making life-saving technology affordable and accessible to everyone, everywhere.
                </p>
              </div>
              <div className="p-6 border rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Reliability</h3>
                <p className="text-muted-foreground">
                  Building systems you can depend on when every second counts.
                </p>
              </div>
              <div className="p-6 border rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Intelligence</h3>
                <p className="text-muted-foreground">
                  Creating smart solutions that understand context and respond appropriately.
                </p>
              </div>
              <div className="p-6 border rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Security</h3>
                <p className="text-muted-foreground">
                  Ensuring your safety data is protected with the highest security standards.
                </p>
              </div>
              <div className="p-6 border rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3">Impact</h3>
                <p className="text-muted-foreground">
                  Measuring our success by the lives we help save and protect.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
