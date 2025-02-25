document.getElementById('button-random-dog')
    .addEventListener('click', getRandomDog);
document.getElementById('button-show-breed')
    .addEventListener('click', getDogByBreed);
document.getElementById("button-show-sub-breed")
    .addEventListener('click', getDogSubBreed);

async function getRandomDog() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        displayRandomDog(json);
    } catch (error) {
        console.error(error.message);
    }
}

function displayRandomDog (json) {
    console.log(json);
    clearSubBreedList();
    clearBreedNotFoundMessage();
    clearBreed();
    let divCont = document.getElementById("content");
    let img = document.createElement('img');
    img.id = "result-img";
    img.src = json.message;
    divCont.appendChild(img);
}


async function getDogByBreed () {
    let input = document.getElementById("input-breed")
        .value
        .trim()
        .toLowerCase();
    clearSubBreedList();
    clearBreed();
    clearBreedNotFoundMessage();

    const url = `https://dog.ceo/api/breed/${input}/images`;
    try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.status === "error") {
            showBreedNotFound();
            return;
        }

        displayDogByBreed(json);
    } catch (error) {
        console.error(error.message);
        showBreedNotFound();
    }

}

function displayDogByBreed (json) {
    console.log(json);
    clearSubBreedList();
    clearBreed();
    clearBreedNotFoundMessage();

    let divCont = document.getElementById("content");
    let img = document.createElement('img');
    img.id = "result-img";
    img.src = json.message[0];
    divCont.appendChild(img);
}

async function getDogSubBreed () {
    let input = document.getElementById("input-breed")
        .value
        .trim()
        .toLowerCase();
    clearSubBreedList();
    clearBreed();
    clearBreedNotFoundMessage();

    const url = `https://dog.ceo/api/breed/${input}/list`;
    try {
        const response = await fetch(url);
        const json = await response.json();

        if (json.status === "error") {
            showBreedNotFound();
            return;
        } else if (json.message.length === 0) {
            showSubBreedNotFound();
            return;
        }

        displayDogBySubBreed(json);
    } catch (error) {
        console.error(error.message);
        showBreedNotFound();
    }
}

function displayDogBySubBreed (json) {
    console.log(json);
    clearBreed();
    clearSubBreedList();
    clearBreedNotFoundMessage();

    let divCont = document.getElementById("content");
    let list = document.createElement('ol');
    list.id = "sub-breed-list";


    for (let i = 0; i < json.message.length; i++) {
        let listElement = document.createElement("li");
        listElement.textContent = json.message[i];
        list.appendChild(listElement);
    }
    divCont.appendChild(list);
}
function showBreedNotFound () {
    clearBreedNotFoundMessage();
    let errormessage = document.createElement('p');
    let divCont = document.getElementById("content");
    errormessage.textContent = "Breed not found!";
    errormessage.id = "error-message";
    divCont.appendChild(errormessage);
}

function showSubBreedNotFound () {
    clearBreedNotFoundMessage();
    let errormessage = document.createElement('p');
    let divCont = document.getElementById("content");
    errormessage.textContent = "No sub-breeds found!";
    errormessage.id = "error-message";
    divCont.appendChild(errormessage);
}

function clearBreedNotFoundMessage () {
    let existingError = document.getElementById("error-message");
    if (existingError) {
        existingError.remove();
    }
}

function clearBreed () {
    let existingImg = document.getElementById("result-img");
    if (existingImg) {
        existingImg.remove();
    }
}

function clearSubBreedList () {
    let existingList = document.getElementById("sub-breed-list");
    if (existingList) {
        existingList.remove();
    }
}