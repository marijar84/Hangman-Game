
var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antarctica", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana",
    "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic",
    "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Greenland", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Mongolia", "Morocco", "Monaco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", " Sao Tome",
    "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden",
    "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

var startGame = false;
var splitCountry = [];

var lettersGuessed = [];
var letterFound = [];

var ulElement;

var opportunities = 10;
var wins = 0;
var loose = 0;

var winTitle = document.getElementById("countWin");
var looseTitle = document.getElementById("countLoose");


document.onkeyup = function (event) {
    var validationLetters = /[a-z]/;

    var letterPress = event.key;
    var codeLetterPress = event.keyCode;

    if (startGame === false) {

        startGame = true;           

        drawDash(selectWord());

        showPanel(startGame);
    }
    else {

        if ((codeLetterPress > 64 && codeLetterPress < 91) || (codeLetterPress > 96 && codeLetterPress < 123) || codeLetterPress == 8) {
            matchLetter(event.key.toLowerCase());
        }
    }
}


function selectWord() {
    var country = countries[Math.floor(Math.random() * countries.length)];
    console.log(country);
    return country.toLowerCase();
}

function drawDash(country) {
    splitCountry = country.split('');

    var countryDiv = document.getElementById("word");

    ulElement = document.createElement("ul");

    countryDiv.appendChild(ulElement);

    for (var letter = 0; letter < splitCountry.length; letter++) {
        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode("_"));
        ulElement.appendChild(listItem);
    }
}

function matchLetter(letterPress) {
    var opportunitiesTitle = document.getElementById("opportunities");

    var isLetter = splitCountry.includes(letterPress);

    if (isLetter === true) {
        if (letterFound.includes(letterFound) === false) {
            letterFound.push(letterPress);

            drawLetterFound(letterPress);
        }
    }
    else {
        if (lettersGuessed.includes(letterPress) === false) {

            lettersGuessed.push(letterPress);

            drawLetterGuessed(letterPress);

            opportunities = opportunities - 1;

            opportunitiesTitle.innerHTML = opportunities;
        }
    }
}

function drawLetterFound(letterPress) {
    var liList = document.querySelectorAll("li");

    for (var itemList = 0; itemList < splitCountry.length; itemList++) {
        if (splitCountry[itemList] === letterPress) {
            liList[itemList].innerHTML = letterPress.toUpperCase();;
        }
    }
}

function drawLetterGuessed(letterGuessed) {
    var letterGuessedDiv = document.getElementById("letterGuessed");

    var pElement = document.createElement("p");

    pElement.appendChild(document.createTextNode(letterGuessed));

    letterGuessedDiv.appendChild(pElement);
}

function showPanel(isPlaying)
{
    var gamePanel = document.getElementById("gamePanel");    

    var initialDiv = document.getElementById("initialDiv");

    if(isPlaying === true){

        gamePanel.style.visibility = "visible";

        initialDiv.style.visibility = "hidden";
    }
    else{
        gamePanel.style.visibility = "hidden";

        initialDiv.style.visibility = "visible";
    }   
}