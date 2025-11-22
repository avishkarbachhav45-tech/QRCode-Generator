const logoInput = document.getElementById("logoInput");
let logoImage = null;
console.log("Script loaded"); 

const input = document.getElementById("qrText");
const btn = document.getElementById("generateBtn");
const canvas = document.getElementById("qrCanvas");

btn.addEventListener("click", () => {
    const value = input.value.trim();

    if (value === "") {
        alert("⚠️ Please enter some text or a valid URL!");
        input.focus();
        return;
    }

    try {
        const qr = new QRious({
            value: value,
            size: 200
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

        if (logoImage) {
            const logoSize = canvas.width * 0.25;  // 25% of QR size
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;

            ctx.drawImage(logoImage, x, y, logoSize, logoSize);
        }

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


downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "qr-code.png";   // file name
    link.href = canvas.toDataURL();  // convert canvas → image URL
    link.click();                    // trigger download
});
