"use client";
import { useState } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-6 md:p-8 bg-white/60 dark:bg-muted-800/60 border border-muted-200 dark:border-muted-700 rounded-2xl sm:rounded-3xl backdrop-blur-sm animate-fade-in-up"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-muted-900 dark:text-muted-50 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700 rounded-lg sm:rounded-xl text-muted-900 dark:text-muted-50 placeholder-muted-400 dark:placeholder-muted-600 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-900 dark:text-muted-50 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700 rounded-lg sm:rounded-xl text-muted-900 dark:text-muted-50 placeholder-muted-400 dark:placeholder-muted-600 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      <div className="mb-4 sm:mb-6">
        <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-muted-900 dark:text-muted-50 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700 rounded-lg sm:rounded-xl text-muted-900 dark:text-muted-50 placeholder-muted-400 dark:placeholder-muted-600 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300"
          placeholder="What's this about?"
        />
      </div>
      
      <div className="mb-4 sm:mb-6">
        <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-muted-900 dark:text-muted-50 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700 rounded-lg sm:rounded-xl text-muted-900 dark:text-muted-50 placeholder-muted-400 dark:placeholder-muted-600 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-400/20 transition-all duration-300 resize-none"
          placeholder="Tell me about your project..."
        />
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : submitStatus === "success" ? "Message Sent!" : "Send Message"}
      </button>
      
      {submitStatus === "success" && (
        <p className="mt-4 text-center text-primary-600 dark:text-primary-400 animate-fade-in">
          Thank you! I&apos;ll get back to you soon.
        </p>
      )}
      
      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-muted-200 dark:border-muted-700">
        <p className="text-xs sm:text-sm text-muted-600 dark:text-muted-400 text-center mb-3 sm:mb-4">Or reach out directly:</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base">
          <a
            href="mailto:israelvictor126@gmail.com"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
          >
            israelvictor126@gmail.com
          </a>
          <span className="text-muted-400 dark:text-muted-600">•</span>
          <a
            href="tel:+2349137437424"
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
          >
            +234 913 743 7424
          </a>
        </div>
      </div>
    </form>
  );
};
