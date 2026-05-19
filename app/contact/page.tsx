import type { Metadata } from "next";
import { ContactForm } from "@/src/components/ContactForm";
import { PageHeader } from "@/src/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact Me - Let's Work Together",
  description: "Connect with Menyaga Enyo Israel, a professional full-stack developer with 5+ years of experience. Get in touch for web and mobile development projects, technical consultations, collaborations, or to discuss how we can bring your digital ideas to life.",
};

export default function ContactPage() {
  return (
      <main
        id="main-content"
        className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20"
        data-parallax-depth="0.08"
      >
        <div className="container-custom max-w-4xl px-4">
          <PageHeader
            title="< Let's Connect >"
            description="Have a project in mind? Let's discuss how we can bring your ideas to life."
          />
          <ContactForm />
        </div>
      </main>
  );
}

