class StarBattlePuzzleSolver {
    constructor (gridSize) {
        this.grid = gridSize;
        const grid = Array.from({length : gridSize}, () => Array.from({length : gridSize}, () => ({status : null, region : null})));
        const regions = [];
        const answerGrid = [];
    }

    getMinRegion (givenGrid) {
        let minCount = Infinity;
        let minRegion = [];
        for (const region in regions) {
            let nullCount = 0;
            for (const pos in region) {
                if (givenGrid[pos.y][pos.x].status === null) {
                    nullCount++;
                }
            }
            if (count > 0 && count < minCount) {
                minCount = count;
                minRegion = pos;
            }
        }
        return minRegion;
    }

    placeStar (x, y, givenGrid) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                givenGrid[x + i][x + j].status = false;
            }
        }
        givenGrid[y][x].status = true;
        let count = 0;
        for (let i = 0; i < gridSize; i++) {
            if (givenGrid[y][i].status === true) count++;
        }
        if (count === 2) {
            for (let i = 0; i < gridSize; i++) {
                if (givenGrid[y][i].status === null) givenGrid[y][i].status = false;
            }
        }
        count = 0;
        for (let i = 0; i < gridSize; i++) {
            if (givenGrid[i][x].status === true) count++;
        }
        if (count === 2) {
            for (let i = 0; i < gridSize; i++) {
                if (givenGrid[i][x].status === null) givenGrid[i][x].status = false;
            }
        }
        count = 0;
        const sameRegionTrue = [];
        const sameRegionNull = [];
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (givenGrid[i][j].region === givenGrid[y][x].region && givenGrid[i][j].status === true) sameRegionTrue.push({x : j, y : i});
                if (givenGrid[i][j].region === givenGrid[y][x].region && givenGrid[i][j].status === null) sameRegionNull.push({x : j, y : i});
            }
        }
        if (sameRegionTrue.length === 2) {
            for (const pos of sameRegionNull) {
                givenGrid[pos.y][pos.x] = false;
            }
        }
    }
}