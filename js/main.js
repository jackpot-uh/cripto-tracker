//Utilizando AWAIT
async function getPriceBtcAwait() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
  );
  const data = await response.json();
  console.log(data);

  const price = data.bitcoin.usd; // Buscamos el valor de usd y lo guardamos en price
  const priceElement = document.querySelector("#price-btc");
  priceElement.textContent = `The BTC price is ${price}`;
}

getPriceBtcAwait()
