from pathlib import Path
from PIL import Image, ImageOps

INPUT_FOLDER = Path("photos")
OUTPUT_FOLDER = Path("photos_web")
MAX_DIMENSION = 1800
JPEG_QUALITY = 85

OUTPUT_FOLDER.mkdir(exist_ok=True)

photo_files = list(INPUT_FOLDER.glob("*.jpg"))
print(f"Found {len(photo_files)} photos to process.")

for photo_path in photo_files:
    print(f"Processing {photo_path.name}... ")
    
    image = Image.open(photo_path)
    image = ImageOps.exif_transpose(image)
    width, height = image.size
    if width >= height:
        new_width = MAX_DIMENSION
        new_height = int(height * (MAX_DIMENSION / width))
    else:
        new_height = MAX_DIMENSION
        new_width = int(width * (MAX_DIMENSION / height))
        
    resized = image.resize((new_width, new_height), Image.LANCZOS)
    
    output_path = OUTPUT_FOLDER / photo_path.name
    resized.save(output_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
    
    print(f"   ->saved {output_path.name} at {new_width}x{new_height}")
    
print("Done.")