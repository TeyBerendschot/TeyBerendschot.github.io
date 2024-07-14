//Tey Berendschot
//Tents

//Set the dimensions of the board
let margin=50;
let squareSize=80;

let tentImage=Array(20);
let treeImage=Array(20);
let grassImage=Array(3);

let b=Array(0);
let h=Array(0);
let v=Array(0);


//The initial state of the puzzle

// b.push([[" "," ","b"," ","b"," ","b"," "," "," "],
//   [" ","b"," "," "," ","b"," "," "," ","b"],
//   [" "," ","b"," "," "," "," "," "," "," "],
//   ["b"," "," "," "," "," "," ","b"," ","b"],
//   [" "," "," "," ","b"," "," "," "," ","b"],
//   [" "," "," "," "," "," "," "," "," "," "],
//   ["b"," "," "," "," "," ","b"," "," "," "],
//   [" "," "," "," "," ","b"," "," "," "," "],
//   [" ","b"," ","b"," "," "," "," ","b","b"],
//   [" "," "," "," "," "," ","b"," "," "," "]]);
// h.push([4,1,4,1,0,3,1,1,3,2]);
// v.push([2,2,1,2,1,3,1,3,1,4]);

//Another initial state of an easier puzzle

b.push([[" "," "," "," "," ","b"],
  [" "," "," "," "," "," "],
  ["b"," "," "," "," "," "],
  [" "," ","b"," "," ","b"],
  ["b"," "," "," ","b"," "],
  [" ","b"," "," "," "," "],]);
h.push([1,1,2,1,1,1]);
v.push([3,0,1,1,1,1]);

b.push([[" "," "," "," "," "," "],
  ["b"," ","b"," ","b"," "],
  [" "," "," "," "," "," "],
  [" ","b"," "," "," ","b"],
  [" "," "," "," "," "," "],
  ["b"," ","b"," "," "," "],]);
h.push([1,1,1,1,1,2]);
v.push([1,1,2,1,0,2]);

b.push([[" "," "," "," "," "," "],
  [" "," ","b"," ","b"," "],
  [" "," "," ","b"," "," "],
  [" "," "," "," "," "," "],
  [" ","b"," "," "," ","b"],
  ["b",""," "," ","b"," "],]);
h.push([2,0,1,1,0,3]);
v.push([0,2,1,1,2,1]);

b.push([[" ","b"," "," "," ","b"],
  [" ","b"," "," "," "," "],
  ["b"," "," "," ","b"," "],
  [" "," "," "," "," "," "],
  [" "," "," "," "," "," "],
  [" "," ","b"," "," ","b"],]);
h.push([2,1,1,1,1,1]);
v.push([2,0,2,1,2,0]);

//An even easier example

// b.push([["b"," ","b"," "],
//   [" "," "," "," "],
//   [" "," "," "," "],
//   [" ","b"," "," "],]);
// h.push([0,2,0,1]);
// v.push([1,0,2,0]);

//--------
//--------

let randomBoardID=Math.floor(Math.random() * b.length);

let board=b[randomBoardID];
let horizontalClue=h[randomBoardID];
let verticalClue=v[randomBoardID];

let rows=board.length;
let cols=board[0].length;

function newGame(){
  let currentBoardID=randomBoardID;
  while(randomBoardID==currentBoardID)
  randomBoardID=Math.floor(Math.random() * b.length);

grid=b[randomBoardID];
totalHorizontalTents=h[randomBoardID];
totalVerticalTents=v[randomBoardID];
}

//Show the rules of the game
function showRules(){
  alert("Place tents on the board such that each column and row contain the scpecified number of tents. Campers value their privacy. Therefore, tents cannot be placed in adjacent boxes (also not diagonally). Make a one to one correspondence between tents and trees such that each tent is places in a cell orthogonally adjacent to the cell of its corresponding tree.");
}

function showControls(){
  alert("Place a tent: t\nPlace a patch of grass: g\nNavigate: arrow keys\nRestart the puzzle: space bar\nClear cell: backspace/delete ");
}

function addTent(){
  if(currentCol>-1 && currentRow>-1){
    if(grid[currentRow][currentCol]!="b"){
      grid[currentRow][currentCol]="t";
    }
  }
}

function addGrass(){
  if(currentCol>-1 && currentRow>-1){
    if(grid[currentRow][currentCol]!="b"){
      grid[currentRow][currentCol]="g";
    }
  }
}

function clearInput(){
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      if(grid[i][j]!="b"){
        grid[i][j]=" ";
      }
    }
  }
}

//Load the images of the tents and trees
function preload(){
  for(let i=1;i<21;i++){
  tentImage[i-1]=loadImage("/Images/Tentje/tent"+i.toString()+".jpg");
  treeImage[i-1]=loadImage("/Images/Boompje/boom"+i.toString()+".jpg");
}

//Load the images of the patches of grass
for(let i=1;i<4;i++){
  grassImage[i-1]=loadImage("/Images/Grasje/gras"+i.toString()+".jpg");
}
}

//Returns a 2D array 
function make2DArray(rows,cols){
  let arr= new Array(rows);
  for(let i=0;i<rows;i++){
    arr[i]= new Array(cols);
  }
  return arr;
}


//Returns all the coordinates of illegally placed tents
function validTentPlacement(grid){
  const arr=new Set();
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      if(grid[i][j]=="t"){
        for(let k=-1;k<2;k++){
          for(let l=-1;l<2;l++){
            //Take care of index issues coused by the borders of the grid
            if(-1<i+k&& i+k<rows && -1<j+l && j+l<cols){
              if((k!=0||l!=0)&&grid[i+k][j+l]=="t"){
                arr.add([i,j]);
            }
          }
          }
        }
      }
    }
  }
  return arr;
}

//Returns true iff a tent at coordinate coor is orthogonally adjacent to a tree
function nextToTree(coor, grid){
let i=coor[0];
let j=coor[1];

if(i-1>-1){
  if(grid[i-1][j]=="b"){
    return true
  }
}
if(i+1<rows){
  if(grid[i+1][j]=="b"){
    return true
  }
}
if(j-1>-1){
  if(grid[i][j-1]=="b"){
    return true
  }
}
if(j+1<cols){
  if(grid[i][j+1]=="b"){
    return true
  }
}
return false;
}

//Returns the number of tents in column c
function countCol(grid,c){
  let count=0;
  for(let i=0;i<rows;i++){
    if(grid[i][c]==="t"){
      count++;
    }
  }
  return count;
}

//Returns the number of tents in row r
function countRow(grid,r){
  let count=0;
  for(let j=0;j<cols;j++){
    if(grid[r][j]==="t"){
      count++;
    }
  }
  return count;
}

//Returns the total number of tents
function countTents(grid){
let count=0;
for(let i=0;i<rows;i++){
  count=count+countRow(grid,i);
}
return count;
}

//Returns the total number of trees
function countTrees(grid){
  let count =0;
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      if(grid[i][j]=="b"){
        count++;
      }
    }
  }
return count;
}

//Returns true iff the grid is filled in correctly
function checkVictory(grid,cluesA,cluesB){
  if(countTrees(grid)!=countTents(grid)){
    return false;
  }
  for(let i=0;i<rows;i++){
    if(countRow(grid,i)!=cluesA[i]){
      return false;
    }
  }
  for(let j=0;j<cols;j++){
    if(countCol(grid,j)!=cluesB[j]){
      return false;
    }
  }
  if(validTentPlacement(grid).size>0){
    return false;
  }
return true;
}

let grid;
let tentGrid;
let totalHorizontalTents, totalVerticalTents;


function setup() {
  let canvasWidth=cols*squareSize+2*margin;
  let canvasHeight=rows*squareSize+2*margin;
 let myCanvas=createCanvas(canvasWidth,canvasHeight);
 myCanvas.parent("boardContainer");
 grid=board;
 
 tentGrid=make2DArray(rows,cols);
 let rndInt;
 for(let i=0;i<rows;i++){
  for(let j=0;j<cols;j++){
    rndInt = Math.floor(Math.random() * 20);
    tentGrid[i][j]=rndInt;
  }
 }
 let ruleButton = createButton("Rules");
  ruleButton.mousePressed(showRules);
  ruleButton.parent("controlButtonContainer");

 let controlsButton= createButton("Controls");
 controlsButton.mousePressed(showControls);
 controlsButton.parent("controlButtonContainer");

 let newGameButton=createButton("New Game");
 newGameButton.mousePressed(newGame);
 newGameButton.parent("controlButtonContainer");

let clearGridButton=createButton("Clear input");
 clearGridButton.mousePressed(clearInput);
 clearGridButton.parent("controlButtonContainer");

 let addTentButton=createButton("");
 addTentButton.mousePressed(addTent);
 addTentButton.class("inputButton")
 addTentButton.style("background-image", "url(./Images/Tentje/tent15.jpg)")
 addTentButton.style("background-size", "100%")
 addTentButton.parent("addButtonContainer"); 

 let addGrassButton=createButton("");
 addGrassButton.mousePressed(addGrass);
 addGrassButton.class("inputButton")
 addGrassButton.style("background-image", "url(./Images/Grasje/gras1.jpg)")
 addGrassButton.style("background-size", "100%")
 addGrassButton.parent("addButtonContainer"); 

totalHorizontalTents=horizontalClue;
totalVerticalTents=verticalClue;
}

let currentRow=-1;
let currentCol=-1;

function mousePressed(){
  if(mouseX>margin && mouseX<squareSize*cols+margin&&mouseY>margin && mouseY<squareSize*rows+margin){
  let col=floor((mouseX-margin)/squareSize);
  let row=floor((mouseY-margin)/squareSize);
  currentRow=row;
  currentCol=col;
  }
  else{
    currentRow=-1;
    currentCol=-1;
  }
}


function draw(){
  background(255);

  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      let num=tentGrid[i][j];
      stroke("gray");
      strokeWeight(3);
      fill(255);
      let x=margin+j*squareSize;
      let y=margin+i*squareSize;
      square(x,y,squareSize);
      if(grid[i][j]==="b"){
        image(treeImage[tentGrid[i][j]],x,y,squareSize,squareSize);
      }
      if(grid[i][j]==="t"){
        image(tentImage[tentGrid[i][j]],x,y,squareSize,squareSize);
      }
      if(grid[i][j]==="g"){
        image(grassImage[(tentGrid[i][j]%3)],x,y,squareSize,squareSize);
      }
    }
  }
  if(currentRow>-1 &&currentCol>-1){
    stroke("gray");
    strokeWeight(3);
    fill(0, 255, 0, 100);
    let x=margin+currentCol*squareSize;
    let y=margin+currentRow*squareSize;
    square(x,y,squareSize);
  }

//Still need to fix: darker shade of red when multiple errors occur
const illegalCoordinates=validTentPlacement(grid);
for(let coor of illegalCoordinates){
    stroke("gray");
    strokeWeight(3);
    fill(255, 0, 0, 80);
    let x=margin+coor[1]*squareSize;
    let y=margin+coor[0]*squareSize;
    square(x,y,squareSize);
}
  
let col=currentCol;
let row=currentRow;
let rndInt;

  document.addEventListener('keydown', (e) => {
    if (e.code === "Space"){
      for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
          if(grid[i][j]=="t" || grid[i][j]=="g"){
          grid[i][j]=" ";
          }
        }
       }
    }
    if (e.code === "ArrowLeft") {
      if(col>0){
        currentCol=col-1;
      }
    }
    else if (e.code === "ArrowRight") {
      if(col<cols-1){
        currentCol=col+1;
      }
    }
    else if (e.code === "ArrowUp") {
      if(row>0){
        currentRow=row-1;
      }
    }
    else if (e.code === "ArrowDown") {
      if(row<rows-1){
        currentRow=row+1;
      }
    }
    else if((e.code === "Backspace" || e.code === "Delete")&& grid[currentRow][currentCol]!="b"){
      grid[currentRow][currentCol]=" ";
    }
    else if((e.key === "t") && nextToTree([currentRow,currentCol],grid)){
      rndInt = Math.floor(Math.random() * 20);
      grid[currentRow][currentCol]="t";
      tentGrid[currentRow][currentCol]= rndInt;
    }
    else if(e.key === "g"){
      rndInt = Math.floor(Math.random() * 3);
      grid[currentRow][currentCol]="g";
      tentGrid[currentRow][currentCol]= rndInt;
    }
  })
//Draw the clues outside of the board
  for(let i=0;i<rows;i++){
    let count=countRow(grid,i);
    if(count>totalHorizontalTents[i]){
      stroke("red");
    strokeWeight(1);
    fill("red");
    text(totalHorizontalTents[i],0.5*margin,i*squareSize+1.5*margin+15);
    }
    else{
      stroke("black");
      strokeWeight(1);
      fill("black");
      text(totalHorizontalTents[i],0.5*margin,i*squareSize+1.5*margin+15);
      }
  }

  for(let j=0;j<cols;j++){
   
    let count=countCol(grid,j);
    if(count>totalVerticalTents[j]){
    stroke("red");
    strokeWeight(1);
    fill("red");
    text(totalVerticalTents[j],5+1.5*margin+j*squareSize,cols*squareSize+1.5*margin);
    }
    else{
    stroke("black");
    strokeWeight(1);
    fill("black")
    text(totalVerticalTents[j],5+1.5*margin+j*squareSize,cols*squareSize+1.5*margin);
    }
  }

  //Draw victory
let victoryText=document.getElementById("victory")
if(checkVictory(grid,totalHorizontalTents,totalVerticalTents)){
    victoryText.textContent="You have successfully completed the puzzle!"
}
else{
  victoryText.textContent=" "
}
}