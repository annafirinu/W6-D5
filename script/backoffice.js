const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

class Auto {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const URLparameters = new URLSearchParams(location.search);
const eventId = URLparameters.get("id");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");

const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

if (eventId) {
  fetch(eventsURL + "/" + eventId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella fetch");
      }
    })
    .then((data) => {
      nameInput.value = data.name;
      descriptionInput.value = data.description;
      brandInput.value = data.brand;
      imageUrlInput.value = data.imageUrl;
      priceInput.value = data.price;
    })
    .catch((err) => console.log("ERRORE DEL RIPOPOLAMENTO DEL FORM", err));
}

const form = document.getElementById("event-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const automobile = new Auto(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageUrlInput.value,
    priceInput.value
  );

  console.log("Automobile", automobile);

  let methodToUse;
  let URLtoUse;

  if (eventId) {
    methodToUse = "PUT";
    URLtoUse = eventsURL + "/" + eventId;
  } else {
    methodToUse = "POST";
    URLtoUse = eventsURL;
  }

  fetch(URLtoUse, {
    //Non sono riuscita ad andare avanti in quanto una volta compilato il form, crea l'oggetto ma mi da errore 400 nell'URL, ho provato in diversi modi senza successo, cercherò di capire nel weekend
    method: methodToUse,
    body: JSON.stringify(automobile),
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzVmYTM4MzRiZjAwMTUwMDA3MTMiLCJpYXQiOjE3NDI1NTA1MjIsImV4cCI6MTc0Mzc2MDEyMn0.X85ONiit1u2ArhfAFibdpkMcYLE62Jd8AmNBPeVsIfE ",

      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("SALVATAGGIO COMPLETATO!");

        form.reset();
      } else {
        throw new Error("ricevuta response non ok dal backend");
      }
    })
    .catch((err) => {
      console.log("errore nel salvataggio!", err);
    });
});
