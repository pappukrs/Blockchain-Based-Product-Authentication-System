"use client";

import { motion } from "framer-motion";
import { LockIcon, ShieldCheck, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4 mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Secure Product Authentication with Blockchain
          </h1>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            VerifiChain revolutionizes product authentication by leveraging blockchain technology
            to ensure authenticity, protect brands, and build consumer trust.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: <ShieldCheck className="w-10 h-10" />,
              title: "Immutable Verification",
              description: "Blockchain-powered authentication that cannot be tampered with",
            },
            {
              icon: <LockIcon className="w-10 h-10" />,
              title: "Instant Validation",
              description: "Scan and verify product authenticity in seconds",
            },
            {
              icon: <TrendingUp className="w-10 h-10" />,
              title: "Supply Chain Visibility",
              description: "Track products from manufacture to retail",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card/50 backdrop-blur border border-border/50"
            >
              <div className="mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
              style={{
                transform: `rotate(${i * 45}deg) translateY(${i * 100}px)`,
                opacity: 0.5 - i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}