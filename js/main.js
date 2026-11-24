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
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&per_page=20`;
  const container = document.querySelector(`#coins-list`);
  try {
    const coins = await fetchData(url);
    coins.forEach((coin) => {
      // iterate all elements of this array
      const card = document.createElement(`article`); //creates an item and stores it in the “card” variable
      const change = coin.price_change_percentage_24h;
      const changeClass = change >= 0 ? `up` : `down`;
      const changeClassValue = change > 0 ? `+` : ``; 
      card.innerHTML = `  
            <img src="${coin.image}" alt="${coin.name}">
            <h3>${coin.name}</h3>
            <p>$${coin.current_price}</p>
            <p class="${changeClass}">${changeClassValue}${change.toFixed(3)}%</p>
            `; // interpretate HTML content and allow create new elements
      container.append(card); // Insert the card into the container
    });
  } catch (error) {
    console.error(error);
    document.textContent = `Sorry, the content cannot be loaded :(`;
  }
}

getCoins();
