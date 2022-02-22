//alert("Working");
const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php" // remember to include https
const searchInput = document.getElementById("searchInput");
const autofillTemplate = document.getElementById("autofill"); // look up info
let cardArray = [];

window.onload = function createArray() {
  fetch(url)
    .then(function(response) {
      return response.json();
    })

    .then(function(json) {
      for (let i = 0; i < json.data.length; i++) {
        cardArray[i] = json.data[i];
        console.log(cardArray[i].name);
      }
    })
}

searchInput.addEventListener("keyup", function() {
  const input = searchInput.value.toLowerCase();
  autofillTemplate.innerHTML = '';
  document.getElementById("content");

  const autofill = cardArray.filter(function(card) {
    return card.name.toLowerCase().startsWith(input);
  });

  autofill.forEach(function(autofill) {
    const div = document.createElement('div');
    div.innerHTML = autofill.name + " (" + autofill.card_sets[0].set_name + ")";
    autofillTemplate.appendChild(div);
  });

  if (input === '') {
    autofillTemplate.innerHTML = '';
  }
});

autofillTemplate.addEventListener("click", function(choice) {
  autofillTemplate.innerHTML = '';
  let yugioh = "";

  yugioh = choice.target.innerText.split('(');
  placeHolder = yugioh[1];
  placeHolder = placeHolder.slice(0, -1);
  yugioh = yugioh[0].slice(0, -1);

  console.log(yugioh);
  console.log(placeHolder);

  const cardName = cardArray.filter(data => data.name === yugioh);
  console.log(cardName);

  const cardFound = cardName.filter(data => data.card_sets[0].set_name === placeHolder)
  console.log(cardFound);

  let cardPhoto = "";
  let info = "";

  let cardURL = cardFound[0].card_images[0].image_url; // look back at reference to do this later
  cardPhoto += "<img src =" + cardURL + " width = 90%>"

  info += "<p>" + cardFound[0].name + " (" + cardFound[0].card_sets[0].set_name + ")</p>";
  info += "<p>Type: " + cardFound[0].type + "</p>";
  info += "<p>Attack: " + cardFound[0].atk + "</p>";
  info += "<p>Defense: " + cardFound[0].def + "</p>";
  info += "<p><i>Description: " + cardFound[0].desc + "</p></i>";
  info += "<p>Prices: Found Below</p>"
  //info += "<p>Average Price: " + (cardFound[0].card_prices[0].tcgplayer_price + cardFound[0].card_prices[0].amazon_price + cardFound[0].card_prices[0].ebay_price + cardFound[0].card_prices[0].cardmarket_price/4) + "$</p>"; // attempt to calcualte prices
  info += "<p>Amazon Price: " + cardFound[0].card_prices[0].amazon_price + "$</p>";
  info += "<p>Ebay Price: " + cardFound[0].card_prices[0].ebay_price + "$</p>";
  info += "<p>Card Market Price: " + cardFound[0].card_prices[0].cardmarket_price + "$</p>";
  info += "<p>TCG player Price: " + cardFound[0].card_prices[0].tcgplayer_price + "$</p>";

  cardPicture.innerHTML = cardPhoto;
  cardInfo.innerHTML = info;
  document.getElementById("cardResults").style.width = "80%";
  document.getElementById("cardResults").style.marginTop = "0%";
  document.getElementById("cardResults").style.paddingTop = "5%";
  document.getElementById("cardResults").style.paddingBottom = "5px";
  document.getElementById("cardResults").style.borderRadius = "50px";
  document.getElementById("cardResults").style.backgroundColor = "#E5C3D1";
});
