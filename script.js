document.getElementById('upload-btn').addEventListener('click', function() {
    document.getElementById('upload').click();
});

document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = document.getElementById('image-preview');
        img.src = e.target.result;
        img.style.display = 'block'; // Show the image
        document.getElementById('select-image-msg').style.display = 'none'; // Hide the placeholder message

        // Extract colors from the image using Vibrant.js
        Vibrant.from(img.src).getPalette((err, palette) => {
            if (err) {
                console.error(err);
                return;
            }

            const colorPalette = document.getElementById('color-palette');
            colorPalette.innerHTML = ''; // Clear previous colors

            // Create color swatches for each color in the palette
            for (const swatch in palette) {
                if (palette.hasOwnProperty(swatch) && palette[swatch]) {
                    const color = palette[swatch].getHex();
                    const colorBox = document.createElement('div');
                    colorBox.style.backgroundColor = color;
                    colorBox.className = 'color-box';
                    colorPalette.appendChild(colorBox);
                }
            }
        });
    };

    reader.readAsDataURL(file);
});
