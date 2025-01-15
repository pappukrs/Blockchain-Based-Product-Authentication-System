'use client';
import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { ImagePreview } from './components/ImagePreview';
import { Image as ImageIcon, Download, Crown } from 'lucide-react';
import { removeBackground } from './services/api';
import { validateImage, downloadImage } from './utils/image';
import { useSubscriptionStore } from './store/useSubscriptionStore';
import { SubscriptionModal } from './components/SubscriptionModal';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const { freeCredits, isPremium, decrementCredits, setPremium } = useSubscriptionStore();

  const handleImageSelect = async (file: File) => {
    try {
      validateImage(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setProcessedImage(null);
      setError(null);
      setOriginalFile(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load image');
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setProcessedImage(null);
    setError(null);
    setOriginalFile(null);
  };

  const processImage = async () => {
    if (!originalFile) return;

    if (!isPremium && freeCredits <= 0) {
      setShowSubscriptionModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const processedImageUrl = await removeBackground(originalFile);
      setProcessedImage(processedImageUrl);
      if (!isPremium) {
        decrementCredits();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      downloadImage(processedImage, 'processed-image.png');
    }
  };

  const handleSubscribe = () => {
    setPremium(true);
    setShowSubscriptionModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ImageIcon className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900 ml-2">
              Background Remover
            </h1>
          </div>
          <p className="text-gray-600">
            Remove backgrounds from your images with just one click
          </p>
          {!isPremium && (
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm">
              <Crown className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-600">
                {freeCredits} free credits remaining
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          {!selectedImage ? (
            <ImageUpload onImageSelect={handleImageSelect} />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Original Image
                  </h3>
                  <ImagePreview
                    imageUrl={selectedImage}
                    onRemove={removeImage}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Processed Image
                  </h3>
                  {processedImage ? (
                    <div className="relative">
                      <ImagePreview
                        imageUrl={processedImage}
                        onRemove={() => setProcessedImage(null)}
                      />
                      <button
                        onClick={handleDownload}
                        className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                        title="Download processed image"
                      >
                        <Download className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500">
                        Processed image will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={processImage}
                  disabled={loading}
                  className={`px-4 py-2 rounded-md text-white font-medium
                    ${loading
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                >
                  {loading ? 'Processing...' : 'Remove Background'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showSubscriptionModal && (
        <SubscriptionModal
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
}

export default App;