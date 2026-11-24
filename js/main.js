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
    const price = data.bitcoin.usd; // Buscamos el valor de usd y lo guardamos en price
    priceElement.textContent = `The BTC price is $${price}`;
  } catch (error) {
    console.error(error);
    priceElement.textContent = `Could not load the price. Try again later.`;
  }
}

getPriceBtc();
