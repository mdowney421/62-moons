"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items = [
    { label: "Home", href: "/" },
    { label: "The Band", href: "/band" },
    { label: "Contact", href: "/contact" },
  ];

  const getLinkClass = (href: string) =>
    `text-sm font-bold uppercase tracking-widest transition ${
      pathname === href ? "text-red-500" : "text-gray-300 hover:text-red-500"
    }`;

  return (
    <nav className="border-b border-red-900 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/62moonslogo.png"
              alt="62 Moons Band Logo"
              width={140}
              height={70}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={getLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-red-500 hover:text-red-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
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

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-red-900">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 text-sm font-bold uppercase tracking-widest ${
                  pathname === item.href
                    ? "text-red-500"
                    : "text-gray-300 hover:text-red-500"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
