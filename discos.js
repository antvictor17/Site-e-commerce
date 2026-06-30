/* DADOS DOS PRODUTOS */
const storeProducts = {
  lancamentos: [
    {
      id: 1,
      artist: "Kid Abelha",
      name: "Vinil - Acústico (2LP)",
      price: 244.90,
      installments: "ou 12x de R$ 20,41",
      badge: "Nacional",
      image: "imagem/Kid_Abelha.png"
    },
    {
      id: 2,
      artist: "Bruno Mars",
      name: "Vinil - The Romantic",
      price: 344.90,
      installments: "ou 12x de R$ 28,75",
      badge: "Pré-venda/Importado",
      image: "imagem/Bruno_Mars-the_romantic.png"
    },
    {
      id: 3,
      artist: "Olivia Rodrigo",
      name: "Vinil - You Seem Pretty Sad for a Girl So in Love (LP)",
      price: 269.90,
      installments: "ou 12x de R$ 22,50",
      badge: "Pré-venda/Importado",
      image: "imagem/Olivia_Rodrigo-You_Seem_Pretty_Sad_for_a_Girl_So_in_Love.png"
    },
    {
      id: 10,
      artist: "Anitta",
      name: "Camiseta - EQUILIBRIVM FLOWERS",
      price: 140.00,
      installments: "ou 12x de R$ 11,67",
      badge: "Nacional",
      image: "imagem/Anitta.png"
    },
    {
      id: 11,
      artist: "Queen",
      name: "Cassete Queen II",
      price: 189.90,
      installments: "ou 12x de R$ 15,83",
      badge: "Importado",
      image: "imagem/Queen-k7.png"
    },
    {
      id: 12,
      artist: "Laufey",
      name: "Vinil - A Matter of Time: Live at Madison Square Garden (VERMELHO)",
      price: 240.00,
      installments: "ou 12x de R$ 20,00",
      badge: "Importado",
      image: "imagem/Laufey.png"
    }
  ],

  promocoes: [
    {
      id: 4,
      artist: "Jão",
      name: "Vinil - Pirata (VERMELHO)",
      price: 209.00,
      oldPrice: 250.00,
      installments: "ou 12x de R$ 17,50",
      badge: "Nacional",
      image: "imagem/Jao_Pirata.png"
    },
    {
      id: 5,
      artist: "Chappell Roan",
      name: "Vinil - The Rise and Fall of a Midwest Princess (2LP)",
      price: 240.00,
      oldPrice: 299.90,
      installments: "ou 12x de R$ 20",
      badge: "Importado",
      image: "imagem/Chappell_Roan.png"
    },
    {
      id: 6,
      artist: "Venom",
      name: "CD - Into Oblivion",
      price: 369.00,
      oldPrice: 399.95,
      installments: "ou 12x de R$ 30,75",
      badge: "Importado",
      image: "imagem/Venom.png"
    },
    {
      id: 13,
      artist: "Tyler The Creator",
      name: "Camiseta Call Me If You Get Lost",
      price: 85.20,
      oldPrice: 104.90,
      installments: "ou 12x de R$ 7,10",
      badge: "Importado",
      image: "imagem/Tyler_The_Creator.png"
    },
  ],

  maisVendidos: [
    {
      id: 7,
      artist: "Ariana Grande",
      name: "Vinil - Petal",
      price: 279.90,
      installments: "ou 12x de R$ 23,35",
      badge: "Pré-venda/Importado",
      image: "imagem/Ariana_Grande-Petal.png"
    },
    {
      id: 8,
      artist: "Cartola",
      name: "Vinil - CARTOLA 1976",
      price: 229.90,
      installments: "ou 12x de R$ 19,15",
      badge: "Nacional",
      image: "imagem/Cartola.png"
    },
    {
      id: 9,
      artist: "BTS",
      name: "CD BTS - The 5th Muster Magic Shop (Living Legend)",
      price: 520.00,
      installments: "ou 12x de R$ 43,35",
      badge: "Importado",
      image: "imagem/BTS.png"
    },
    {
      id: 16,
      artist: "Gal Costa",
      name: "Vinil - Série Clássicos (LP)",
      price: 261.00,
      installments: "ou 12x de R$ 21,75",
      badge: "Nacional",
      image: "imagem/Gal_Costa.png"
    },
    {
      id: 17,
      artist: "Taylor Swift",
      name: "Vinil ",
      price: 449.90,
      installments: "ou 12x de R$ 37,50",
      badge: "Importado",
      image: "imagem/Taylor-Swift.png"
    },
  ]
};

/* ESTADO DO CARRINHO */
const cartState = {
  items: []
};

/* FUNÇÕES UTILITÁRIAS */
function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* SLIDER / CARROSSEL */
class Slider {
  constructor(selector, interval = 5000) {
    this.root = document.querySelector(selector);
    if (!this.root) return;

    this.slides = [...this.root.querySelectorAll(".hero-slide, .banner-slide")];
    this.prevBtn = this.root.querySelector(".prev");
    this.nextBtn = this.root.querySelector(".next");
    this.dotsWrap = this.root.querySelector(".slider-dots");
    this.index = 0;
    this.interval = interval;
    this.timer = null;

    this.createDots();
    this.bindEvents();
    this.show(0);
    this.start();
  }

  createDots() {
    if (!this.dotsWrap) return;

    this.dotsWrap.innerHTML = "";

    this.dots = this.slides.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir para o slide ${i + 1}`);

      dot.addEventListener("click", () => {
        this.show(i);
        this.restart();
      });

      this.dotsWrap.appendChild(dot);
      return dot;
    });
  }

  bindEvents() {
    this.prevBtn?.addEventListener("click", () => {
      this.show(this.index - 1);
      this.restart();
    });

    this.nextBtn?.addEventListener("click", () => {
      this.show(this.index + 1);
      this.restart();
    });

    this.root.addEventListener("mouseenter", () => this.stop());
    this.root.addEventListener("mouseleave", () => this.start());

    let startX = 0;

    this.root.addEventListener("touchstart", (e) => {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });

    this.root.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const delta = endX - startX;

      if (Math.abs(delta) > 40) {
        if (delta > 0) {
          this.show(this.index - 1);
        } else {
          this.show(this.index + 1);
        }
        this.restart();
      }
    }, { passive: true });
  }

  show(i) {
    if (!this.slides.length) return;

    this.index = (i + this.slides.length) % this.slides.length;

    this.slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === this.index);
    });

    if (this.dots) {
      this.dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === this.index);
      });
    }
  }

  start() {
    this.stop();
    this.timer = setInterval(() => {
      this.show(this.index + 1);
    }, this.interval);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
  }

  restart() {
    this.start();
  }
}

/* BADGE: detecta tipo pelo conteúdo e aplica classe de cor */
function badgeClass(badge = "") {
  const b = badge.toLowerCase();
  if (b.includes("off") || b.includes("%")) return "product-card__badge--off";
  if (b.includes("nacional"))               return "product-card__badge--nacional";
  if (b.includes("importado"))              return "product-card__badge--importado";
  if (b.includes("pré-venda"))              return "product-card__badge--prevenda";
  return "product-card__badge--novo";
}

/* CARD DE PRODUTO */
function createProductCard(product) {
  const bClass = badgeClass(product.badge);
  return `
    <article class="product-card">
      <span class="product-card__badge ${bClass}">${product.badge || "Novo"}</span>

      <button class="product-card__wish" type="button" aria-label="Favoritar produto">
        ♡
      </button>

      <img
        class="product-card__image"
        src="${product.image}"
        alt="${product.name}"
      >

      <h3 class="product-card__artist">${product.artist}</h3>
      <p class="product-card__name">${product.name}</p>

      <div class="product-card__price">
        ${
          product.oldPrice
            ? `<span class="product-card__old">${formatPrice(product.oldPrice)}</span>`
            : ""
        }

        <strong class="product-card__current">${formatPrice(product.price)}</strong>
        <span class="product-card__installments">${product.installments || ""}</span>
      </div>

      <div class="product-card__actions">
        <button class="btn btn-primary add-cart-btn" data-id="${product.id}" type="button">
          Adicionar ao Carrinho
        </button>
        <button class="product-card__quick" type="button" title="Visualização rápida">+</button>
      </div>
    </article>
  `;
}

/* CARROSSEL DE PRODUTOS */
class ProductCarousel {
  constructor(wrapperId, products) {
    this.wrapper = document.getElementById(wrapperId);
    if (!this.wrapper) return;

    this.products = products;
    this.index = 0;

    // Quantos cards cabem na tela
    this.getVisible = () => {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640)  return 2;
      return 1;
    };

    this.build();
    window.addEventListener("resize", () => this.updateArrows());
  }

  build() {
    // Cria estrutura: wrapper → track + setas
    this.wrapper.classList.add("product-carousel");
    // Zera inline o display:grid que vem do .product-grid no style.css
    this.wrapper.style.display = "block";
    this.wrapper.style.overflow = "hidden";
    this.wrapper.innerHTML = "";

    // Seta esquerda
    this.prevBtn = document.createElement("button");
    this.prevBtn.className = "carousel-arrow carousel-arrow--prev";
    this.prevBtn.innerHTML = "&#8249;";
    this.prevBtn.setAttribute("aria-label", "Anterior");
    this.prevBtn.addEventListener("click", () => this.move(-1));
    this.wrapper.appendChild(this.prevBtn);

    // Track com os cards
    this.track = document.createElement("div");
    this.track.className = "carousel-track";
    this.track.innerHTML = this.products.map(createProductCard).join("");
    this.wrapper.appendChild(this.track);

    // Seta direita
    this.nextBtn = document.createElement("button");
    this.nextBtn.className = "carousel-arrow carousel-arrow--next";
    this.nextBtn.innerHTML = "&#8250;";
    this.nextBtn.setAttribute("aria-label", "Próximo");
    this.nextBtn.addEventListener("click", () => this.move(1));
    this.wrapper.appendChild(this.nextBtn);

    // Dots de paginação
    this.dotsWrap = document.createElement("div");
    this.dotsWrap.className = "carousel-dots";
    this.wrapper.appendChild(this.dotsWrap);

    this.updateView();
    this.setupSwipe();
  }

  totalPages() {
    return Math.ceil(this.products.length / this.getVisible());
  }

  move(dir) {
    const pages = this.totalPages();
    this.index = (this.index + dir + pages) % pages;
    this.updateView();
  }

  updateView() {
    const visible = this.getVisible();
    const offset = this.index * (100 / visible);

    // Desloca o track
    this.track.style.transform = `translateX(-${offset}%)`;

    // Recria os dots conforme número de páginas
    const pages = this.totalPages();
    this.dotsWrap.innerHTML = "";
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === this.index ? " active" : "");
      dot.setAttribute("aria-label", `Página ${i + 1}`);
      dot.addEventListener("click", () => { this.index = i; this.updateView(); });
      this.dotsWrap.appendChild(dot);
    }

    this.updateArrows();
  }

  updateArrows() {
    // Oculta seta esquerda na primeira página, direita na última
    this.prevBtn.style.opacity = this.index === 0 ? "0.3" : "1";
    this.prevBtn.style.pointerEvents = this.index === 0 ? "none" : "auto";
    const last = this.totalPages() - 1;
    this.nextBtn.style.opacity = this.index === last ? "0.3" : "1";
    this.nextBtn.style.pointerEvents = this.index === last ? "none" : "auto";
  }

  setupSwipe() {
    let startX = 0;
    this.track.addEventListener("touchstart", e => {
      startX = e.changedTouches[0].clientX;
    }, { passive: true });
    this.track.addEventListener("touchend", e => {
      const delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 40) this.move(delta > 0 ? -1 : 1);
    }, { passive: true });
  }
}

/* RENDERIZAÇÃO DOS PRODUTOS */
function renderProducts() {
  const sections = [
    ["gridLancamentos", storeProducts.lancamentos],
    ["gridPromocoes", storeProducts.promocoes],
    ["gridMaisVendidos", storeProducts.maisVendidos]
  ];

  sections.forEach(([gridId, productList]) => {
    new ProductCarousel(gridId, productList);
  });
}

/* CARRINHO */
function addToCart(product) {
  const existingProduct = cartState.items.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.qty += 1;
  } else {
    cartState.items.push({
      ...product,
      qty: 1
    });
  }

  renderCart();
}

function removeFromCart(productId) {
  cartState.items = cartState.items.filter(item => item.id !== productId);
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cartList");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartList || !cartCount || !cartTotal) return;

  const items = cartState.items;

  cartCount.textContent = items.reduce((total, item) => total + item.qty, 0);

  if (!items.length) {
    cartList.innerHTML = `<p class="cart-empty">Seu carrinho está vazio.</p>`;
    cartTotal.textContent = "R$ 0,00";
    return;
  }

  cartList.innerHTML = items.map(item => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.artist}</h4>
        <p>${item.name}</p>
        <strong>${formatPrice(item.price)} x ${item.qty}</strong>
      </div>
      <button type="button" onclick="removeFromCart(${item.id})">Remover</button>
    </article>
  `).join("");

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = formatPrice(total);
}

/* MENU MOBILE E DRAWERS */
function setupDrawers() {
  const body = document.body;
  const overlay = document.getElementById("overlay");
  const mobileMenu = document.getElementById("mobileMenu");
  const cartDrawer = document.getElementById("cartDrawer");

  const openMenu = () => {
    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("menu-open");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("active");

    if (!cartDrawer.classList.contains("active")) {
      overlay.classList.remove("active");
    }

    body.classList.remove("menu-open");
  };

  const openCart = () => {
    cartDrawer.classList.add("active");
    overlay.classList.add("active");
    body.classList.add("cart-open");
  };

  const closeCart = () => {
    cartDrawer.classList.remove("active");

    if (!mobileMenu.classList.contains("active")) {
      overlay.classList.remove("active");
    }

    body.classList.remove("cart-open");
  };

  document.getElementById("openMenu")?.addEventListener("click", openMenu);
  document.getElementById("closeMenu")?.addEventListener("click", closeMenu);
  document.getElementById("openCart")?.addEventListener("click", openCart);
  document.getElementById("closeCart")?.addEventListener("click", closeCart);

  overlay?.addEventListener("click", () => {
    closeMenu();
    closeCart();
  });

  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

/* BOTÃO ADICIONAR AO CARRINHO */
function setupAddToCart() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".add-cart-btn");
    if (!button) return;

    const productId = Number(button.dataset.id);

    const allProducts = [
      ...storeProducts.lancamentos,
      ...storeProducts.promocoes,
      ...storeProducts.maisVendidos
    ];

    const product = allProducts.find(item => item.id === productId);
    if (!product) return;

    addToCart(product);

    document.getElementById("cartDrawer")?.classList.add("active");
    document.getElementById("overlay")?.classList.add("active");
    document.body.classList.add("cart-open");
  });
}

/* Clube da Loja */
function setupNewsletter() {
  const form = document.getElementById("newsletterForm");
  const input = document.getElementById("email");

  if (!form || !input) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!input.value.trim()) {
      alert("Digite seu e-mail para receber o cupom.");
      input.focus();
      return;
    }

    alert("Cupom solicitado com sucesso!");
    input.value = "";
  });
}

/*INICIALIZAÇÃO DA PÁGINA*/
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  setupDrawers();
  setupAddToCart();
  setupNewsletter();

  new Slider("#heroSlider", 6000);
  new Slider("#bannerLancamentos", 4500);
  new Slider("#bannerPromocoes", 4500);
  new Slider("#bannerMaisVendidos", 4500);
});