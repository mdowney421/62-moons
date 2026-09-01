"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { useState } from "react";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Oops, something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />
      <Marquee />

      {/* Page Header */}
      <section className="py-16 px-4 border-b border-red-900 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-6xl sm:text-7xl text-red-600 mb-4 tracking-[0.1em]">
            GET IN TOUCH
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Booking a show? Looking to collab? Just want to tell us
            we&apos;re too loud? Hit send — 62 Moons reads every message,
            and we&apos;re always down to connect with fans and fellow
            musicians.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex-1 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Reveal>
              <h2 className="font-display text-4xl text-yellow-500 mb-8 tracking-wide">
                Send a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-900 border border-green-600 text-green-300 font-bold">
                  ✓ Message sent! We&apos;ll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-gray-700 text-white focus:border-red-600 focus:outline-none transition"
                    placeholder="Metal fan name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-gray-700 text-white focus:border-red-600 focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-900 border border-gray-700 text-white focus:border-red-600 focus:outline-none transition"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-zinc-900 border border-gray-700 text-white focus:border-red-600 focus:outline-none transition"
                    placeholder="Tell us everything..."
                  ></textarea>
                </div>

                <Magnetic className="block w-full" strength={24}>
                  <button
                    type="submit"
                    style={{ clipPath: "polygon(2% 0, 100% 0, 98% 100%, 0 100%)" }}
                    className="w-full px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                  >
                    Send Message
                  </button>
                </Magnetic>
              </form>
            </Reveal>

            {/* Contact Info */}
            <Reveal delay={150}>
              <h2 className="font-display text-4xl text-yellow-500 mb-8 tracking-wide">
                Contact Info
              </h2>

              <div className="space-y-8">
                <div className="border-l-4 border-red-600 pl-6">
                  <h3 className="font-bold uppercase tracking-widest text-red-500 mb-2">
                    Location
                  </h3>
                  <p className="text-gray-300">
                    Chicago, Illinois
                    <br />
                    USA
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="font-bold uppercase tracking-widest text-yellow-500 mb-2">
                    The Members
                  </h3>
                  <p className="text-gray-300">
                    Nate - Vocals & Bass
                    <br />
                    Tommy - Guitar
                    <br />
                    Pilot Pete - Drums
                  </p>
                </div>

                <div className="mt-12 p-6 bg-zinc-900 border border-red-900">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Based in the heart of Chicago, 62 Moons is ready for live
                    shows, collaborations, and all inquiries related to heavy
                    metal. Reach out and let&apos;s make some noise.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
