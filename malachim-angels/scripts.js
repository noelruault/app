// Array of card names
const cards_es = [
  "fe",
  "risa",
  "comunicación",
  "conocimiento",
  "descanso",
  "familia",
  "curiosidad",
  "contemplación",
  "constancia",
  "paz",
  "paciencia",
  "sensibilidad",
  "gracia",
  "reencuentro",
  "celebración",
  "humildad",
  "deseo",
  "sorpresa",
  "movimiento",
  "realización",
  "admiración",
  "abundancia",
  "imaginación",
  "fraternidad",
  "confianza",
  "integridad",
  "liberación",
  "bondad",
  "crecimiento",
  "cambio",
  "honestidad",
  "amor",
  "dicha",
  "perdón",
  "tranquilidad",
  "tiempo",
  "suerte",
  "seguridad",
  "equilibrio",
  "gratitud",
  "consideración",
  "creatividad",
  "aceptación",
  "esperanza",
  "entendimiento",
  "pasión",
  "felicidad",
  "coraje",
  "amistad",
  "fuerza",
  "reconciliación",
  "salud"
];
const cards_en = [
  "faith",
  "laughter",
  "communication",
  "knowledge",
  "rest",
  "family",
  "curiosity",
  "contemplation",
  "perseverance",
  "peace",
  "patience",
  "sensitivity",
  "grace",
  "reunion",
  "celebration",
  "humility",
  "desire",
  "surprise",
  "movement",
  "realisation",
  "admiration",
  "abundance",
  "imagination",
  "fraternity",
  "trust",
  "integrity",
  "liberation",
  "goodness",
  "growth",
  "change",
  "honesty",
  "love",
  "joy",
  "forgiveness",
  "peace of mind",
  "time",
  "luck",
  "security",
  "balance",
  "gratitude",
  "consideration",
  "creativity",
  "acceptance",
  "hope",
  "understanding",
  "passion",
  "happiness",
  "courage",
  "friendship",
  "strength",
  "reconciliation",
  "health"
];

// Shuffle array function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const createCard = (cardText, index) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "playing-card";
  cardDiv.innerHTML = `
    <input id="card-${index}" type="checkbox">
    <label for="card-${index}">
      <div class="card-front">
        <span>${cardText}</span>
      </div>
    </label>`;
  return cardDiv;
};

// Function to render all cards
function renderCards() {
  const cardContainer = document.getElementById("cardContainer");
  cards.forEach((cardText, index) => {
    const cardElement = createCard(cardText, index);
    cardContainer.appendChild(cardElement);
  });
}

// Function to render cards based on the provided language array
const renderCardsByLanguage = (languageArray) => {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = ""; // Clear existing cards
  shuffleArray(languageArray); // Shuffle the array before rendering
  languageArray.forEach((cardText, index) => {
    cardContainer.appendChild(createCard(cardText, index));
  });
};

// Event listeners for language toggles
document
  .getElementById("lang-en")
  .addEventListener("click", () => renderCardsByLanguage(cards_en));
document
  .getElementById("lang-es")
  .addEventListener("click", () => renderCardsByLanguage(cards_es));

// Initial render
renderCardsByLanguage(cards_es);
