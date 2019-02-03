'use strict';
//Aanpassen volume achtergrondmuziek
var audio = document.getElementById("bgAudio");
audio.volume = 0.1;

//Array met afbeeldingen van kaarten
var cardsArray = [{
  'name': 'Spanje',
  'img': 'img/spanje.png'
}, {
  'name': 'Frankrijk',
  'img': 'img/frankrijk.png'
}, {
  'name': 'Italie',
  'img': 'img/italie.png'
}, {
  'name': 'Oostenrijk',
  'img': 'img/oostenrijk.png'
}, {
  'name': 'Roemenie',
  'img': 'img/roemenie.png'
}, {
  'name': 'Duitsland',
  'img': 'img/duitsland.png'
}, {
  'name': 'Nederland',
  'img': 'img/nederland.png'
}, {
  'name': 'Finland',
  'img': 'img/finland.png'
}, {
  'name': 'Belgie',
  'img': 'img/belgie.png'
}, {
  'name': 'Zweden',
  'img': 'img/zweden.png'
}, {
  'name': 'Rusland',
  'img': 'img/rusland.png'
}, {
  'name': 'Portugal',
  'img': 'img/portugal.png'
}];


//Dupliceren van kaarten en zorg ervoor dat deze kaarten in willekeurige volgorde worden weergegeven
var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

//Opslaan van eerste gok
var firstGuess = '';
//Opslaan van tweede gok
var secondGuess = '';
//Tellen van aantal geselecteerde items
var count = 0;
//Voorkomen dat zelfde twee keer element geselecteerd wordt
var previousTarget = null;
//Delay zodat speler de geselecteerde kaart kan zien voordat deze omdraait
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;

  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
  
});

//Score counter
var score = 0;

//Naam persoon opvragen na afronding spel
function naam_opvragen() {
  var person = prompt("Please enter your name", "");}

//Match functie
var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
    //Tellen van aantal weggespeelde kaarten
    score ++
    //Weergeven van score
    document.getElementById("score").innerHTML = "Punten: " + score;
    
;
//Einde spel afbeelding en bericht + Optie om opnieuw te beginnen
if (score == 24)
  {document.getElementById("game").innerHTML = "<img src='/img/goedgedaan.png' width='636' height='316' >" + 'Heel goed gedaan.' +"<a href='index.html' span style='color: white;' >Speel nog een keer</a>"}
    });
  };

//Weergeven van score
document.getElementById("score").innerHTML = "Punten: " + score;

//Functie voor het resetten van geselecteerde kaarten na twee clicks
var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

//Eventlistener toevoegen aan grid
grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

//Toestaan dat 'selected' wordt toegepast op maximaal 2 kaarten 
  if (count < 2) {
    count++;
    if (count === 1) {
      //Toewijzen eerste gok
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      //Toewijzen tweede gok
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }
//Wanneer de gebruiker twee keuzes heeft opgegeven
    if (firstGuess && secondGuess) {
      //En deze keuzes matchen
      if (firstGuess === secondGuess) {
        //Run de match functie
        setTimeout(match, delay);
  
      }
      setTimeout(resetGuesses, delay);
    }
    //Set previous target to clicked
    previousTarget = clicked;
  }
});

//Stopwatch
var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    seconds = 0, minutes = 0, hours = 0,
    t;

//Format van stopwatch
function tijd() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
  
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(tijd, 1000);
}
timer();


//Start knop
start.onclick = timer;

//Stop knop
stop.onclick = function() {
    clearTimeout(t);
}
