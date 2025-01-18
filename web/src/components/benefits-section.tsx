"use client";

import { motion } from "framer-motion";
import { Shield, TrendingUp, Users, Building2, Banknote, Lock } from "lucide-react";

const benefits = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Brand Protection",
    description: "Protect your brand identity and reputation with immutable authentication",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Revenue Growth",
    description: "Increase revenue by eliminating counterfeit competition",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Consumer Trust",
    description: "Build lasting trust with transparent product verification",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Supply Chain Visibility",
    description: "Track products throughout the entire supply chain",
  },
  {
    icon: <Banknote className="w-6 h-6" />,
    title: "Cost Reduction",
    description: "Reduce authentication and verification costs",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Regulatory Compliance",
    description: "Meet industry regulations with blockchain-backed records",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Industry Benefits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Blocenity transforms businesses across industries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}