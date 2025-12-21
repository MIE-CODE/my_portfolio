import type { Metadata } from "next";
import { ContactForm } from "@/src/components/ContactForm";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Contact Me - Let's Work Together",
  description: "Connect with Menyaga Enyo Israel, a professional full-stack developer with 5+ years of experience. Get in touch for web and mobile development projects, technical consultations, collaborations, or to discuss how we can bring your digital ideas to life.",
};

export default function ContactPage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20">
        <div className="container-custom max-w-4xl px-4">
          <section className="text-center mb-10 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl  font-bold gradient-text font-mono mb-6">
              {"< Let's Connect >"}
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s discuss how we can bring your ideas to life.
            </p>
          </section>
          <ContactForm />
        </div>
      </main>
    </Layout>
  );
}

