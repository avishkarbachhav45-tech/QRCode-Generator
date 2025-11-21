const logoInput = document.getElementById("logoInput");
let logoImage = null;
console.log("Script loaded"); 

const input = document.getElementById("qrText");
const btn = document.getElementById("generateBtn");
const canvas = document.getElementById("qrCanvas");

btn.addEventListener("click", () => {
    const value = input.value.trim();

    if (value === "") {
        alert("Please enter some text or URL");
        return;
    }

    console.log("User input:", value);  
});

// generate QR and draw on canvas

btn.addEventListener("click", () => {
    const value = input.value.trim();

    if (value === "") {
        alert("Please enter some text or URL");
        return;
    }

    const qr = new QRious({
        value: value,
        size: 200 //fixed size
    });

    // Render into canvas
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    img.src = qr.toDataURL();
});

logoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) {
        logoImage = null;
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        logoImage = new Image();
        logoImage.src = event.target.result;

        console.log("Logo loaded:", file.name);
    };

    reader.readAsDataURL(file);
});

