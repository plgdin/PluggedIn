import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Lightbulb } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 18
    }
  }
};

const About = () => {
  return (
    <AnimatedPage>
      {/* SEO META TAGS */}
      <Helmet>
        <title>About Us | Plugged In (PLGDIN)</title>
        <meta
          name="description"
          content="Learn about Plugged In (PLGDIN), founded in Trivandrum by computer science engineers from Marian Engineering College, focused on building smart, affordable, life-saving technology."
        />
      </Helmet>

      {/* Styled in rich tech black to match the website branding */}
      <div 
        className="min-h-screen py-24 bg-[#020203] text-white overflow-x-hidden relative"
        style={{
          background: 'radial-gradient(circle 900px at 50% 50%, rgba(231, 187, 85, 0.03) 0%, rgba(2, 2, 3, 1) 80%, #020203 100%)'
        }}
      >
        {/* Header decoration line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E7BB55]/20 to-transparent z-10" />

        {/* Dynamic mesh grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7bb5503_1px,transparent_1px),linear-gradient(to_bottom,#e7bb5503_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

        <div className="container px-6 relative z-10">
          
          {/* Who Are We Section */}
          <section className="mb-24 flex flex-col items-center">
            <div className="relative w-full text-center mb-16">
              {/* White Backlight Backdrop Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[150px] bg-white/10 filter blur-[80px] rounded-full pointer-events-none opacity-60" />
              
              <motion.h1 
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 90, damping: 15 }}
                className="font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 text-5xl md:text-7xl font-black uppercase tracking-widest relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.06)]"
              >
                Who Are We?
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="font-sans tracking-wider text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto mt-8 relative z-10 leading-relaxed"
              >
                PluggedIn was founded in Trivandrum by five passionate Computer Science students from Marian Engineering College.
              </motion.p>
            </div>

            {/* Mission, Team Overview, Innovation Animated Cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-3 gap-8 w-full max-w-6xl"
            >
              {/* Card 1: Our Mission */}
              <motion.div variants={cardVariants}>
                <Card className="text-center h-full border-[#E7BB55]/15 bg-black/60 backdrop-blur-md transition-all duration-300 ease-in-out hover:border-[#E7BB55]/40 hover:shadow-[0_0_30px_rgba(231,187,85,0.1)] rounded-lg">
                  <CardHeader className="pt-8">
                    <Target className="h-10 w-10 text-[#E7BB55] mx-auto mb-3" />
                    <CardTitle className="font-display text-xl uppercase tracking-widest text-[#E7BB55]">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <CardDescription className="font-sans tracking-wider text-zinc-400 leading-relaxed text-sm">
                      To develop practical, affordable tech that genuinely helps people and makes everyday living smarter, safer, and more secure.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 2: Our Team Overview */}
              <motion.div variants={cardVariants}>
                <Card className="text-center h-full border-[#E7BB55]/15 bg-black/60 backdrop-blur-md transition-all duration-300 ease-in-out hover:border-[#E7BB55]/40 hover:shadow-[0_0_30px_rgba(231,187,85,0.1)] rounded-lg">
                  <CardHeader className="pt-8">
                    <Users className="h-10 w-10 text-[#E7BB55] mx-auto mb-3" />
                    <CardTitle className="font-display text-xl uppercase tracking-widest text-[#E7BB55]">Our Team</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <CardDescription className="font-sans tracking-wider text-zinc-400 leading-relaxed text-sm">
                      United by a vision to build safety ecosystems and save lives through accessible technology.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 3: Our Innovation */}
              <motion.div variants={cardVariants}>
                <Card className="text-center h-full border-[#E7BB55]/15 bg-black/60 backdrop-blur-md transition-all duration-300 ease-in-out hover:border-[#E7BB55]/40 hover:shadow-[0_0_30px_rgba(231,187,85,0.1)] rounded-lg">
                  <CardHeader className="pt-8">
                    <Lightbulb className="h-10 w-10 text-[#E7BB55] mx-auto mb-3" />
                    <CardTitle className="font-display text-xl uppercase tracking-widest text-[#E7BB55]">Our Innovation</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <CardDescription className="font-sans tracking-wider text-zinc-400 leading-relaxed text-sm">
                      E.L.S.A represents our commitment to intelligent, secure, and budget-conscious automation for everyone.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Centered Large CTA Button Outside and Below the Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-12 text-center"
            >
              <Link
                to="/team"
                className="inline-flex h-14 items-center justify-center rounded-lg border-2 border-[#E7BB55] bg-black/90 px-12 text-sm sm:text-base font-display font-black uppercase tracking-widest text-[#E7BB55] hover:bg-[#E7BB55] hover:text-black transition-all duration-300 ease-in-out hover:scale-105 shadow-[0_0_30px_rgba(231,187,85,0.25)] hover:shadow-[0_0_45px_rgba(231,187,85,0.45)]"
              >
                Meet Our Team
              </Link>
            </motion.div>
          </section>

          {/* Our Vision Section */}
          <section className="mb-32 w-full max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-black/40 border border-[#E7BB55]/15 rounded-lg p-8 md:p-12 backdrop-blur-md shadow-2xl"
            >
              <h2 className="font-display text-3xl md:text-4xl font-black text-center text-[#E7BB55] mb-8 uppercase tracking-widest">
                Our Vision
              </h2>
              <div className="border-l-4 border-[#E7BB55] bg-black/50 p-6 rounded-r-lg mb-8">
                <p className="font-sans tracking-wider text-base md:text-lg text-zinc-300 leading-relaxed italic">
                  "We're building more than just products—we're creating life-saving solutions that make everyday living smarter, safer, and more secure."
                </p>
              </div>
              <div className="space-y-6 text-zinc-400 text-sm md:text-base">
                <p className="font-sans tracking-wider leading-relaxed">
                  At PluggedIn, we're not just creating products; we're focused on building a smarter, more connected living experience that can scale across homes and buildings alike. Our aim is to bring intelligent, secure, and budget-conscious automation into the hands of everyone—without compromising on quality or reliability.
                </p>
                <p className="font-sans tracking-wider leading-relaxed">
                  We believe that technology should serve humanity, especially in moments when it matters most. That's why E.L.S.A isn't just an emergency button—it's a comprehensive safety ecosystem designed to save lives and provide peace of mind.
                </p>
              </div>
            </motion.div>
          </section>



          {/* Core Values Section */}
          <section className="w-full max-w-6xl mx-auto">
            <h2 className="font-display text-3xl font-black text-center text-[#E7BB55] mb-12 uppercase tracking-widest">
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
                <div key={idx} className="p-6 border border-[#E7BB55]/10 bg-black/40 rounded-lg transition-all duration-300 ease-in-out hover:border-[#E7BB55]/30 hover:shadow-[0_0_20px_rgba(231,187,85,0.05)]">
                  <h3 className="font-display text-[#E7BB55] text-lg font-bold mb-3 uppercase tracking-wider">{value.title}</h3>
                  <p className="font-sans tracking-wider text-zinc-400 text-xs leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default About;