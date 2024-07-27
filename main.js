const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let image = new Image();

document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        image.src = e.target.result;
        image.onload = function() {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        }
    }

    reader.readAsDataURL(file);
});

document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.textContent);
    });
});

canvas.addEventListener('dragover', function(event) {
    event.preventDefault();
});

canvas.addEventListener('drop', function(event) {
    event.preventDefault();
    const text = event.dataTransfer.getData('text');
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.font = '24px Arial';
    ctx.fillText(text, x, y);
});

document.getElementById('download').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL();
    link.click();
});
