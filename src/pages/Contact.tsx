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

    try {
      // 1. Send data to FormSubmit (Email + Webhook)
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
        (e.target as HTMLFormElement).reset(); // Clear form
      } else {
        const errorData = await response.json();
        console.error("FormSubmit Error:", errorData);
        toast.error("Failed to send message.", {
          description: "Please try again or email us directly."
        });
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Network error.", {
        description: "Please check your connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedPage>
      {/* SEO META TAGS */}
      <Helmet>
        <title>Contact Us | Plugged In (PLGDIN)</title>
        <meta
          name="description"
          content="Contact Plugged In (PLGDIN) for inquiries about SnuggleIt smart pet beds, E.L.S.A emergency systems, website development, app development, IoT solutions, and custom technology projects."
        />
      </Helmet>

      <div className="min-h-screen py-20">
        <div className="container px-4">
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products, SnuggleIt and E.L.S.A., or our services like website development, app development, IoT solutions, or custom projects? Get in touch with our team.
            </p>
          </section>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond within 24 business hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* --- CONFIGURATION FIELDS --- */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Inquiry from PluggedIn Website!" />
                  <input type="text" name="_honey" style={{ display: "none" }} />
                  <input type="hidden" name="_template" value="table" />

                  {/* UPDATED: YOUR NEW GOOGLE SCRIPT URL */}
                  <input 
                    type="hidden" 
                    name="_webhook" 
                    value="https://script.google.com/macros/s/AKfycbztm4CPmRc-0W4qYUNa7mGm77reaIht6zLkdpRcfDr53ZMH9m2ITFiZ70AGhO3p4KBs/exec" 
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" placeholder="Name" required disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" name="email" placeholder="" required disabled={isSubmitting} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" name="phone" placeholder="" required disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      placeholder="Tell us about your inquiry..." 
                      required 
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full transition-transform duration-300 ease-in-out hover:scale-105"
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
                <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Instagram className="h-5 w-5 text-primary" />
                      Instagram
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Follow us @plgd.in
                    </p>
                  </CardContent>
                </Card>
              </a>

              <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We respond to all inquiries within 24 business hours.
                  </p>
                </CardContent>
              </Card>

              <Card className="transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
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