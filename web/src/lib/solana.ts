"use client";

import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
// import { toast } from "sonner";

const PROGRAM_ID = new PublicKey("your_program_id_here"); // Replace with your deployed program ID
const NETWORK = "devnet";
const ENDPOINT = `https://api.${NETWORK}.solana.com`;

export class SolanaService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(ENDPOINT);
  }

  async registerProduct(
    manufacturerWallet: PublicKey,
    // productDetails: { name: string; serialNumber: string }
  ) {
    try {
      const productAccount = SystemProgram.createAccount({
        fromPubkey: manufacturerWallet,
        newAccountPubkey: PublicKey.unique(),
        lamports: await this.connection.getMinimumBalanceForRentExemption(1000),
        space: 1000,
        programId: PROGRAM_ID,
      });

      const transaction = new Transaction().add(productAccount);
      
      return {
        transaction,
        productAccount: productAccount.keys[1].pubkey,
      };
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async verifyProduct(productId: string): Promise<boolean> {
    try {
      const productPubkey = new PublicKey(productId);
      const accountInfo = await this.connection.getAccountInfo(productPubkey);
      
      if (!accountInfo) {
        return false;
      }

      // Verify the account is owned by our program
      return accountInfo.owner.equals(PROGRAM_ID);
    } catch (error) {
      console.error("Error verifying product:", error);
      return false;
    }
  }
}

export const solanaService = new SolanaService();