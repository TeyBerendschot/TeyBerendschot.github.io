class Pacman{
    constructor(){
        this.row=0;
        this.col=0;
        //red, blue, green, yellow;
        this.colors=[false,false,false,false];

    }

    show(){
        let x=margin+(this.col+.5)*squareSize;
        let y=margin+(this.row+.5)*squareSize;
        let radius=squareSize*.7;
        let colors=["red","blue","green","yellow"];
        fill(255);
        circle(x,y,radius);
        
        for(let i=0;i<colors.length;i++){
            if(this.colors[i]){
                fill(colors[i]);
                stroke(colors[i]);
                arc(x,y,radius,radius,(i-1)*HALF_PI,(i-1)*HALF_PI+HALF_PI)
            }
        }
    }

    move(code){
        if(code=="ArrowLeft"&&cells[this.row][this.col].walls[3]==false && validCoordinate(this.row,this.col-1)){
            this.col-=1;
        }
        if(code=="ArrowRight"&&cells[this.row][this.col].walls[1]==false && validCoordinate(this.row,this.col+1)){
            this.col+=1;
        }
        if(code=="ArrowRight" && this.row==rows-1 && this.col==cols-1 && this.colors[0] && this.colors[1] && this.colors[2] && this.colors[3]){
            newMaze();
        }
        if(code=="ArrowUp"&&cells[this.row][this.col].walls[0]==false && validCoordinate(this.row-1,this.col)){
            this.row-=1;
        }
        if(code=="ArrowDown"&&cells[this.row][this.col].walls[2]==false && validCoordinate(this.row+1,this.col)){
            this.row+=1;
        }
    }    
}

class Triangles{
    constructor(){
        //The red triangle will appear in the bottom left
        let r1=Math.floor((Math.random()+1)*(cols/2));
        let s1=Math.floor((Math.random()+1)*(rows/2));
        this.red=[r1,s1,false];

        //The red triangle will appear in the bottom right
        let r2=Math.floor((Math.random()+1)*(cols/2));
        let s2=Math.floor((Math.random())*(rows/2));
        this.blue=[r2,s2,false];

        //The green triangle will appear in the top left
        let r3=Math.floor((Math.random())*(cols/2));
        let s3=Math.floor((Math.random()+1)*(rows/2));
        this.green=[r3,s3,false];

        //The yellow triangle will appear in the top right. Also make sure it doesn't spawn at [0,0]
        let r4=0;
        let s4=0;
        while((r4==0)&&(s4==0)){
        r4=Math.floor((Math.random())*(cols/2));
        s4=Math.floor((Math.random())*(rows/2));}
        this.yellow=[r4,s4,false];
    }

    show(){
        //red
        if(!this.red[2]){
        let x1Red=margin+(this.red[1]+.2)*squareSize;
        let y1Red=margin+(this.red[0]+.8)*squareSize;
        let x2Red=margin+(this.red[1]+.8)*squareSize;
        let y2Red=margin+(this.red[0]+.8)*squareSize;
        let x3Red=margin+(this.red[1]+.5)*squareSize;
        let y3Red=margin+(this.red[0]+.2)*squareSize;
        noStroke();
        fill("red");
        triangle(x1Red,y1Red,x2Red,y2Red,x3Red,y3Red);}
        //blue
        if(!this.blue[2]){
        let x1Blue=margin+(this.blue[1]+.2)*squareSize;
        let y1Blue=margin+(this.blue[0]+.8)*squareSize;
        let x2Blue=margin+(this.blue[1]+.8)*squareSize;
        let y2Blue=margin+(this.blue[0]+.8)*squareSize;
        let x3Blue=margin+(this.blue[1]+.5)*squareSize;
        let y3Blue=margin+(this.blue[0]+.2)*squareSize;
        noStroke();
        fill("blue");
        triangle(x1Blue,y1Blue,x2Blue,y2Blue,x3Blue,y3Blue);}
        //green
        if(!this.green[2]){
        let x1Green=margin+(this.green[1]+.2)*squareSize;
        let y1Green=margin+(this.green[0]+.8)*squareSize;
        let x2Green=margin+(this.green[1]+.8)*squareSize;
        let y2Green=margin+(this.green[0]+.8)*squareSize;
        let x3Green=margin+(this.green[1]+.5)*squareSize;
        let y3Green=margin+(this.green[0]+.2)*squareSize;
        noStroke();
        fill("green");
        triangle(x1Green,y1Green,x2Green,y2Green,x3Green,y3Green);}
        //yellow
        if(!this.yellow[2]){
        let x1Yellow=margin+(this.yellow[1]+.2)*squareSize;
        let y1Yellow=margin+(this.yellow[0]+.8)*squareSize;
        let x2Yellow=margin+(this.yellow[1]+.8)*squareSize;
        let y2Yellow=margin+(this.yellow[0]+.8)*squareSize;
        let x3Yellow=margin+(this.yellow[1]+.5)*squareSize;
        let y3Yellow=margin+(this.yellow[0]+.2)*squareSize;
        noStroke();
        fill("yellow");
        triangle(x1Yellow,y1Yellow,x2Yellow,y2Yellow,x3Yellow,y3Yellow);}
    }

    update(pacman){
        if(this.red[0]==pacman.row && this.red[1]==pacman.col){
            this.red[2]=true;
            pacman.colors[0]=true;
        }
        if(this.blue[0]==pacman.row && this.blue[1]==pacman.col){
            this.blue[2]=true;
            pacman.colors[1]=true;
        }
        if(this.green[0]==pacman.row && this.green[1]==pacman.col){
            this.green[2]=true;
            pacman.colors[2]=true;
        }
        if(this.yellow[0]==pacman.row && this.yellow[1]==pacman.col){
            this.yellow[2]=true;
            pacman.colors[3]=true;
        }
    }
}