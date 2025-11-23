const logoInput = document.getElementById("logoInput");
let logoImage = null;
console.log("Script loaded"); 

const input = document.getElementById("qrText");
const btn = document.getElementById("generateBtn");
const canvas = document.getElementById("qrCanvas");
const fgColor = document.getElementById("fgColor");
const bgColor = document.getElementById("bgColor");


btn.addEventListener("click", () => {
    const value = input.value.trim();

    if (value === "") {
        alert("⚠️ Please enter some text or a valid URL!");
        input.focus();
        return;
    }

    try {
        const size = 300;  // Bigger and nicer QR size
        const dpr = window.devicePixelRatio || 1;

        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = size + "px";
        canvas.style.height = size + "px";

        const qr = new QRious({
            value: value,
            size: size * dpr,
            foreground: fgColor.value,
            background: bgColor.value
        

    });

        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // If logo present
            if (logoImage) {
                const logoSize = canvas.width * 0.25;
                const x = (canvas.width - logoSize) / 2;
                const y = (canvas.height - logoSize) / 2;
                ctx.drawImage(logoImage, x, y, logoSize, logoSize);
            }

            console.log("QR generated successfully!");
        };

        img.src = qr.toDataURL();

    } catch (error) {
        alert("❌ Something went wrong while generating the QR!");
        console.error("QR Generation Error:", error);
    }
});

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
