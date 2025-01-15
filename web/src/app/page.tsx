"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Shield, History, Wallet } from "lucide-react";
import { useState } from "react";
import { QRScanner } from "@/components/qr-scanner";
import { toast } from "sonner";
import { useSolanaWallet } from "@/hooks/use-solana-wallet";

export default function Home() {
  const [isScanning, setIsScanning] = useState(false);
  const [, setScannedProduct] = useState<string | null>(null);
  const { connected, connect, disconnect, publicKey } = useSolanaWallet();

  const handleScan = (result: string) => {
    setScannedProduct(result);
    toast.info("Product ID: " + result);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            <span className="text-primary">Verifi</span>
            <span className="text-blue-600">Chain</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Blockchain-powered product authentication system ensuring genuine products
            reach consumers through immutable verification.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <QrCode className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Unique QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              Each product is assigned a unique QR code linked to blockchain records
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <Shield className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Instant Verification</CardTitle>
            </CardHeader>
            <CardContent>
              Scan and verify product authenticity in seconds
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <History className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Product History</CardTitle>
            </CardHeader>
            <CardContent>
              Track complete product lifecycle from manufacture to retail
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <Wallet className="w-8 h-8 mb-2 text-primary" />
              <CardTitle>Wallet Integration</CardTitle>
            </CardHeader>
            <CardContent>
              Seamless integration with Solana wallets for manufacturers
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <Button
            size="lg"
            className="w-full max-w-sm"
            onClick={() => setIsScanning(true)}
          >
            <QrCode className="mr-2 h-4 w-4" />
            Scan Product QR Code
          </Button>
          
          {connected ? (
            <div className="flex flex-col items-center gap-4 w-full max-w-sm">
              <p className="text-sm text-muted-foreground">
                Connected: {publicKey?.toBase58().slice(0, 8)}...
              </p>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={disconnect}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Disconnect Wallet
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="w-full max-w-sm"
              onClick={connect}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>

      <QRScanner
        isOpen={isScanning}
        onClose={() => setIsScanning(false)}
        onScan={handleScan}
      />
    </main>
  );
}