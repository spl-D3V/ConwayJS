class Cell {
    constructor(x, y, status, img){
        this.x = x;
        this.y = y;
        this.isAlive = status;
        this.nextStatus = status;
        this.img = img;
    }
}
Cell.prototype.checkNeighbours = function(grid){
    let testState = 0;
    let listIdx = [];
    listIdx[0] = index(this.x-1, this.y-1);
    listIdx[1] = index(this.x  , this.y-1);
    listIdx[2] = index(this.x+1, this.y-1);
    listIdx[3] = index(this.x-1, this.y);
    listIdx[4] = index(this.x+1, this.y);
    listIdx[5] = index(this.x-1, this.y+1);
    listIdx[6] = index(this.x  , this.y+1);
    listIdx[7] = index(this.x+1, this.y+1);
    for(let idx of listIdx){
        testState += grid[idx] ? grid[idx].isAlive : 0;
    }
    if(testState === 3){
        this.nextStatus = 1;
        return false;
    }
    if(testState === 2 && this.isAlive === 1){
        this.nextStatus = 1;
        return false;
    }
    return false;
}
Cell.prototype.updateStatus = function(){
    this.isAlive = this.nextStatus;
    this.nextStatus = 0;
}
Cell.prototype.show = function(){
    if(this.isAlive === 1){
        image(this.img, this.x*cellSize, this.y*cellSize);
    }
}

class Population{
    constructor(){
        this.population = [];
        this.ncells = 0;
    }
}
Population.prototype.init = function(xcols, ycols, randomFill=false, prob=0){
    this.population = [];
    const imgbuffer = createGraphics(cellSize, cellSize);
    imgbuffer.fill(51);
    imgbuffer.noStroke();
    imgbuffer.rect(0, 0, cellSize, cellSize);
    for(let j = 0; j < ycols; j++){
        for(let i = 0; i < xcols; i++){
            let status = randomFill ? (Math.random() < prob ? 1 : 0) : 0;
            let cell = new Cell(i, j, status, imgbuffer);
            this.population.push(cell);
        }
    }
    this.ncells = this.population.length;
}
Population.prototype.checkStatus = function(){
    for(let i = 0; i < this.ncells;  i++){
        this.population[i].checkNeighbours(this.population);
    }
}
Population.prototype.updateStatus = function(){
    this.population.forEach(c => c.updateStatus());
}
Population.prototype.show = function(){
    this.population.forEach(c => c.show());
}
Population.prototype.changeStatus = function(x, y){
    let cell = this.population[index(x,y)];
    if(cell){
        cell.isAlive = cell.isAlive === 0 ? 1 : 0;
    }
}
Population.prototype.getTotalPopulation = function(){
    return this.population.reduce(function(total, x){return total + x.isAlive}, 0);
}

function pixelToXY(pixelX, pixelY){
    let x = Math.floor(pixelX/cellSize);
    let y = Math.floor(pixelY/cellSize);
    return {x, y};
}

function index(x, y){
    if (x < 0 || y < 0 || x >(ncols - 1) || y > (nrows - 1)){
        return -1;
    }
    return x+y*ncols;
}