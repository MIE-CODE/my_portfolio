import type { Metadata } from "next";
import { ContactForm } from "@/src/components/ContactForm";
import { Layout } from "@/src/components/Layout";

export const metadata: Metadata = {
  title: "Contact Me - Let's Work Together",
  description: "Get in touch with Menya Israel for web development projects, collaborations, or just to say hello.",
};

export default function ContactPage() {
  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <section className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl  font-bold gradient-text font-mono mb-6">
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

