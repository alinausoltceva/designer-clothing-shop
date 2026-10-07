const productCards = document.querySelectorAll(".product-card");
const cartCount = document.querySelector(".cart-count");

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

productCards.forEach((card) => {
    const productId = Number(card.dataset.productId);

    card.addEventListener("click", (event) => {
        const target = event.target;

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
});

productCards.forEach((card) => {
    updateProductCard(card);
});

updateCartCount();