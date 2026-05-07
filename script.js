const products = [
  { id: 1, name: "Groundnut Oil", category: "oil", image: "images/Groundnut Oilimages.webp", price: 180, oldPrice: 220, unit: "per liter" },
  { id: 2, name: "Mustard Oil", category: "oil", image: "images/Mustard_Oil_&_Seeds_-_Kolkata_2003-10-31_00537.JPG", price: 150, oldPrice: 190, unit: "per liter" },
  { id: 3, name: "Sesame Oil", category: "oil", image: "images/Sesame OiliKSxHNc75pHyzWHWMLMfQg-836-80.jpg", price: 250, oldPrice: 300, unit: "per liter" },
  { id: 4, name: "Coconut Oil", category: "oil", image: "images/Coconut Oilshopping.webp", price: 200, oldPrice: 240, unit: "per liter" },
  { id: 5, name: "Groundnut Khali", category: "khali", image: "images/Groundnut Khaliground-nut-oil-cake-500x500.webp", price: 30, oldPrice: 40, unit: "per kg" },
  { id: 6, name: "Mustard Khali", category: "khali", image: "images/Mustard KhaliSarso-Khali.jpg", price: 25, oldPrice: 35, unit: "per kg" },
  { id: 7, name: "Sesame Khali", category: "khali", image: "images/Sesame Khaliblack-sesame-oil-cake-500x500.webp", price: 35, oldPrice: 45, unit: "per kg" },
  { id: 8, name: "Cottonseed Khali", category: "khali", image: "images/Cottonseed Khalioil-cake-500x500.webp", price: 28, oldPrice: 38, unit: "per kg" },
  { id: 9, name: "Jute Bardan (60kg)", category: "bardan", image: "images/jutebardenproduct-jpeg-1000x1000.webp", price: 45, oldPrice: 60, unit: "per piece" },
  { id: 10, name: "PP Bardan (50kg)", category: "bardan", image: "images/PP Bardan 41rEMPTmnWL._SX342_SY445_QL70_FMwebp_.webp", price: 35, oldPrice: 50, unit: "per piece" },
  { id: 11, name: "Jute Bardan (100kg)", category: "bardan", image: "images/jutebardenproduct-jpeg-1000x1000.webp", price: 80, oldPrice: 100, unit: "per piece" },
  { id: 12, name: "HDPE Bardan", category: "bardan", image: "images/HDPE Bardanproduct-500x500.webp", price: 55, oldPrice: 70, unit: "per piece" },
];

let cart = [];
let currentFilter = "all";

function renderProducts(filter = "all") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img"><img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/200x160?text=${encodeURIComponent(p.name)}'"/></div>
      <div class="product-info">
        <span class="category-tag">${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</span>
        <h3>${p.name}</h3>
        <div class="price">₹${p.price} <span class="old-price">₹${p.oldPrice}</span> <small style="color:#888;font-size:0.75rem">${p.unit}</small></div>
        <button class="add-cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `).join("");
}

function filterProducts(cat) {
  currentFilter = cat;
  renderProducts(cat);
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  updateCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = count;

  const itemsEl = document.getElementById("cartItems");
  const footerEl = document.getElementById("cartFooter");
  const totalEl = document.getElementById("cartTotal");
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="empty-cart">Cart is empty</p>';
    if (footerEl) footerEl.style.display = "none";
  } else {
    itemsEl.innerHTML = cart.map(c => `
      <div class="cart-item">
        <div>
          <div class="cart-item-name"><img src="${c.image}" alt="${c.name}" style="width:28px;height:28px;object-fit:cover;border-radius:4px;vertical-align:middle;margin-right:6px"/>${c.name}</div>
          <small style="color:#888">Qty: ${c.qty}</small>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <span class="cart-item-price">₹${c.price * c.qty}</span>
          <button class="remove-btn" onclick="removeFromCart(${c.id})">🗑</button>
        </div>
      </div>
    `).join("");
    if (footerEl) footerEl.style.display = "block";
    if (totalEl) totalEl.textContent = total;
  }
}

function openCart() {
  document.getElementById("cartSidebar")?.classList.add("open");
  document.getElementById("overlay")?.classList.add("show");
}

function toggleCart() {
  document.getElementById("cartSidebar")?.classList.toggle("open");
  document.getElementById("overlay")?.classList.toggle("show");
}

function toggleMenu() {
  document.querySelector(".nav-links")?.classList.toggle("open");
}

// Enquiry form handled in firebase.js

function closeModal() {
  document.getElementById("successModal")?.classList.remove("show");
}

// Init
renderProducts();
