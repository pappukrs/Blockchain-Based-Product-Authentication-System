"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

export function QRScanner({ isOpen, onClose, onScan }: QRScannerProps) {
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isOpen && !scanner) {
      // Wait for element to be available
      const qrElement = document.getElementById("qr-reader");
      if (!qrElement) {
        console.warn("QR reader element not found");
        return;
      }

      const newScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      newScanner.render(
        (decodedText) => {
          onScan(decodedText);
          newScanner.clear();
          onClose();
          toast.success("QR Code scanned successfully!");
        },
        (error) => {
          console.warn(error);
        }
      );

      setScanner(newScanner);
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [isOpen, scanner, onClose, onScan]);

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <div id="qr-reader" className="w-full max-w-sm" />
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}