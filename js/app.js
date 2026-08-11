(() => {
  "use strict";

  const categories = [
    "helados",
    "especiales",
    "fruteria",
    "cafeteria",
    "granizados",
    "sandwiches",
    "panaderia",
    "extras"
  ];

  const imageFolders = {
    helados: "helados",
    especiales: "especiales",
    fruteria: "fruteria",
    cafeteria: "cafeteria",
    granizados: "granizados",
    sandwiches: "sandwiches",
    panaderia: "panaderia",
    extras: "extras"
  };

  const state = {
    category: "helados",
    featuredOnly: false,
    query: "",
    lastTrigger: null
  };

  const topBar = document.getElementById("topBar");
  const navLinks = [...document.querySelectorAll(".nav-btn")];
  const sections = [...document.querySelectorAll(".section")];
  const searchInput = document.getElementById("menuSearch");
  const clearSearch = document.getElementById("clearSearch");
  const featuredFilter = document.getElementById("featuredFilter");
  const searchSummary = document.getElementById("searchSummary");
  const emptyState = document.getElementById("emptyState");
  const resetFilters = document.getElementById("resetFilters");
  const backToTop = document.getElementById("backToTop");
  const productModal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");
  const modalVisual = document.getElementById("modalVisual");
  const modalIcon = document.getElementById("modalIcon");
  const modalImage = document.getElementById("modalImage");
  const modalBadge = document.getElementById("modalBadge");
  const modalProductName = document.getElementById("modalProductName");
  const modalProductDescription = document.getElementById("modalProductDescription");
  const modalProductPrice = document.getElementById("modalProductPrice");
  const brandLogo = document.getElementById("brandLogo");

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");

  const slugify = (value) => normalize(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const currentSection = () => document.getElementById(state.category);

  function getImagePath(category, name, sourceCard) {
    const specifiedImage = sourceCard.dataset.image;
    if (specifiedImage) return specifiedImage;

    const folder = imageFolders[category] || category;
    return `assets/products/${folder}/${slugify(name)}.png`;
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function prepareProductCards() {
    sections.forEach((section) => {
      const category = section.dataset.category;
      const navigation = navLinks.find((link) => link.dataset.category === category);
      if (navigation) {
        navigation.id = `tab-${category}`;
        section.setAttribute("role", "tabpanel");
        section.setAttribute("aria-labelledby", navigation.id);
      }
      const cards = [...section.querySelectorAll(".card")];

      cards.forEach((sourceCard) => {
        const name = sourceCard.querySelector(".card-name")?.textContent.trim() || "Producto";
        const description = sourceCard.querySelector(".card-desc")?.textContent.trim() || "";
        const price = sourceCard.querySelector(".card-price")?.textContent.trim() || "";
        const badge = sourceCard.querySelector(".card-badge")?.textContent.trim() || "";
        const icon = sourceCard.querySelector(".card-icon")?.textContent.trim() || "🍨";
        const imagePath = getImagePath(category, name, sourceCard);

        const card = createElement("article", "card");
        card.dataset.category = category;
        card.dataset.name = name;
        card.dataset.description = description;
        card.dataset.price = price;
        card.dataset.badge = badge;
        card.dataset.icon = icon;
        card.dataset.image = imagePath;
        card.dataset.search = normalize(`${name} ${description}`);
        if (badge) card.classList.add("has-badge");

        const trigger = createElement("button", "card-trigger");
        trigger.type = "button";
        trigger.setAttribute("aria-label", `Ver detalle de ${name}`);

        const visual = createElement("span", "card-visual");
        const iconElement = createElement("span", "card-icon", icon);
        iconElement.setAttribute("aria-hidden", "true");
        const image = document.createElement("img");
        image.className = "card-image";
        image.alt = `Foto de ${name}`;
        image.loading = "lazy";
        image.hidden = true;
        image.dataset.src = imagePath;
        image.addEventListener("load", () => {
          image.hidden = false;
          card.classList.add("has-image");
        });
        image.addEventListener("error", () => {
          image.hidden = true;
          image.removeAttribute("src");
          card.classList.remove("has-image");
        });
        visual.append(iconElement, image);

        const body = createElement("span", "card-body");
        body.append(
          createElement("span", "card-name", name),
          createElement("span", "card-desc", description)
        );

        const side = createElement("span", "card-side");
        if (badge) side.append(createElement("span", "card-badge", badge));
        side.append(createElement("span", "card-price", price));

        trigger.append(visual, body, side);
        trigger.addEventListener("click", () => openProductModal(card, trigger));
        card.append(trigger);
        sourceCard.replaceWith(card);
      });
    });
  }

  function loadImages(section) {
    if (!section) return;

    section.querySelectorAll(".card-image[data-src]").forEach((image) => {
      if (!image.dataset.loaded) {
        image.dataset.loaded = "true";
        image.src = image.dataset.src;
      }
    });
  }

  function setActiveCategory(category) {
    const nextCategory = categories.includes(category) ? category : "helados";
    state.category = nextCategory;

    sections.forEach((section) => {
      const isActive = section.id === nextCategory;
      section.classList.toggle("active", isActive);
      section.setAttribute("aria-hidden", String(!isActive));
    });

    navLinks.forEach((link) => {
      const isActive = link.dataset.category === nextCategory;
      link.classList.toggle("active", isActive);
      link.setAttribute("aria-selected", String(isActive));
      if (isActive) {
        link.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      }
    });

    loadImages(currentSection());
    applyFilters();
  }

  function updateCategoryFromHash() {
    const requestedCategory = window.location.hash.replace("#", "");
    setActiveCategory(categories.includes(requestedCategory) ? requestedCategory : "helados");
  }

  function applyFilters() {
    const section = currentSection();
    if (!section) return;

    let visibleCount = 0;
    const cards = [...section.querySelectorAll(".card")];
    cards.forEach((card) => {
      const matchesQuery = !state.query || card.dataset.search.includes(state.query);
      const matchesFeatured = !state.featuredOnly || card.classList.contains("has-badge");
      const isVisible = matchesQuery && matchesFeatured;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    let hasVisibleCardAfterDivider = false;
    [...section.querySelector(".products").children].reverse().forEach((element) => {
      if (element.classList.contains("card")) {
        if (!element.hidden) hasVisibleCardAfterDivider = true;
        return;
      }

      if (element.classList.contains("cat-divider")) {
        element.hidden = !hasVisibleCardAfterDivider;
        hasVisibleCardAfterDivider = false;
      }
    });

    emptyState.hidden = visibleCount !== 0;
    const filtersApplied = state.query || state.featuredOnly;
    if (!filtersApplied) {
      searchSummary.textContent = "";
    } else if (visibleCount === 1) {
      searchSummary.textContent = "1 producto encontrado en esta categoría.";
    } else {
      searchSummary.textContent = `${visibleCount} productos encontrados en esta categoría.`;
    }
  }

  function openProductModal(card, trigger) {
    state.lastTrigger = trigger;
    const image = card.querySelector(".card-image");
    const hasImage = card.classList.contains("has-image") && image?.currentSrc;

    productModal.dataset.category = card.dataset.category;
    modalVisual.dataset.category = card.dataset.category;
    modalIcon.textContent = card.dataset.icon;
    modalProductName.textContent = card.dataset.name;
    modalProductDescription.textContent = card.dataset.description;
    modalProductPrice.textContent = card.dataset.price;

    if (card.dataset.badge) {
      modalBadge.textContent = card.dataset.badge;
      modalBadge.hidden = false;
    } else {
      modalBadge.hidden = true;
    }

    modalImage.hidden = !hasImage;
    modalImage.removeAttribute("src");
    if (hasImage) {
      modalImage.src = image.currentSrc;
      modalImage.alt = `Foto de ${card.dataset.name}`;
    }

    if (typeof productModal.showModal === "function") {
      productModal.showModal();
    } else {
      productModal.setAttribute("open", "");
    }
  }

  function closeProductModal() {
    if (productModal.open && typeof productModal.close === "function") {
      productModal.close();
    } else {
      productModal.removeAttribute("open");
    }
  }

  function resetAllFilters() {
    state.query = "";
    state.featuredOnly = false;
    searchInput.value = "";
    clearSearch.hidden = true;
    featuredFilter.setAttribute("aria-pressed", "false");
    applyFilters();
    searchInput.focus();
  }

  function updateScrollState() {
    const hasScrolled = window.scrollY > 60;
    topBar.classList.toggle("compact", hasScrolled);
    backToTop.classList.toggle("visible", window.scrollY > 440);
  }

  function handleArrowNavigation(event) {
    if (!event.key.startsWith("Arrow")) return;
    const currentIndex = navLinks.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    navLinks[(currentIndex + direction + navLinks.length) % navLinks.length].focus();
  }

  const showLogoFallback = () => {
    brandLogo.hidden = true;
    brandLogo.closest(".logo-shell")?.classList.add("logo-missing");
  };

  brandLogo.addEventListener("error", showLogoFallback);
  if (brandLogo.complete && brandLogo.naturalWidth === 0) {
    showLogoFallback();
  }

  searchInput.addEventListener("input", () => {
    state.query = normalize(searchInput.value.trim());
    clearSearch.hidden = !searchInput.value;
    applyFilters();
  });

  clearSearch.addEventListener("click", () => {
    state.query = "";
    searchInput.value = "";
    clearSearch.hidden = true;
    applyFilters();
    searchInput.focus();
  });

  featuredFilter.addEventListener("click", () => {
    state.featuredOnly = !state.featuredOnly;
    featuredFilter.setAttribute("aria-pressed", String(state.featuredOnly));
    applyFilters();
  });

  resetFilters.addEventListener("click", resetAllFilters);
  document.querySelector(".nav-scroll").addEventListener("keydown", handleArrowNavigation);
  window.addEventListener("hashchange", updateCategoryFromHash);
  window.addEventListener("scroll", updateScrollState, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  modalClose.addEventListener("click", closeProductModal);
  productModal.addEventListener("click", (event) => {
    const bounds = productModal.getBoundingClientRect();
    const clickedOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (clickedOutside) closeProductModal();
  });
  productModal.addEventListener("close", () => {
    modalImage.removeAttribute("src");
    state.lastTrigger?.focus();
  });

  prepareProductCards();
  updateCategoryFromHash();
  updateScrollState();
})();
