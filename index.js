const box=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,6],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let create function to intialize the game 

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    //UI update making all boxes empty
    box.forEach((box,index)=>{
        box.innerText="";
        box.style.pointerEvents="all";
        box.classList=`box box${index+1}`;
    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();



function handleClick(index){
    if(gameGrid[index] == ""){
        // console.log(index)
        box[index].innerText=currentPlayer;
        box[index].style.pointerEvents="none";  

        gameGrid[index]=currentPlayer;
        // console.log(gameGrid);

        //swap the turn of X O
        swapTurn();
        checkGameOver();
    }
}
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer="0";
    }
    else{
        currentPlayer="X";
    }

    //UI update
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
function checkGameOver(){
    // newGamebtn.classList.add("active");
    let answer="";
    winningPosition.forEach((position)=>{
     if((gameGrid[position[0]]!==""|| gameGrid[position[1]]!=="" || gameGrid[position[2]])
     && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]] )){
        
        if(gameGrid[position[0]]==="X"){
            answer="X";
        }
        else{
            answer="0";
        }
        ///after winning disable pointer on boxes
   box.forEach((box)=>{
    box.style.pointerEvents="none";

   })
        box[position[0]].classList.add("win");
        box[position[1]].classList.add("win");
        box[position[2]].classList.add("win");

     }
    });
    ///it means winner
   if(answer!==""){
    gameInfo.innerText=`Winner Player - ${answer}`;
    newGamebtn.classList.add("active");
    return;
   }
   let fillCount=0;
   gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++
        }
   })
   if(fillCount===9){
    gameInfo.innerText="Game Tied";
    newGamebtn.classList.add("active");
   }

}
box.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        
        handleClick(index);
    })
})

//new game button

newGamebtn.addEventListener("click", initGame);
