/* =========================================================
   MZ GAME STORE 2.0
   SCRIPT PRINCIPAL
   ========================================================= */

/* =========================
   CONFIGURAÇÃO WHATSAPP
   ========================= */

// ⚠️ COLOCA AQUI O TEU NÚMERO REAL DO WHATSAPP
// Formato: código do país + número, sem +, espaços ou -
const WHATSAPP_NUMBER = "258840000000";


/* =========================
   PRODUTOS
   ========================= */

const products = [
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


/* =========================
   PRODUTOS EM DESTAQUE
   ========================= */

const featuredNames = [
  "Pack Premium",
  "Coins eFootball",
  "Diamantes Free Fire",
  "Pack Premium PUBG"
];


/* =========================
   NOMES DOS JOGOS
   ========================= */

const gameNames = {
  "fc-mobile": "FC Mobile",
  "efootball": "eFootball",
  "free-fire": "Free Fire",
  "pubg-mobile": "PUBG Mobile"
};


/* =========================
   ESTADO
   ========================= */

let cart = [];
let currentGame = null;
let toastTimer = null;


/* =========================
   ELEMENTOS DO HTML
   ========================= */

const jogos = document.getElementById("jogos");
const conteudos = document.getElementById("conteudos");

const productGrid = document.getElementById("productGrid");

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

const productSearchInput =
  document.getElementById("productSearch");

const contactWhatsApp =
  document.getElementById("contactWhatsApp");

const yearElement =
  document.getElementById("year");


/* =========================================================
   WHATSAPP
   ========================================================= */

function whatsappLink(product) {

  const message =
    `Olá! Quero comprar o produto "${product.name}" ` +
    `do ${gameNames[product.game]}. ` +
    `Preço: ${product.price}.`;

  return (
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(message)}`
  );
}


/* =========================================================
   PRODUTOS EM DESTAQUE
   ========================================================= */

function renderFeaturedProducts() {

  const container =
    document.getElementById("featuredProducts");

  if (!container) {
    return;
  }

  const featuredProducts =
    products.filter(product =>
      featuredNames.includes(product.name)
    );

  container.innerHTML =
    featuredProducts.map(product => {

      return `
        <div class="product-card featured-card">

          <div class="featured-badge">
            🔥 DESTAQUE
          </div>

          <img
            src="${product.image}"
            alt="${product.name}"
            class="product-image"
          >

          <div class="product-info">

            <h3>${product.name}</h3>

            <p>
              ${product.description}
            </p>

            <div class="product-bottom">

              <strong>
                ${product.price}
              </strong>

              <a
                href="${whatsappLink(product)}"
                target="_blank"
                rel="noopener"
                class="whatsapp-btn"
              >
                💬 Comprar
              </a>

            </div>

          </div>

        </div>
      `;

    }).join("");
}


/* =========================================================
   ABRIR UM JOGO
   ========================================================= */

function openGame(game) {

  currentGame = game;

  const gameName =
    gameNames[game] || game;

  if (selectedGameTitle) {
    selectedGameTitle.textContent =
      `${gameName} — Conteúdos`;
  }

  if (selectedGameTag) {
    selectedGameTag.textContent =
      gameName.toUpperCase();
  }

  if (productSearchInput) {
    productSearchInput.value = "";
  }

  if (jogos) {
    jogos.style.display = "none";
  }

  if (conteudos) {
    conteudos.style.display = "block";
  }

  renderProducts(products);
}


/* =========================================================
   MOSTRAR PRODUTOS
   ========================================================= */

function renderProducts(list = products) {

  if (!productGrid) {
    return;
  }

  const filteredProducts =
    list.filter(product => {

      if (!currentGame) {
        return true;
      }

      return product.game === currentGame;

    });


  if (filteredProducts.length === 0) {

    productGrid.innerHTML = `
      <div class="empty-products">
        <p>😕 Nenhum produto encontrado.</p>
      </div>
    `;

    return;
  }


  productGrid.innerHTML =
    filteredProducts.map(product => {

      return `
        <div
          class="product-card"
          data-product-id="${product.id}"
        >

          <img
            src="${product.image}"
            alt="${product.name}"
            class="product-image"
          >

          <div class="product-info">

            <h3>
              ${product.name}
            </h3>

            <p>
              ${product.description}
            </p>

            <div class="product-price">
              ${product.price}
            </div>

            <div class="product-actions">

              <button
                type="button"
                class="cart-btn"
                onclick="addToCart(${product.id})"
              >
                🛒 Adicionar ao carrinho
              </button>

              <a
                href="${whatsappLink(product)}"
                target="_blank"
                rel="noopener"
                class="whatsapp-btn"
              >
                💬 Comprar pelo WhatsApp
              </a>

            </div>

          </div>

        </div>
      `;

    }).join("");
}


/* =========================================================
   PESQUISA DOS JOGOS
   ========================================================= */

function searchProducts() {

  const input =
    document.getElementById("gameSearch");

  const searchTerm =
    input
      ? input.value.toLowerCase().trim()
      : "";

  const cards =
    document.querySelectorAll(".game-card");


  cards.forEach(card => {

    const text =
      card.textContent.toLowerCase();

    if (
      !searchTerm ||
      text.includes(searchTerm)
    ) {

      card.style.display = "";

    } else {

      card.style.display = "none";

    }

  });
}


/* =========================================================
   PESQUISA DENTRO DO JOGO
   ========================================================= */

function filterCurrentGame() {

  if (!productSearchInput) {
    return;
  }

  const searchTerm =
    productSearchInput.value
      .toLowerCase()
      .trim();


  const filtered =
    products.filter(product => {

      const belongsToGame =
        !currentGame ||
        product.game === currentGame;

      const searchableText =
        `${product.name} ${product.description}`
          .toLowerCase();

      return (
        belongsToGame &&
        searchableText.includes(searchTerm)
      );

    });


  renderProducts(filtered);
}


/* =========================================================
   ADICIONAR AO CARRINHO
   ========================================================= */

function addToCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );


  if (!product) {
    return;
  }


  const existing =
    cart.find(
      item => item.id === productId
    );


  if (existing) {

    existing.quantity += 1;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }


  updateCart();


  showToast(
    `${product.name} adicionado ao carrinho!`
  );
}


/* =========================================================
   REMOVER DO CARRINHO
   ========================================================= */

function removeFromCart(productId) {

  cart =
    cart.filter(
      item => item.id !== productId
    );

  updateCart();
}


/* =========================================================
   ALTERAR QUANTIDADE
   ========================================================= */

function changeQuantity(
  productId,
  change
) {

  const item =
    cart.find(
      product => product.id === productId
    );


  if (!item) {
    return;
  }


  item.quantity += change;


  if (item.quantity <= 0) {

    removeFromCart(productId);

    return;
  }


  updateCart();
}


/* =========================================================
   CALCULAR TOTAL
   ========================================================= */

function calculateTotal() {

  return cart.reduce(
    (total, item) => {

      const price =
        parseFloat(
          String(item.price)
            .replace(/[^\d.,]/g, "")
            .replace(",", ".")
        ) || 0;

      return (
        total +
        price * item.quantity
      );

    },
    0
  );
}


/* =========================================================
   ATUALIZAR CARRINHO
   ========================================================= */

function updateCart() {

  if (!cartItems) {
    return;
  }


  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  if (cartCount) {

    cartCount.textContent =
      totalItems;

  }


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">
          🛒
        </div>

        <h3>
          O teu carrinho está vazio
        </h3>

        <p>
          Adiciona produtos para começar.
        </p>
      </div>
    `;


    if (cartFooter) {
      cartFooter.style.display = "none";
    }


    if (cartTotal) {
      cartTotal.textContent = "0 MT";
    }


    return;
  }


  if (cartFooter) {
    cartFooter.style.display = "";
  }


  cartItems.innerHTML =
    cart.map(item => {

      const itemPrice =
        parseFloat(
          String(item.price)
            .replace(/[^\d.,]/g, "")
            .replace(",", ".")
        ) || 0;


      const itemTotal =
        itemPrice * item.quantity;


      return `
        <div class="cart-item">

          <img
            src="${item.image}"
            alt="${item.name}"
            class="cart-item-image"
          >

          <div class="cart-item-info">

            <h4>
              ${item.name}
            </h4>

            <small>
              ${gameNames[item.game]}
            </small>

            <strong>
              ${item.price}
            </strong>

            <div class="quantity-controls">

              <button
                type="button"
                onclick="changeQuantity(${item.id}, -1)"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                type="button"
                onclick="changeQuantity(${item.id}, 1)"
              >
                +
              </button>

            </div>

            <div class="cart-item-total">
              ${itemTotal} MT
            </div>

          </div>

          <button
            type="button"
            class="remove-cart-item"
            onclick="removeFromCart(${item.id})"
            aria-label="Remover ${item.name}"
          >
            🗑️
          </button>

        </div>
      `;

    }).join("");


  const total =
    calculateTotal();


  if (cartTotal) {

    cartTotal.textContent =
      `${total} MT`;

  }
}


/* =========================================================
   ABRIR CARRINHO
   ========================================================= */

function openCart() {

  if (!cartOverlay) {
    return;
  }

  cartOverlay.classList.add("active");

  document.body.classList.add("cart-open");
}


/* =========================================================
   FECHAR CARRINHO
   ========================================================= */

function closeCart() {

  if (!cartOverlay) {
    return;
  }

  cartOverlay.classList.remove("active");

  document.body.classList.remove("cart-open");
}


/* =========================================================
   FECHAR AO CLICAR FORA
   ========================================================= */

function closeCartOutside(event) {

  if (!cartOverlay) {
    return;
  }


  if (event.target === cartOverlay) {

    closeCart();

  }
}


/* =========================================================
   LIMPAR CARRINHO
   ========================================================= */

function clearCart() {

  if (cart.length === 0) {
    return;
  }


  cart = [];

  updateCart();

  showToast(
    "Carrinho limpo."
  );
}


/* =========================================================
   FINALIZAR PEDIDO PELO WHATSAPP
   ========================================================= */

function checkoutWhatsApp() {

  if (cart.length === 0) {

    showToast(
      "O teu carrinho está vazio."
    );

    return;
  }


  let message =
    "Olá! Quero fazer um pedido na MZ Game Store.\n\n";


  cart.forEach(item => {

    const price =
      parseFloat(
        String(item.price)
          .replace(/[^\d.,]/g, "")
          .replace(",", ".")
      ) || 0;


    const itemTotal =
      price * item.quantity;


    message +=
      `🎮 ${gameNames[item.game]}\n` +
      `📦 ${item.name}\n` +
      `🔢 Quantidade: ${item.quantity}\n` +
      `💰 ${itemTotal} MT\n\n`;

  });


  const total =
    calculateTotal();


  message +=
    `💵 TOTAL: ${total} MT\n\n` +
    "Aguardo confirmação. Obrigado!";


  const url =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(message)}`;


  window.open(
    url,
    "_blank",
    "noopener"
  );
}


/* =========================================================
   CONTACTO WHATSAPP
   ========================================================= */

function setupWhatsAppContact() {

  if (!contactWhatsApp) {
    return;
  }


  const message =
    "Olá! Preciso de ajuda com a MZ Game Store.";


  contactWhatsApp.href =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(message)}`;

}


/* =========================================================
   TOAST / NOTIFICAÇÃO
   ========================================================= */

function showToast(message) {

  if (!toast) {
    return;
  }


  toast.textContent =
    message;


  toast.classList.add("show");


  if (toastTimer) {

    clearTimeout(toastTimer);

  }


  toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);
}


/* =========================================================
   VOLTAR PARA OS JOGOS
   ========================================================= */

function showGames() {

  currentGame = null;


  if (conteudos) {
    conteudos.style.display = "none";
  }


  if (jogos) {
    jogos.style.display = "";
  }


  if (productSearchInput) {
    productSearchInput.value = "";
  }
}


/* =========================================================
   EVENTOS
   ========================================================= */

function setupEvents() {

  /*
    Pesquisa dos produtos dentro do jogo
  */

  if (productSearchInput) {

    productSearchInput.addEventListener(
      "input",
      filterCurrentGame
    );

  }


  /*
    Fechar carrinho clicando no fundo
  */

  if (cartOverlay) {

    cartOverlay.addEventListener(
      "click",
      closeCartOutside
    );

  }


  /*
    Tecla ESC fecha o carrinho
  */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeCart();

      }

    }
  );

}


/* =========================================================
   ANO AUTOMÁTICO
   ========================================================= */

function setupYear() {

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

function initMZGameStore() {

  renderFeaturedProducts();

  setupWhatsAppContact();

  setupEvents();

  setupYear();

  updateCart();

}


/* =========================================================
   DISPONIBILIZAR FUNÇÕES PARA O HTML
   ========================================================= */

window.openGame =
  openGame;

window.renderProducts =
  renderProducts;

window.searchProducts =
  searchProducts;

window.filterCurrentGame =
  filterCurrentGame;

window.addToCart =
  addToCart;

window.removeFromCart =
  removeFromCart;

window.changeQuantity =
  changeQuantity;

window.openCart =
  openCart;

window.closeCart =
  closeCart;

window.closeCartOutside =
  closeCartOutside;

window.clearCart =
  clearCart;

window.checkoutWhatsApp =
  checkoutWhatsApp;

window.showToast =
  showToast;

window.showGames =
  showGames;


/* =========================================================
   INICIAR QUANDO O HTML ESTIVER PRONTO
   ========================================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initMZGameStore
  );

} else {

  initMZGameStore();

}
