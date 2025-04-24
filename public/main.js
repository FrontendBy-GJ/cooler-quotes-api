const randomQuoteBtn = document.querySelector('#random-qt-btn');
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote-text');
const quoteCharacter = document.querySelector('#quote-character');
const select = document.querySelector('#character-select');
const characterQuoteBtn = document.querySelector('#char-qt-btn');

randomQuoteBtn.addEventListener('click', getRandomQuote);

async function getRandomQuote() {
  try {
    const response = await fetch('/api/quotes/random');
    const data = await response.json();

    quoteText.textContent = `${data.quote}`;
    quoteCharacter.textContent = `–${data.character}`;
  } catch (error) {
    quoteText.textContent = `Something went wrong!`;
    quoteCharacter.textContent = ``;
    console.error(error);
  }
}

async function populateCharacters() {
  try {
    const response = await fetch('/api/characters');
    const characters = await response.json();

    for (char of characters) {
      const option = document.createElement('option');
      option.value = char;
      option.textContent = char;

      select.append(option);
    }
  } catch (error) {
    console.error(error);
  }
}
populateCharacters();

characterQuoteBtn.addEventListener('click', getRandomQuoteFromCharacter);

async function getRandomQuoteFromCharacter() {
  try {
    const selectedChar = select.value;
    if (!selectedChar) return;

    const response = await fetch(
      `/api/quotes/random/${encodeURIComponent(selectedChar)}`
    );
    const data = await response.json();

    quoteText.textContent = `${data.quote}`;
    quoteCharacter.textContent = `–${data.character}`;
  } catch (error) {
    console.error(error);
  }
}
