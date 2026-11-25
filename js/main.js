const BASE_URL = "https://api.coingecko.com/api/v3";
// GET
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// This function retrieves all the coins I need and displays them on the page by generating HTML elements with their image, name, and price.
async function getCoins() {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&per_page=100`;
  const container = document.querySelector(`#coins-list`);
  try {
    const coins = await fetchData(url);
    renderCards(coins);
  } catch (error) {
    console.error(error);
    container.textContent = `Sorry, the content cannot be loaded :(`;
  }
}

function renderCards(coins){
    const container = document.querySelector(`#coins-list`);
    container.innerHTML = ``;
    coins.forEach((coin) => {
      // iterate all elements of this array
      const card = document.createElement(`article`); //creates an item and stores it in the “card” variable
      const change = coin.price_change_percentage_24h;
      const changeClass = change >= 0 ? `up` : `down`;
      const sign = change > 0 
      ? `+` : ``; 
      card.innerHTML = `  
            <img src="${coin.image}" alt="${coin.name}">
            <h3>${coin.name}</h3>
            <p>$${coin.current_price}</p>
            <p class="${changeClass}">${sign}${change.toFixed(3)}%</p>
            `; // interpretate HTML content and allow create new elements
      container.append(card); // Insert the card into the container
    });
}

async function searchCoins(query){
    const url = `${BASE_URL}/search?query=${query}`;
    const container = document.querySelector(`#coins-list`);
    try {
        const data = await fetchData(url);
        const ids = data.coins.map((coin) => coin.id).join(",");  
        const marketsUrl = `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}`;
        const coins = await fetchData(marketsUrl);
        renderCards(coins);
    }catch (error){
        container.textContent = `Sorry, the content cannot be loaded`;
        console.error(error);
    }
}

const searchForm = document.querySelector(`#search-form`);
const searchInput = document.querySelector(`#search-input`);
searchForm.addEventListener(`submit`, (event) => {
    event.preventDefault(); //prevents the page from reloading
    const query = searchInput.value.trim(); //trim removes extra spaces
    if (!query){
        return;
    }
    searchCoins(query);
});



getCoins();
