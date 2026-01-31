import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, Shield, DollarSign, Zap, Users, CheckCircle, PawPrint, Siren, Code, Smartphone, Cpu, CloudCog, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import waveImage from "../assets/wave.png";
import { motion, Variants, Transition } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const standardTransition: Transition = { duration: 0.6, ease: "easeOut" };

  const slideInFromLeft: Variants = {
    initial: { opacity: 0, x: "-50%" },
    animate: { opacity: 1, x: 0 },
  };

  const slideInFromRight: Variants = {
    initial: { opacity: 0, x: "50%" },
    animate: { opacity: 1, x: 0 },
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>Plugged In (PLGDIN) | Smart Products, IoT & Software Solutions</title>
        <meta
          name="description"
          content="Plugged In (PLGDIN) builds smart products like E.L.S.A emergency systems and SnuggleIt pet beds, along with IoT, web, app, and software development solutions."
        />
      </Helmet>

      <div className="relative min-h-screen bg-white overflow-x-hidden font-lato">
        {/* Hero Section */}
        <motion.section
          className="relative py-20 px-4 md:py-32 lg:py-40 min-h-[60vh] flex items-center overflow-hidden"
          initial={{ opacity: 0, y: "-50vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="container mx-auto text-center">
            {/* Wave Image updated: Increased opacity and removed grayscale filter */}
            <div className="absolute left-0 bottom-0 w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] z-0 pointer-events-none -translate-x-[25%] md:-translate-x-[15%]">
              <img
                src={waveImage}
                alt="Decorative wave element"
                className="w-full h-auto object-contain opacity-50" 
              />
            </div>
            <div className="relative z-10">
              <h1 className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl mb-6 text-balance text-black leading-tight drop-shadow-sm">
                Building Products That
                <span className="text-[#E7BB55] block">Matter</span>
              </h1>
              
              <p className="font-sans tracking-wider text-lg md:text-xl text-black/70 mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
                At PluggedIn, we're focused on creating innovative products that enhance comfort and safety. From SnuggleIt
                pet beds to E.L.S.A. emergency devices we're building solutions that make a real difference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="font-sans tracking-wider text-sm px-8 bg-black text-[#E7BB55] hover:opacity-90 transition-transform duration-300 ease-in-out hover:scale-105" asChild>
                  <Link to="/ELSA">Explore Products <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="font-sans tracking-wider text-sm px-8 bg-transparent border-black text-black hover:bg-black hover:text-[#E7BB55] transition-transform duration-300 ease-in-out hover:scale-105" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          className="py-16 px-4 bg-white"
          initial="initial"
          animate="animate"
          variants={slideInFromLeft}
          transition={{ ...standardTransition, delay: 0.5 }}
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4 text-black">Why Choose PluggedIn?</h2>
              
              <p className="font-sans tracking-wider text-lg text-black/60 max-w-2xl mx-auto">
                We're committed to creating products that combine innovation with practicality.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Heart />, title: "Comfort First", desc: "Every product is designed with comfort and user experience as the top priority." },
                { icon: <Shield />, title: "Safety & Reliability", desc: "Built with safety in mind, ensuring reliable performance when it matters most" },
                { icon: <DollarSign />, title: "Budget-Conscious", desc: "Quality products without the premium price tag—innovation for everyone." }
              ].map((feature, i) => (
                <Card key={i} className="border-black/10 shadow-sm bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-black flex items-center justify-center mb-4 text-[#E7BB55]">{feature.icon}</div>
                    <CardTitle className="font-playfair text-2xl text-black">{feature.title}</CardTitle>
                    <CardDescription className="font-sans tracking-wider text-black/70 leading-relaxed">{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          id="services"
          className="py-20 px-4 bg-white"
          initial="initial"
          whileInView="animate"
          variants={slideInFromRight}
          viewport={{ once: true, amount: 0.2 }}
          transition={standardTransition}
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4 text-black">Our Services</h2>
              
              <p className="font-sans tracking-wider text-lg text-black/60 max-w-3xl mx-auto text-pretty">
                Beyond our core products, we leverage our technical expertise to offer a range of custom development services.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Code />, title: "Website Development" },
                { icon: <Smartphone />, title: "App Development" },
                { icon: <CloudCog />, title: "Software Development" },
                { icon: <Zap />, title: "IoT Solutions" },
                { icon: <Cpu />, title: "Custom Devices" },
                { icon: <Palette />, title: "Tech Consulting" }
              ].map((service, i) => (
                <Card key={i} className="border-black/10 shadow-sm text-center bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-black flex items-center justify-center mb-4 text-[#E7BB55]">{service.icon}</div>
                    <CardTitle className="font-playfair text-xl text-black">{service.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          id="contact"
          className="py-20 px-4 bg-white"
          initial="initial"
          whileInView="animate"
          variants={slideInFromLeft}
          viewport={{ once: true, amount: 0.2 }}
          transition={standardTransition}
        >
          <div className="container mx-auto text-center">
            <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-6 text-black">Ready to Learn More?</h2>
            
            <p className="font-sans tracking-wider text-lg text-black/60 mb-8 max-w-2xl mx-auto">
              Join us in building innovative products that enhance comfort and safety.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="font-sans tracking-wider text-sm px-8 bg-black text-[#E7BB55] transition-transform duration-300 ease-in-out hover:scale-105" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </AnimatedPage>
  );
};

export default Home;