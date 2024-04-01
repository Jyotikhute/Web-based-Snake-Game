var lastPaintTime=0;
let SNAKE_SPEED = 2;
let inputDirection = {x : -1,y : 0}
let lastInputDirection =inputDirection;

const EXPENTION_AMOUNT = 1;
var score =0;

const snakeBody = [
    {x : 10, y : 10},
    // {x : 11, y : 10},
    // {x : 12, y : 10}
];

let food = getFoodRandomPosition();
const gameBoard = document.querySelector(".game-board");
const scoreBox = document.getElementById("score");
function paint(currentTime){
    var TimeSeconds=(currentTime - lastPaintTime)/1000;
    requestAnimationFrame(paint);
    if(TimeSeconds <1 /SNAKE_SPEED) return;
    
    lastPaintTime = currentTime;


    update();
    draw();
   
}
window.requestAnimationFrame(paint);



function draw(){
    drawSnake();
    drawFood();

}
function update(){

    snakeMove();
    snakeEatFood();

}
function drawSnake(){
   
    gameBoard.innerHTML = "";
    snakeBody.forEach((segment, index)=> {
        var snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.x+1;
        snakeElement.style.gridRowStart = segment.y+1;

        snakeElement.classList.add("snake");
        //snakeElement.innerHTML = index;

        snakeElement.style.transform = "rotate(0deg)";

        if(index == 0){
            snakeElement.classList.add("head");

           if(inputDirection.x == 1){
            snakeElement.style.transform = "rotate(-90deg)";

            }else if(inputDirection.x == -1){
                snakeElement.style.transform = "rotate(90deg)";
            }
            else if(inputDirection.y == -1){
                snakeElement.style.transform = "rotate(180deg)";
            }
            else if(inputDirection.y == 1){
                snakeElement.style.transform = "rotate(0deg)";
            }

        }
        else{
            snakeElement.classList.add("snake");
        }

        gameBoard.appendChild(snakeElement);
    });
    
}

function drawFood(){
    var foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x+1;
    foodElement.style.gridRowStart = food.y+1;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);

}

function snakeMove(){

    for(i = snakeBody.length - 2; i >=0 ; i--){
        snakeBody[i+1] = {...snakeBody[i]}
    }

    inputDirection = getInpuDirection();
    snakeBody[0].x+= inputDirection.x;
    snakeBody[0].y+= inputDirection.y;
   // getInpuDirection()
   checkGameOver();
}

function  getInpuDirection(){
    window.addEventListener("keydown",e=>{
       

        switch(e.key){
            case 'ArrowUp' :
            if(lastInputDirection.y==1) break;   
            inputDirection ={x : 0, y : -1}
            break;

            case 'ArrowDown' : 
            if(lastInputDirection.y==-1) break; 
            inputDirection ={x : 0, y : 1}
            break;

            case 'ArrowLeft' :
            if(lastInputDirection.x==1) break;     
            inputDirection ={x : -1, y : 0}
            break;

            case 'ArrowRight' : 
            if(lastInputDirection.x==-1) break; 
            inputDirection ={x : 1, y : 0}
            break;
            default : inputDirection = { x : 0 , y : 0}
        }
        
    })
    lastInputDirection =  inputDirection;
    return inputDirection;

}


function snakeEatFood(){
    

if(isEat()){
    score +=1;
    scoreBox.innerHTML = score;
   console.log("eated");
   food = getFoodRandomPosition();
   SNAKE_SPEED ++;
   expendSnake();
   
}
}

function isEat(){
    
       return snakeBody[0].x == food.x && snakeBody[0].y == food.y;
   
}

function getFoodRandomPosition(){

    let a,b, myCondition = true;
    while(myCondition){
        a = Math.ceil(Math.random()*25);
        b = Math.ceil(Math.random()*25);

        myCondition=snakeBody.some(segment=>{
            return segment.x == a && segment.y == b;
        })
    }

    return {x : a,
         y :  b};
}

function expendSnake(){
    for(i = 0; i< EXPENTION_AMOUNT;i++){
        snakeBody.push(snakeBody[snakeBody.length-1]);
    }
}

function  checkGameOver(){
    if(snakeOutOfGrid() || snakeIntersection()){
        location.reload();
        alert("Game Over : Your Loose");
    }
}

function snakeOutOfGrid(){
    return snakeBody[0].x < 0 || snakeBody[0].x>26 || snakeBody[0].y < 0 || snakeBody[0].y>26;

}

function snakeIntersection(){
    for(i = 1;i<snakeBody.length;i++){
        if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y){
            return true;
        }
    }

}
