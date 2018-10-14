let vSize = 640;
let hSize = 900;
let cellSize = 10;
let ncols = Math.floor(hSize/cellSize);
let nrows = Math.floor(vSize/cellSize);
let can;
let bckgd;
let population;
let running = false;
let btnStop;
let btnRandom;
let btnResume;
let btnReset;
let probVal;
let genVal;
let popVal;
let generation = 0;

function setup(){
    can = createCanvas(hSize+1, vSize+1);
    bckgd = createGraphics(hSize, vSize);
    htmlStuff();
    generateBackground(bckgd);
    population = new Population();
    population.init(ncols, nrows);
    frameRate(20);
}
function draw(){
    image(bckgd, 0, 0);
    population.show();
    if(running){
        population.checkStatus();
        population.updateStatus();
        generation++;
    }
    printData();
}

function generateBackground(buff){
    buff.background(250);
    buff.strokeWeight(1);
    buff.stroke(0);
    for(let i = 0; i < ncols; i++){
        buff.line(i*cellSize, 0, i*cellSize, vSize);
    }
    for(let i = 0; i < nrows; i++){
        buff.line(0, i*cellSize, hSize, i*cellSize);
    }
}
function drawCell(){
    let position = pixelToXY(mouseX, mouseY);
    population.changeStatus(position.x, position.y);
}
function htmlStuff(){
    const canvas = document.getElementById("defaultCanvas0");
    probVal = document.getElementById("prob");
    genVal = document.getElementById("gen");
    popVal = document.getElementById("pop");
    btnStop = document.getElementById("stop");
    btnRandom = document.getElementById("random");
    btnResume = document.getElementById("resume");
    btnReset = document.getElementById("reset");
    can.parent(canvasContainer);
    canvas.addEventListener("click", drawCell);
    btnStop.addEventListener("click", stopButton);
    btnResume.addEventListener("click", resumeButton);
    btnReset.addEventListener("click", resetButton);
    btnRandom.addEventListener("click", randomButton);
}
function printData(){
    popVal.innerText = population.getTotalPopulation();
    genVal.innerText = generation;
}
function defaultValues(rstbtn=false){
    running = false;
    if(rstbtn){
        probVal.value = 0.1;
    }
    generation = 0;
    popVal.innerText = 0;
    btnResume.hidden = false;
    btnStop.hidden = true;
}
function stopButton(){
    running = false;
    btnStop.hidden = true;
    btnResume.hidden = false;
}
function resumeButton(){
    running = true;
    btnResume.hidden = true;
    btnStop.hidden = false;
}
function resetButton(){
    defaultValues(true);
    population.init(ncols, nrows);
}
function randomButton(){
    defaultValues();
    population.init(ncols, nrows, true, parseFloat(probVal.value));
}