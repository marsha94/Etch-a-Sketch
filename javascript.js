const pad = document.querySelector(".sketch-pad");
const boxes = document.getElementsByClassName("box");
const btnGrid = document.querySelector(".btn-grid");
const btnBlack = document.querySelector(".btn-black");
const btnRGB = document.querySelector(".btn-rgb");
const btnClear = document.querySelector(".btn-clear");
const btns = document.querySelector(".buttons");
let count = 0;
let colorPallette = "black";

btnGrid.addEventListener("click", makeGrid);
btnBlack.addEventListener("click", paint);
btnClear.addEventListener("click", clearGrid);

btns.addEventListener("click", (e) => {
  console.log(e.target.classList);
  if (e.target.classList == "btn-rgb") {
    colorPallette = "rgb";
  } else if (e.target.classList == "btn-black") {
    colorPallette = "black";
  }
});

// Default Setting
generateGrid(10);
clearGrid();
paint();
rgbPaint();

function clearGrid() {
  Array.from(boxes).forEach((box) => {
    box.style.backgroundColor = "white";
    box.style.filter = "contrast(100%)";
    count = 0;
  });
}

function rgbPaint() {
  let x = Math.floor(Math.random() * 256);
  let y = Math.floor(Math.random() * 256);
  let z = Math.floor(Math.random() * 256);
  let rgbColor = "rgb(" + x + "," + y + "," + z + ")";
  console.log(rgbColor);
  return rgbColor;
}

function paint() {
  Array.from(boxes).forEach((box) => {
    box.addEventListener("mouseenter", function darkening() {
      if (box.style.backgroundColor == "white") count++;
      if (count > 10) count = 10;
      console.log(count);
      if (colorPallette == "black") {
        box.style.backgroundColor = "black";
      } else {
        box.style.backgroundColor = rgbPaint();
      }
      box.style.filter = `contrast(${count}0%)`;
      console.log(count);
    });
  });
}

function removeGrid() {
  while (pad.firstChild) {
    pad.removeChild(pad.firstChild);
  }
}

function generateGrid(grid) {
  grid > 100 ? (grid = 100) : (grid = grid);
  let gridSquare = grid ** 2;
  while (gridSquare) {
    let divBox = document.createElement("div");
    divBox.classList.add("box");
    divBox.style.flexBasis = `calc(100% / ${grid})`;
    pad.append(divBox);
    console.log(gridSquare);
    gridSquare--;
    divBox = "";
  }
}

function makeGrid() {
  let grid = parseInt(prompt("Input Grid Squares"));
  if (isNaN(grid) || grid == "") return;
  removeGrid();
  generateGrid(grid);
  clearGrid();
  paint();
}
