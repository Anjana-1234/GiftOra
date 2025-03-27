document.addEventListener("DOMContentLoaded", function() {
    const products = [
        { id: 1, name: "White Bouquet", price: 24, img: "images/white.jpeg", champagneImg: "images/white_champagne.jpeg" },
        { id: 2, name: "Pink Bouquet", price: 30, img: "images/pink.jpeg", champagneImg: "images/pink_champagne.jpeg" },
        { id: 3, name: "Red Bouquet", price: 35, img: "images/red.jpeg", champagneImg: "images/red_champagne.jpeg" },
        { id: 4, name: "Yellow Bouquet", price: 42, img: "images/yellow.jpeg", champagneImg: "images/yellow_champagne.jpeg" },
        { id: 5, name: "Blue Bouquet", price: 28, img: "images/blue.jpeg", champagneImg: "images/blue_champagne.jpeg" },
        { id: 6, name: "Multi Bouquet", price: 40, img: "images/multi.jpg", champagneImg: "images/multi_champagne.jpeg" },
        { id: 7, name: "Green Bouquet", price: 32, img: "images/green.jpg", champagneImg: "images/green_champagne.jpg" } // Added Green Bouquet
    ];
    
    const productList = document.getElementById("productList");
    const cart = [];
    let champagneAdded = false;
    
    function renderProducts() {
        productList.innerHTML = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img id="img${product.id}" src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>£${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }
    
    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({...product, quantity: 1});
        }
        renderCart();
    };
    
    function renderCart() {
        const cartDiv = document.getElementById("cart");
        const totalPriceEl = document.getElementById("totalPrice");
        cartDiv.innerHTML = "";
        let total = 0;
        
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartDiv.innerHTML += `<p>${item.name} (x${item.quantity}) - £${item.price * item.quantity}</p>`;
        });
        
        if (champagneAdded) {
            total += 10;
            cartDiv.innerHTML += `<p>Champagne Added - £10</p>`;
        }
        
        totalPriceEl.textContent = `£${total}`;
    }
    
    window.toggleChampagne = function() {
        champagneAdded = document.getElementById("champagne").checked;
        products.forEach(product => {
            document.getElementById(`img${product.id}`).src = champagneAdded ? product.champagneImg : product.img;
        });
        renderCart();
    };
    
    renderProducts();
});
