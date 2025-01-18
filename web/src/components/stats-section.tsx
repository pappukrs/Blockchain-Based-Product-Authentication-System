"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { year: "2020", counterfeit: 1.7, authentic: 2.8 },
  { year: "2021", counterfeit: 1.4, authentic: 3.2 },
  { year: "2022", counterfeit: 1.1, authentic: 3.8 },
  { year: "2023", counterfeit: 0.8, authentic: 4.2 },
];

export function StatsSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Industry Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how blockchain authentication is transforming industries and reducing counterfeit products
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-semibold mb-2">94%</h3>
              <p className="text-muted-foreground">Reduction in counterfeit products</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-semibold mb-2">$2.2B</h3>
              <p className="text-muted-foreground">Saved in potential revenue loss</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-2xl font-semibold mb-2">15M+</h3>
              <p className="text-muted-foreground">Products authenticated monthly</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="authentic" name="Authentic Products" fill="hsl(var(--chart-1))" />
                <Bar dataKey="counterfeit" name="Counterfeit Products" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}