// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage and update cart count
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(name, price, messageElement = null) {
    let cart = getCart();
    price = Number(price);

    cart.push({ name, price });
    saveCart(cart);

    if (messageElement) {
        messageElement.textContent = `Додадено!`;
        messageElement.classList.remove("hidden");

        setTimeout(() => {
            messageElement.classList.add("hidden");
        }, 2000);
    }
}

// Update cart count in navbar
function updateCartCount() {
    let cart = getCart();
    let count = cart.length;

    const el = document.getElementById("cart-count");
    if (el) el.innerText = count;
}

// Display cart items and total
function displayCart() {
    let cart = getCart();

    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    if (!container || !totalEl) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        container.innerHTML += `
        <div class="bg-white p-4 mb-4 shadow rounded flex justify-between items-center">
            <span>${item.name}</span>
            <span class="flex items-center gap-4">
                <span>${item.price} ден.</span>
                <button onclick="removeCartItem(${index})" 
                        class="bg-[#c793ab] text-white px-2 py-1 rounded hover:bg-gray-400 text-sm">
                    Отстрани
                </button>
            </span>
        </div>
        `;
    });

    totalEl.innerText = total;
}

// Remove an item by index
function removeCartItem(index) {
    let cart = getCart();
    cart.splice(index, 1); // remove the item
    saveCart(cart);
    displayCart();
}

// Initialize cart count when page loads
document.addEventListener("DOMContentLoaded", updateCartCount);

