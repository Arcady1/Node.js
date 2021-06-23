"use strict";

window.onload = () => {
    const inputFile = document.getElementById("inputFile");

    inputFile.addEventListener("change", getLoadedFiles);
}

async function getLoadedFiles(event) {
    const file = event.target.files[0];
    const downloadedImgBlock = document.getElementById("downloadedImg");
    const imgBase64 = await getBase64(file);

    downloadedImgBlock.src = imgBase64;

    const xhr = new XMLHttpRequest();

    xhr.open("POST", `/uploads/${file.name}`, true);
    xhr.setRequestHeader("Content-Type", "application/octate-stream");
    xhr.send(imgBase64);

    xhr.upload.onprogress = (event) => {
        console.log(`Loaded ${event.loaded} from ${event.total} byte`);
    };
    xhr.upload.onload = () => {
        console.log('The file is loaded');
        event.target.value = "";
    };
    xhr.upload.onerror = () => {
        console.log('Sending file error');
        event.target.value = "";
    };
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}