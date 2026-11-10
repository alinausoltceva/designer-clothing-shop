const productGrid = document.querySelector("#product-grid");
const cartCount = document.querySelector(".cart-count");

const paginationPrev = document.querySelector("#pagination-prev");
const paginationNext = document.querySelector("#pagination-next");
const paginationPage = document.querySelector("#pagination-page");

const productsPerPage = 8;
let currentPage = 1;
let currentProductList = products;

const filters = {
    collection: "all",
    type: "all",
    category: "all"
};

const filterToggleButton = document.querySelector("#filter-toggle-button");
const catalogFilters = document.querySelector("#catalog-filters");

filterToggleButton.addEventListener("click", () => {
    const isHidden = catalogFilters.hasAttribute("hidden");

    if (isHidden) {
        catalogFilters.removeAttribute("hidden");
        filterToggleButton.setAttribute("aria-expanded", "true");
    } else {
        catalogFilters.setAttribute("hidden", "");
        filterToggleButton.setAttribute("aria-expanded", "false");
    }

    updateFilterButton();
});

function updateFilterButton() {
    const activeFilters = Object.values(filters).filter((value) => {
        return value !== "all" && value !== "Все";
    }).length;

    const isPanelOpen = !catalogFilters.hasAttribute("hidden");

    if (isPanelOpen) {
        if (activeFilters === 0) {
            filterToggleButton.textContent = "Скрыть фильтры";
        } else {
            filterToggleButton.textContent = `Скрыть фильтры · ${activeFilters}`;
        }
    } else {
        if (activeFilters === 0) {
            filterToggleButton.textContent = "Фильтры";
            filterToggleButton.classList.remove("has-active-filters");
        } else {
            filterToggleButton.textContent = `Фильтры · ${activeFilters}`;
            filterToggleButton.classList.add("has-active-filters");
        }
    }
}



function applyFilters() {
    const filteredProducts = products.filter((product) => {
        const collectionMatches =
            filters.collection === "all" ||
            filters.collection === "Все" ||
            product.collection === filters.collection;

        const typeMatches =
            filters.type === "all" ||
            filters.type === "Все" ||
            product.type === filters.type;

        const categoryMatches =
            filters.category === "all" ||
            filters.category === "Все" ||
            product.category === filters.category;

        return (
            collectionMatches &&
            typeMatches &&
            categoryMatches
        );
    });

    currentProductList = filteredProducts;
    currentPage = 1;

    renderProducts(currentProductList);
    updateAllProductCards();
    updateFilterButton();
}



const filterButtons = document.querySelectorAll(".filter-option");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filterName = button.dataset.filter;
        const filterValue = button.dataset.value;

        filters[filterName] = filterValue;

        const filterGroup = button.parentElement;
        filterGroup.querySelectorAll(".filter-option").forEach((option) => {
            option.classList.remove("is-active");
        });

        button.classList.add("is-active");
        applyFilters();
    });
});


function formatPrice(price) {
    return `${price.toLocaleString("ru-RU")} ₽`;
}


function renderProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.productId = product.id;

    const productImage = document.createElement("div");
    productImage.className = "product-image";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;

    productImage.appendChild(image);

    const productInfo = document.createElement("div");
    productInfo.className = "product-info";

    const productName = document.createElement("h3");
    productName.className = "product-name";
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.className = "product-price";
    productPrice.textContent = formatPrice(product.price);

    const cartControl = document.createElement("div");
    cartControl.className = "cart-control";

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(cartControl);

    card.appendChild(productImage);
    card.appendChild(productInfo);

    return card;
}

function renderProducts(productList) {
    currentProductList = productList;
    productGrid.replaceChildren();

    const totalPages = Math.ceil(productList.length / productsPerPage);

    if (totalPages === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "catalog-empty";
        emptyMessage.textContent = "По выбранным параметрам ничего не найдено.";

        productGrid.appendChild(emptyMessage);

        paginationPage.textContent = "0/0";
        paginationPrev.disabled = true;
        paginationNext.disabled = true;
        return;
    }

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const pageProducts = productList.slice(startIndex, endIndex);

    pageProducts.forEach((product) => {
        const card = renderProductCard(product);
        productGrid.appendChild(card);
    });

    paginationPage.textContent = `${currentPage}/${totalPages}`;
    paginationPrev.disabled = currentPage === 1;
    paginationNext.disabled = currentPage === totalPages;
}

function changePage(page) {
    currentPage = page;
    renderProducts(currentProductList);
    updateAllProductCards();

    window.scrollTo({
        top: document.querySelector("#catalog").offsetTop,
        behavior: "smooth"
    });
}

paginationPrev.addEventListener("click", () => {
    if (currentPage > 1) {
        changePage(currentPage - 1);
    }
});

paginationNext.addEventListener("click", () => {
    const totalPages = Math.ceil(currentProductList.length / productsPerPage);
    if (currentPage < totalPages) {
        changePage(currentPage + 1);
    }
});


function updateCartCount() {
    cartCount.textContent = getCartCount();
}


function updateProductCard(card) {
    const productId = Number(card.dataset.productId);
    const cartControl = card.querySelector(".cart-control");
    const cartItem = getCartItem(productId);

    cartControl.replaceChildren();

    if (!cartItem) {
        const addButton = document.createElement("button");
        addButton.className = "add-to-cart";
        addButton.type = "button";
        addButton.textContent = "В корзину";

        cartControl.appendChild(addButton);
        return;
    }

    const cartControlInCart = document.createElement("div");
    cartControlInCart.className = "cart-control-in-cart";

    const cartStatus = document.createElement("span");
    cartStatus.className = "cart-status";
    cartStatus.textContent = "В корзине";

    const quantityControls = document.createElement("div");
    quantityControls.className = "quantity-controls";

    const minusButton = document.createElement("button");
    minusButton.type = "button";
    minusButton.className = "quantity-minus";
    minusButton.textContent = "−";

    const quantityValue = document.createElement("span");
    quantityValue.className = "quantity-value";
    quantityValue.textContent = cartItem.quantity;

    const plusButton = document.createElement("button");
    plusButton.type = "button";
    plusButton.className = "quantity-plus";
    plusButton.textContent = "+";

    quantityControls.appendChild(minusButton);
    quantityControls.appendChild(quantityValue);
    quantityControls.appendChild(plusButton);

    cartControlInCart.appendChild(cartStatus);
    cartControlInCart.appendChild(quantityControls);

    cartControl.appendChild(cartControlInCart);
}

function updateAllProductCards() {
    const productCards = productGrid.querySelectorAll(".product-card");
    productCards.forEach((card) => {
        updateProductCard(card);
    });
}


productGrid.addEventListener("click", (event) => {
    const target = event.target;
    const card = target.closest(".product-card");

    if (!card) return;

    const productId = Number(card.dataset.productId);

    if (target.classList.contains("add-to-cart") || target.classList.contains("quantity-plus")) {
        const product = products.find((item) => item.id === productId);
        if (product) {
            addToCart(product);
            updateProductCard(card);
            updateCartCount();
        }
    }

    if (target.classList.contains("quantity-minus")) {
        decreaseQuantity(productId);
        updateProductCard(card);
        updateCartCount();
    }
});


const cartModal = document.querySelector("#cart-modal");
const cartModalClose = document.querySelector(".cart-modal-close");
const cartModalOverlay = document.querySelector(".cart-modal-overlay");

const cartScreen = document.querySelector("#cart-screen");
const checkoutScreen = document.querySelector("#checkout-screen");
const orderSuccessScreen = document.querySelector("#order-success-screen");

const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartSummary = document.querySelector("#cart-summary");

const cartTotalCount = document.querySelector("#cart-total-count");
const cartTotalPrice = document.querySelector("#cart-total-price");

const checkoutButton = document.querySelector("#checkout-button");
const checkoutBackButton = document.querySelector("#checkout-back-button");
const checkoutForm = document.querySelector("#checkout-form");
const returnToCatalogButton = document.querySelector("#return-to-catalog-button");
const phoneInput = document.querySelector("#phone");

function formatPhoneNumber(value) {
    const digits = value.replace(/\D/g, "").replace(/^7/, "").replace(/^8/, "");
    const limitedDigits = digits.slice(0, 10);
    let formattedPhone = "+7";

    if (limitedDigits.length > 0) formattedPhone += ` (${limitedDigits.slice(0, 3)}`;
    if (limitedDigits.length >= 3) formattedPhone += ")";
    if (limitedDigits.length > 3) formattedPhone += ` ${limitedDigits.slice(3, 6)}`;
    if (limitedDigits.length > 6) formattedPhone += `-${limitedDigits.slice(6, 8)}`;
    if (limitedDigits.length > 8) formattedPhone += `-${limitedDigits.slice(8, 10)}`;

    return formattedPhone;
}

if (phoneInput) {
    phoneInput.addEventListener("input", () => {
        phoneInput.value = formatPhoneNumber(phoneInput.value);
    });
}

function renderCart() {
    const cart = getCart();
    cartItems.replaceChildren();

    if (cart.length === 0) {
        cartEmpty.hidden = false;
        cartSummary.hidden = true;
        return;
    }

    cartEmpty.hidden = true;
    cartSummary.hidden = false;


    cart.forEach((item) => {
        const cartItemElement = document.createElement("article");
        cartItemElement.className = "cart-item";

        const itemInfo = document.createElement("div");
        itemInfo.className = "cart-item-info";

        const itemName = document.createElement("h3");
        itemName.textContent = item.product.name;

        const itemPrice = document.createElement("p");
        itemPrice.className = "cart-item-price";
        itemPrice.textContent = formatPrice(item.product.price);

        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemPrice);

        const itemQuantity = document.createElement("div");
        itemQuantity.className = "cart-item-quantity";

        const minusButton = document.createElement("button");
        minusButton.type = "button";
        minusButton.className = "cart-item-minus";
        minusButton.dataset.productId = item.product.id;
        minusButton.textContent = "−";

        const quantityValue = document.createElement("span");
        quantityValue.textContent = item.quantity;

        const plusButton = document.createElement("button");
        plusButton.type = "button";
        plusButton.className = "cart-item-plus";
        plusButton.dataset.productId = item.product.id;
        plusButton.textContent = "+";

        itemQuantity.appendChild(minusButton);
        itemQuantity.appendChild(quantityValue);
        itemQuantity.appendChild(plusButton);

        const itemTotal = document.createElement("div");
        itemTotal.className = "cart-item-total";
        itemTotal.textContent = formatPrice(
            item.product.price * item.quantity
        );

        cartItemElement.appendChild(itemInfo);
        cartItemElement.appendChild(itemQuantity);
        cartItemElement.appendChild(itemTotal);

        cartItems.appendChild(cartItemElement);
    });

    cartTotalCount.textContent = getCartCount();
    cartTotalPrice.textContent = formatPrice(getCartTotal());
}

function openCart() {
    renderCart();
    cartScreen.hidden = false;
    checkoutScreen.hidden = true;
    orderSuccessScreen.hidden = true;
    cartModal.classList.add("is-open");
    document.body.classList.add("modal-open");
}

function closeCart() {
    cartModal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
}

cartCount.closest(".cart-button").addEventListener("click", openCart);
cartModalClose.addEventListener("click", closeCart);
cartModalOverlay.addEventListener("click", closeCart);

checkoutButton.addEventListener("click", () => {
    if (getCartCount() === 0) return;
    cartScreen.hidden = true;
    checkoutScreen.hidden = false;
    orderSuccessScreen.hidden = true;
});

checkoutBackButton.addEventListener("click", () => {
    cartScreen.hidden = false;
    checkoutScreen.hidden = true;
    orderSuccessScreen.hidden = true;
    renderCart();
});

cartItems.addEventListener("click", (event) => {
    const target = event.target;
    const productId = Number(target.dataset.productId);

    if (!productId) return;

    if (target.classList.contains("cart-item-plus")) {
        const product = products.find((item) => item.id === productId);
        if (product) addToCart(product);
    }

    if (target.classList.contains("cart-item-minus")) {
        decreaseQuantity(productId);
    }

    renderCart();
    updateAllProductCards();
    updateCartCount();
});

checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearCart();
    updateCartCount();
    updateAllProductCards();
    checkoutForm.reset();
    cartScreen.hidden = true;
    checkoutScreen.hidden = true;
    orderSuccessScreen.hidden = false;
});

returnToCatalogButton.addEventListener("click", closeCart);

renderProducts(products);
updateAllProductCards();
updateCartCount();
