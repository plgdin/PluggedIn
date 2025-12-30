import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Clock, Instagram } from "lucide-react"; // Mail is no longer used, could be removed
import AnimatedPage from "../components/AnimatedPage";

const Contact = () => {
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
          {/* Header */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products, SnuggleIt and E.L.S.A., or our services like website development, app development, IoT solutions, or custom projects? Get in touch with our team.
            </p>
          </section>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form (Remains unchanged) */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll respond within 24 business hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action="https://formspree.io/f/mblkzrla" method="POST" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" name="email" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" name="phone" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled selected>Select service or product</option>
                      <option value="product_snuggleit">Product Inquiry: SnuggleIt</option>
                      <option value="product_elsa">Product Inquiry: E.L.S.A.</option>
                      <option value="website_dev">Service: Website Development</option>
                      <option value="app_dev">Service: App Development</option>
                      <option value="software_dev">Service: Software Development</option>
                      <option value="iot">Service: IoT Solutions</option>
                      <option value="custom_device">Service: Custom Devices</option>
                      <option value="custom_project">Service: Custom Projects</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={4} placeholder="Tell us about your inquiry..." required />
                  </div>
                  <Button type="submit" className="w-full transition-transform duration-300 ease-in-out hover:scale-105">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
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
