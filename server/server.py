from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import io
from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware to the app
origins = [
    "http://localhost:5173",  # Your frontend URL
    # You can also add other origins if necessary
]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from the frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


def extract_colors(image_bytes, num_colors=10):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((200, 300))
    pixels = np.array(image).reshape(-1, 3)
    kmeans = KMeans(n_clusters=num_colors)
    kmeans.fit(pixels)
    colors = kmeans.cluster_centers_.astype(int)
    hex_colors = ["#{:02x}{:02x}{:02x}".format(*color) for color in colors]
    return hex_colors


@app.post("/upload/")
async def upload_image(image: UploadFile = File(...)):
    image_bytes = await image.read()
    try:
        hex_colors = extract_colors(image_bytes=image_bytes)
        return JSONResponse(content={"colors": hex_colors})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)
    else:
        print("Image uploaded")
