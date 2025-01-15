import React from 'react';
import { X, Crown } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing Stripe public key');
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface SubscriptionModalProps {
  onClose: () => void;
  onSubscribe: () => void;
}

export function SubscriptionModal({ onClose, onSubscribe }: SubscriptionModalProps) {
  const handleSubscribe = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    onSubscribe();

    // TODO: Replace with your actual Stripe price ID
    const PRICE_ID = 'price_xxx';

    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: PRICE_ID, quantity: 1 }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (error) {
        console.error('Error:', error);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
            <Crown className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Upgrade to Premium
          </h2>
          <p className="text-gray-600">
            You&apos;ve used all your free credits. Upgrade to premium for unlimited background removals!
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-3 text-gray-700">Unlimited background removals</span>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-3 text-gray-700">Priority processing</span>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="ml-3 text-gray-700">High-resolution output</span>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-gray-900 mb-2">$9.99<span className="text-lg text-gray-600">/month</span></div>
          <p className="text-sm text-gray-500">Cancel anytime</p>
        </div>

        <button
          onClick={handleSubscribe}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}