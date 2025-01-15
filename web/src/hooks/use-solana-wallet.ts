"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useCallback } from "react";
import { toast } from "sonner";

export function useSolanaWallet() {
  const { connected, disconnect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  const handleConnect = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnect();
      toast.success("Wallet disconnected");
    } catch (error) {
      toast.error("Error disconnecting wallet");
    }
  }, [disconnect]);

  return {
    connected,
    publicKey,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
}