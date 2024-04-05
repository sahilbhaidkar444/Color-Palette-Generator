from flask import Flask, render_template, request
import os
from PIL import Image
import numpy as np
import base64
import io

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No file part'
        
        file = request.files['file']
        
        if file.filename == '':
            return 'No selected file'
        
        if file:
            image_data = file.read()
            image_b64 = base64.b64encode(image_data).decode('utf-8')
            colors = extract_colors(image_data)
            return render_template('index.html', colors=colors, image=image_b64)
    return render_template('index.html', colors=[], image=None)

def extract_colors(image_data):
    # Open image
    image = Image.open(io.BytesIO(image_data))
    
    
    image = image.resize((300, 300))
    
    
    image_array = np.array(image)
    
    
    pixels = image_array.reshape((-1, 3))
    
    
    unique_colors, color_counts = np.unique(pixels, axis=0, return_counts=True)
    
    
    sorted_indices = np.argsort(-color_counts)
    sorted_colors = unique_colors[sorted_indices]
    
    # Convert colors to hexadecimal format
    colors_hex = ['#' + ''.join(f'{c:02x}' for c in color) for color in sorted_colors]
    
    return colors_hex[:7]  

if __name__ == '__main__':
    app.run(debug=True)
