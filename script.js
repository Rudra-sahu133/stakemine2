const gridsize = 5;
const totaltiles = gridsize * gridsize;
let minecount = 5;
let mineIndexes = new Set();
let gameover = false;
let multiplier = 1.0;
let revealedsafetiles = 0;
let stakeamount = 100;

const grid = document.getElementById("grid"); 
const status = document.getElementById("status").querySelector("p"); 

function startgame() {
    grid.innerHTML = "";
    mineIndexes = new Set();
    gameover = false;
    multiplier = 1.0;
    revealedsafetiles = 0;
    status.textContent = "Game Started. Click tiles to reveal."; 


    while (mineIndexes.size < minecount) {
        mineIndexes.add(Math.floor(Math.random() * totaltiles));
    }

    for (let i = 0; i < totaltiles; i++) {
        const tile = document.createElement("div");
        tile.className = "tile"; 
        tile.addEventListener("click", () => handletileclick(tile, i));
        grid.appendChild(tile);
    }

    
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${gridsize}, 1fr)`;
    grid.style.gridGap = "5px";
}

function handletileclick(tile, index) {
    if (
        gameover ||
        tile.classList.contains("safe") ||
        tile.classList.contains("mine")
    )
        return;

    if (mineIndexes.has(index)) {
        tile.classList.add("mine");
        status.textContent = "💣 MINE HIT KAR DIA HAI, PAISA GAYA 💥";
        gameover = true;
    } else {
        tile.classList.add("safe");
        revealedsafetiles++;
        multiplier += 0.2;
        status.textContent = `✅ Safe! Multiplier = ${multiplier.toFixed(2)}`;
    }
}

function cashout() {
    if (gameover || revealedsafetiles === 0) {
        status.textContent = "❗CLICK ATLEAST ONE TILE FOR WITHDRAWAL";
        return;
    }
    status.textContent = `💰 CASHED OUT: ₹${(stakeamount * multiplier).toFixed(2)}`;
    gameover = true;
}
