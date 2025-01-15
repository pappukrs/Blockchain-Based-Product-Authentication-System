import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
}

export function ImagePreview({ imageUrl, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt="Preview"
        className="w-full h-full object-contain"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <X className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}