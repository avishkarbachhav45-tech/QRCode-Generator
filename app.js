const logoInput = document.getElementById("logoInput");
let logoImage = null;
console.log("Script loaded"); 

const input = document.getElementById("qrText");
const btn = document.getElementById("generateBtn");
const canvas = document.getElementById("qrCanvas");
const fgColor = document.getElementById("fgColor");
const bgColor = document.getElementById("bgColor");

const sizeSlider = document.getElementById("qrSize");


btn.addEventListener("click", generateQR);
sizeSlider.addEventListener("input", generateQR);
fgColor.addEventListener("input", generateQR);
bgColor.addEventListener("input", generateQR);

input.addEventListener("input", () => {
    if (input.value.trim() === "") {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }
    generateQR();
});


function generateQR() {
    const value = input.value.trim();
    const qrSize = parseInt(sizeSlider.value);  // slider size used here!

    if (!value) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
    }

    const dpr = window.devicePixelRatio || 1;

    canvas.width = qrSize * dpr;
    canvas.height = qrSize * dpr;
    canvas.style.width = qrSize + "px";
    canvas.style.height = qrSize + "px";

    const qr = new QRious({
        value: value,
        size: qrSize * dpr,
        foreground: fgColor.value,
        background: bgColor.value
    });

    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        if (logoImage) {
            const logoSize = qrSize * 0.25;
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;
            ctx.drawImage(logoImage, x, y, logoSize, logoSize);
        }
    };

    img.src = qr.toDataURL();
}


// Live preview - update QR on typing
input.addEventListener("input", () => {
    const value = input.value.trim();

    if (value === "") {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear preview
        return;
    }

    btn.click();
});

// Live update when color changes
fgColor.addEventListener("input", () => btn.click());
bgColor.addEventListener("input", () => btn.click());



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


downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "qr-code.png";   // file name
    link.href = canvas.toDataURL();  // convert canvas → image URL
    link.click();                    // trigger download
});

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});
