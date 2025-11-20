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
