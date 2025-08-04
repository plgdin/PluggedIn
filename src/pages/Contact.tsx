import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container px-4">
        {/* Header */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to learn more about E.L.S.A or need emergency services? Get in touch with our team.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form - NOW POINTS TO YOUR FORMSPREE LINK */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll respond within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* This form now points to your unique Formspree URL */}
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
                  <Label htmlFor="emergencyType">Emergency Service Type</Label>
                  <select name="emergencyType" required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="" disabled selected>Select service type</option>
                    <option value="medical">Medical Emergency</option>
                    <option value="security">Security/Safety</option>
                    <option value="technical">Technical Support</option>
                    <option value="installation">Installation Services</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={4} placeholder="Tell us about your emergency service needs..." required />
                </div>

                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Link to="/emergency-contacts" className="block hover:opacity-80 transition-opacity">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Click here for a full list of phone numbers.</p>
                </CardContent>
              </Card>
            </Link>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Marian Engineering College<br />
                  Trivandrum, Kerala, India
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We respond to all emergency service inquiries within 24 hours. For urgent matters, please call our emergency contacts directly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Follow Up
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  After submitting your inquiry, you'll receive a confirmation email with details about next steps and expected response timeline.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;