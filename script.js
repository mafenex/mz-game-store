// ================================
// MZ GAME STORE
// ================================

// Coloca aqui o teu número do WhatsApp.
// Exemplo: 25884XXXXXXX
const WHATSAPP_NUMBER = "258840000000";


// ================================
// PRODUTOS
// ================================

const products = [
  {
    name: "Pack de Recursos",
    price: "100 MT",
    image: "images/pack.jpg",
    description: "Pack de recursos para melhorar a tua experiência de jogo."
  },

  {
    name: "FC Mobile Pack",
    price: "150 MT",
    image: "images/fc-mobile.jpg",
    description: "Recursos e conteúdo para jogadores de FC Mobile."
  },

  {
    name: "Pack Premium",
    price: "250 MT",
    image: "images/pack-premium.jpg",
    description: "Pack premium com recursos selecionados."
  }
];


// ================================
// WHATSAPP
// ================================

function whatsappLink(product) {

  const message =
    `Olá! Quero comprar o produto: ${product.name}. ` +
    `Preço: ${product.price}.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}


// ================================
// MOSTRAR PRODUTOS
// ================================

const grid = document.getElementById("productGrid");

products.forEach(product => {

  const card = document.createElement("article");

  card.className = "card";

  card.innerHTML = `
    <img
      src="${product.image}"
      alt="${product.name}"
    >

    <div class="card-body">

      <h3>${product.name}</h3>

      <p>${product.description}</p>

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

  grid.appendChild(card);

});


// ================================
// BOTÃO DE CONTACTO
// ================================

const contactWhatsApp =
  document.getElementById("contactWhatsApp");

const contactMessage =
  "Olá! Preciso de ajuda com a MZ Game Store.";

contactWhatsApp.href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`;


// ================================
// ANO AUTOMÁTICO
// ================================

document.getElementById("year").textContent =
  new Date().getFullYear();
