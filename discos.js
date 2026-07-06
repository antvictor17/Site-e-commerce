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
  const authModal = document.getElementById("authModal");

  const syncOverlay = () => {
    const anyOpen = mobileMenu?.classList.contains("active") || cartDrawer?.classList.contains("active") || authModal?.classList.contains("active");
    overlay.classList.toggle("active", anyOpen);
  };

  const openMenu = () => {
    mobileMenu.classList.add("active");
    body.classList.add("menu-open");
    syncOverlay();
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    body.classList.remove("menu-open");
    syncOverlay();
  };

  const openCart = () => {
    cartDrawer.classList.add("active");
    body.classList.add("cart-open");
    syncOverlay();
  };

  const closeCart = () => {
    cartDrawer.classList.remove("active");
    body.classList.remove("cart-open");
    syncOverlay();
  };

  document.getElementById("openMenu")?.addEventListener("click", openMenu);
  document.getElementById("closeMenu")?.addEventListener("click", closeMenu);
  document.getElementById("openCart")?.addEventListener("click", openCart);
  document.getElementById("closeCart")?.addEventListener("click", closeCart);
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    closeCart();
    openAccountModal({ showPayment: true });
  });

  overlay?.addEventListener("click", () => {
    closeMenu();
    closeCart();
    closeAccountModal();
  });

  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

/* LOGIN DA CONTA */
let checkoutRequested = false;

const authDemoCredentials = {
  email: "cliente@vinyl.com",
  password: "123456",
  name: "Cliente"
};

function getStoredAccount() {
  try {
    return JSON.parse(localStorage.getItem("vinyl-account"));
  } catch {
    return null;
  }
}

function saveAccount(user) {
  localStorage.setItem("vinyl-account", JSON.stringify(user));
}

function clearAccount() {
  localStorage.removeItem("vinyl-account");
}

function getStoredUsers() {
  try {
    const users = JSON.parse(localStorage.getItem("vinyl-users"));
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem("vinyl-users", JSON.stringify(users));
}

function findUserByEmail(email) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  return getStoredUsers().find((user) => user.email?.toLowerCase() === normalizedEmail) || null;
}

function authenticateUser(email, password) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const demoMatch = authDemoCredentials.email === normalizedEmail && authDemoCredentials.password === password;

  if (demoMatch) {
    return {
      name: authDemoCredentials.name,
      email: normalizedEmail,
      password,
      cep: "01000000"
    };
  }

  const storedUser = findUserByEmail(normalizedEmail);

  if (storedUser && storedUser.password === password) {
    return {
      ...storedUser,
      email: normalizedEmail
    };
  }

  return null;
}

function registerUser({ name, email, password, cep }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const normalizedName = String(name || "").trim();
  const normalizedCep = normalizeCep(cep);

  if (!normalizedName || !normalizedEmail || !password || !normalizedCep) {
    return { ok: false, message: "Preencha todos os campos para criar a conta." };
  }

  if (normalizedCep.length !== 8) {
    return { ok: false, message: "Informe um CEP válido com 8 dígitos." };
  }

  if (findUserByEmail(normalizedEmail)) {
    return { ok: false, message: "Este e-mail já está cadastrado." };
  }

  const user = {
    name: normalizedName,
    email: normalizedEmail,
    password,
    cep: normalizedCep
  };

  const users = getStoredUsers();
  users.push(user);
  saveUsers(users);
  saveAccount(user);

  return { ok: true, user };
}

function updateAccountButton(user) {
  const button = document.getElementById("openAccount");
  if (!button) return;

  if (user) {
    button.setAttribute("aria-label", `Minha conta · ${user.name}`);
    button.setAttribute("title", `Olá, ${user.name}`);
    button.textContent = "✅";
  } else {
    button.setAttribute("aria-label", "Minha conta");
    button.setAttribute("title", "Minha conta");
    button.textContent = "👤";
  }
}

function showPaymentPreview(show = true) {
  const preview = document.getElementById("paymentPreview");
  preview?.classList.toggle("is-hidden", !show);
  if (show) {
    updatePaymentSummary();
  }
}

function switchModalView(view) {
  const accountSection = document.getElementById("accountSection");
  const checkoutSection = document.getElementById("checkoutSection");

  if (!accountSection || !checkoutSection) return;

  const isPayment = view === "payment";
  accountSection.classList.toggle("is-hidden", isPayment);
  checkoutSection.classList.toggle("is-hidden", !isPayment);
}

function updatePaymentSummary() {
  const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const subtotalEl = document.getElementById("paymentSubtotal");
  const freightEl = document.getElementById("paymentFreight");
  const totalEl = document.getElementById("paymentTotal");
  const currentUser = getStoredAccount();

  if (!subtotalEl || !freightEl || !totalEl) return;

  const freight = calculateFreight(currentUser?.cep || "");
  const total = subtotal + freight;

  subtotalEl.textContent = formatPrice(subtotal);
  freightEl.textContent = formatPrice(freight);
  totalEl.textContent = formatPrice(total);
}

function updateAccountModalView({ showPayment = false, isLoggedIn = false } = {}) {
  const form = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const title = document.getElementById("authTitle");
  const subtitle = document.getElementById("authSubtitle");
  const status = document.getElementById("authStatus");
  const loginToggle = document.getElementById("showLoginBtn");
  const registerToggle = document.getElementById("showRegisterBtn");

  if (!form || !registerForm || !logoutBtn || !title || !subtitle || !status) return;

  const shouldShowPayment = showPayment && isLoggedIn;

  if (isLoggedIn) {
    const currentUser = getStoredAccount();

    title.textContent = shouldShowPayment ? "Pagamento" : "Sua conta";
    subtitle.textContent = shouldShowPayment
      ? "Escolha a forma de pagamento abaixo."
      : `Olá, ${currentUser?.name || "Cliente"}! Você já está conectado.`;
    form.classList.add("is-hidden");
    registerForm.classList.add("is-hidden");
    logoutBtn.classList.remove("is-hidden");
    showPaymentPreview(shouldShowPayment);
    status.textContent = shouldShowPayment
      ? "Escolha a forma de pagamento abaixo."
      : "Acesse seus pedidos e novidades com facilidade.";
  } else {
    title.textContent = "Entrar na sua conta";
    subtitle.textContent = showPayment
      ? "Faça login ou cadastre-se para continuar para o pagamento."
      : "Use o e-mail e senha abaixo para acessar.";
    form.classList.remove("is-hidden");
    registerForm.classList.add("is-hidden");
    logoutBtn.classList.add("is-hidden");
    loginToggle?.classList.add("is-active");
    registerToggle?.classList.remove("is-active");
    showPaymentPreview(false);
    status.textContent = showPayment
      ? "Faça login ou cadastre-se para concluir o pagamento."
      : "Credenciais demo: cliente@vinyl.com / 123456";
  }

  switchModalView(shouldShowPayment ? "payment" : "account");
}

function openAccountModal({ showPayment = false } = {}) {
  const modal = document.getElementById("authModal");
  const overlay = document.getElementById("overlay");

  if (!modal || !overlay) return;

  checkoutRequested = showPayment;
  const currentUser = getStoredAccount();

  updateAccountModalView({ showPayment, isLoggedIn: Boolean(currentUser) });

  modal.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("auth-open");
  document.getElementById("loginEmail")?.focus();
}

function closeAccountModal() {
  const modal = document.getElementById("authModal");
  const overlay = document.getElementById("overlay");
  const mobileMenu = document.getElementById("mobileMenu");
  const cartDrawer = document.getElementById("cartDrawer");

  if (!modal || !overlay) return;

  modal.classList.remove("active");
  document.body.classList.remove("auth-open");
  checkoutRequested = false;

  if (!mobileMenu?.classList.contains("active") && !cartDrawer?.classList.contains("active")) {
    overlay.classList.remove("active");
  }
}

function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const status = document.getElementById("authStatus");

  if (!emailInput || !passwordInput || !status) return;

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    status.textContent = "Digite seu e-mail e senha para continuar.";
    status.classList.remove("is-success");
    return;
  }

  const user = authenticateUser(email, password);

  if (user) {
    saveAccount(user);
    updateAccountButton(user);
    updateAccountModalView({ showPayment: checkoutRequested, isLoggedIn: true });
    status.textContent = `Bem-vindo, ${user.name}! Login realizado com sucesso.`;
    status.classList.add("is-success");
    emailInput.value = "";
    passwordInput.value = "";
  } else {
    status.textContent = "E-mail ou senha inválidos. Tente novamente.";
    status.classList.remove("is-success");
  }
}

function handleRegister(event) {
  event.preventDefault();

  const nameInput = document.getElementById("registerName");
  const emailInput = document.getElementById("registerEmail");
  const passwordInput = document.getElementById("registerPassword");
  const cepInput = document.getElementById("registerCep");
  const status = document.getElementById("authStatus");

  if (!nameInput || !emailInput || !passwordInput || !cepInput || !status) return;

  const result = registerUser({
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    cep: cepInput.value
  });

  if (!result.ok) {
    status.textContent = result.message;
    status.classList.remove("is-success");
    return;
  }

  updateAccountButton(result.user);
  updateAccountModalView({ showPayment: checkoutRequested, isLoggedIn: true });
  status.textContent = `Cadastro finalizado com sucesso! ${result.user.name} já está cadastrado e logado.`;
  status.classList.add("is-success");
  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
  cepInput.value = "";
}

function handleLogout() {
  clearAccount();
  updateAccountButton(null);
  checkoutRequested = false;
  updateAccountModalView({ showPayment: false, isLoggedIn: false });
}

function setupAccountModal() {
  const openAccountButton = document.getElementById("openAccount");
  const closeButton = document.getElementById("closeAuth");
  const form = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const goToPaymentBtn = document.getElementById("goToPaymentBtn");
  const loginToggle = document.getElementById("showLoginBtn");
  const registerToggle = document.getElementById("showRegisterBtn");

  updateAccountButton(getStoredAccount());

  openAccountButton?.addEventListener("click", () => {
    openAccountModal();
  });

  closeButton?.addEventListener("click", closeAccountModal);
  form?.addEventListener("submit", handleLogin);
  registerForm?.addEventListener("submit", handleRegister);
  logoutBtn?.addEventListener("click", handleLogout);
  loginToggle?.addEventListener("click", () => {
    form?.classList.remove("is-hidden");
    registerForm?.classList.add("is-hidden");
    loginToggle.classList.add("is-active");
    registerToggle?.classList.remove("is-active");
  });
  registerToggle?.addEventListener("click", () => {
    form?.classList.add("is-hidden");
    registerForm?.classList.remove("is-hidden");
    registerToggle.classList.add("is-active");
    loginToggle?.classList.remove("is-active");
  });
  goToPaymentBtn?.addEventListener("click", () => {
    const currentUser = getStoredAccount();
    checkoutRequested = true;
    updateAccountModalView({ showPayment: true, isLoggedIn: Boolean(currentUser) });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAccountModal();
    }
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
  setupAccountModal();
  setupAddToCart();
  setupNewsletter();

  new Slider("#heroSlider", 6000);
  new Slider("#bannerLancamentos", 4500);
  new Slider("#bannerPromocoes", 4500);
  new Slider("#bannerMaisVendidos", 4500);
});