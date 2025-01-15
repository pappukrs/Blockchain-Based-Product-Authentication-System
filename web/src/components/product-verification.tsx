"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, AlertCircle } from "lucide-react";
import { verifyProduct } from "@/lib/api";
import { solanaService } from "@/lib/solana";
import { toast } from "sonner";

interface ProductVerificationProps {
  productId: string | null;
}

export function ProductVerification({ productId }: ProductVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [productDetails, setProductDetails] = useState<any>(null);

  const handleVerification = async () => {
    if (!productId) return;

    setIsVerifying(true);
    try {
      // Verify on blockchain
      const isOnChain = await solanaService.verifyProduct(productId);
      if (!isOnChain) {
        toast.error("Product not found on blockchain");
        return;
      }

      // Get product details from backend
      const details = await verifyProduct(productId);
      setProductDetails(details);
      toast.success("Product verified successfully!");
    } catch (error) {
      toast.error("Failed to verify product");
      console.error(error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (!productId) return null;

  return (
    <Card className="w-full max-w-sm mx-auto mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Product Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Product ID: {productId}
        </p>
        
        {productDetails ? (
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Status:</strong>{" "}
              <span className="text-green-600">Verified</span>
            </p>
            <p className="text-sm">
              <strong>Manufacturer:</strong> {productDetails.manufacturer}
            </p>
            <p className="text-sm">
              <strong>Production Date:</strong>{" "}
              {new Date(productDetails.productionDate).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <strong>Verification Count:</strong>{" "}
              {productDetails.verificationCount}
            </p>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={handleVerification}
            disabled={isVerifying}
          >
            {isVerifying ? (
              "Verifying..."
            ) : (
              <>
                <Shield className="w-4 h-4 mr-2" />
                Verify Product
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}