
var countries = ["Albania", "Andorra", "Angola", "Antarctica", "Argentina", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bangladesh", "Belize", "Bolivia", "Canada", "Chile", "China",
    "Colombia", "Egypt", "Finland", "France", "Germany", "Indonesia", "Italy", "Japan", "Kazakhstan",
    "Korea", "Liberia", "Luxembourg", "Mali", "Malta", "Mexico", "Nepal", "Netherlands",
    "Panama", "Paraguay", "Peru", "Russia", "Slovenia", "Spain", "Switzerland", "Turkey",
    "USA", "Vietnam"];

var startGame = false;
var splitCountry = [];
var country;

var lettersGuessed = [];
var letterFound = [];

var countryDiv;
var ulElement;
var letterGuessedDiv;
var letterAlreadyGuessed;
var pElement;
var opportunitiesTitle;
var countryImage;
var popup;

var opportunities = 10;
var guessedLetterCount = 0;
var winsCount = 0;
var loseCount = 0;
var isGameFinished = false;

//Function when the user press a key
document.onkeyup = function (event) {

    var letterPress = event.key;
    var codeLetterPress = event.keyCode;
    popup = document.getElementById("popup");

    popup.style.visibility = "hidden";

    //Flag to know if the game started
    //False = New Game
    if (startGame === false) {
        //Initialize divs
        initializeDiv();

        if (isGameFinished === true) {
            restartVariables();
            showPanel("", "hidden");
        }
        //If the game start set variable to false
        startGame = true;
        //Draw the dash for the word selected
        drawDash(selectWord());
        //Hide panel
        hidePanel(startGame);
    }
    else {
        //Vvalidate the keys are letters
        if ((codeLetterPress > 64 && codeLetterPress < 91) || (codeLetterPress > 96 && codeLetterPress < 123) || codeLetterPress == 8) {
            //When the user press a key, validate if the letter match with the word selected
            matchLetter(event.key.toLowerCase());
        }
    }
}

//Allows to initialize Div
function initializeDiv() {
    //Div to letter guessed
    letterGuessedDiv = document.getElementById("letterGuessed");
    //Create a div with the letter guessed
    letterAlreadyGuessed = document.createElement("div");
    letterAlreadyGuessed.setAttribute("id", "alreadyGuessed");
    letterGuessedDiv.appendChild(letterAlreadyGuessed);
    //Get the div to the word selected
    countryDiv = document.getElementById("word");
    //Title to change the opportunities
    opportunitiesTitle = document.getElementById("opportunities");
}

//Validate if the user won or loose
function validateGame() {
    var winTitle = document.getElementById("countWin");
    var looseTitle = document.getElementById("countLoose");

    //if the count of letter in the word selected is equal to the letters guessed, then the user won
    if (splitCountry.length === guessedLetterCount) {
        //count the letter guessed
        winsCount++;
        //Set title in win number number
        winTitle.innerHTML = winsCount;
        //Set image
        var src = "assets/images/" + country + ".png"
        document.getElementById("countryImage").src = src;
        //Allows to show panel with Win Messagge
        showPanel("YOU WIN!", "visible");
        //Start game again
        startGame = false;
        //the game is finished
        isGameFinished = true;

    } else {
        if (opportunities == 0) {
            //Count letter not guessed
            loseCount++;
            //Number of letter not guessed
            looseTitle.innerHTML = loseCount;
            //Allows to show panel with Loose Messagge
            showPanel("YOU LOOSE!", "visible");
            //Start game again
            startGame = false;
            //the game is finished
            isGameFinished = true;
        }
    }
}

//Restar variables when the user won or lost
function restartVariables() {
    //Remove ul element (Dash word)
    countryDiv.removeChild(ulElement);
    //Remove div with letter guessed
    document.getElementById("alreadyGuessed").remove();
    //Initialize variables
    guessedLetterCount = 0;
    opportunities = 10;
    opportunitiesTitle.innerHTML = opportunities
    lettersGuessed = [];
    letterFound = [];
    //Set initial image
    document.getElementById("countryImage").src = "assets/images/countries.png";
}

//Show or hide panel (Win or loose)
function showPanel(userStatus, statusDiv) {
    //Get h1 element
    var initialTitle = document.getElementById("initialtitle");
    //Set title in win or loose
    initialTitle.innerHTML = userStatus;
    //Popup visible
    popup.style.visibility = statusDiv;
}

//Select word when the game start
function selectWord() {
    //Choose a word
    country = countries[Math.floor(Math.random() * countries.length)];
    //Return word
    return country.toLowerCase();
}

//Draw dash with the numer of letter in word
function drawDash(country) {
    //Separate the word in letters
    splitCountry = country.split('');
    //Create element ul
    ulElement = document.createElement("ul");

    countryDiv.appendChild(ulElement);

    //Create li(_) for the ul element 
    //Depending the number of letters
    for (var letter = 0; letter < splitCountry.length; letter++) {
        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode("_"));
        ulElement.appendChild(listItem);
    }
}

//Check if the word has the letter
function matchLetter(letterPress) {
    //Check if the word has letter
    //Set true or false
    var isLetter = splitCountry.includes(letterPress);

    //If the word contains the letter, this is drwan in html
    if (isLetter === true) {
        //Validate if the letter is already guessed
        if (letterFound.includes(letterFound) === false) {
            //Save the letters found so as not to repeat them
            letterFound.push(letterPress);
            //Draw the letter
            drawLetterFound(letterPress);
        }
    }
    else {
        //Validate if the letter is already guessed
        if (lettersGuessed.includes(letterPress) === false) {
            //Save the letters found so as not to repeat them
            lettersGuessed.push(letterPress);
            //Draw the letter
            drawLetterGuessed(letterPress);
            //Decrement the oportunities
            opportunities = opportunities - 1;
            //Set value in html
            opportunitiesTitle.innerHTML = opportunities;
        }
    }
    //Validate if the user won or losts
    validateGame();
}

//Draw letter found
function drawLetterFound(letterPress) {
    //Get the li element
    var liList = document.querySelectorAll("li");

    //For to know where is the letter position
    for (var itemList = 0; itemList < splitCountry.length; itemList++) {
        if (splitCountry[itemList] === letterPress) {
            liList[itemList].innerHTML = letterPress.toUpperCase();
            guessedLetterCount = guessedLetterCount + 1;
        }
    }
}

//Draw the letter guessed
function drawLetterGuessed(letterGuessed) {
    //Create element p
    pElement = document.createElement("p");

    pElement.setAttribute("id", "letter");

    pElement.appendChild(document.createTextNode(letterGuessed));

    letterAlreadyGuessed.appendChild(pElement);
}

//To hide the initial panel
function hidePanel(isPlaying) {
    var gamePanel = document.getElementById("gamePanel");

    var initialDiv = document.getElementById("initialDiv");

    if (isPlaying === true) {

        gamePanel.style.visibility = "visible";

        initialDiv.style.visibility = "hidden";
    }
}