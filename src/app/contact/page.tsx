"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd send this data somewhere
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-red-900 bg-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl font-black text-red-600 tracking-tight">
                62
              </span>
              <span className="text-2xl font-black text-yellow-400 tracking-wider">
                MOONS
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <Link
                href="/"
                className="text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-red-500 transition"
              >
                Home
              </Link>
              <Link
                href="/band"
                className="text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-red-500 transition"
              >
                The Band
              </Link>
              <Link
                href="/contact"
                className="text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-red-500 hover:text-red-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-red-900">
              <Link
                href="/"
                className="block py-2 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-red-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/band"
                className="block py-2 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-red-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                The Band
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Page Header */}
      <section className="py-16 px-4 border-b border-red-900 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black text-red-600 mb-4 tracking-tight">
            GET IN TOUCH
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Have a show inquiry? Want to collaborate? Just want to say you love
            heavy metal? Reach out to 62 Moons. We&apos;re always interested in
            connecting with fans and fellow musicians.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="flex-1 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-black text-yellow-400 mb-8">
                Send a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-900 border border-green-600 text-green-300 font-bold">
                  ✓ Message sent! We'll get back to you soon.
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

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest transition transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-black text-yellow-400 mb-8">
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

                <div className="border-l-4 border-yellow-400 pl-6">
                  <h3 className="font-bold uppercase tracking-widest text-yellow-400 mb-2">
                    Email
                  </h3>
                  <p className="text-gray-300">
                    <a
                      href="mailto:contact@62moons.com"
                      className="hover:text-red-500 transition"
                    >
                      contact@62moons.com
                    </a>
                  </p>
                </div>

                <div className="border-l-4 border-red-600 pl-6">
                  <h3 className="font-bold uppercase tracking-widest text-red-500 mb-2">
                    The Members
                  </h3>
                  <p className="text-gray-300">
                    Nate - Vocals & Bass
                    <br />
                    Tommy - Guitar
                    <br />
                    Martin - Drums
                  </p>
                </div>

                <div className="mt-12 p-6 bg-zinc-900 border border-red-900">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Based in the heart of Chicago, 62 Moons is ready for live
                    shows, collaborations, and all inquiries related to heavy
                    metal. Reach out and let's make some noise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-900 py-8 px-4 text-center text-gray-500 text-sm">
        <p className="mb-2 uppercase tracking-widest font-bold">
          62 Moons © 2026 | Chicago, IL
        </p>
        <p>Nate • Tommy • Martin</p>
      </footer>
    </div>
  );
}
