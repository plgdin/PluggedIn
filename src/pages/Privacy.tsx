import AnimatedPage from "../components/AnimatedPage";
import { Lock, Shield, Eye, Server, Cookie, Mail, MapPin, Share2 } from "lucide-react";

const Privacy = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen py-20 relative overflow-hidden text-foreground">
        
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/40 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container px-4 mx-auto max-w-5xl relative z-10">
          
          {/* Header */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 shadow-sm">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last Updated: December 2025
            </p>
          </section>

          {/* Glassy Content Container */}
          <div className="
            backdrop-blur-md 
            bg-background/60 
            border border-primary/10 
            shadow-xl 
            rounded-2xl 
            p-8 md:p-12
          ">
            <div className="space-y-12 text-sm md:text-base leading-relaxed text-muted-foreground text-justify">
              
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="mb-4">
                  <strong>PLGDIN INNOVATONS LLP</strong> ("we," "our," or "us") is committed to managing your privacy. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website <strong>plgdinn.com</strong>, use our mobile applications, or engage our development services.
                </p>
                <p>
                  By accessing or using our Services, you consent to the information collection and use practices described in this Privacy Policy.
                </p>
              </section>

              <hr className="border-border/50" />

              {/* Data Collection */}
              <section className="space-y-6">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" /> 2. Information We Collect
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card/50 p-5 rounded-xl border border-border/50">
                        <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                        <p className="text-sm">
                            Data you voluntarily provide to us when purchasing products or services:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li>Name, Email, Phone Number.</li>
                            <li>Billing, Shipping, and Physical Addresses.</li>
                            <li>Company details (for B2B clients).</li>
                        </ul>
                    </div>

                    <div className="bg-card/50 p-5 rounded-xl border border-border/50">
                        <h3 className="font-semibold text-foreground mb-2">Device & Usage Data</h3>
                        <p className="text-sm">
                            If you use our smart devices (ELSA/SnuggleIt) or website, we may collect:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li>Device IDs, IP addresses, and Browser type.</li>
                            <li>Usage patterns and interaction logs.</li>
                            <li>Emergency Alert locations and timestamps.</li>
                        </ul>
                    </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" /> 3. How We Use Your Information
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>To provide, operate, and maintain our services.</li>
                    <li>To process transactions and send related information.</li>
                    <li>To improve, personalize, and expand our services.</li>
                    <li>To develop new products, services, features, and functionality.</li>
                    <li>To communicate with you, either directly or through one of our partners, for customer service, updates, and marketing.</li>
                </ul>
              </section>

              {/* Data Sharing (UPDATED SECTION) */}
              <section className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary" /> 4. Disclosure of Your Information
                </h2>
                <p className="mb-4 text-foreground font-medium">
                  We may share, sell, transfer, or disclose information we have collected about you in certain situations. Your information may be disclosed as follows:
                </p>
                <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                        <span className="font-bold text-primary shrink-0">4.1</span>
                        <p><strong>Third-Party Business Partners:</strong> We may share or sell your information with third-party business partners, affiliates, marketing agencies, or data aggregators to offer you certain products, services, or promotions that we believe may be of interest to you.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <span className="font-bold text-primary shrink-0">4.2</span>
                        <p><strong>Service Providers:</strong> We share data with third-party vendors who perform services for us, such as payment processing (e.g., Razorpay/Stripe), hosting, data analysis, and email delivery services.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <span className="font-bold text-primary shrink-0">4.3</span>
                        <p><strong>Business Transfers:</strong> If we engage in a merger, acquisition, bankruptcy, or sale of all or a portion of our assets, your information may be transferred or sold as part of that transaction.</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <span className="font-bold text-primary shrink-0">4.4</span>
                        <p><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</p>
                    </div>
                </div>
              </section>

              {/* Security */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" /> 5. Data Security
                </h2>
                <p>
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
              </section>

              {/* Cookies */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-primary" /> 6. Cookies and Tracking
                </h2>
                <p>
                  We use cookies and similar tracking technologies to track the activity on our Service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                </p>
              </section>

              {/* Contact Us */}
              <section className="pt-8 border-t border-border">
                <h2 className="text-xl font-bold text-foreground mb-6">7. Contact Us</h2>
                <p className="mb-6">
                    If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="flex items-start gap-4 bg-card p-6 rounded-xl border border-border shadow-sm">
                    <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                        <p className="font-bold text-foreground text-lg">PLGDIN INNOVATONS LLP</p>
                        <p>C/O Marian Engineering College</p>
                        <p>Menamkulam, Kazhakuttam</p>
                        <p>Thiruvananthapuram - 695582</p>
                        <p>Kerala, India</p>
                        <div className="flex items-center gap-2 mt-4 text-primary font-medium">
                            <Mail className="h-4 w-4" />
                            <a href="mailto:plggdinn@gmail.com" className="hover:underline">plggdinn@gmail.com</a>
                        </div>
                    </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Privacy;