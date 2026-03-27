class StarBattlePuzzleSolver {
    constructor (gridSize) {
        this.starCount = 2;
        this.gridSize = gridSize;
        this.grid = Array.from({length : gridSize}, () => Array.from({length : gridSize}, () => ({status : null, region : null})));
        this.regions = [];
        this.answerGrid = [];
    }

    isInGrid (x, y) {
        if (x < 0 || x >= this.gridSize) return false;
        if (y < 0 || y >= this.gridSize) return false;
        return true;
    }

    getMinRegion (givenGrid) {
        let minCount = Infinity;
        let minRegion = [];
        for (const region of this.regions) {
            let nullCount = 0;
            for (const pos of region) {
                if (givenGrid[pos.y][pos.x].status === null) {
                    nullCount++;
                }
            }
            if (nullCount > 0 && nullCount < minCount) {
                minCount = nullCount;
                minRegion = region;
            }
        }
        return minRegion;
    }

    placeStar (x, y, givenGrid) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (this.isInGrid(x + j, y + i)) givenGrid[y + i][x + j].status = false;
            }
        }
        givenGrid[y][x].status = true;
        let count = 0;
        for (let i = 0; i < this.gridSize; i++) {
            if (givenGrid[y][i].status === true) count++;
        }
        if (count === this.starCount) {
            for (let i = 0; i < gridSize; i++) {
                if (givenGrid[y][i].status === null) givenGrid[y][i].status = false;
            }
        }
        count = 0;
        for (let i = 0; i < this.gridSize; i++) {
            if (givenGrid[i][x].status === true) count++;
        }
        if (count === this.starCount) {
            for (let i = 0; i < gridSize; i++) {
                if (givenGrid[i][x].status === null) givenGrid[i][x].status = false;
            }
        }
        const targetRegion = this.regions[givenGrid[y][x].region];
        count = 0;
        for (const pos of targetRegion) {
            if (givenGrid[pos.y][pos.x].status === true) count++;
        }
        if (count === starCount) {
            for (const pos of targetRegion) {
                if (givenGrid[pos.y][pos.x].status === null) givenGrid[pos.y][pos.x].status = false;
            }
        }
    }
}

class UIManager {
    constructor (grid) {
        this.grid = grid;
        this.gridSize = grid.length;
        this.canvas = document.getElementById(`puzzleCanvas`);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = gridSize;
        this.cellSize = this.canvas.width / gridSize
        this.regions = [];
    }

    drawCanvas () {
        const {ctx, canvas, gridSize, cellSize} = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath()
        ctx.strokeStyle = "#b1b1b1";
        ctx.lineWidth = 1;
        for (let i = 1; i < gridSize; i++) {
            ctx.moveTo(cellSize * i, 0);
            ctx.lineTo(cellSize * i, canvas.height);
            ctx.moveTo(0, cellSize * i);
            ctx.lineTo(canvas.height, cellSize * i);
        }
        ctx.stroke();
    }

    drawBoard () {
        const {ctx, gridSize, cellSize, grid} = this;
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        for (let i = 0; i < gridSize - 1; i++) {
            for (let j = 0; j < gridSize - 1; j++) {
                if (grid[i][j].region !== grid[i][j + 1].region) {
                    ctx.moveTo((j + 1) * cellSize, i * cellSize);
                    ctx.lineTo((j + 1) * cellSize, (i + 1) * cellSize);
                }
                if (grid[i][j].region !== grid[i + 1][j].region) {
                    ctx.moveTo(j * cellSize, (i + 1) * cellSize);
                    ctx.lineTo((j + 1) * cellSize, (i + 1) * cellSize);
                }
            }
        }
        ctx.stroke();
    }

    drawMark (x, y, mark) {
        const {ctx, cellSize} = this;
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        if (mark === "star") {
            ctx.strokeStyle = "#ff3030"
            ctx.moveTo((x + 0.5) * cellSize, (y + 0.125) * cellSize);
            for (let i = 1; i <= 5; i++) {
                ctx.lineTo((x + 0.5 + Math.cos(Math.PI * 4 * i / 5 + Math.PI / 2)  * 3 / 8) * cellSize, (y + 0.5 + Math.sin(Math.PI * 4 * i / 5 + Math.PI / 2) * 3 / 8) * cellSize);
            }
            ctx.closePath();
        } else if (mark === "check") {
            ctx.strokeStyle = "#606060";
            ctx.moveTo((x + 0.125) * cellSize, (y + 0.125) * cellSize);
            ctx.lineTo((x + 0.875) * cellSize, (y + 0.875) * cellSize);
            ctx.moveTo((x + 0.125) * cellSize, (y + 0.875) * cellSize);
            ctx.lineTo((x + 0.875) * cellSize, (y + 0.125) * cellSize);
        }
        ctx.stroke();
    }

    getColorAt (x, y) {
        const imageData = this.ctx.getImaneData(x,y,1,1);
        const data = imageData.data;
        return `rgb(${data[0]},${data[1]},${data[2]})`;
    }

    getRegion () {
        const colors = [];
        for (const row of grid) {
            for (const pos of row) {
                const color = this.getColorAt(pos.x * cellSize + 1, pos.y * cellSize + 1);
                if (color !== "rgb(0,0,0") {
                    if (!colors)
                    this.regions.push({color : {pos.x, pos.y}})
                }
            }
        }
    }
}