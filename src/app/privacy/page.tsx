import type { Metadata } from "next";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | 62 Moons",
  description: "How the 62 Moons site handles cookies and analytics data.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm mb-10">Last updated August 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-red-500 mb-2">
              What we collect
            </h2>
            <p>
              This site doesn&apos;t require an account. Browsing show dates,
              band info, and music links doesn&apos;t send us any personal
              information. If you use the contact form, we receive whatever
              you write along with the email address you provide, so we can
              reply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-red-500 mb-2">
              Cookies and analytics
            </h2>
            <p>
              We use Google Analytics to understand which pages get visited,
              so we can improve the site. Google Analytics is off by default:
              it only sets cookies and starts measuring after you accept
              analytics cookies in the banner shown on your first visit. If
              you decline, no Google Analytics cookies are set and no
              analytics data is sent for you.
            </p>
            <p className="mt-3">
              We also use Vercel Analytics and Vercel Speed Insights to track
              overall traffic and page performance. These run without cookies
              or any personal identifiers and don&apos;t require consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-red-500 mb-2">
              Your choices
            </h2>
            <p>
              You can change your analytics cookie choice at any time using
              the &quot;Cookie preferences&quot; link in the footer of any
              page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-red-500 mb-2">
              Third parties
            </h2>
            <p>
              We share data with Google (Google Analytics) and Vercel
              (hosting, analytics, and speed insights) only as described
              above. We don&apos;t sell your data or use it for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold uppercase tracking-wide text-red-500 mb-2">
              Contact
            </h2>
            <p>
              Questions about this policy? Reach out through the{" "}
              <a href="/contact" className="text-gray-300 underline hover:text-red-500">
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
