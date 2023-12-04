


class color_class{    
    constructor(h,s,l){
        this.h = h;
        this.s = s;
        this.l = l;
    }

}

var grey = new color_class(0,0,80);
var lightRed = new color_class(8,80,73);
var red = new color_class(309, 100, 75);
var lightGreen = new color_class(180,220,185);
var green = new color_class( 115, 86, 58);
var purple = new color_class(220,10,50);
var yellow = new color_class(255,255,10);
var black = new color_class(0,0,0);
var orange = new color_class(39,93,54.7)
var lightBlue = new color_class(180, 200, 236);
var blue = new color_class(180, 90, 65);


class square{
    lineWidth = 0;
    
    constructor(size,x,y,color_,lightColor){
        this.width = size;
        this.height = size;   
        this.x = x;
        this.y = y;
        this.color = color_; 
        this.currentColor = grey;
        this.lightColor = lightColor;
        this.life = false;
        }
  
    changeColor(color){
        this.color = color;
    }
  
    setLightColor(){
        this.lightColor.h = this.color.h;
        
        this.lightColor.s = this.color.s - 30;
        
        this.lightColor.l = this.color.l + 15;
    }
  
    updateSize(size,x,y){  
        this.width = size;
        this.height = size;   
        this.x = x;
        this.y = y;
    }
  
    render(ctx){
        
        ctx.beginPath();
        this.lineWidth = this.width * 0.15; //15 percent of the square is outline
  
        //assing the color
        this.setLightColor();
        
        if(this.life)
            this.currentColor = this.lightColor;
        else 
            this.currentColor = grey;
  
        ctx.fillStyle = `hsl(${this.currentColor.h},${this.currentColor.s}%,${this.currentColor.l}%)`;
        ctx.fillRect(this.x + this.lineWidth/2,this.y + this.lineWidth/2,this.width-this.lineWidth,this.height-this.lineWidth);
  
        if(this.life)
            ctx.strokeStyle = `hsl(${this.color.h},${this.color.s}%,${this.color.l}%)`;
        else
            ctx.strokeStyle = `hsl(${this.currentColor.h},${this.currentColor.s}%,${this.currentColor.l}%)`; 
  
        ctx.lineJoin = 'round';
        ctx.lineWidth = this.lineWidth;
        //match the size properly
        ctx.strokeRect(this.x+this.lineWidth/2,this.y+this.lineWidth/2,this.width-this.lineWidth,this.height-this.lineWidth);      
    }
  
  }




export class board{

    constructor (){
        this.running = false  
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')        
        this.width = this.canvas.width
        this.ctx.fillStyle = 'grey'
        
        this.counter = 0;
        this.rows = 15;
        this.cols = 15;
        
        this.matrix = []

        this.max = this.rows

        this.n = this.rows
        let size = this.width
        this.space = 3

        for(var i=0; i<this.n; i++) {
            this.matrix[i] = [];
        for(var j=0; j<this.n; j++) {
            this.matrix[i][j] = new square(size/this.n - this.space, (size/this.n) * i + 1, (size/this.n) * j + 1,blue,lightBlue);
        }}

        for(var j=0; j<7; j++) {
            this.matrix[4][j+4].life = true 
            this.matrix[4][j+4].color = blue 
        }

        for(var j=0; j<7; j++) {
            this.matrix[4+j][4].life = true 
            this.matrix[4+j][4].color = red 
        }

        for(var j=0; j<7; j++) {
            this.matrix[4+j][10].life = true 
            this.matrix[4+j][10].color = red 
        }

        for(var j=0; j<7; j++) {
            this.matrix[10][4+j].life = true 
            this.matrix[10][4+j].color = red 
        }



        this.render_board()
    }


    render_board(){
        for(let i = 0; i < this.rows; i++)
            for(let j = 0; j< this.rows ; j++)
                this.matrix[i][j].render(this.ctx)
    }

    onClick(x,y) {

        let square_size = this.width / this.max 
        x = Math.floor(x/square_size) 
        y = Math.floor(y/square_size) 

        this.matrix[x][y].life = true 

        if (!this.running) 
            this.updateGame()

        this.render_board()
    }

    updateGame(){
        this.running = true
        let neighbors;
        for (let i = 0; i < this.max; i++){ // x = i   y = j
            for (let j = 0; j < this.max; j++){ 
                
                neighbors = this.checkNeighbors(i,j); 
                if ((this.matrix[i][j].currentColor != grey && neighbors == 2 ) || neighbors == 3)
                    this.matrix[i][j].life = true;
                else 
                    this.matrix[i][j].life = false; 

                if (this.matrix[i][j].currentColor == grey && neighbors == 3){
                    this.matrix[i][j].color = this.calculateColor(i,j);                    
                }
            }
        }

        this.render_board()
    }

    calculateColor(x,y){ //  x = x - 1 
        let counter = 0;
        let arrayColors = [];
          // first row
        if (this.matrix[x+1][y+1].currentColor != grey){
            
            arrayColors[counter] = this.matrix[x+1][y+1];
            counter++;
        }

        if (this.matrix[x][y+1].currentColor != grey){
           
            arrayColors[counter] = this.matrix[x][y+1];
            counter++;
        }
        if (this.matrix[x-1][y+1].currentColor != grey){
            
            arrayColors[counter] = this.matrix[x-1][y+1];
            counter++;
        }

        // second row
        if (this.matrix[x+1][y].currentColor != grey){
            
            arrayColors[counter] = this.matrix[x+1][y];
            counter++;
        }
        if (this.matrix[x-1][y].currentColor != grey){
           
            arrayColors[counter] = this.matrix[x-1][y]; 
            counter++;  
        }

        // third row
        if (this.matrix[x+1][y-1].currentColor != grey){
            
            arrayColors[counter] = this.matrix[x+1][y-1];
            counter++;
            
        }
        if (this.matrix[x][y-1].currentColor != grey){
            
            arrayColors[counter] = this.matrix[x][y-1];
            counter++;
            
        }
        if (this.matrix[x-1][y-1].currentColor != grey){
            
            arrayColors[counter] = this.matrix[x-1][y-1];
            counter++;
        }


        let color = this.avarageColor3(arrayColors[0].color,arrayColors[1].color,arrayColors[2].color);


        return color;
        
    }

    avarageColor3(color1,color2,color3){
        let finalColor = new color_class(color1.h,color1.s,color1.l);
        finalColor.h = Math.floor((color1.h + color2.h + color3.h) / 3 );
      
        return finalColor;
    }


    checkNeighbors(x,y){ //return how many neighbors there are
        if (x == 0 || x >= (this.max - 1) || y == 0 || y >= (this.max - 1))
            return 0;
        let counter = 0;

        // first row
        if (this.matrix[x+1][y+1].currentColor != grey){
            counter++;
        }

        if (this.matrix[x][y+1].currentColor != grey){
            counter++;
        }
        if (this.matrix[x-1][y+1].currentColor != grey){
            counter++;
            
        }

        // second row
        if (this.matrix[x+1][y].currentColor != grey)
            counter++;
        if (this.matrix[x-1][y].currentColor != grey)
            counter++;

        // third row
        if (this.matrix[x+1][y-1].currentColor != grey)
            counter++;
        if (this.matrix[x][y-1].currentColor != grey)
            counter++;
        if (this.matrix[x-1][y-1].currentColor != grey)
            counter++;
        return counter;

    }










}