/*JavaScript som hämtar data med hjälp av FetchAPI och async/await och skriver ut detta till en tabell.
Datan går att sortera efter kurskod, namn och progression. Det går även att söka igenom datan.*/

"use strict"

let mainListener = document.getElementById("listener");
let seachField = document.getElementById("search");

// En asynkron funktion som simulerar hämtning av data från en API
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

fetchData();

let referenceData;

let i = 1;
let j = 1;
let k = 1;

seachField.addEventListener("input", function (e){
    let filteredData = referenceData.filter((code) => {
        return code.code.toLowerCase().includes(e.target.value.toLowerCase()) || code.coursename.toLowerCase().includes(e.target.value.toLowerCase());
    });
    buildTable(filteredData);

})

mainListener.addEventListener("click", function (e) {

    if (e.target.id === "code") {
        i++; let im = i % 2;
        if (im === 0) {
            referenceData.sort((a, b) => a.code > b.code);
        }
        else {
            referenceData.sort((a, b) => a.code < b.code);
        }
        buildTable(referenceData);
    }

    if (e.target.id === "name") {
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
            referenceData.sort((a, b) => a.progression > b.progression);
        }
        else {
            referenceData.sort((a, b) => a.progression < b.progression);
        }
        buildTable(referenceData);
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

        tableRow.classList.add("rowSearch");
        tableCell1.classList.add("cellSearch");
        tableCell2.classList.add("cellSearch");
        
        tableCell1.appendChild(text1);
        tableCell2.appendChild(text2);
        tableCell3.appendChild(text3);
        tableRow.appendChild(tableCell1);
        tableRow.appendChild(tableCell2);
        tableRow.appendChild(tableCell3);
        tableBody.appendChild(tableRow);
    }
}
