/*JavaScript som hämtar data med hjälp av FetchAPI och async/await och skriver ut detta till en tabell.
Datan går att sortera efter kurskod, namn och progression. Det går även att söka igenom datan.*/

"use strict"
/*
//Knappar för att ändra ordning/sortera i tabellen
let codeButton = document.getElementById("code");
let nameButton = document.getElementById("name");
let progressionButton = document.getElementById("progression");
*/
//Där datan ska skrivar ut på skärmen

/*
//Sökruta för att söka i tabellen
let searchBox = document.getElementById("search");
*/

let mainListener = document.getElementById("listener");

// En asynkron funktion som simulerar hämtning av data från en API
async function fetchData() {
    try {
        const response = await fetch('https://dahlgren.miun.se/ramschema_ht23.php');
        let data = await response.json();
        buildTable(data);
        byCoursename = data.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);
        byProgression = data.sort((a, b) => (a.progression - b.progression) ? 1 : -1);
        byCode = data.sort((a, b) => (a.code - b.code) ? 1 : -1);
        return data;

    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

const courseTable = fetchData();



let byCoursename;
let byProgression;
let byCode;


mainListener.addEventListener("click", function (e) {
    if (e.target.id === "code"){
        buildTable(byCode);
        console.table(courseTable);
    }
    else if (e.target.id === "name"){
        buildTable(byCoursename);
        console.table(byCoursename);
    }

    else if (e.target.id === "progression"){
        buildTable(byProgression);
        console.table(byProgression);
    }
})

function buildTable(data) {
    let tableBody = document.getElementById("table");
    tableBody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let tableRow = document.createElement("tr");
        let tableCell1 = document.createElement("td");
        let tableCell2 = document.createElement("td");
        let tableCell3 = document.createElement("td");
        let text1 = document.createTextNode(data[i].code);
        let text2 = document.createTextNode(data[i].coursename);
        let text3 = document.createTextNode(data[i].progression);

        tableCell1.appendChild(text1);
        tableCell2.appendChild(text2);
        tableCell3.appendChild(text3);
        tableRow.appendChild(tableCell1);
        tableRow.appendChild(tableCell2);
        tableRow.appendChild(tableCell3);
        tableBody.appendChild(tableRow);
    }
}

/*
function sortCode(){
    let byCode = courseTable.sort((a, b) => a.code - b.code);
    buildTable(byCode);
    console.table(byCode);
}
*/
/*
function sortByCoursename(data) {
    data.sort((a, b) => a.coursename - b.coursename);
    console.table(data);
    buildTable(data);
}
*/


// Användning av den asynkrona funktionen
/*
async function processData() {
    try {
        const result = await fetchData(); // Väntar på att data ska hämtas
        buildTable(result);
        return (result);
        

        // ... gör något med den mottagna datan
    } catch (error) {
        // Hantera fel om det uppstår vid hämtning eller bearbetning av data
    }
}*/