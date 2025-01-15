import os
import gdown
import sys

def download_weights():
    # U2Net model weights Google Drive ID
    model_id = '1tCU5MM1LhRgGou5OpmpjBQbSrYIUoYab'
    output_path = 'weights/u2net.pth'
    
    # Create weights directory if it doesn't exist
    os.makedirs('weights', exist_ok=True)
    
    # Download weights
    try:
        gdown.download(
            f'https://drive.google.com/uc?id={model_id}',
            output_path,
            quiet=False
        )
        print(f"Successfully downloaded model weights to {output_path}")
        return True
    except Exception as e:
        print(f"Error downloading weights: {str(e)}")
        return False

if __name__ == "__main__":
    success = download_weights()
    sys.exit(0 if success else 1)