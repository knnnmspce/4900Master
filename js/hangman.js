  var malwares = [
      "ransomware",
      "virus",
      "keylogger",
      "trojan",
      "spyware",
      "adware",
      "worm",
      "rootkit",
      "bots"
  ];

  var hints = [
      "Designed to block access to a computer system until a sum of money is paid",
      "Piece of code capable of copying itself while having a detrimental effect on a users system",
      "Records every keystroke made by a user",
      "Program that looks legitimate but can take control of your computer",
      "Obtains and transmits covert info about a persons computer activities",
      "Automatically displays or downloads undesired advertising material when a user is online",
      "Replicates itself in order to spread harm to other computers typically using a computer network",
      "Set of tools that enable an unauthorized user to gain control of a computer system undetected",
      "Can be used maliciously in many ways, including in DOS attacks"
  ];

  var correctFx = new Audio('audio/correct.mp3');
  var incorrectFx = new Audio('audio/incorrect.mp3');
  var completeFx = new Audio('audio/complete.mp3');
  var winFx = new Audio('audio/win.mp3');
  var failFx = new Audio('audio/fail.mp3');

  let answer = '';
  let maxWrong = 5;
  let mistakes = 0;
  let lives = 5;
  let guessed = [];
  let wordStatus = null;
  let hintIndex = '';
  let wordsGenerated = [];
  let hintGenerated = [];
  let rep = [];
  let correct = 0;
  let lvldstatus = false;
  let gamestatus = true;

//  function randomWord() {
//      answer = malwares[Math.floor(Math.random() * malwares.length)]; 
//      hintIndex = malwares.indexOf(answer);
//  }

//  function generateList() {
//     var i;
//     for (i = 0; i < 3; i++) {
//         randomWord()
//         if (wordsGenerated.indexOf(answer) == -1){
//             wordsGenerated.push(answer);
//         }
//     }
//  }

function generateList(n) {
    var i;
    for (i = 0; i < n; i++) {
        var ans;
        var hint;
        ans = malwares[Math.floor(Math.random() * malwares.length)];
        if (rep.includes(ans)){
            console.log('repeat occured')
            generateList(1);
        } else{
            wordsGenerated.push(ans);
            rep.push(ans);
            hint = malwares.indexOf(ans);
            hintGenerated.push(hint);
            
        }
        

        
        console.log(hints);
        console.log(wordsGenerated);
    }
    answer = wordsGenerated[0];
    console.log(answer);
    hintIndex = hintGenerated[0];
    console.log([hintIndex]);
}

function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
        <button
            class="btn btn-lg btn-primary m-2"
            id='` + letter + `'
            onClick="handleGuess('` + letter + `')"
        >
            ` + letter + `
        </button>
        `).join('');
  
    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

/* document.addEventListener('keypress', (event) => {
    let keyword = String.fromCharCode(event.keyCode);
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if(answer.indexOf(chosenLetter) >= 0){
        guessedWord();
        checkWin();
    } else if (answer.indexOf(chosenLetter) === -1) {
        lives--;
        updateLives();
        //updateBackground();
        checkLost();
        
    }
}); */

function handleGuess(chosenLetter){
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);
    document.getElementById(chosenLetter).style.display = 'none';

    if(answer.indexOf(chosenLetter) >= 0){
        guessedWord();
        checkWin();
        if(lvldstatus == false){
            correctFx.play();
        }
    } else if (answer.indexOf(chosenLetter) === -1) {
        lives--;
        updateLives();
        //updateBackground();
        checkLost();
        if(lvldstatus == false){
            incorrectFx.play();
        }
        
        
    }
}

document.body.addEventListener('keypress', getKey);
function getKey(event){
    var x = event.key;
    console.log(x);
    handleGuess(x);
}

/* function updateBackground() {

}
 */
function checkWin() {
    if(wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = "NICE!! Try the next word!!";
        correct = correct + 1;
        lvldstatus = true;
        completeFx.play();
    }
    if(correct == 3){
        document.getElementById('keyboard').innerHTML = "YOU WON!!";
        document.getElementById("next").disabled = true; 
        document.getElementById("next").style.visibility = "hidden";
        document.getElementById("previous").disabled = true; 
        document.getElementById("previous").style.visibility = "hidden";
        gamestatus = false;
        winFx.play();
    }
}

function checkLost() {
    if(lives === 0){
        document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
        document.getElementById('keyboard').innerHTML = "YOU LOSE!!";
        document.getElementById("next").disabled = true; 
        document.getElementById("next").style.visibility = "hidden";
        document.getElementById("previous").disabled = true; 
        document.getElementById("previous").style.visibility = "hidden";
        gamestatus = false;
        lvldstatus = true;
        failFx.play();

    }
}

function guessedWord(){
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter: "_ ")).join('');

    document.getElementById('wordSpotlight').innerHTML = wordStatus;
    document.getElementById('hint').innerHTML = hints[hintIndex];
}

function updateLives() {
    document.getElementById('lives').innerHTML = lives;
}

// var iterifyArr = function (arr) {
//     var cur = 0;
//     arr.next = (function () {
//         if (cur++)
//     }


//     arr.prev = (function () { return (--cur < 0) ? false : this[cur]; });
//     return arr;
// };

/* function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
} */

function previousWord(){
    guessed = [];

    var a = wordsGenerated.indexOf(answer) - 1;
    if (a < 0){
        a = 0;
    }
    answer = wordsGenerated[a];
    hintIndex = hintGenerated[a];
    console.log(answer);
    guessedWord();
    generateButtons();
    lvldstatus = false;
}

function nextWord(){
    guessed = [];
    
    //randomWord();
    //iterifyArr(wordsGenerated);
    var a = wordsGenerated.indexOf(answer) + 1;
    if (a > 2){
        a = 2;
    }
    answer = wordsGenerated[a];
    //console.log(a);
    hintIndex = hintGenerated[a];
    console.log(answer);
    //console.log(hintIndex);
    guessedWord();
    generateButtons();
    lvldstatus = false;
}

function reset(){
    mistakes = 0;
    lives = 5;
    guessed = [];
    wordsGenerated = [];
    hintGenerated = [];
    rep = [];
    answer = '';
    hintIndex = '';
    correct = 0;

    generateList(3);
    console.log(wordsGenerated);
    guessedWord();
    updateLives();
    generateButtons();

    document.getElementById("next").disabled = false; 
    document.getElementById("next").style.visibility = "visible";
    document.getElementById("previous").disabled = false; 
    document.getElementById("previous").style.visibility = "visible";

    gamestatus = true;

}

document.getElementById('lives').innerHTML = lives;


  
 //randomWord();
 generateList(3);
 generateButtons();
 guessedWord();
 
 console.log(wordsGenerated);
 console.log(hintGenerated);