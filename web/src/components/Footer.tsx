// components/Footer.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-r from-blue-500 to-purple-600 py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info Section */}
        <div>
          <p className="text-white text-sm sm:text-base">
            &copy; 2025 Blocenity. All Rights Reserved.
          </p>
          <p className="text-white text-xs sm:text-sm">
            Empowering the supply chain with blockchain-based product verification for safer and more transparent global trade.
          </p>
        </div>

        {/* Navigation Links Section */}
        <div className="flex flex-col items-start">
          <h4 className="text-white text-lg mb-2">Navigation</h4>
          <div className="mb-6">
            <Link href="#about" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              About Us
            </Link>
            <Link href="#services" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              Services
            </Link>
            <Link href="#partners" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              Partners
            </Link>
            <Link href="#contact" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Privacy and Legal Links Section */}
        <div>
          <h4 className="text-white text-lg">Legal</h4>
          <div className="mb-6">
            <Link href="#privacy-policy" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              Privacy Policy
            </Link>
            <Link href="#terms-of-service" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="flex flex-col items-start">
          <h4 className="text-white text-lg mb-2">Follow Us</h4>
          <div className="mb-6">
            <Link href="#facebook" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              Facebook
            </Link>
            <Link href="#twitter" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              Twitter
            </Link>
            <Link href="#linkedin" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              LinkedIn
            </Link>
            <Link href="#instagram" className="text-white hover:text-yellow-300 transition-colors duration-200 block">
              Instagram
            </Link>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 col-span-1 sm:col-span-3">
          <p className="text-white text-xs sm:text-sm">
            Blocenity leverages blockchain technology to ensure transparency, traceability, and authenticity across supply chains worldwide. Our solution protects businesses and consumers from counterfeit goods by providing real-time verification of product authenticity.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
