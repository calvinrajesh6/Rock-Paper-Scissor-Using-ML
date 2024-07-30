let winCount = 0;
let drawCount = 0;
let lostCount = 0;
let classifier;
let prevLabel = "";
let scored = false;
let firstTime = true;

    // Label
    let label = 'listening...';

    // Teachable Machine model URL:
    let soundModel = 'https://teachablemachine.withgoogle.com/models/8w3t30gzj/';

    function preload() {
      // Load the model
      console.log("Loading model...");
      classifier = ml5.soundClassifier(soundModel + 'model.json', modelReady);
    }

    function modelReady() {
      console.log("Model loaded successfully!");
      // Start classifying
      classifier.classifyStart(gotResult);
    }

    function setup() {
      createCanvas(320, 240);
      console.log("Setup complete.");
    }


function draw() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
}

function gotResult(results) {
  console.log(results);
  if (results==null) {
    // Set a timeout to warn if the microphone is off
    setTimeout(function() {
      alert("Turn on Your Mic!!");
    }, 3000);
  }
  label = results[0].label;
  console.log(label);
  if(scored==false){
    prevLabel = label;
  }
  console.log(prevLabel);
  if(label=="shoot" && firstTime==true){
    firstTime = false;
    gameStart();
  } else if(label=="rock" && firstTime==false){
    scored=true;
    imageGen(1,false);
  }else if(label=="paper" && firstTime==false){
    scored=true;
    imageGen(2,false);
  }else if(label=="scissor" && firstTime==false){
    scored=true;
    imageGen(3,false);
  } else if(label=="shoot" && firstTime==false){
    playMoves("confirm");
  }
}


function imageGen(num, boole){
  if(boole==true){
    document.getElementById("bot").innerHTML = `<img src="./images/${num}.png" alt="image" height="400px" width="400px" class="flipped">`;
  }else if(boole==false){
    document.getElementById("video-container").innerHTML = `<img src="./images/${num}.png" alt="image" height="400px" width="400px">`;
  }
}

function updateScore(opponent){
  switch(opponent){
    case "win":document.getElementById("win").innerText= "Win:" + winCount;
    break;
    case "draw":document.getElementById("draw").innerText= "Draw:" + drawCount;
    break;
    case "lost":document.getElementById("lost").innerText= "Lost:" + lostCount;
    break;
  }
  scored=false;
}

async function gameStart() {
  document.getElementById("mainCont").innerHTML = `
    <div class="in-cont" id="instruct">
      <img src="./images/Intsructions.jpg" alt="Instructions Image!!" height="500px" width="500px" 
        onClick='handleInstructionsClick()'>
    </div>`;
  document.getElementById("gameHead").innerText="Rock Paper Scissor!!"
}

function handleInstructionsClick() {
  document.getElementById("instruct").style.display = "none";
  document.getElementById("mainCont").innerHTML = `
    <div class="row" id="gameCont">
      <div class="col-5 player" id="video-container"></div>
      <div class="col-5 ms-auto player" id="bot"></div>
      <div class="col-12 score">
        <div class="container2 text-center">
          <div class="row align-items-center wdl">
            <div class="col">
              <img src="./images/win.png" alt="cup image" height="25px" width="25px"> 
              <span id="win">WIN: 0</span> 
            </div>
            <div class="col">
              <img src="./images/draw.png" alt="cup image" height="25px" width="25px">  
              <span id="draw">DRAW: 0</span>
            </div>
            <div class="col">
              <img src="./images/lost.png" alt="cup image" height="30px" width="30px">  
              <span id="lost">Lost: 0</span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    playMoves("notConfirm");
}

function playMoves(status){
  console.log("DEBUGGING000");
  if(status=="notConfirm"){
    document.getElementById("video-container").innerHTML = `<img src="./images/inst.jpg" alt="image" height="400px" width="400px">`;

  }
  else if(status=="confirm"){
    let array = [1, 2, 3];
let randomnum = Math.floor(Math.random() * array.length);

console.log(array[randomnum]);
switch(prevLabel){
  case "rock":{
    if(array[randomnum]==1){
      drawCount++;
      updateScore("draw");
    }
    else if(array[randomnum]==2){
      lostCount++;
      updateScore("lost");
    }else if(array[randomnum]==3){
      winCount++;
      updateScore("win");
    }
    break;
  }
  case "paper":{
    if(array[randomnum]==1){
      winCount++;
      updateScore("win");
    }
    else if(array[randomnum]==2){
      drawCount++;
      updateScore("draw");
    }else if(array[randomnum]==3){
      lostCount++;
      updateScore("lost");
    }
    break;   
  }
  case "scissor":{
    if(array[randomnum]==1){
      lostCount++;
      updateScore("lost");
      
    }
    else if(array[randomnum]==2){
      winCount++;
      updateScore("win");
      
    }else if(array[randomnum]==3){
      drawCount++;
      updateScore("draw");
      
    }
    break;
  }
}
imageGen(array[randomnum], true);
  }
}
