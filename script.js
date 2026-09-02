// ========================================
// MZ GAME STORE
// ========================================

// COLOCA AQUI O TEU NÚMERO REAL DO WHATSAPP
const WHATSAPP_NUMBER = "258833255852";


// ========================================
// PRODUTOS
// ========================================

const products = [

  // =========================
  // FC MOBILE
  // =========================

  {
    game: "fc-mobile",
    name: "Pack Básico",
    price: "100 MT",
    image: "images/pack.jpg",
    description: "Pack básico para FC Mobile."
  },

  {
    game: "fc-mobile",
    name: "Pack Premium",
    price: "250 MT",
    image: "images/pack-premium.jpg",
    description: "Pack premium para FC Mobile."
  },

  {
    game: "fc-mobile",
    name: "Pack Pro",
    price: "150 MT",
    image: "images/pack-pro.jpg",
    description: "Pack especial para FC Mobile."
  },

  {
    game: "fc-mobile",
    name: "Passe de Estrelas",
    price: "250 MT",
    image: "images/passe-estrelas.jpg",
    description: "Passe de Estrelas para FC Mobile."
  },


  // =========================
  // EFOOTBALL
  // =========================

  {
    game: "efootball",
    name: "Pack eFootball",
    price: "150 MT",
    image: "images/efootball-pack.jpg",
    description: "Conteúdo para eFootball."
  },

  {
    game: "efootball",
    name: "Pack Premium eFootball",
    price: "300 MT",
    image: "images/efootball-premium.jpg",
    description: "Conteúdo premium para eFootball."
  },

  {
    game: "efootball",
    name: "Coins eFootball",
    price: "500 MT",
    image: "images/efootball-coins.jpg",
    description: "Conteúdo para a tua conta eFootball."
  },


  // =========================
  // FREE FIRE
  // =========================

  {
    game: "free-fire",
    name: "Diamantes Free Fire",
    price: "100 MT",
    image: "images/free-fire-diamonds.jpg",
    description: "Diamantes para Free Fire."
  },

  {
    game: "free-fire",
    name: "Pack Free Fire",
    price: "200 MT",
    image: "images/free-fire-pack.jpg",
    description: "Pack especial para Free Fire."
  },

  {
    game: "free-fire",
    name: "Pack Premium Free Fire",
    price: "350 MT",
    image: "images/free-fire-premium.jpg",
    description: "Conteúdo premium para Free Fire."
  },


  // =========================
  // PUBG MOBILE
  // =========================

  {
    game: "pubg-mobile",
    name: "Pack PUBG Mobile",
    price: "200 MT",
    image: "images/pubg-pack.jpg",
    description: "Conteúdo para PUBG Mobile."
  },

  {
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


// ========================================
// ABRIR JOGO
// ========================================

function openGame(game) {

  // Encontrar os produtos do jogo
  const gameProducts =
    products.filter(product => product.game === game);


  // Limpar produtos antigos
  productGrid.innerHTML = "";


  // Nome do jogo
  const gameName =
    gameNames[game] || "Jogo";


  selectedGameTag.textContent =
    gameName.toUpperCase();


  selectedGameTitle.textContent =
    `${gameName} — Conteúdos`;


  // Criar os produtos
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

        <a
          class="buy"
          href="${whatsappLink(product)}"
          target="_blank"
          rel="noopener"
        >
          💬 Comprar pelo WhatsApp
        </a>

      </div>

    `;


    productGrid.appendChild(card);

  });


  // Esconder jogos
  gamesSection.style.display = "none";


  // Mostrar conteúdos
  productsSection.style.display = "block";


  // Ir para o topo dos conteúdos
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ========================================
// VOLTAR AOS JOGOS
// ========================================

function showGames() {

  productsSection.style.display =
    "none";

  gamesSection.style.display =
    "block";


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ========================================
// WHATSAPP
// ========================================

function whatsappLink(product) {

  const message =
    `Olá! Quero comprar o produto "${product.name}" do ${gameNames[product.game]}. Preço: ${product.price}.`;

  return (
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(message)}`
  );

}


// ========================================
// CONTACTO WHATSAPP
// ========================================

const contactWhatsApp =
  document.getElementById("contactWhatsApp");


if (contactWhatsApp) {

  const message =
    "Olá! Preciso de ajuda com a MZ Game Store.";

  contactWhatsApp.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

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
