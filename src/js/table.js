/*JavaScript som hämtar data med hjälp av FetchAPI och async/await och skriver ut detta till en tabell.
Datan går att sortera efter kurskod, namn och progression. Det går även att filtrera igenom datan.*/

"use strict"

//Variabler för sökruta och avlyssning av main
let mainListener = document.getElementById("listener");
let seachField = document.getElementById("search");

//array med object som används som grund till filtrering.
let referenceData;

//initierar funktion för att hämta kurslista
fetchData();

// En asynkron funktion som väntar på datan som hämtas som array av object med fetch api.
async function fetchData() {
    try {
        const response = await fetch('https://dahlgren.miun.se/ramschema_ht23.php');
        let data = await response.json();
        buildTable(data);
        referenceData = data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

//En filterfunktion som sparar arrayen med object i en ny variabel och filtrerar bort datan när input i sökfältet känns av.
//Funktionen innehåller .toLowerCase() så att det inte ska vara case-sensitive. Datan skickas sen till tabell-funktionen för varje knapptryck som görs.
seachField.addEventListener("input", function (e){
    let filteredData = referenceData.filter((code) => {
        return code.code.toLowerCase().includes(e.target.value.toLowerCase()) || code.coursename.toLowerCase().includes(e.target.value.toLowerCase());
    });
    buildTable(filteredData);
})

//Ett värde som sparas utanför funktionerna för att kunna hålla koll på om sortering ska inverteras eller inte.
let i = 1;
let j = 1;
let k = 1;

/*Lyssnar efter klick. Om klicken är på "rätt" id så startas en av 3 olika alternativ med hjälp av if-satser.
Dessa kontrollerar rätt id och sedan om det är ett jämt eller udda tal för att avgöra om sorteringen ska vara inverterad eller ej.
Till sista skickas den sorterade datan till tabell-funktionen*/
mainListener.addEventListener("click", function (e) {
    if (e.target.id === "code") {
        i++; let im = i % 2;
        if (im === 0) {
            referenceData.sort((a, b) => (a.code > b.code) ? 1 : -1);
        }
        else {
            referenceData.sort((a, b) => (a.code < b.code) ? 1 : +1);
        }
        buildTable(referenceData);
    }

    else if (e.target.id === "name") {
        j++; let jm = j % 2;
        if (jm === 0) {
            referenceData.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1);
        }
        else {
            referenceData.sort((a, b) => (a.coursename > b.coursename) ? 1 : +1);
        }
        buildTable(referenceData);
    }

    else if (e.target.id === "progression") {
        k++; let km = k % 2;
        if (km === 0) {
            referenceData.sort((a, b) => (a.progression > b.progression) ? 1 : -1);
        }
        else {
            referenceData.sort((a, b) => (a.progression < b.progression) ? 1 : +1);
        }
        buildTable(referenceData);
    }
})

/*Funktion som bygger en tabell av den datan som följer med som argument.*/
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
