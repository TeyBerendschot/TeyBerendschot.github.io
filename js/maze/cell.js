//This is out cell class, with the methods checkNeighbour, highlight and show.

class Cell {
    constructor(i,j){
      this.row=i;
      this.col=j;
      //Initially the cells has walls at [top,right,bottom,left]
      this.walls=[true,true,true,true];
      this.visited=false;
    }
  
    checkNeighbours(){
      let unvisitedNeighbours = [];
  
      //top
      if(validCoordinate(this.row+1,this.col)){
        if(!cells[this.row+1][this.col].visited){
        unvisitedNeighbours.push(cells[this.row+1][this.col]);
        }
      }
      //right
      if(validCoordinate(this.row,this.col+1)){
        if(!cells[this.row][this.col+1].visited){
        unvisitedNeighbours.push(cells[this.row][this.col+1]);
        }
      }
      //bottom
      if(validCoordinate(this.row-1,this.col)){
        if(!cells[this.row-1][this.col].visited){
        unvisitedNeighbours.push(cells[this.row-1][this.col]);
        }
      }
      //left
      if(validCoordinate(this.row,this.col-1)){
        if(!cells[this.row][this.col-1].visited){
        unvisitedNeighbours.push(cells[this.row][this.col-1]);
        }
      }
  
      if(unvisitedNeighbours.length>0){
        const r= Math.floor(Math.random()*unvisitedNeighbours.length);
        return unvisitedNeighbours[r];
      }
      else{
        return undefined;
      }
    }
  
    highlight(){
      let x=this.col*squareSize+margin;
      let y=this.row*squareSize+margin;
      noStroke();
      fill(160);
      square(x,y,squareSize);
    }
  
    show(){
      let x=this.col*squareSize+margin;
      let y=this.row*squareSize+margin;
      stroke(255);
      //top
      if(this.walls[0]===true){
      line(x,y,x+squareSize,y);}
      //right
      if(this.walls[1]===true){
      line(x+squareSize,y,x+squareSize,y+squareSize);}
      //bottom
      if(this.walls[2]===true){
      line(x,y+squareSize,x+squareSize,y+squareSize);}
      //left
      if(this.walls[3]===true){
      line(x,y,x,y+squareSize);}
    }
  }