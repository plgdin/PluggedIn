import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Instagram, Loader2, Send } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { toast } from "sonner"; 

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Added the requested emails to the CC field
    data["_cc"] = "alanbijialex@gmail.com, plggdinn@gmail.com, anshajshaji3@gmail.com, adityar150805@gmail.com, adithyansm045@gmail.com";

    try {
      const response = await fetch("https://formsubmit.co/ajax/elsaplgdn@gmail.com", {
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

  return (
    <AnimatedPage>
      <Helmet>
        <title>Contact Us | Plugged In (PLGDIN)</title>
        <meta
          name="description"
          content="Contact Plugged In (PLGDIN) for inquiries about SnuggleIt smart pet beds, E.L.S.A emergency systems, website development, app development, IoT solutions, and custom technology projects."
        />
      </Helmet>

      <div className="min-h-screen py-20 bg-white font-lato">
        <div className="container px-4">
          <section className="text-center mb-16">
            {/* Heading: Playfair Display */}
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-black mb-6">
              Contact Us
            </h1>
            {/* Description: Geometric Sans tracking-wider */}
            <p className="font-sans tracking-wider text-xl text-black/70 max-w-2xl mx-auto leading-relaxed">
              Have questions about our products, SnuggleIt and E.L.S.A., or our services like website development, app development, IoT solutions, or custom projects? Get in touch with our team.
            </p>
          </section>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-black/10 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl text-black">Send us a Message</CardTitle>
                <CardDescription className="font-sans tracking-wider text-black/60">
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
                      <Label htmlFor="name" className="font-sans tracking-wider text-black/80">Full Name</Label>
                      <Input id="name" name="name" placeholder="Name" required disabled={isSubmitting} className="font-sans border-black/10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-sans tracking-wider text-black/80">Email</Label>
                      <Input id="email" type="email" name="email" required disabled={isSubmitting} className="font-sans border-black/10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-sans tracking-wider text-black/80">Phone Number</Label>
                    <Input id="phone" type="tel" name="phone" required disabled={isSubmitting} className="font-sans border-black/10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType" className="font-sans tracking-wider text-black/80">Inquiry Type</Label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      className="flex h-10 w-full items-center justify-between rounded-md border border-black/10 bg-white px-3 py-2 text-sm font-sans tracking-wider focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isSubmitting}
                      defaultValue=""
                    >
                      <option value="" disabled>Select service or product</option>
                      <option value="Product Inquiry: SnuggleIt">Product Inquiry: SnuggleIt</option>
                      <option value="Product Inquiry: E.L.S.A.">Product Inquiry: E.L.S.A.</option>
                      <option value="Service: Website Development">Service: Website Development</option>
                      <option value="Service: App Development">Service: App Development</option>
                      <option value="Service: Software Development">Service: Software Development</option>
                      <option value="Service: IoT Solutions">Service: IoT Solutions</option>
                      <option value="Service: Custom Devices">Service: Custom Devices</option>
                      <option value="Service: Custom Projects">Service: Custom Projects</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-sans tracking-wider text-black/80">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      placeholder="Tell us about your inquiry..." 
                      required 
                      disabled={isSubmitting}
                      className="font-sans border-black/10"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full font-sans tracking-wider uppercase text-xs h-12 bg-black text-[#E7BB55] transition-transform duration-300 ease-in-out hover:scale-105"
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
                <Card className="border-black/10 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-playfair text-xl text-black">
                      <Instagram className="h-5 w-5 text-[#E7BB55]" />
                      Instagram
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-sans tracking-wider text-black/60">
                      Follow us @plgd.in
                    </p>
                  </CardContent>
                </Card>
              </a>

              <Card className="border-black/10 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-playfair text-xl text-black">
                    <Clock className="h-5 w-5 text-[#E7BB55]" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-sans tracking-wider text-black/60">
                    We respond to all inquiries within 24 business hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-black/10 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-playfair text-xl text-black">
                    <MapPin className="h-5 w-5 text-[#E7BB55]" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-sans tracking-wider text-black/60">
                    Trivandrum, Kerala, India
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Contact;