// ========================================
// MZ GAME STORE 2.0
// ========================================

// COLOCA AQUI O TEU NÚMERO REAL DO WHATSAPP
const WHATSAPP_NUMBER = "258840000000";

// ========================================
// PRODUTOS
// ========================================

const products = [

// FC MOBILE
{
id: 1,
game: "fc-mobile",
name: "Pack Básico",
price: "100 MT",
image: "images/pack.jpg",
description: "Pack básico para FC Mobile."
},

{
id: 2,
game: "fc-mobile",
name: "Pack Premium",
price: "250 MT",
image: "images/pack-premium.jpg",
description: "Pack premium para FC Mobile."
},

{
id: 3,
game: "fc-mobile",
name: "Pack Pro",
price: "150 MT",
image: "images/pack-pro.jpg",
description: "Pack especial para FC Mobile."
},

{
id: 4,
game: "fc-mobile",
name: "Passe de Estrelas",
price: "250 MT",
image: "images/passe-estrelas.jpg",
description: "Passe de Estrelas para FC Mobile."
},

// EFOOTBALL
{
id: 5,
game: "efootball",
name: "Pack eFootball",
price: "150 MT",
image: "images/efootball-pack.jpg",
description: "Conteúdo para eFootball."
},

{
id: 6,
game: "efootball",
name: "Pack Premium eFootball",
price: "300 MT",
image: "images/efootball-premium.jpg",
description: "Conteúdo premium para eFootball."
},

{
id: 7,
game: "efootball",
name: "Coins eFootball",
price: "500 MT",
image: "images/efootball-coins.jpg",
description: "Conteúdo para a tua conta eFootball."
},

// FREE FIRE
{
id: 8,
game: "free-fire",
name: "Diamantes Free Fire",
price: "100 MT",
image: "images/free-fire-diamonds.jpg",
description: "Diamantes para Free Fire."
},

{
id: 9,
game: "free-fire",
name: "Pack Free Fire",
price: "200 MT",
image: "images/free-fire-pack.jpg",
description: "Pack especial para Free Fire."
},

{
id: 10,
game: "free-fire",
name: "Pack Premium Free Fire",
price: "350 MT",
image: "images/free-fire-premium.jpg",
description: "Conteúdo premium para Free Fire."
},

// PUBG MOBILE
{
id: 11,
game: "pubg-mobile",
name: "Pack PUBG Mobile",
price: "200 MT",
image: "images/pubg-pack.jpg",
description: "Conteúdo para PUBG Mobile."
},

{
id: 12,
game: "pubg-mobile",
name: "Pack Premium PUBG",
price: "350 MT",
image: "images/pubg-premium.jpg",
description: "Conteúdo premium para PUBG Mobile."
}

];

// ========================================
// NOMES DOS JOGOS
// ========================================

const gameNames = {
"fc-mobile": "FC Mobile",
"efootball": "eFootball",
"free-fire": "Free Fire",
"pubg-mobile": "PUBG Mobile"
};

// ========================================
// ESTADO
// ========================================

let cart = [];

let currentGame = null;

// ========================================
// ELEMENTOS
// ========================================

const gamesSection =
document.getElementById("jogos");

const productsSection =
document.getElementById("conteudos");

const productGrid =
document.getElementById("productGrid");

const selectedGameTitle =
document.getElementById("selectedGameTitle");

const selectedGameTag =
document.getElementById("selectedGameTag");

const cartOverlay =
document.getElementById("cartOverlay");

const cartItems =
document.getElementById("cartItems");

const cartFooter =
document.getElementById("cartFooter");

const cartTotal =
document.getElementById("cartTotal");

const cartCount =
document.getElementById("cartCount");

const toast =
document.getElementById("toast");

// ========================================
// ABRIR JOGO
// ========================================

function openGame(game) {

currentGame = game;

const gameName =
gameNames[game] || "Jogo";

selectedGameTag.textContent =
gameName.toUpperCase();

selectedGameTitle.textContent =
"${gameName} — Conteúdos";

const search =
document.getElementById("productSearchInput");

if (search) {
search.value = "";
}

renderProducts(products);

gamesSection.style.display = "none";

productsSection.style.display = "block";

window.scrollTo({
top: 0,
behavior: "smooth"
});

}

// ========================================
// MOSTRAR PRODUTOS
// ========================================

function renderProducts(list) {

productGrid.innerHTML = "";

const gameProducts =
list.filter(product =>
product.game === currentGame
);

const noResults =
document.getElementById("noResults");

if (gameProducts.length === 0) {

noResults.style.display = "block";

return;

}

noResults.style.display = "none";

gameProducts.forEach(product => {

const card =
  document.createElement("article");

card.className = "card";


card.innerHTML = `

  <img
    src="${product.image}"
    alt="${product.name}"
    onerror="this.style.display='none'"
  >

  <div class="card-body">

    <h3>
      ${product.name}
    </h3>

    <p>
      ${product.description}
    </p>

    <div class="price">
      ${product.price}
    </div>

    <div class="product-actions">

      <button
        class="add-cart"
        onclick="addToCart(${product.id})"
      >
        🛒 Adicionar ao carrinho
      </button>

      <a
        class="buy"
        href="${whatsappLink(product)}"
        target="_blank"
        rel="noopener"
      >
        💬 Comprar pelo WhatsApp
      </a>

    </div>

  </div>

`;

productGrid.appendChild(card);

});

}

// ========================================
// PESQUISA DOS PRODUTOS
// ========================================

function searchProducts() {

const input =
document.getElementById("searchInput");

const text =
input.value.toLowerCase().trim();

// Pesquisa geral
// Se estiver na página dos jogos,
// mostra os jogos normalmente.

if (!text) {

document
  .querySelectorAll(".game-card")
  .forEach(card => {
    card.style.display = "";
  });

return;

}

document
.querySelectorAll(".game-card")
.forEach(card => {

  const content =
    card.textContent.toLowerCase();

  card.style.display =
    content.includes(text)
      ? ""
      : "none";

});

}

// ========================================
// PESQUISA DENTRO DO JOGO
// ========================================

function filterCurrentGame() {

if (!currentGame) return;

const input =
document.getElementById(
"productSearchInput"
);

const text =
input.value.toLowerCase().trim();

const filtered =
products.filter(product => {

  if (product.game !== currentGame) {
    return false;
  }

  return (
    product.name
      .toLowerCase()
      .includes(text) ||

    product.description
      .toLowerCase()
      .includes(text)
  );

});

renderProducts(filtered);

}

// ========================================
// CARRINHO
// ========================================

function addToCart(productId) {

const product =
products.find(
item => item.id === productId
);

if (!product) return;

const existing =
cart.find(
item => item.id === productId
);

if (existing) {

existing.quantity++;

} else {

cart.push({
  ...product,
  quantity: 1
});

}

updateCart();

showToast(
"${product.name} adicionado ao carrinho!"
);

}

// ========================================
// REMOVER PRODUTO
// ========================================

function removeFromCart(productId) {

cart =
cart.filter(
item => item.id !== productId
);

updateCart();

}

// ========================================
// ALTERAR QUANTIDADE
// ========================================

function changeQuantity(productId, change) {

const item =
cart.find(
product => product.id === productId
);

if (!item) return;

item.quantity += change;

if (item.quantity <= 0) {

removeFromCart(productId);

return;

}

updateCart();

}

// ========================================
// ATUALIZAR CARRINHO
// ========================================

function updateCart() {

const totalItems =
cart.reduce(
(total, item) =>
total + item.quantity,
0
);

cartCount.textContent =
totalItems;

if (cart.length === 0) {

cartItems.innerHTML = `

  <div class="empty-cart">

    <div>
      🛒
    </div>

    <p>
      O teu carrinho está vazio.
    </p>

    <button
      onclick="closeCart()"
      class="btn"
    >
      Ver produtos
    </button>

  </div>

`;

cartFooter.style.display =
  "none";

return;

}

cartFooter.style.display =
"block";

cartItems.innerHTML = "";

cart.forEach(item => {

const cartItem =
  document.createElement("div");

cartItem.className =
  "cart-item";


cartItem.innerHTML = `

  <img
    class="cart-item-image"
    src="${item.image}"
    alt="${item.name}"
  >

  <div class="cart-item-info">

    <h3>
      ${item.name}
    </h3>

    <div class="cart-item-game">
      ${gameNames[item.game]}
    </div>

    <div class="cart-item-price">
      ${item.price}
    </div>

    <div
      style="
        display:flex;
        align-items:center;
        gap:8px;
        margin-top:8px;
      "
    >

      <button
        onclick="changeQuantity(${item.id}, -1)"
        style="
          width:27px;
          height:27px;
          border:1px solid #2c3b55;
          border-radius:6px;
          background:#111a2b;
          color:white;
        "
      >
        −
      </button>

      <strong>
        ${item.quantity}
      </strong>

      <button
        onclick="changeQuantity(${item.id}, 1)"
        style="
          width:27px;
          height:27px;
          border:1px solid #2c3b55;
          border-radius:6px;
          background:#111a2b;
          color:white;
        "
      >
        +
      </button>

    </div>

  </div>


  <button
    class="remove-item"
    onclick="removeFromCart(${item.id})"
    title="Remover"
  >
    ✕
  </button>

`;


cartItems.appendChild(cartItem);

});

const total =
calculateTotal();

cartTotal.textContent =
"${total} MT";

}

// ========================================
// CALCULAR TOTAL
// ========================================

function calculateTotal() {

return cart.reduce(
(total, item) => {

  const price =
    parseFloat(
      item.price
        .replace("MT", "")
        .replace(",", ".")
        .trim()
    );

  return total +
    (price * item.quantity);

},
0

);

}

// ========================================
// ABRIR CARRINHO
// ========================================

function openCart() {

cartOverlay.classList.add("active");

document.body.classList.add("cart-open");

}

// ========================================
// FECHAR CARRINHO
// ========================================

function closeCart() {

cartOverlay.classList.remove("active");

document.body.classList.remove("cart-open");

}

// ========================================
// FECHAR CLICANDO FORA
// ========================================

function closeCartOutside(event) {

if (event.target === cartOverlay) {
closeCart();
}

}

// ========================================
// LIMPAR CARRINHO
// ========================================

function clearCart() {

if (cart.length === 0) return;

cart = [];

updateCart();

showToast(
"Carrinho limpo!"
);

}

// ========================================
// WHATSAPP — PRODUTO INDIVIDUAL
// ========================================

function whatsappLink(product) {

const message =
"Olá! Quero comprar o produto "${product.name}" do ${gameNames[product.game]}. Preço: ${product.price}.";

return (
"https://wa.me/${WHATSAPP_NUMBER}" +
"?text=${encodeURIComponent(message)}"
);

}

// ========================================
// FINALIZAR PEDIDO NO WHATSAPP
// ========================================

function checkoutWhatsApp() {

if (cart.length === 0) {

showToast(
  "O carrinho está vazio!"
);

return;

}

let message =
"Olá! Quero fazer um pedido na MZ Game Store.%0A%0A";

cart.forEach(item => {

const itemTotal =
  parseFloat(
    item.price
      .replace("MT", "")
      .replace(",", ".")
      .trim()
  ) * item.quantity;


message +=
  `🎮 ${gameNames[item.game]}%0A` +
  `📦 ${item.name}%0A` +
  `🔢 Quantidade: ${item.quantity}%0A` +
  `💰 ${itemTotal} MT%0A%0A`;

});

const total =
calculateTotal();

message +=
"💵 TOTAL: ${total} MT%0A%0A" +
"Aguardo confirmação. Obrigado!";

const url =
"https://wa.me/${WHATSAPP_NUMBER}?text=${message}";

window.open(
url,
"_blank"
);

}

// ========================================
// TOAST
// ========================================

let toastTimer;

function showToast(message) {

toast.textContent =
message;

toast.classList.add("show");

clearTimeout(toastTimer);

toastTimer =
setTimeout(() => {

  toast.classList.remove("show");

}, 2500);

}

// ========================================
// VOLTAR AOS JOGOS
// ========================================

function showGames() {

currentGame = null;

productsSection.style.display =
"none";

gamesSection.style.display =
"block";

const search =
document.getElementById("searchInput");

if (search) {
search.value = "";
}

window.scrollTo({
top: 0,
behavior: "smooth"
});

}

// ========================================
// CONTACTO WHATSAPP
// ========================================

const contactWhatsApp =
document.getElementById(
"contactWhatsApp"
);

if (contactWhatsApp) {

const message =
"Olá! Preciso de ajuda com a MZ Game Store.";

contactWhatsApp.href =
"https://wa.me/${WHATSAPP_NUMBER}" +
"?text=${encodeURIComponent(message)}";

}

// ========================================
// ANO
// ========================================

const year =
document.getElementById("year");

if (year) {

year.textContent =
new Date().getFullYear();

}

// ========================================
// INICIALIZAR
// ========================================

updateCart();
