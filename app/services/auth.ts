import Web3 from 'web3';

let web3: Web3 | null = null;

/**
 * Connects to a wallet (e.g., MetaMask)
 */
export const connectWallet = async (): Promise<string | null> => {
  if (!window.ethereum) {
    console.error('MetaMask is not installed.');
    return null;
  }

  try {
    // Request wallet connection
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    web3 = new Web3(window.ethereum);
    console.log('Connected account:', accounts[0]);
    return accounts[0];
  } catch (error) {
    console.error('Wallet connection failed:', error);
    return null;
  }
};

/**
 * Gets the current wallet address
 */
export const getCurrentWallet = async (): Promise<string | null> => {
  if (!web3 || !window.ethereum) {
    console.error('Wallet not connected.');
    return null;
  }

  try {
    const accounts = await web3.eth.getAccounts();
    return accounts[0] || null;
  } catch (error) {
    console.error('Error fetching wallet address:', error);
    return null;
  }
};

/**
 * Signs a message for authentication
 */
export const signMessage = async (message: string): Promise<string | null> => {
  if (!web3 || !window.ethereum) {
    console.error('Wallet not connected.');
    return null;
  }

  try {
    const accounts = await web3.eth.getAccounts();
    const signature = await web3.eth.personal.sign(message, accounts[0], '');
    console.log('Signature:', signature);
    return signature;
  } catch (error) {
    console.error('Error signing message:', error);
    return null;
  }
};
