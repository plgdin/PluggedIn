import AnimatedPage from "../components/AnimatedPage";
import { ScrollText } from "lucide-react";

const Terms = () => {
  return (
    <AnimatedPage>
      <div className="min-h-screen py-20 relative overflow-hidden text-foreground">
        
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/40 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="container px-4 mx-auto max-w-5xl relative z-10">
          
          {/* Header */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 shadow-sm">
              <ScrollText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Comprehensive Terms and Conditions of Service
            </h1>
            <p className="text-muted-foreground font-medium">
              PLGDIN INNOVATONS LLP
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last Updated: December 2, 2025
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
              
              {/* 1. Agreement to Terms and Acceptance */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms and Acceptance</h2>
                <div className="space-y-4">
                  <p>
                    <strong>1.1 Parties and Formation of Contract:</strong> These Terms and Conditions ("Terms") constitute a legally binding agreement ("Agreement") made between you, whether personally or on behalf of an entity ("you," "your," or "Client"), and PLGDIN INNOVATONS LLP ("Company," "we," "us," or "our"), a Limited Liability Partnership registered in India with its principal place of business located at Marian Engineering College, Menamkulam, Thiruvananthapuram, Kerala - 695582.
                  </p>
                  <p>
                    <strong>1.2 Scope of Agreement:</strong> This Agreement governs your access to and use of our website (plgdinn.com), the purchase and use of our proprietary hardware products, including but not limited to SnuggleIt and E.L.S.A., and the engagement of our professional software, application, and web development services ("Services").
                  </p>
                  <p>
                    <strong>1.3 Binding Acceptance:</strong> By accessing our website, purchasing our products, initiating a development project, or otherwise utilizing any of our Services, you signify that you have read, understood, and agree to be bound by all of these Terms and Conditions. If you do not agree with all of these Terms, you are expressly prohibited from using the Website, purchasing the products, or engaging the Services and must discontinue use immediately.
                  </p>
                </div>
              </section>

              <hr className="border-border/50" />

              {/* 2. Hardware Products Disclaimer and Conditions of Use */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">2. Hardware Products Disclaimer and Conditions of Use</h2>
                
                <div className="space-y-6">
                  {/* 2.1 E.L.S.A. */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">2.1 E.L.S.A. (Emergency Link for Smart Alert)</h3>
                    <div className="space-y-4 ml-4">
                      <p>
                        <strong>A. Assistive Function Only:</strong> E.L.S.A. IS STRICTLY CLASSIFIED AS AN ASSISTIVE DEVICE AND A NON-LIFE-SAFETY PRODUCT. It is engineered to send alerts via digital communication methods. It is NOT, and should never be considered, a substitute for official, governmental, or professional emergency response services (such as 112, 100, 108, or any locally relevant emergency number).
                      </p>
                      
                      <div>
                        <strong>B. Exclusions of Liability for Service Failure:</strong>
                        <p className="mt-1">PLGDIN INNOVATONS LLP explicitly disclaims all responsibility and liability for any damages, losses, or injuries resulting from the failure of the E.L.S.A. device to successfully initiate or transmit an alert. Such failures include, but are not limited to:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Complete or partial Wi-Fi or Cellular network outages, signal degradation, or unavailability in the installation area.</li>
                          <li>Systematic power failures or depletion of the device's internal, external, or backup battery source.</li>
                          <li>Improper installation, non-compliance with operational guidelines, or physical tampering/damage to the device.</li>
                          <li>Failures, outages, or service interruptions from essential third-party service providers (e.g., SMS gateway providers, API services, cloud platforms).</li>
                          <li>User error in device configuration or activation.</li>
                        </ul>
                      </div>

                      <p>
                        <strong>C. User Responsibility in Emergency:</strong> In the event of a medical, security, or other emergency, the user or any responsible party must always attempt to contact official emergency authorities directly via telephone or established conventional means as the primary course of action.
                      </p>
                    </div>
                  </div>

                  {/* 2.2 SnuggleIt */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">2.2 SnuggleIt Pet Beds</h3>
                    <div className="space-y-4 ml-4">
                      <p>
                        <strong>A. Classification and Purpose:</strong> SnuggleIt is designed and sold solely as a pet comfort product. It is not a therapeutic, diagnostic, or medical device for animals. We make no claims regarding the prevention, cure, or treatment of any animal health condition.
                      </p>
                      <p>
                        <strong>B. Owner’s Responsibility for Safety:</strong> While we utilize materials deemed pet-safe, the pet owner bears sole and absolute responsibility for monitoring their specific pet's interaction with the product. This includes ensuring the pet does not engage in destructive chewing, tearing, or ingestion of the foam core, any internal or external electronic components, heating/cooling elements, or scent components.
                      </p>
                      <p>
                        <strong>C. Limitation of Liability for Misuse:</strong> PLGDIN INNOVATONS LLP is not liable for, and will not reimburse, any veterinary bills, medical expenses, or associated costs resulting directly or indirectly from the misuse, destructive behavior, chewing, or ingestion of any part of the SnuggleIt product by the pet.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-border/50" />

              {/* 3. Website & Development Services Specific Terms */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">3. Website & Development Services Specific Terms</h2>
                <p className="mb-6 italic">These clauses apply specifically when you engage PLGDIN INNOVATONS LLP for Website, Application (App), or Software Development services.</p>
                
                <div className="space-y-6">
                  {/* 3.1 Financial */}
                  <div>
                    <h3 className="font-bold text-foreground mb-2">3.1 Financial Terms and Payment Schedule</h3>
                    <ul className="space-y-2 ml-4">
                      <li><strong>Advance Payment:</strong> A mandatory non-refundable advance payment of fifty percent (50%) of the total quoted project value is required to formally begin any development work, including planning, design, and coding initiation.</li>
                      <li><strong>Final Payment:</strong> The remaining fifty percent (50%) of the project value must be paid in full before the final source code delivery, production hosting, or launch of the developed solution.</li>
                      <li><strong>External Costs:</strong> The Client is solely responsible for all external, third-party service costs, including but not limited to: domain name registration, website hosting fees, SSL certificates, payment gateway fees, premium plugin licenses, and costs associated with third-party APIs or external service subscriptions. These costs must be paid directly by the Client or reimbursed to the Company immediately upon request.</li>
                    </ul>
                  </div>

                  {/* 3.2 Scope */}
                  <div>
                    <h3 className="font-bold text-foreground mb-2">3.2 Scope Management and Change Requests</h3>
                    <ul className="space-y-2 ml-4">
                      <li><strong>Scope of Work Definition:</strong> The development engagement covers only the specific pages, features, modules, functionalities, and technical specifications explicitly detailed and itemized in the formal project quotation or Statement of Work (SOW).</li>
                      <li><strong>Additional Work:</strong> Any requests for features, functional enhancements, redesigns, aesthetic modifications, or new modules that fall outside the agreed-upon SOW will be documented as a Change Request (CR) and will incur additional charges based on a separate estimation of effort and time, which must be approved and paid for prior to implementation.</li>
                    </ul>
                  </div>

                  {/* 3.3 Third Party */}
                  <div>
                    <h3 className="font-bold text-foreground mb-2">3.3 Third-Party Dependency and Service Reliability</h3>
                    <p className="ml-4 mb-2">PLGDIN INNOVATONS LLP is not responsible for, and expressly disclaims liability for, any service failures, downtime, security breaches, or data loss caused by factors outside of the developed source code, including, but not limited to:</p>
                    <ul className="list-disc pl-9 space-y-1">
                      <li>Failures or performance issues of the Client's chosen hosting provider.</li>
                      <li>Disruption or unavailability of external payment gateways, mapping services, or other third-party APIs.</li>
                      <li>Security vulnerabilities or malfunctions inherent in third-party or open-source libraries, frameworks, or plugins utilized in the project.</li>
                      <li>Data loss, corruption, or operational issues resulting from Client-side actions, negligence, improper system administration, or unauthorized access to the operational environment.</li>
                    </ul>
                  </div>

                  {/* 3.4 Completion */}
                  <div>
                    <h3 className="font-bold text-foreground mb-2">3.4 Project Completion and Formal Closure</h3>
                    <ul className="space-y-2 ml-4">
                      <li><strong>Definition of Completion:</strong> A project is considered functionally complete upon the Company's delivery of the final product/software for the Client's review and approval.</li>
                      <li><strong>Approval Timeline:</strong> The Client has a period of seven (7) calendar days following the delivery date to provide substantive feedback, request minor adjustments (within scope), or formally approve the work.</li>
                      <li><strong>Deemed Approval:</strong> If the Company receives no feedback, communication, or formal request for revisions within the seven (7) day review period, the project will be automatically deemed formally approved and closed.</li>
                      <li><strong>Post-Closure Requests:</strong> Any new development requests, bug fixes (unrelated to original scope), or modifications submitted after formal or deemed project closure will be categorized as new paid tasks or maintenance requests and billed separately.</li>
                    </ul>
                  </div>

                  {/* 3.5 Ownership */}
                  <div>
                    <h3 className="font-bold text-foreground mb-2">3.5 Ownership, Intellectual Property, and License</h3>
                    <div className="space-y-2 ml-4">
                      <p>
                        <strong>Conditional Ownership Transfer:</strong> Full and complete ownership and intellectual property rights to the final, approved designs, custom source code, and delivered content will transfer to the Client only upon receipt of the total project fee (100% of the quoted value) in cleared funds.
                      </p>
                      <p>
                        <strong>Company's Rights:</strong> Notwithstanding the transfer of ownership, the Company retains the right to use non-Client-specific development methodologies, internal libraries, reusable code components, and general know-how developed during the project for other clients or internal purposes. The Company may also use the delivered work in its portfolio and marketing materials.
                      </p>
                    </div>
                  </div>

                  {/* 3.6 Cancellation */}
                  <div>
                    <h3 className="font-bold text-foreground mb-2">3.6 Project Cancellation and Refund Policy</h3>
                    <ul className="space-y-2 ml-4">
                      <li><strong>Non-Refundable Advance:</strong> The initial 50% advance payment is non-refundable once any development, design, or planning work on the project has officially commenced.</li>
                      <li><strong>Mid-Project Cancellation:</strong> If the Client elects to cancel the Services after commencement but before completion, the Company will bill the Client for all work completed up to the date of cancellation, based on the internal hourly rate or the pro-rata completion percentage, whichever is greater. Any remaining balance of the advance payment after billing will be retained by the Company.</li>
                      <li><strong>Service Termination:</strong> The Client may terminate a retainer or recurring service agreement with a mandatory minimum of ninety (90) days prior written notice.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <hr className="border-border/50" />

              {/* 4. Limitation of Liability and Indemnification */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">4. Limitation of Liability and Indemnification</h2>
                <div className="space-y-4">
                  <p>
                    <strong>4.1 General Limitation of Liability:</strong> To the maximum extent permitted by applicable law, in no event shall PLGDIN INNOVATONS LLP, its partners, employees, agents, or affiliates be liable to you for any indirect, incidental, special, punitive, exemplary, or consequential damages whatsoever, including but not limited to: loss of revenue, loss of profit, loss of data, replacement costs, or business interruption, arising from your use of the Services or products.
                  </p>
                  <p>
                    <strong>4.2 Maximum Aggregate Liability:</strong> Our total, maximum, aggregate liability to you for any and all claims, causes of action, or damages whatsoever, regardless of the form of action, shall at all times be strictly limited to the cumulative amount actually paid, if any, by you to us for the specific product or service during the six (6) month period immediately preceding the date upon which the cause of action first arose.
                  </p>
                </div>
              </section>

              {/* 5. Governing Law and Dispute Resolution */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">5. Governing Law and Dispute Resolution</h2>
                <div className="space-y-4">
                  <p>
                    <strong>5.1 Choice of Law:</strong> These Terms and Conditions shall be governed by, construed, and enforced exclusively in accordance with the laws of India, without regard to its conflict of law principles.
                  </p>
                  <div>
                    <strong>5.2 Mandatory Arbitration:</strong>
                    <p className="mt-1">Any controversy, claim, or dispute arising out of or relating to these Terms, including the breach, termination, or validity thereof, shall be referred to and finally resolved by binding Arbitration conducted under the provisions of the Arbitration and Conciliation Act, 1996, as currently amended.</p>
                    <ul className="mt-2 space-y-1 ml-4 list-disc">
                      <li><strong>Seat of Arbitration:</strong> The legal venue and exclusive seat of the arbitration shall be Thiruvananthapuram, Kerala, India.</li>
                      <li><strong>Language:</strong> The entire proceedings, documentation, and award shall be conducted in the English language.</li>
                      <li><strong>Arbitrator Appointment:</strong> The dispute shall be resolved by a panel of One (1) Arbitrator, who shall be exclusively appointed by PLGDIN INNOVATONS LLP. The decision of the Arbitrator shall be final and binding upon both parties.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 6. Miscellaneous Provisions */}
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">6. Miscellaneous Provisions</h2>
                <div className="space-y-4">
                  <p><strong>6.1 Entire Agreement:</strong> These Terms and any policies or operating rules posted by us on the Website or with respect to the Services constitute the entire agreement and understanding between you and us.</p>
                  <p><strong>6.2 Severability:</strong> If any provision or part of a provision of these Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Terms and does not affect the validity and enforceability of any remaining provisions.</p>
                  <p><strong>6.3 Headings:</strong> The section headings used in this Agreement are for convenience only and will not limit or otherwise affect the interpretation of these Terms.</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Terms;