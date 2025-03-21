const printDateInFooter = function () {
  const footerSpan = document.getElementById("year");
  footerSpan.innerText = new Date().getFullYear();
};

printDateInFooter();

const getEvents = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzVmYTM4MzRiZjAwMTUwMDA3MTMiLCJpYXQiOjE3NDI1NTA1MjIsImV4cCI6MTc0Mzc2MDEyMn0.X85ONiit1u2ArhfAFibdpkMcYLE62Jd8AmNBPeVsIfE ",
    },
  })
    .then((response) => {
      // response è un oggetto JS che comprende un po' di proprietà interessanti
      // tra cui una proprietà chiamata "ok" che in un semplice booleano riassume
      // l'esito della chiamata
      if (response.ok) {
        // possiamo sperare di recuperare i dati da questa response!
        return response.json();
      } else {
        // vuol dire che la response è arrivata ma che ha un problema
        // se finiamo nell'else, lanciamoci nel blocco .catch()
        throw new Error("la risposta non era valida");
      }
    })
    .then((data) => {
      //hideSpinner(); // nascondo lo spinner
      console.log("DATI RICEVUTI DAL SERVER", data);
    })
    .catch((error) => {
      //hideSpinner(); // nascondo lo spinner
      console.log("si è verificato un errore", error);
    });
};

getEvents();
