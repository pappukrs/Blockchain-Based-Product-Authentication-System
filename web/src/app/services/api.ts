import axios from 'axios';
import { API_CONFIG } from '../config/api';

export async function removeBackground(imageFile: File): Promise<string> {
  if (!API_CONFIG.REMOVE_BG_API_KEY) {
    throw new Error('API key is not configured. Please add your remove.bg API key to the environment variables.');
  }

  const formData = new FormData();
  formData.append('image_file', imageFile);
  formData.append('size', 'auto');

  try {
    const response = await axios.post(API_CONFIG.API_ENDPOINT, formData, {
      headers: {
        'X-Api-Key': API_CONFIG.REMOVE_BG_API_KEY,
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'arraybuffer',
    });

    // Check if the response is an error message
    const contentType = response.headers['content-type'];
    if (contentType && contentType.includes('application/json')) {
      // Parse error message
      const errorMessage = JSON.parse(Buffer.from(response.data).toString());
      throw new Error(errorMessage.message || 'Failed to remove background');
    }

    const base64Image = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data
        ? `API Error: ${error.response.status} - ${error.response.statusText}`
        : 'Failed to connect to the background removal service';
      throw new Error(errorMessage);
    }
    throw error;
  }
}