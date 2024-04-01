document.getElementById('upload-btn').addEventListener('click', function() {
    document.getElementById('upload').click();
});

document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            
            // Get image data from canvas
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            // Extract colors from image data
            const colorCounts = {};
            for (let i = 0; i < pixels.length; i += 4) {
                const rgb = pixels.slice(i, i + 3);
                const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
                colorCounts[hex] = (colorCounts[hex] || 0) + 1;
            }

            // Sort colors by count
            const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);

            // Display top colors
            const colorPalette = document.getElementById('color-palette');
            colorPalette.innerHTML = '';
            sortedColors.slice(0, 5).forEach(color => {
                const colorBox = document.createElement('div');
                colorBox.style.backgroundColor = color;
                colorBox.className = 'color-box';
                colorPalette.appendChild(colorBox);
            });
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
