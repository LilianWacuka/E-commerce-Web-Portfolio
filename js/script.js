document.addEventListener('DOMContentLoaded', function () {
  // Load cart from localStorage or initialize as empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartBody = document.getElementById('cart-body');
  const cartTotal = document.getElementById('cart-total');

  // Header Injection
document.getElementById("site-header").innerHTML = `
    <nav class="navbar navbar-expand-lg custom-nav shadow-sm">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="Assets/Image/lilian.png" alt="Logo" width="40" height="40" class="me-2 rounded-circle" onerror="console.error('Failed to load logo image'); this.src='Assets/Image/eggs.jpg';">
          <span class="fw-bold text-primary">Poultry Farm</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link active" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
            <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
            <li class="nav-item"><a class="nav-link" href="cart.html">Cart</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
`;



  // Add to Cart Event Listener
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
      const card = button.closest('.product-card');
      const productName = card.querySelector('.card-title').textContent;
      const ageSelect = card.querySelector('.age-select');
      const quantityInput = card.querySelector('.quantity-input');
      const selectedOption = ageSelect.options[ageSelect.selectedIndex];
      const imageSrc = card.querySelector('.product-img').src;

      if (!selectedOption || !selectedOption.dataset.price) {
        alert('Please select an age/type for the product.');
        return;
      }

      const age = selectedOption.textContent;
      const price = parseFloat(selectedOption.dataset.price);
      const quantity = parseInt(quantityInput.value) || 1;

      const existingIndex = cart.findIndex(
        item => item.name === productName && item.age === age
      );

      if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push({ name: productName, age, price, quantity, image: imageSrc });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });

  // Render the cart to the DOM
  function renderCart() {
    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const row = document.createElement('tr');
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" width="50"/></td>
        <td>${item.age}</td>
        <td>KES ${item.price}</td>
        <td>${item.quantity}</td>
        <td>KES ${itemTotal}</td>
        <td><button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button></td>
      `;

      cartBody.appendChild(row);
    });

    cartTotal.textContent = `KES ${total}`;
    setupRemoveButtons();
  }

  // Setup Remove Buttons
  function setupRemoveButtons() {
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function () {
        const index = this.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }
document.getElementById('checkout-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('phoneNumber').value.trim();
  const address = document.getElementById('deliveryAddress').value.trim();

  if (!name || !phone || !address) {
    alert('Please fill in all the required fields.');
    return;
  }

  // Collect checkout data
  const orderData = {
    customerName: name,
    phoneNumber: phone,
    deliveryAddress: address,
    cartItems: cart,
    totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  };

  // Simulate submission (e.g., sending to backend)
  console.log("Submitting order:", orderData);
  alert('Order placed successfully! You will receive a confirmation shortly.');

  // Clear cart and form
  cart = [];
  localStorage.removeItem('cart');
  renderCart();
  this.reset();
});



  // Initial render of cart on page load
  renderCart();
});
  // Footer Injection
  document.addEventListener("DOMContentLoaded",function (){
      document.getElementById("site-footer").innerHTML = `
    <div class="footer-section bg-dark text-white pt-4 pb-2">
      <div class="container text-center">
        <h3>Contact Us</h3>
        <p><i class="fas fa-phone me-2"></i> <a href="tel:+254707603345">+254 707 603 345</a></p>
        <p><i class="fas fa-envelope me-2"></i>
        <a href="mailto:lilianpoultry@gmail.com">lilianpoultryfarm@gmail.com</a></p>
        <p><i class="fas fa-map-marker-alt me-2"></i><a href="https://goo.gl/maps/4v1x5Z2Q6kE2" target="_blank">Lilian Poultry Farm, Wambwe, Mathioya</a></p>
        <div class="mt-3">
          <a href="https://facebook.com/Lilianpoultry" target="_blank" class="text-white me-3">
            <i class="fab fa-facebook fa-lg"></i>
          </a>
          <a href="https://instagram.com/lilianpoultryfarm" target="_blank" class="text-white me-3">
            <i class="fab fa-instagram fa-lg"></i>
          </a>
          <a href="https://twitter.com" target="_blank" class="text-white me-3">
            <i class="fab fa-twitter fa-lg"></i>
          </a>
          <a href="https://wa.me/254707603345" target="_blank" class="text-white">
            <i class="fab fa-whatsapp fa-lg"></i>
          </a>
        </div>
        <hr class="bg-light mt-4">
        <p class="mb-0">© 2025 Lilian Poultry. All rights reserved.</p>
      </div>
    </div>
  `;
  })
  // Inject Bootstrap-styled Back to Top button
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTopBtn';
backToTopBtn.onmouseenter = () => backToTopBtn.style.opacity = '0.85';
backToTopBtn.onmouseleave = () => backToTopBtn.style.opacity = '1';

backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'; 
backToTopBtn.className = 'btn btn-primary rounded-circle shadow position-fixed'; 
backToTopBtn.style.bottom = '40px';
backToTopBtn.style.backgroundColor = '#fd7e14';
backToTopBtn.style.fontSize = '2.20rem';
backToTopBtn.style.right = '30px';
backToTopBtn.style.zIndex = '999';
backToTopBtn.style.display = 'none';
document.body.appendChild(backToTopBtn);
// Show/hide button on scroll
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTopBtn');
  if (window.scrollY > 100) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});

// Smooth scroll to top
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('backToTopBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
