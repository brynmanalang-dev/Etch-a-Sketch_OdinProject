const container = document.querySelector(".container");
const brush = document.getElementById("brush");
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");
const canvas = document.getElementById("canvas")

let mode = "brush";
let isMouseDown = false;

// CREATE GRID
for (let i = 1; i <= 16; i++) {
    const cellRow = document.createElement("div");
    cellRow.className = "cellRow";

    for (let j = 1; j <= 16; j++) {
        const cellBorder = document.createElement("div");
        cellBorder.className = "cellBorder";

        cellRow.append(cellBorder);
    }

    container.append(cellRow);
}

const pixels = document.querySelectorAll(".cellBorder");

// TOOL SELECT
brush.addEventListener("click", () => {
    mode = "brush";
    brush.classList.add("active")
    eraser.classList.remove("active")
});

eraser.addEventListener("click", () => {
    mode = "eraser";
    eraser.classList.add("active")
    brush.classList.remove("active")
});

canvas.addEventListener("click", () => {
    eraser.classList.remove("active")
    brush.classList.remove("active")
});

// MOUSE STATE
document.addEventListener("mousedown", () => {
    isMouseDown = true;
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

// DRAWING
pixels.forEach(pixel => {
    pixel.addEventListener("mouseover", () => {
        if (!isMouseDown) return;

        if (mode === "brush") {
            pixel.style.backgroundColor = "black";
        }

        if (mode === "eraser") {
            pixel.style.backgroundColor = "white";
        }
    });
});

// CLEAR GRID
clear.addEventListener("click", () => {
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = "white";
    });
});