//Set up the dimensions of the game
const margin=15;
const squareSize=40;

const rows=12;
const cols=12;
let cells=[];
let current;
let stack=[];
let pacman;
let keyReset;
let triangles;

function newMaze(){
  cells=[];
  for(let i=0;i<rows;i++){
    cells.push([]);
    for(let j=0;j<cols;j++){
      let cell=new Cell(i,j);
      cells[i].push(cell);
    }
  }
  current=cells[0][0];
  stack=[];
  cells[rows-1][cols-1].walls[1]=false;
  pacman=new Pacman();
  triangles=new Triangles();
  keyReset=true;
}

//Check if the coordinate [i,j] belongs to the grid. Useful when dealing with edge cases
function validCoordinate(i,j){
  if((i>-1) && (j>-1) && (i<rows) && (j<cols)){
    return true;
  }
  else{
    return false;
  }
}

function removeWalls(cellA,cellB){
if(cellA.col-cellB.col===-1){
  cellA.walls[1]=false;
  cellB.walls[3]=false;
}
if(cellA.col-cellB.col===1){
  cellA.walls[3]=false;
  cellB.walls[1]=false;
}
if(cellA.row-cellB.row===-1){
  cellA.walls[2]=false;
  cellB.walls[0]=false;
}
if(cellA.row-cellB.row===1){
  cellA.walls[0]=false;
  cellB.walls[2]=false;
}
}

function setup(){
const canvas=createCanvas(margin*2+cols*squareSize,margin*2+rows*squareSize);
canvas.parent("mazeContainer");

for(let i=0;i<rows;i++){
  cells.push([]);
  for(let j=0;j<cols;j++){
    let cell=new Cell(i,j);
    cells[i].push(cell);
  }

  //Initialize triangles
  triangles=new Triangles();
}
current=cells[0][0];

cells[rows-1][cols-1].walls[1]=false;

pacman=new Pacman();
keyReset=true;
}

function draw(){
  background(40);

  //Change the status of the current cell to visited
  current.visited=true;

  //Choose a random neighbour, if there are any
  let next= current.checkNeighbours();

  if(next){
    //Add the current cell to the stack
  stack.push(current);
    //Remove the walls between the current cell and its chosen neighbour
    removeWalls(current,next);
    //Make th nieghbouring cell the current cell
    current=next;
    current.highlight();
  }
  else if (stack.length>0){
    current = stack.pop();
    current.highlight();
  }
  else{
    pacman.show();
    triangles.show();
    triangles.update(pacman);
  }
  
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      cells[i][j].show();
    }
  }

  document.addEventListener('keydown', (e) =>{
    if(keyReset){
    pacman.move(e.code);}
    keyReset=false;
  })

  //Move one square at a time
  document.addEventListener('keyup', (e) =>{
    keyReset=true;
  })
}