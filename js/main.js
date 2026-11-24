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

async function getPriceBtc() {
  const priceElement = document.querySelector("#price-btc");
  const url = `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd`
  try {
    const data = await fetchData(url);
    const price = data.bitcoin.usd; // find the value in usd and store it in the price variable
    priceElement.textContent = `The BTC price is $${price}`;
  } catch (error) {
    console.error(error);
    priceElement.textContent = `Could not load the price. Try again later.`;
  }
}

// This function retrieves all the coins I need and displays them on the page by generating HTML elements with their image, name, and price.
async function getCoins(){
    const url = `${BASE_URL}/coins/markets?vs_currency=usd&per_page=10`;
    const container = document.querySelector(`#coins-list`)
    try {
        const coins = await fetchData(url);
        console.log(coins);
        coins.forEach(coin => { // iterate all elements of this array
            const card = document.createElement(`article`) //creates an item and stores it in the “card” variable
            card.innerHTML = `  
            <img src="${coin.image}" alt="${coin.name}">
            <h3>${coin.name}</h3>
            <p>$${coin.current_price}</p>
            `; // interpretate HTML content and allow create new elements
            container.append(card); // Insert the card into the container
        });

    } catch(error) {
        console.error(error);
    }
}

getPriceBtc();
getCoins();
