/* DADOS DOS PRODUTOS */
const storeProducts = {
  lancamentos: [
    {
      id: 1,
      artist: "",
      name: "",
      price: 289.90,
      installments: "ou 12x de R$ 24,15",
      badge: "Pré-venda",
      image: ""
    },
    {
      id: 2,
      artist: "",
      name: "",
      price: 299.90,
      installments: "ou 12x de R$ 24,99",
      badge: "Pré-venda",
      image: ""
    },
    {
      id: 3,
      artist: "Olivia Rodrigo",
      name: "You Seem Pretty Sad for a Girl So in Love (LP/Vinil)",
      price: 369.90,
      installments: "ou 12x de R$ 30,82",
      badge: "Importado",
      image: ""
    }
  ],

  promocoes: [
    {
      id: 4,
      artist: "",
      name: "",
      price: 125.94,
      oldPrice: 209.90,
      installments: "ou 12x de R$ 10,49",
      badge: "40% OFF",
      image: ""
    },
    {
      id: 5,
      artist: "",
      name: "",
      price: 244.93,
      oldPrice: 349.90,
      installments: "ou 12x de R$ 20,41",
      badge: "30% OFF",
      image: ""
    },
    {
      id: 6,
      artist: "",
      name: "",
      price: 399.95,
      oldPrice: 799.90,
      installments: "ou 12x de R$ 33,32",
      badge: "50% OFF",
      image: ""
    }
  ],

  maisVendidos: [
    {
      id: 7,
      artist: "Ariana Grande",
      name: "Petal (LP/Vinil)",
      price: 400.90,
      installments: "ou 12x de R$ 33,40",
      badge: "Pré-venda",
      image: ""
    },
    {
      id: 8,
      artist: "Vários Artistas",
      name: "",
      price: 229.90,
      installments: "ou 12x de R$ 19,15",
      badge: "Pré-venda",
      image: ""
    },
    {
      id: 9,
      artist: "BTS",
      name: "CD BTS - The 5th Muster Magic Shop (Living Legend)",
      price: 284.90,
      installments: "ou 12x de R$ 23,74",
      badge: "Importado",
      image: ""
    }
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

/* CARD DE PRODUTO */
function createProductCard(product) {
  return `
    <article class="product-card">
      <span class="product-card__badge">${product.badge || "Novo"}</span>

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

/* RENDERIZAÇÃO DOS PRODUTOS */
function renderProducts() {
  const sections = [
    ["gridLancamentos", storeProducts.lancamentos],
    ["gridPromocoes", storeProducts.promocoes],
    ["gridMaisVendidos", storeProducts.maisVendidos]
  ];

  sections.forEach(([gridId, productList]) => {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = productList.map(createProductCard).join("");
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