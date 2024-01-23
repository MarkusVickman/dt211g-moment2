/*JavaScript som hämtar data med hjälp av FetchAPI och async/await och skriver ut detta till en tabell.
Datan går att sortera efter kurskod, namn och progression. Det går även att söka igenom datan.*/

"use strict"

//Knappar för att ändra ordning/sortera i tabellen
let codeButton = document.getElementById("code");
let nameButton = document.getElementById("name");
let progressionButton = document.getElementById("progression");

//Där datan ska skrivar ut på skärmen
let tableBody = document.getElementById("table");

//Sökruta för att söka i tabellen
let searchBox = document.getElementById("search");
