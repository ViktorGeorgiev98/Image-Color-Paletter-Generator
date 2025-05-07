# Image Color Extractor & Generator

This project is a full-stack web application that allows users to upload an image, extract the top dominant colors, and display them in a clean and interactive UI. The backend is built with **FastAPI** and the frontend with **React**.

## Features

- Upload an image through the frontend UI.
- Extract top dominant colors from the uploaded image using **K-Means clustering**.
- Display the extracted colors as color swatches.
- Fully responsive and easy-to-use frontend interface.

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: FastAPI, Python
- **Color Extraction**: K-Means clustering (Scikit-learn)
- **Image Processing**: Pillow (Python Imaging Library)
- **Deployment**: Netlify (Frontend), Heroku (Backend)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/image-color-extractor.git
cd image-color-extractor
