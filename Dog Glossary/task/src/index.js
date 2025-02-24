document.getElementById('button-random-dog')
    .addEventListener('click', getRandomDog);
document.getElementById('button-show-breed')
    .addEventListener('click', getDogByBreed);

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
    clearBreedNotFoundMessage();
    clearBreed();
    let divCont = document.getElementById("content");
    let img = document.createElement('img');
    img.id = "result-img";
    img.src = json.message;
    divCont.appendChild(img);
}
function clearBreed() {
    let existingImg = document.getElementById("result-img");
    if (existingImg) {
        existingImg.remove();
    }
}


async function getDogByBreed () {
    let input = document.getElementById("input-breed")
        .value
        .trim()
        .toLowerCase();
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
    clearBreed();
    clearBreedNotFoundMessage();

    let divCont = document.getElementById("content");
    let img = document.createElement('img');
    img.id = "result-img";
    img.src = json.message[0];
    divCont.appendChild(img);
}

function showBreedNotFound () {
    clearBreedNotFoundMessage();
    let errormessage = document.createElement('p');
    let divCont = document.getElementById("content");
    errormessage.textContent = "Breed not found!";
    errormessage.id = "error-message";
    divCont.appendChild(errormessage);
}

function clearBreedNotFoundMessage () {
    let existingError = document.getElementById("error-message");
    if (existingError) {
        existingError.remove();
    }

}