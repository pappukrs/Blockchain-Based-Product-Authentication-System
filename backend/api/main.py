from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import os
import io
from PIL import Image
import numpy as np
from services.background_removal import BackgroundRemovalService

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize background removal service
background_service = BackgroundRemovalService()

@app.post("/remove-background")
async def remove_background(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        temp_path = f"temp_{file.filename}"
        with open(temp_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Process image
        mask = background_service.remove_background(temp_path)
        
        # Load original image
        original_image = Image.open(temp_path).convert('RGBA')
        
        # Apply mask to create transparent background
        mask_image = Image.fromarray((mask * 255).astype(np.uint8))
        mask_image = mask_image.convert('L')
        
        # Set alpha channel
        original_image.putalpha(mask_image)
        
        # Save to bytes
        img_byte_arr = io.BytesIO()
        original_image.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        
        # Clean up
        os.remove(temp_path)
        
        return Response(content=img_byte_arr, media_type="image/png")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)