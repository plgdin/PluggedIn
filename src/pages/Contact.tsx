import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Instagram, Loader2, Send } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { toast } from "sonner"; 
import { motion, AnimatePresence } from "framer-motion";
import { NeuralNoise } from "@/components/ui/neural-noise";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    // Hold the title animation for 2.2 seconds before transitioning to the form
    const timer = setTimeout(() => {
      setAnimationCompleted(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/plggdinn@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you within 24 hours."
        });
        (e.target as HTMLFormElement).reset(); 
      } else {
        const errorData = await response.json();
        console.error("FormSubmit Error:", errorData);
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Network error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleText = "CONTACT US";
  const words = titleText.split(" ");

  return (
    <AnimatedPage>
      <Helmet>
        <title>Contact Us | Plugged In (PLGDIN)</title>
        <meta
          name="description"
          content="Contact Plugged In (PLGDIN) for inquiries about E.L.S.A emergency systems, website development, app development, IoT solutions, and custom technology projects."
        />
      </Helmet>

      <div 
        className="relative min-h-screen py-24 bg-[#020203] text-white overflow-x-hidden font-modern"
        style={{
          background: 'radial-gradient(circle 900px at 50% 50%, rgba(231, 187, 85, 0.03) 0%, rgba(2, 2, 3, 1) 80%, #020203 100%)'
        }}
      >
        {/* WebGL Neural Noise Background */}
        <NeuralNoise opacity={0.45} speed={0.0006} />

        {/* Header decoration line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E7BB55]/20 to-transparent z-10" />

        {/* Dynamic mesh grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7bb5503_1px,transparent_1px),linear-gradient(to_bottom,#e7bb5503_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

        <div className="container px-6 relative min-h-[75vh] flex flex-col justify-center items-center">
          {/* Animated Header that fades away */}
          <AnimatePresence>
            {!animationCompleted && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-none"
              >
                <div className="relative w-full text-center">
                  {/* White Backlight Backdrop Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[150px] bg-white/10 filter blur-[80px] rounded-full pointer-events-none opacity-60" />
                  
                  <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-widest relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.06)]">
                    {words.map((word, wordIndex) => (
                      <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                        {word.split("").map((letter, letterIndex) => (
                          <motion.span
                            key={`${wordIndex}-${letterIndex}`}
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                              delay: wordIndex * 0.15 + letterIndex * 0.05,
                              type: "spring",
                              stiffness: 150,
                              damping: 25,
                            }}
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 font-display tracking-tight"
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </h1>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form and Cards container, fades in after title fades away */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={animationCompleted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`w-full relative z-10 ${animationCompleted ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            {/* Header section */}
            <div className="text-center mb-16 mt-6">
              <h2 className="font-display text-4xl md:text-5xl font-black uppercase tracking-widest text-[#E7BB55] mb-6">
                Contact Us
              </h2>
              <p className="font-modern tracking-wider text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Have questions about our product, E.L.S.A., or our services like website development, app development, IoT solutions, or custom projects? Get in touch with our team.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="border-[#E7BB55]/15 bg-black/60 backdrop-blur-md transition-all duration-300 ease-in-out hover:border-[#E7BB55]/30 hover:shadow-[0_0_30px_rgba(231,187,85,0.05)] rounded-lg">
                <CardHeader>
                  <CardTitle className="font-display text-2xl text-[#E7BB55] tracking-wider uppercase">Send us a Message</CardTitle>
                  <CardDescription className="font-modern tracking-wider text-zinc-400">
                    Fill out the form below and we'll respond within 24 business hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_subject" value="New Inquiry from PluggedIn Website!" />
                    <input type="text" name="_honey" style={{ display: "none" }} />
                    <input type="hidden" name="_template" value="table" />
                    <input 
                      type="hidden" 
                      name="_webhook" 
                      value="https://script.google.com/macros/s/AKfycbx7r38x2oTh0Nf_LePjPv4R-g2akqth9YzsEblLM5dIBoZeupvE6oVJysVWPOnM_eqJ/exec" 
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="font-modern tracking-wider text-zinc-300">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Name" 
                          required 
                          disabled={isSubmitting} 
                          className="font-modern bg-[#050507]/60 border-[#E7BB55]/15 text-white placeholder-zinc-500 focus-visible:ring-[#E7BB55] focus-visible:border-[#E7BB55]" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-modern tracking-wider text-zinc-300">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          name="email" 
                          required 
                          disabled={isSubmitting} 
                          className="font-modern bg-[#050507]/60 border-[#E7BB55]/15 text-white placeholder-zinc-500 focus-visible:ring-[#E7BB55] focus-visible:border-[#E7BB55]" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-modern tracking-wider text-zinc-300">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        name="phone" 
                        required 
                        disabled={isSubmitting} 
                        className="font-modern bg-[#050507]/60 border-[#E7BB55]/15 text-white placeholder-zinc-500 focus-visible:ring-[#E7BB55] focus-visible:border-[#E7BB55]" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType" className="font-modern tracking-wider text-zinc-300">Inquiry Type</Label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        required
                        className="flex h-10 w-full items-center justify-between rounded-md border border-[#E7BB55]/15 bg-[#050507]/80 text-white px-3 py-2 text-sm font-modern tracking-wider focus:outline-none focus:ring-2 focus:ring-[#E7BB55] disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isSubmitting}
                        defaultValue=""
                      >
                        <option value="" disabled className="bg-[#050507] text-zinc-500">Select service or product</option>
                        <option value="Product Inquiry: E.L.S.A." className="bg-[#050507] text-white">Product Inquiry: E.L.S.A.</option>
                        <option value="Service: Website Development" className="bg-[#050507] text-white">Service: Website Development</option>
                        <option value="Service: App Development" className="bg-[#050507] text-white">Service: App Development</option>
                        <option value="Service: Software Development" className="bg-[#050507] text-white">Service: Software Development</option>
                        <option value="Service: IoT Solutions" className="bg-[#050507] text-white">Service: IoT Solutions</option>
                        <option value="Service: Custom Devices" className="bg-[#050507] text-white">Service: Custom Devices</option>
                        <option value="Service: Custom Projects" className="bg-[#050507] text-white">Service: Custom Projects</option>
                        <option value="General Inquiry" className="bg-[#050507] text-white">General Inquiry</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-modern tracking-wider text-zinc-300">Message</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        placeholder="Tell us about your inquiry..." 
                        required 
                        disabled={isSubmitting}
                        className="font-modern bg-[#050507]/60 border-[#E7BB55]/15 text-white placeholder-zinc-500 focus-visible:ring-[#E7BB55] focus-visible:border-[#E7BB55]"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full font-display tracking-widest uppercase text-xs h-12 bg-[#E7BB55] text-black hover:bg-black hover:text-[#E7BB55] hover:border hover:border-[#E7BB55]/40 transition-transform duration-300 ease-in-out hover:scale-105 font-bold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <a
                  href="https://www.instagram.com/plgd.in?igsh=NWZ6d29jc3V0bzBx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-80 transition-opacity"
                >
                  <Card className="border-[#E7BB55]/15 bg-black/60 backdrop-blur-md transition-transform duration-300 ease-in-out hover:scale-105 hover:border-[#E7BB55]/30 hover:shadow-[0_0_30px_rgba(231,187,85,0.08)]">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 font-display text-xl text-[#E7BB55] uppercase tracking-wider">
                        <Instagram className="h-5 w-5 text-[#E7BB55]" />
                        Instagram
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-modern tracking-wider text-zinc-300">
                        Follow us @plgd.in
                      </p>
                    </CardContent>
                  </Card>
                </a>

                <Card className="border-[#E7BB55]/15 bg-black/60 backdrop-blur-md transition-transform duration-300 ease-in-out hover:scale-105 hover:border-[#E7BB55]/30 hover:shadow-[0_0_30px_rgba(231,187,85,0.08)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display text-xl text-[#E7BB55] uppercase tracking-wider">
                      <Clock className="h-5 w-5 text-[#E7BB55]" />
                      Response Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-modern tracking-wider text-zinc-300">
                      We respond to all inquiries within 24 business hours.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-[#E7BB55]/15 bg-black/60 backdrop-blur-md transition-transform duration-300 ease-in-out hover:scale-105 hover:border-[#E7BB55]/30 hover:shadow-[0_0_30px_rgba(231,187,85,0.08)]">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-display text-xl text-[#E7BB55] uppercase tracking-wider">
                      <MapPin className="h-5 w-5 text-[#E7BB55]" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-modern tracking-wider text-zinc-300">
                      Trivandrum, Kerala, India
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Contact;