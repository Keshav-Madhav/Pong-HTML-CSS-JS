let board;
let boardWidth=700;
let boardHeight=700;
let context;

let playerWdith=10;
let playerHeight=70;

let playerVel=0;

let player1={
    x:10,
    y:boardHeight/2-playerHeight/2,
    width: playerWdith,
    height:playerHeight,
    velocity:playerVel
}
let p1Score=0;

let player2={
    x:boardWidth-playerWdith-10,
    y:boardHeight/2-playerHeight/2,
    width: playerWdith,
    height:playerHeight,
    velocity:playerVel
}
let p2Score=0;

let ballWidth=10;
let ballHeight=10;
let ball={
    x:boardWidth/2,
    y:boardWidth/2,
    width:ballWidth,
    height:ballHeight,
    velX:1,
    velY:2
}

window.onload=function(){
    board=document.getElementById("board");
    board.width=boardWidth;
    board.height=boardHeight;
    context=board.getContext("2d");

    context.fillStyle="skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    requestAnimationFrame(update);

    document.addEventListener("keyup", movePlayer);
}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0,board.width,board.height);

    playerRender();

    context.fillStyle="white";
    ball.x+=ball.velX;
    ball.y+=ball.velY;
    if(ball.y>(player2.y+player2.height/2)){
        player2.velocity=1.5;
    }
    else{
        player2.velocity=-1.5;
    }
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    ballWallCollision()
    ballPlayerCollision();

    if(ball.x<0){
        p2Score+=1;
        resetGame(1);
    }
    else if(ball.x+ballWidth>boardWidth){
        p1Score+=1;
        resetGame(-1);
    }

    context.font = "45px sans-serif";
    context.fillText(p1Score,boardWidth/5, 45);
    context.fillText(p2Score, boardWidth*4/5-45,45);

    for(let i=10; i<boardHeight; i+=25){
        context.fillRect(board.width/2-2.5,i,5,5);
    }
}

function ballWallCollision(){
    if(ball.y <=0 || (ball.y + ball.height >= boardHeight)){
        ball.velY*=-1;
    }
}

function ballPlayerCollision(){
    if(detectCollision(ball,player1)){
        if(ball.x <= player1.x + player2.width){
            ball.velX *=-1;
        }
    }
    else if (detectCollision(ball,player2)){
        if(ball.x+ballWidth>=player2.x){
            ball.velX*=-1;
        }
    }
}

function outOfBound(ypos){
    return (ypos<0|| ypos+playerHeight>boardHeight);
}

function playerRender(){
    context.fillStyle="skyblue";

    let nextPlayer1=player1.y+player1.velocity;
    if(!outOfBound(nextPlayer1)){
        player1.y=nextPlayer1;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    let nextPlayer2=player2.y+player2.velocity;
    if(!outOfBound(nextPlayer2)){
        player2.y=nextPlayer2;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

}

function movePlayer(e){
    if(e.code=="KeyW"){
        player1.velocity=-3
    }
    else if(e.code=="KeyS"){
        player1.velocity=3
    }

    if(e.code=="ArrowUp"){
        player2.velocity=-3;
    }
    else if(e.code=="ArrowDown"){
        player2.velocity=3;
    }
}

function detectCollision(a,b){
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}

function resetGame(dir){
    ball={
        x:boardWidth/2,
        y:boardWidth/2,
        width:ballWidth,
        height:ballHeight,
        velX:dir,
        velY:2
    }
}