let cart = [];

function addToCart(product, image, price) {
    const existingProduct = cart.find(item => item.product === product);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ product, image, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.product}">
            <p>${item.product} (x${item.quantity})</p>
            <p>Precio: $${item.price * item.quantity}</p>
            <button onclick="removeFromCart('${item.product}')">Eliminar</button>
        </div>
    `).join('');
    console.log(JSON.stringify(cart)); // Información del carrito en formato string
}

function removeFromCart(product) {
    const productIndex = cart.findIndex(item => item.product === product);
    if (productIndex !== -1) {
        cart[productIndex].quantity--;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }
    updateCart();
}

function sendToWhatsApp() {
    const message = encodeURIComponent(`Artículos en el carrito: ${cart.map(item => `${item.product} (x${item.quantity}) - $${item.price * item.quantity}`).join(', ')}`);
    const phoneNumber = '584142282505';
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
}

function toggleCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.classList.toggle('show');
}

function checkout() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}




document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    const totalAmount = document.getElementById('total-amount');
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.product}">
            <p>${item.product} (x${item.quantity})</p>
            <p>Precio: $${item.price * item.quantity}</p>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalAmount.innerHTML = `<p>Total a pagar: $${total}</p>`;
});


