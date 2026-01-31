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

      <div className="min-h-screen py-20 bg-white font-lato">
        <div className="container px-4">
          {/* Who Are We Section */}
          <section className="mb-20">
            <div className="max-w-4xl mx-auto text-center mb-16">
              {/* Heading: Playfair Display */}
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-black mb-6">
                Who Are We?
              </h1>
              {/* Description: Geometric Sans tracking-wider */}
              <p className="font-sans tracking-wider text-xl text-black/70">
                PluggedIn was founded in Trivandrum by five passionate Computer Science students from Marian Engineering College.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16 items-center">
              
              {/* Card 1: Our Mission */}
              <Card className="text-center h-full border-black/10 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <Target className="h-12 w-12 text-[#E7BB55] mx-auto mb-4" />
                  <CardTitle className="font-playfair text-2xl text-black">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Description: Geometric Sans tracking-wider */}
                  <CardDescription className="font-sans tracking-wider text-black/70 leading-relaxed">
                    To develop practical, affordable tech that genuinely helps people and makes everyday living smarter, safer, and more secure.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Card 2: Our Team */}
              <Card className="text-center h-full border-black/10 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <Users className="h-12 w-12 text-[#E7BB55] mx-auto mb-4" />
                  <CardTitle className="font-playfair text-2xl text-black">Our Team</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4">
                  {/* Description: Geometric Sans tracking-wider */}
                  <CardDescription className="font-sans tracking-wider text-black/70 leading-relaxed">
                    United by a vision to save lives through technology.
                  </CardDescription>
                  {/* Button: Geometric Sans tracking-wider */}
                  <Button asChild className="font-sans tracking-wider text-sm px-6 bg-black text-[#E7BB55] transition-transform duration-300 ease-in-out hover:scale-105">
                    <Link to="/team">Meet the Team</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Card 3: Our Innovation */}
              <Card className="text-center h-full border-black/10 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <Lightbulb className="h-12 w-12 text-[#E7BB55] mx-auto mb-4" />
                  <CardTitle className="font-playfair text-2xl text-black">Our Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Description: Geometric Sans tracking-wider */}
                  <CardDescription className="font-sans tracking-wider text-black/70 leading-relaxed">
                    E.L.S.A represents our commitment to intelligent, secure, and budget-conscious automation for everyone.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Our Vision Section */}
          <section className="bg-white border border-black/5 rounded-lg p-8 md:p-12 shadow-sm">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center text-black mb-8">
                Our Vision
              </h2>
              <div className="bg-black/5 border-l-4 border-[#E7BB55] p-6 rounded-r-lg mb-8">
                {/* Text: Geometric Sans tracking-wider */}
                <p className="font-sans tracking-wider text-lg text-black leading-relaxed">
                  "We're building more than just products—we're creating life-saving solutions that make everyday living smarter, safer, and more secure."
                </p>
              </div>
              <div className="space-y-6">
                {/* Description: Geometric Sans tracking-wider */}
                <p className="font-sans tracking-wider text-lg text-black/60 leading-relaxed">
                  At PluggedIn, we're not just creating products; we're focused on building a smarter, more connected living experience that can scale across homes and buildings alike. Our aim is to bring intelligent, secure, and budget-conscious automation into the hands of everyone—without compromising on quality or reliability.
                </p>
                {/* Description: Geometric Sans tracking-wider */}
                <p className="font-sans tracking-wider text-lg text-black/60 leading-relaxed">
                  We believe that technology should serve humanity, especially in moments when it matters most. That's why E.L.S.A isn't just an emergency button—it's a comprehensive safety ecosystem designed to save lives and provide peace of mind.
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mt-20">
            <h2 className="font-playfair text-3xl font-bold text-center text-black mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Innovation", desc: "Constantly pushing the boundaries of what's possible in emergency response technology." },
                { title: "Accessibility", desc: "Making life-saving technology affordable and accessible to everyone, everywhere." },
                { title: "Reliability", desc: "Building systems you can depend on when every second counts." },
                { title: "Intelligence", desc: "Creating smart solutions that understand context and respond appropriately." },
                { title: "Security", desc: "Ensuring your safety data is protected with the highest security standards." },
                { title: "Impact", desc: "Measuring our success by the lives we help save and protect." }
              ].map((value, idx) => (
                <div key={idx} className="p-6 border border-black/10 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg bg-white">
                  <h3 className="font-playfair text-xl font-semibold text-black mb-3">{value.title}</h3>
                  {/* Description: Geometric Sans tracking-wider */}
                  <p className="font-sans tracking-wider text-black/60 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;