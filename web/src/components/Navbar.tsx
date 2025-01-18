// components/Navbar.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useSolanaWallet } from "@/hooks/use-solana-wallet";

export default function Navbar() {
  const { connected, connect, disconnect, publicKey } = useSolanaWallet();

  return (
    <header className="bg-background p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Blocenity</h1>
        <div>
          {connected ? (
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Connected: {publicKey?.toBase58().slice(0, 8)}...
              </p>
              <Button
                variant="outline"
                size="lg"
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
              onClick={connect}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
