const BASE_URL = `https://api.coingecko.com/api/v3`;
const container = document.querySelector(`#coins-list`);
// GET
async function fetchData(url) {
  const response = await fetch(url, {
    headers: { "x-cg-demo-api-key": API_KEY },
  });
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// This function retrieves all the coins I need and displays them on the page by generating HTML elements with their image, name, and price.
async function getCoins() {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&per_page=100`;
  try {
    const coins = await fetchData(url);
    renderCards(coins);
  } catch (error) {
    console.error(error);
    container.textContent = `Sorry, the content cannot be loaded :(`;
  }
}

function renderCards(coins) {
  container.innerHTML = ``;
  coins.forEach((coin) => {
    // iterate all elements of this array
    const change = coin.price_change_percentage_24h;
    let changeClass = ``;
    if (change === null){
      changeClass = `nodata`;
    } else if (change > 0){
      changeClass = `up`;
    } else if (change < 0){
      changeClass = `down`;
    } else {
      changeClass = `nochange`;
    };
    const sign = change > 0 ? `+` : ``;
    const textChange = change === null ? `Sorry, this information is not avaliable` : `${sign}${change.toFixed(2)}%`;
    //card creation
    const card = document.createElement(`article`); //creates an item and stores it in the “card” variable
    const img = document.createElement(`img`);
    const title = document.createElement(`h3`);
    const price = document.createElement(`p`);
    const priceChange = document.createElement(`p`);

    img.src = coin.image;
    img.alt = coin.name;
    title.textContent = coin.name;
    price.textContent = `$${coin.current_price}`;
    priceChange.textContent = textChange;
    priceChange.className = changeClass;

    card.append(img, title, price, priceChange);
    container.append(card);
  });
}

async function searchCoins(query) {
  const url = `${BASE_URL}/search?query=${query}`;
  try {
    const data = await fetchData(url);
    const ids = data.coins.map((coin) => coin.id).join(",");
    const marketsUrl = `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}`;
    const coins = await fetchData(marketsUrl);
    if (data.coins.length === 0){
      container.textContent = `No coins found for ${query}`; // non use innerHTML because it is insecure in this case
      return;
    }
    renderCards(coins);
  } catch (error) {
    container.textContent = `Sorry, the content cannot be loaded`;
    console.error(error);
  }
}

const searchForm = document.querySelector(`#search-form`);
const searchInput = document.querySelector(`#search-input`);
searchForm.addEventListener(`submit`, (event) => {
  event.preventDefault(); //prevents the page from reloading
  const query = searchInput.value.trim(); //trim removes extra spaces
  if (!query) {
    return;
  }
  searchCoins(query);
});

getCoins();
