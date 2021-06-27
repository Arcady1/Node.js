"use strict";

let dataFromDB = {};

window.onload = () => {
    console.log("The page is loaded!");

    buttonGetEventListner();
    sendBdDataEventListner();
}

// * Getting data from DB
function buttonGetEventListner() {
    const buttonGet = document.getElementById('buttonGet');

    buttonGet.addEventListener("click", fetchAndRenderDbData);
}

// * Fetch (GET) request to DB -> renderDbData
async function fetchAndRenderDbData() {
    const res_ = await fetch('/api/db');
    const result = await res_.json();

    dataFromDB = {};

    if (res_.ok) {
        console.log('Fetch (GET) request success!');

        setResultToObject(result);
        renderDbData();
    } else
        console.log('Fetch (GET) request error!');
}

// * The function converts data from DB to Object
function setResultToObject(arr) {
    arr.forEach((elem) => {
        dataFromDB[elem.id] = elem;
    });
}

// * Rendering all rows from DB <names> 
function renderDbData() {
    let dataStrings = "";

    for (let key in dataFromDB) {
        let elem = dataFromDB[key];

        dataStrings += `
            <p class="dataStrWrapper" id="${elem.id}">
                <span>${elem.id} : </span><span>${elem.name} : </span><span>${elem.age} : </span><span>${elem.sex}</span>
            </p>
            `;
    }

    const allDataStrings = '<div class="db-data__strings">' + dataStrings + '</div>';
    const dbDataBlock = document.getElementById('dbDataBlock');

    dbDataBlock.innerHTML = allDataStrings;

    dataStrWrapperDindRemoveEventListner();
}

// * Fetch (POST) request to DB -> renderDbData
function sendBdDataEventListner() {
    const inputData = document.getElementById('dbWriteData');
    const buttonSend = document.getElementById('buttonSend');

    buttonSend.addEventListener('click', async () => {
        const inputDataString = inputData.value;
        const inputDataArr = inputDataString.split(" ");
        const fetchData = {
            "name": inputDataArr[0],
            "age": +inputDataArr[1],
            "sex": inputDataArr[2]
        }

        inputData.value = "";

        const res_ = await fetch('api/db', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchData)
        });

        if (res_.ok) {
            fetchAndRenderDbData();
            console.log('Fetch (POST) request success!');
        } else
            console.log('Fetch (POST) request error!');
    });
}

// * The functions binds dblclick Event Listner to DB rows
function dataStrWrapperDindRemoveEventListner() {
    const allStringsWrappers = document.getElementsByClassName('dataStrWrapper');

    Array.from(allStringsWrappers).forEach((elem) => {
        elem.addEventListener('dblclick', removeDataFromDb);
    });
}

// * Fetch (DELETE) request to DB -> renderDbData
async function removeDataFromDb(event) {
    const rowElemId = +event.target.attributes.id.value;
    const res_ = await fetch(`/api/db:${rowElemId}`, {
        method: "DELETE"
    });

    if (res_.ok) {
        console.log('Fetch (DELETE) request success!');
        delete dataFromDB[rowElemId];
        renderDbData();
    } else
        console.log('Fetch (DELETE) request error!');
}