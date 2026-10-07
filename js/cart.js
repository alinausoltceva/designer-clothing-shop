function loadCart() {
    const savedCart = localStorage.getItem("cart");

    if (!savedCart) {
        return [];
    }

    return JSON.parse(savedCart);
}


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


let cart = loadCart();


function addToCart(product) {
    const cartItem = cart.find((item) => {
        return item.product.id === product.id;
    });

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            product: product,
            quantity: 1
        });
    }

    saveCart();
}


function decreaseQuantity(productId) {
    const cartItem = cart.find((item) => {
        return item.product.id === productId;
    });

    if (!cartItem) {
        return;
    }

    cartItem.quantity -= 1;

    if (cartItem.quantity <= 0) {
        cart = cart.filter((item) => {
            return item.product.id !== productId;
        });
    }

    saveCart();
}


function getCart() {
    return cart;
}


function getCartItem(productId) {
    return cart.find((item) => {
        return item.product.id === productId;
    });
}


function getCartCount() {
    return cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
}