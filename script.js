

const min_col = 128;
const max_col = 255;
const col_speed = 50.0;

const min_rad = 12;
const max_rad = 20;
const mid_rad = (max_rad + min_rad) / 2.0;

const max_rad_mouse = 25;
const speed_rad_mouse = 1.25;

const speed_rad_mouse_inv = -0.5;
const speed_rad = 0.20;


class AnimateCircle {
    
      constructor(x, y){
          this.x = x;
          this.y = y;
          this.rad = min_rad;
          this.r = Math.random()*(max_col - min_col) + min_col
          this.g = Math.random()*(max_col - min_col) + min_col
          this.b = Math.random()*(max_col - min_col) + min_col
          this.mouse_touch = 0;
      }
      
      animate(x_mouse, y_mouse, id){          
          this.animate_color();
          this.animate_radio(x_mouse, y_mouse);
          this.draw(id);
      }
      
      animate_radio(mouse_x, mouse_y) {
        if(this.mouse_touch != 1 && this.mouse_in_circle(mouse_x, mouse_y)){
            this.mouse_touch = 1;
        }
        else if(this.mouse_touch == 1){
            this.rad = this.rad + speed_rad_mouse;
            if(this.rad > max_rad_mouse){
                this.rad = max_rad_mouse;
                this.mouse_touch = 2;
            }            
        }
        else{
            if(this.rad > mid_rad && this.mouse_touch == 2){
                this.rad = this.rad + speed_rad_mouse_inv;
                if (!(this.rad > mid_rad)){
                    this.mouse_touch = 0
                    this.rad = mid_rad
                }
            }
            else{
              this.rad = this.rad + speed_rad*(Math.random() - 0.5);
              if(this.rad > max_rad){ this.r = max_rad; }
              if(this.rad < min_rad){ this.r = min_rad; }
            }
        }
      }
      
      mouse_in_circle(mouse_x, mouse_y){
          if( (Math.pow(mouse_x-this.x,2) + Math.pow(mouse_y-this.y,2)) < Math.pow(this.rad, 2)){
            console.log("Mouse in circle");
            return true;              
          }
          else{
            return false;
          }
        
      }
      
      animate_color(){
        this.r = this.r + (Math.random() - 0.5)*col_speed;
        this.g = this.g + (Math.random() - 0.5)*col_speed;
        this.b = this.b + (Math.random() - 0.5)*col_speed;
        if(this.r > max_col){ this.r = max_col; }
        if(this.r < min_col){ this.r = min_col; }
        if(this.g > max_col){ this.g = max_col; }
        if(this.g < min_col){ this.g = min_col; }
        if(this.b > max_col){ this.b = max_col; }
        if(this.b < min_col){ this.b = min_col; }
        this.r = parseInt(this.r);
        this.g = parseInt(this.g);
        this.b = parseInt(this.b);
      }
      
      draw(id){
        document.getElementById(id).style.top = String(this.y - (this.rad/2.0)) + "px";
        document.getElementById(id).style.left = String(this.x - (this.rad/2.0)) + "px";
        document.getElementById(id).style.width = String((this.rad)) + "px";
        document.getElementById(id).style.height = String((this.rad)) + "px";
        let color = "#" + (this.r).toString(16) + (this.g).toString(16) + (this.b).toString(16);
        document.getElementById(id).style.background = color;
      }
      
}





// ------------------------------------------------------
//                       SETUP 
// ------------------------------------------------------

var millis = 0;
var a = 0;
var x = 0;
var y = 0;
var lx = window.innerWidth;
var ly = window.innerHeight;

var circulos= new Array();
var circulos_id= new Array();


// Inicio script:


function position(event){
	x = event.x;
	y = event.y;
}




init()


function init(){

  // Calculate number of circles
  let space = 50
  x = Math.round(window.innerWidth/space);
  y = Math.round(window.innerHeight/space);
  
  // Create circles
  var i;
  var j;
  for (i = 0; i < x; i++) {
    for (j = 0; j < y; j++) {
      idDen = "x" + String(i) + "y" + String(j);
      document.write("<div id="+String(idDen)+" class=\"circulo\"></div>");
    }
  }
  
  // Set position of circles
  for (i = 0; i < x; i++) {
    for (j = 0; j < y; j++) {
        idDen = "x" + String(i) + "y" + String(j);
        x_pos = i * space + 10;
        y_pos = j * space + 10;
        circle = new AnimateCircle(x_pos, y_pos);
        circle.draw(idDen);
        circulos.push(circle);
        circulos_id.push(idDen); 
    }
  }
  
}




// ------------------------------------------------------
//                       LOOP TIMER
// ------------------------------------------------------

setTimeout(timer, 1);

function timer() {

  // Loop code
    millis+=1;

  // Animate circles:
  let i = 0;
  for(i = 0; i < circulos.length; i++){
    circulos[i].animate(x, y, circulos_id[i]);
  }
  
  setTimeout(timer, 1);
}




