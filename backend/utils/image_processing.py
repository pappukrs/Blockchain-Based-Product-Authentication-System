import torch
import torch.nn.functional as F
from PIL import Image
import numpy as np
from torchvision import transforms

def normalize_tensor(tensor):
    tensor_min = tensor.min()
    tensor_max = tensor.max()
    normalized_tensor = (tensor - tensor_min) / (tensor_max - tensor_min)
    return normalized_tensor

def preprocess_image(image_path):
    # Load image
    image = Image.open(image_path).convert('RGB')
    
    # Define preprocessing
    transform = transforms.Compose([
        transforms.Resize((320, 320)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], 
                           std=[0.229, 0.224, 0.225])
    ])
    
    # Apply preprocessing
    input_tensor = transform(image)
    input_tensor = input_tensor.unsqueeze(0)
    
    return input_tensor, image.size

def postprocess_output(output_tensor, original_size):
    # Normalize output
    output_tensor = normalize_tensor(output_tensor)
    
    # Resize to original dimensions
    output_tensor = F.interpolate(
        output_tensor, 
        size=original_size[::-1], 
        mode='bilinear', 
        align_corners=False
    )
    
    # Convert to numpy array
    mask = output_tensor.squeeze().cpu().numpy()
    
    return mask