"use client";

import { motion } from "framer-motion";
import { 
  Factory, 
  QrCode, 
  Smartphone, 
  Shield, 
  AlertTriangle, 
  Bell,
  PackageCheck,
  Store,
  UserCheck
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const processSteps = [
  {
    icon: <Factory className="w-8 h-8" />,
    title: "Factory Setup",
    description: "Factories set up their production lines and register their products.",
    details: [
      "Establish production processes",
      "Register factory details",
      "Integrate with supply chain",
      "Prepare for product registration"
    ]
  },
  {
    icon: <PackageCheck className="w-8 h-8" />,
    title: "Packaging Verification",
    description: "Ensure that products are packaged correctly before distribution.",
    details: [
      "Verify packaging standards",
      "Check for tampering",
      "Label products accurately",
      "Prepare for shipment"
    ]
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: "Manufacturer Onboarding",
    description: "Manufacturers register on Blocenity and connect their Solana wallet for secure authentication.",
    details: [
      "Create manufacturer account",
      "Verify business credentials",
      "Connect Solana wallet",
      "Access dashboard"
    ]
  },
  {
    icon: <QrCode className="w-8 h-8" />,
    title: "Product Registration",
    description: "Each product is registered on the blockchain with unique identifiers and details.",
    details: [
      "Enter product details",
      "Generate unique identifier",
      "Create blockchain record",
      "Generate QR code"
    ]
  },
  {
    icon: <Store className="w-8 h-8" />,
    title: "Distribution",
    description: "Products move through the supply chain with tracking at each checkpoint.",
    details: [
      "Track product movement",
      "Update location data",
      "Verify authenticity at checkpoints",
      "Monitor supply chain"
    ]
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Consumer Verification",
    description: "Consumers scan product QR codes using the mobile app for instant verification.",
    details: [
      "Download mobile app",
      "Scan product QR code",
      "View product details",
      "Verify authenticity"
    ]
  },
  {
    icon: <AlertTriangle className="w-8 h-8" />,
    title: "Counterfeit Detection",
    description: "System detects potential counterfeits through various security checks.",
    details: [
      "Compare blockchain records",
      "Check verification history",
      "Analyze scanning patterns",
      "Flag suspicious activity"
    ]
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Alert System",
    description: "Manufacturers receive immediate notifications about potential counterfeits.",
    details: [
      "Real-time notifications",
      "Detailed incident reports",
      "Location tracking",
      "Action recommendations"
    ]
  }
];

export function ProcessFlow() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How Blocenity Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive end-to-end solution for product authentication and counterfeit prevention
          </p>
        </motion.div>

        <div className="grid gap-4 relative">
          {/* Connection lines */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 -translate-x-1/2 hidden lg:block" />

          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-4 items-center ${
                index % 2 === 0 ? "lg:pr-8" : "lg:pl-8 lg:flex-row-reverse"
              }`}
            >
              <Card className={`${
                index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"
              } w-full lg:w-[calc(50%-1rem)] bg-gradient-to-r from-blue-500 to-green-500 backdrop-blur`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground mb-2">{step.description}</p>
                      <ul className="space-y-1">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Shield className="w-4 h-4 text-primary" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Timeline marker */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}