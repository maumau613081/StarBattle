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
    constructor (gridSize) {
        this.canvas = document.getElementById(`puzzleCanvas`);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = gridSize;
        this.cellSize = this.canvas.width / gridSize
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
}