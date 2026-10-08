const productGrid = document.querySelector("#product-grid");
const cartCount = document.querySelector(".cart-count");

const paginationPrev = document.querySelector("#pagination-prev");
const paginationNext = document.querySelector("#pagination-next");
const paginationPage = document.querySelector("#pagination-page");

const productsPerPage = 8;
let currentPage = 1;
let currentProductList = products;

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

    if (limitedDigits.length > 0) {
        formattedPhone += ` (${limitedDigits.slice(0, 3)}`;
    }

    if (limitedDigits.length >= 3) {
        formattedPhone += ")";
    }

    if (limitedDigits.length > 3) {
        formattedPhone += ` ${limitedDigits.slice(3, 6)}`;
    }

    if (limitedDigits.length > 6) {
        formattedPhone += `-${limitedDigits.slice(6, 8)}`;
    }

    if (limitedDigits.length > 8) {
        formattedPhone += `-${limitedDigits.slice(8, 10)}`;
    }

    return formattedPhone;
}


phoneInput.addEventListener("input", () => {
    phoneInput.value = formatPhoneNumber(phoneInput.value);
});


function updateCartCount() {
    cartCount.textContent = getCartCount();
}


function updateProductCard(card) {
    const productId = Number(card.dataset.productId);
    const cartControl = card.querySelector(".cart-control");
    const cartItem = getCartItem(productId);

    if (!cartItem) {
        cartControl.innerHTML = `
            <button class="add-to-cart" type="button">
                В корзину
            </button>
        `;
        return;
    }

    cartControl.innerHTML = `
        <div class="cart-control-in-cart">
            <span class="cart-status">
                В корзине
            </span>

            <div class="quantity-controls">
                <button
                    type="button"
                    class="quantity-minus"
                    aria-label="Уменьшить количество"
                >
                    −
                </button>

                <span class="quantity-value">
                    ${cartItem.quantity}
                </span>

                <button
                    type="button"
                    class="quantity-plus"
                    aria-label="Увеличить количество"
                >
                    +
                </button>
            </div>
        </div>
    `;
}


function updateAllProductCards() {
    const productCards = productGrid.querySelectorAll(".product-card");

    productCards.forEach((card) => {
        updateProductCard(card);
    });
}


function formatPrice(price) {
    return `${price.toLocaleString("ru-RU")} ₽`;
}

function renderProductCard(product) {
    const card = document.createElement("article");

    card.className = "product-card";
    card.dataset.productId = product.id;

    card.innerHTML = `
        <div class="product-image">
            <img
                src="${product.image}"
                alt="${product.name}"
            >
        </div>

        <div class="product-info">
            <h3 class="product-name">
                ${product.name}
            </h3>

            <p class="product-price">
                ${formatPrice(product.price)}
            </p>

            <div class="cart-control"></div>
        </div>
    `;

    return card;
}

function renderProducts(productList) {
    currentProductList = productList;
    productGrid.innerHTML = "";

    const totalPages = Math.ceil(productList.length / productsPerPage);

    if (totalPages === 0) {
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

function resetPagination() {
    currentPage = 1;
    renderProducts(currentProductList);
    updateAllProductCards();
}

paginationPrev.addEventListener("click", () => {
    if (currentPage > 1) {
        changePage(currentPage - 1);
    }
});

paginationNext.addEventListener("click", () => {
    const totalPages = Math.ceil(
        currentProductList.length / productsPerPage
    );

    if (currentPage < totalPages) {
        changePage(currentPage + 1);
    }
});

function renderCart() {
    const cart = getCart();

    cartItems.innerHTML = "";

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

        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.product.name}</h3>

                <p class="cart-item-price">
                    ${formatPrice(item.product.price)}
                </p>
            </div>

            <div class="cart-item-quantity">
                <button
                    type="button"
                    class="cart-item-minus"
                    data-product-id="${item.product.id}"
                    aria-label="Уменьшить количество"
                >
                    −
                </button>

                <span>${item.quantity}</span>

                <button
                    type="button"
                    class="cart-item-plus"
                    data-product-id="${item.product.id}"
                    aria-label="Увеличить количество"
                >
                    +
                </button>
            </div>

            <div class="cart-item-total">
                ${formatPrice(item.product.price * item.quantity)}
            </div>
        `;

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


function openCheckout() {
    cartScreen.hidden = true;
    checkoutScreen.hidden = false;
    orderSuccessScreen.hidden = true;
}


function returnToCart() {
    cartScreen.hidden = false;
    checkoutScreen.hidden = true;
    orderSuccessScreen.hidden = true;

    renderCart();
}


function showOrderSuccess() {
    cartScreen.hidden = true;
    checkoutScreen.hidden = true;
    orderSuccessScreen.hidden = false;
}


productGrid.addEventListener("click", (event) => {
    const target = event.target;
    const card = target.closest(".product-card");

    if (!card) {
        return;
    }

    const productId = Number(card.dataset.productId);

    if (
        target.classList.contains("add-to-cart") ||
        target.classList.contains("quantity-plus")
    ) {
        const product = products.find((item) => {
            return item.id === productId;
        });

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


cartItems.addEventListener("click", (event) => {
    const target = event.target;

    const productId = Number(target.dataset.productId);

    if (!productId) {
        return;
    }

    if (target.classList.contains("cart-item-plus")) {
        const product = products.find((item) => {
            return item.id === productId;
        });

        if (product) {
            addToCart(product);
        }
    }

    if (target.classList.contains("cart-item-minus")) {
        decreaseQuantity(productId);
    }

    renderCart();
    updateAllProductCards();
    updateCartCount();
});


cartCount.closest(".cart-button").addEventListener("click", () => {
    openCart();
});


cartModalClose.addEventListener("click", () => {
    closeCart();
});


cartModalOverlay.addEventListener("click", () => {
    closeCart();
});


checkoutButton.addEventListener("click", () => {
    if (getCartCount() === 0) {
        return;
    }

    openCheckout();
});


checkoutBackButton.addEventListener("click", () => {
    returnToCart();
});


checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    clearCart();

    updateCartCount();
    updateAllProductCards();

    checkoutForm.reset();

    showOrderSuccess();
});


returnToCatalogButton.addEventListener("click", () => {
    closeCart();
});


renderProducts(products);
updateAllProductCards();
updateCartCount();