const container = document.querySelector(".container");
const brush = document.getElementById("brush");
const eraser = document.getElementById("eraser");
const clear = document.getElementById("clear");
const canvas = document.getElementById("canvas");
const canvasUI = document.getElementById("canvasUI");
const exit = document.getElementById("exit");
const canvasInner = document.getElementById("canvasInner");

const input = document.getElementById("inputSize");
const confirm = document.getElementById("confirm");

let mode = null;
let isMouseDown = false;
let isTouching = false;

function buildGrid(size = 16) {

    container.innerHTML = "";

    for (let i = 1; i <= size; i++) {

        const cellRow = document.createElement("div");
        cellRow.className = "cellRow";

        for (let j = 1; j <= size; j++) {

            const cellBorder = document.createElement("div");
            cellBorder.className = "cellBorder";

            cellRow.append(cellBorder);
        }

        container.append(cellRow);
    }

    attachDrawing();
}

buildGrid(16);


brush.addEventListener("click", () => {

    if (mode === "brush") {
        mode = null;
        brush.classList.remove("active");
    } else {
        mode = "brush";
        brush.classList.add("active");
        eraser.classList.remove("active");
    }
});

eraser.addEventListener("click", () => {

    if (mode === "eraser") {
        mode = null;
        eraser.classList.remove("active");
    } else {
        mode = "eraser";
        eraser.classList.add("active");
        brush.classList.remove("active");
    }
});

const uiPopUp = [
    { transform: "scale(0)" },
    { transform: "scale(1)" }
];

const uiPopOut = [
    { transform: "scale(1)" },
    { transform: "scale(0)" }
];

const timing = {
    duration: 150,
    fill: "forwards"
};

canvas.addEventListener("click", () => {

    canvasUI.classList.add("show");

    brush.classList.remove("active");
    eraser.classList.remove("active");

    canvasInner.animate(uiPopUp, timing);
});


exit.addEventListener("click", () => {

    const anim = canvasInner.animate(uiPopOut, timing);

    anim.onfinish = () => {
        canvasUI.classList.remove("show");
    };
});


document.addEventListener("mousedown", () => {
    isMouseDown = true;
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

function paint(pixel) {

    if (mode === "brush") {
        pixel.style.backgroundColor = "black";
    }

    if (mode === "eraser") {
        pixel.style.backgroundColor = "white";
    }
}

function attachDrawing() {

    const pixels = document.querySelectorAll(".cellBorder");

    pixels.forEach(pixel => {

        pixel.addEventListener("mousedown", () => {
            paint(pixel);
        });

        pixel.addEventListener("mouseover", () => {
            if (!isMouseDown) return;
            paint(pixel);
        });
    });

    clear.onclick = () => {
        pixels.forEach(pixel => {
            pixel.style.backgroundColor = "white";
        });
    };
}

document.addEventListener("touchstart", (e) => {
    isTouching = true;

    const target = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
    );

    if (target && target.classList.contains("cellBorder")) {
        paint(target);
    }
});

document.addEventListener("touchmove", (e) => {
    if (!isTouching) return;

    const target = document.elementFromPoint(
        e.touches[0].clientX,
        e.touches[0].clientY
    );

    if (target && target.classList.contains("cellBorder")) {
        paint(target);
    }
});

document.addEventListener("touchend", () => {
    isTouching = false;
});


confirm.addEventListener("click", () => {

    let size = parseInt(input.value);

    if (isNaN(size)) return;

    size = Math.max(2, Math.min(100, size));

    container.innerHTML = "";
    buildGrid(size);
});