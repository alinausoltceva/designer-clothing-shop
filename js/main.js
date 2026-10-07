const productCards = document.querySelectorAll(".product-card");
const cartCount = document.querySelector(".cart-count");

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
    productCards.forEach((card) => {
        updateProductCard(card);
    });
}


function formatPrice(price) {
    return `${price.toLocaleString("ru-RU")} ₽`;
}


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


productCards.forEach((card) => {
    const productId = Number(card.dataset.productId);

    card.addEventListener("click", (event) => {
        const target = event.target;

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


productCards.forEach((card) => {
    updateProductCard(card);
});

updateCartCount();