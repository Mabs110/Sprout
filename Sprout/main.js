// ───────── VARIABLES ─────────
const sidebar = document.getElementById("sidebar");
const sidebarBtns = document.querySelectorAll("#sidebar-btn, #menu-btn"); // ambos botones
const closeSidebar = document.getElementById("close-sidebar");

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.getElementById("close-modal");
const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartBadge = document.getElementById("cart-badge");
const addButtons = document.querySelectorAll(".add-to-cart");

let cartCount = 0;

// ───────── SIDEBAR ─────────
sidebarBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    sidebar.classList.add("active");
  });
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// ───────── MODAL DEL CARRITO ─────────
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Cerrar modal al hacer click fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// ───────── FUNCIONES DEL CARRITO ─────────
function renderCartItems() {
  cartItems.innerHTML = ""; // limpiar lista
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if(cart.length === 0){
    cartEmpty.style.display = "block";
  } else {
    cartEmpty.style.display = "none";

    cart.forEach((product, index) => {
      const li = document.createElement("li");
      li.textContent = product;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "🗑️";
      removeBtn.classList.add("remove-btn");
      removeBtn.style.marginLeft = "10px";
      removeBtn.addEventListener("click", () => {
        removeFromCart(index);
      });

      li.appendChild(removeBtn);
      cartItems.appendChild(li);
    });
  }

  cartBadge.textContent = cart.length;
  cartCount = cart.length;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
}

addButtons.forEach(button => {
  button.addEventListener("click", () => {
    const productName = button.closest(".producto")?.querySelector("h1 span").textContent || "Producto";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
  });
});

// ───────── INICIALIZACIÓN ─────────
window.addEventListener("load", () => {
  renderCartItems();
});

const pantallaInicio = document.querySelector('.pantalla-inicio');
pantallaInicio.addEventListener('animationend', () => {
  document.body.classList.add('loaded');
  document.querySelector('header').style.pointerEvents = 'auto';
});
