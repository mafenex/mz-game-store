// ================================
// MZ GAME STORE
// ================================

const WHATSAPP_NUMBER = "258833255852";


// ================================
// PRODUTOS
// ================================

const products = [

  // PACKS
  {
    name: "Pack Básico",
    price: "100 MT",
    image: "images/pack.jpg",
    description: "Pack básico de recursos para jogos.",
    category: "Packs"
  },

  {
    name: "Pack Pro",
    price: "150 MT",
    image: "images/pack-pro.jpg",
    description: "Pack com recursos especiais.",
    category: "Packs"
  },

  {
    name: "Pack Premium",
    price: "250 MT",
    image: "images/pack-premium.jpg",
    description: "Pack premium com conteúdos selecionados.",
    category: "Packs"
  },

  {
    name: "Pack Ultimate",
    price: "350 MT",
    image: "images/pack-ultimate.jpg",
    description: "Pack completo para jogadores.",
    category: "Packs"
  },


  // FC MOBILE
  {
    name: "FC Mobile Pack",
    price: "150 MT",
    image: "images/fc-mobile.jpg",
    description: "Recursos para FC Mobile.",
    category: "FC Mobile"
  },

  {
    name: "FC Mobile Premium",
    price: "300 MT",
    image: "images/fc-mobile-premium.jpg",
    description: "Conteúdo premium para FC Mobile.",
    category: "FC Mobile"
  },


  // PASSE DE ESTRELAS
  {
    name: "Passe de Estrelas",
    price: "250 MT",
    image: "images/passe-estrelas.jpg",
    description: "Passe de Estrelas para a tua conta.",
    category: "Passe de Estrelas"
  },

  {
    name: "Passe de Estrelas Premium",
    price: "400 MT",
    image: "images/passe-estrelas-premium.jpg",
    description: "Versão premium do Passe de Estrelas.",
    category: "Passe de Estrelas"
  },


  // GIFT CARDS
  {
    name: "Gift Card 10$",
    price: "700 MT",
    image: "images/gift-card-10.jpg",
    description: "Gift Card de 10 dólares.",
    category: "Gift Cards"
  },

  {
    name: "Gift Card 20$",
    price: "1.400 MT",
    image: "images/gift-card-20.jpg",
    description: "Gift Card de 20 dólares.",
    category: "Gift Cards"
  }

];


// ================================
// WHATSAPP
// ================================

function whatsappLink(product) {

  const message =
    `Olá! Quero comprar: ${product.name}. ` +
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
        💬 Comprar
      </a>

    </div>

  `;

  grid.appendChild(card);

});


// ================================
// CONTACTO WHATSAPP
// ================================

const contactWhatsApp =
  document.getElementById("contactWhatsApp");

const contactMessage =
  "Olá! Preciso de ajuda com a MZ Game Store.";

contactWhatsApp.href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`;


// ================================
// ANO
// ================================

document.getElementById("year").textContent =
  new Date().getFullYear();
