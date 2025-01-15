import torch
from models.u2net import U2NET
from utils.image_processing import preprocess_image, postprocess_output
import os

class BackgroundRemovalService:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.model = self._load_model()

    def _load_model(self):
        model = U2NET()
        model_path = os.getenv('MODEL_PATH', 'weights/u2net.pth')
        
        if os.path.exists(model_path):
            model.load_state_dict(torch.load(model_path, map_location=self.device))
            model.to(self.device)
            model.eval()
        else:
            raise FileNotFoundError(f"Model weights not found at {model_path}")
            
        return model

    @torch.no_grad()
    def remove_background(self, image_path):
        # Preprocess image
        input_tensor, original_size = preprocess_image(image_path)
        input_tensor = input_tensor.to(self.device)
        
        # Model inference
        output = self.model(input_tensor)
        
        # Post-process output
        mask = postprocess_output(output, original_size)
        
        return mask