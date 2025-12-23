// ===== Authentication System =====

// Demo credentials
const DEMO_CREDS = {
  farmerId: 'VRD-20451',
  phone: '+91 9876543210',
  otp: '123456'
};

// Initialize registered users from localStorage
let registeredUsers = JSON.parse(localStorage.getItem('freshFarmUsers')) || [];

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('freshFarmCart')) || [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  const currentUser = localStorage.getItem('freshFarmCurrentUser');
  if (currentUser) {
    updateNavbarForLoggedIn(JSON.parse(currentUser));
    if (document.getElementById('cartIcon')) {
      document.getElementById('cartIcon').style.display = 'block';
    }
    updateCartBadge();
  }
});

// ===== Modal Functions =====

function openAuthModal(mode) {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.add('show');
    if (mode === 'register') {
      switchToRegister();
    } else {
      switchToLogin();
    }
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

function toggleAuthMode() {
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm && loginForm.classList.contains('hidden')) {
    switchToLogin();
  } else {
    switchToRegister();
  }
}

function switchToLogin() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm) loginForm.classList.remove('hidden');
  if (registerForm) registerForm.classList.add('hidden');
  
  const toggleText = document.getElementById('toggleText');
  const toggleLinkText = document.getElementById('toggleLinkText');
  const leftTitle = document.getElementById('modalLeftTitle');
  const leftDesc = document.getElementById('modalLeftDesc');
  
  if (toggleText) toggleText.textContent = "Don't have an account? ";
  if (toggleLinkText) toggleLinkText.textContent = 'Register now';
  if (leftTitle) leftTitle.textContent = 'Secure Farmer Login';
  if (leftDesc) leftDesc.textContent = 'Use your registered phone or FPO ID to access crop plans, subsidies, and cooperative wallets.';
}

function switchToRegister() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm) loginForm.classList.add('hidden');
  if (registerForm) registerForm.classList.remove('hidden');
  
  const toggleText = document.getElementById('toggleText');
  const toggleLinkText = document.getElementById('toggleLinkText');
  const leftTitle = document.getElementById('modalLeftTitle');
  const leftDesc = document.getElementById('modalLeftDesc');
  
  if (toggleText) toggleText.textContent = 'Already have an account? ';
  if (toggleLinkText) toggleLinkText.textContent = 'Login here';
  if (leftTitle) leftTitle.textContent = 'Join Fresh Farm Today';
  if (leftDesc) leftDesc.textContent = 'Create your account to access crop plans, subsidies, and cooperative wallets.';
}

// ===== Login Handler =====

function handleLogin(event) {
  event.preventDefault();
  
  const farmerId = document.getElementById('loginFarmerId')?.value || '';
  const phone = document.getElementById('loginPhone')?.value || '';
  const otp = document.getElementById('loginOtp')?.value || '';
  const messageDiv = document.getElementById('loginMessage');

  let user = null;

  // Check demo credentials
  if (farmerId === DEMO_CREDS.farmerId && phone === DEMO_CREDS.phone && otp === DEMO_CREDS.otp) {
    user = {
      farmerId: DEMO_CREDS.farmerId,
      phone: DEMO_CREDS.phone,
      fullName: 'Demo Farmer'
    };
  } else {
    // Check registered users
    user = registeredUsers.find(u => u.farmerId === farmerId && u.phone === phone && u.otp === otp);
  }

  if (user) {
    if (messageDiv) {
      messageDiv.style.display = 'block';
      messageDiv.style.backgroundColor = '#d4edda';
      messageDiv.style.color = '#155724';
      messageDiv.textContent = '✓ Login successful! Welcome to Fresh Farm.';
    }
    
    setTimeout(() => {
      // Store user session
      localStorage.setItem('freshFarmCurrentUser', JSON.stringify(user));
      updateNavbarForLoggedIn(user);
      closeAuthModal();
      const loginForm = document.getElementById('loginForm');
      if (loginForm) loginForm.reset();
      if (messageDiv) messageDiv.style.display = 'none';
      if (document.getElementById('cartIcon')) {
        document.getElementById('cartIcon').style.display = 'block';
      }
    }, 1500);
    return;
  }

  // Login failed
  if (messageDiv) {
    messageDiv.style.display = 'block';
    messageDiv.style.backgroundColor = '#f8d7da';
    messageDiv.style.color = '#721c24';
    messageDiv.textContent = '✗ Invalid credentials. Please try again.';
  }
}

// ===== Registration Handler =====

function handleRegister(event) {
  event.preventDefault();
  
  const fullName = event.target.querySelector('input[type="text"]')?.value || '';
  const email = event.target.querySelector('input[type="email"]')?.value || '';
  const phone = event.target.querySelectorAll('input[type="tel"]')[0]?.value || '';
  const farmerId = event.target.querySelectorAll('input[type="text"]')[1]?.value || '';
  const location = event.target.querySelectorAll('input[type="text"]')[2]?.value || '';
  const password = event.target.querySelectorAll('input[type="password"]')[0]?.value || '';
  const confirmPassword = event.target.querySelectorAll('input[type="password"]')[1]?.value || '';
  const messageDiv = document.getElementById('registerMessage');

  // Validate passwords match
  if (password !== confirmPassword) {
    if (messageDiv) {
      messageDiv.style.display = 'block';
      messageDiv.style.backgroundColor = '#f8d7da';
      messageDiv.style.color = '#721c24';
      messageDiv.textContent = '✗ Passwords do not match.';
    }
    return;
  }

  // Check if email already registered
  if (registeredUsers.find(u => u.email === email)) {
    if (messageDiv) {
      messageDiv.style.display = 'block';
      messageDiv.style.backgroundColor = '#f8d7da';
      messageDiv.style.color = '#721c24';
      messageDiv.textContent = '✗ Email already registered.';
    }
    return;
  }

  // Create new user
  const newUser = {
    fullName,
    email,
    phone,
    farmerId: farmerId || 'N/A',
    location,
    password,
    otp: '123456'
  };

  registeredUsers.push(newUser);
  localStorage.setItem('freshFarmUsers', JSON.stringify(registeredUsers));

  if (messageDiv) {
    messageDiv.style.display = 'block';
    messageDiv.style.backgroundColor = '#d4edda';
    messageDiv.style.color = '#155724';
    messageDiv.textContent = '✓ Account created successfully! You can now login.';
  }

  setTimeout(() => {
    alert('Registration successful! You can now login with your credentials.');
    event.target.reset();
    switchToLogin();
    if (messageDiv) messageDiv.style.display = 'none';
  }, 1500);
}

// ===== User Navigation =====

function toggleDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById('dropdownMenu');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('dropdownMenu');
  if (dropdown && !event.target.closest('.user-profile')) {
    dropdown.classList.remove('show');
  }
});

function updateNavbarForLoggedIn(user) {
  const loginBtn = document.getElementById('loginBtn');
  const userProfile = document.getElementById('userProfile');
  const userName = document.getElementById('userName');
  const userNameDisplay = document.getElementById('userNameDisplay');
  const profileAvatar = document.getElementById('profileAvatar');

  if (loginBtn) loginBtn.style.display = 'none';
  if (userProfile) userProfile.style.display = 'block';

  const displayName = user.fullName || user.farmerId || 'Farmer';
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  if (userName) userName.textContent = displayName.split(' ')[0];
  if (userNameDisplay) userNameDisplay.textContent = displayName;
  if (profileAvatar) profileAvatar.textContent = initials;
}

function updateNavbarForLoggedOut() {
  const loginBtn = document.getElementById('loginBtn');
  const userProfile = document.getElementById('userProfile');
  const cartIcon = document.getElementById('cartIcon');

  if (loginBtn) loginBtn.style.display = 'block';
  if (userProfile) userProfile.style.display = 'none';
  if (cartIcon) cartIcon.style.display = 'none';
  
  cart = [];
  localStorage.removeItem('freshFarmCart');
  updateCartBadge();
}

function handleLogout() {
  localStorage.removeItem('freshFarmCurrentUser');
  updateNavbarForLoggedOut();
  alert('You have been logged out successfully.');
  const dropdownMenu = document.getElementById('dropdownMenu');
  if (dropdownMenu) dropdownMenu.classList.remove('show');
}

// ===== Cart Functions =====

function addToCart(productName, price) {
  const currentUser = localStorage.getItem('freshFarmCurrentUser');
  if (!currentUser) {
    alert('Please login to add items to cart');
    openAuthModal('login');
    return;
  }

  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem('freshFarmCart', JSON.stringify(cart));
  updateCartBadge();
  alert(productName + ' added to cart!');
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
  }
}

function openCart() {
  const modal = document.getElementById('cartModal');
  if (!modal) return;

  const itemsContainer = document.getElementById('cartItemsContainer');
  const summaryContainer = document.getElementById('cartSummaryContainer');

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    summaryContainer.innerHTML = '';
    modal.classList.add('show');
    return;
  }

  let itemsHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    itemsHTML += `
      <div class="cart-item">
        <div class="item-info">
          <div class="item-name">${item.name}</div>
          <div class="item-price">₹${item.price}/kg × ${item.quantity} = ₹${itemTotal}</div>
        </div>
        <div class="item-quantity">
          <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
          <span>${item.quantity}kg</span>
          <button class="qty-btn" onclick="increaseQty(${index})">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  });

  itemsContainer.innerHTML = itemsHTML;

  summaryContainer.innerHTML = `
    <div class="cart-summary">
      <div class="summary-row">
        <span>Subtotal:</span>
        <span>₹${total}</span>
      </div>
      <div class="summary-row">
        <span>Delivery Charge:</span>
        <span>₹50</span>
      </div>
      <div class="summary-total">
        <span>Total:</span>
        <span>₹${total + 50}</span>
      </div>
      <button class="checkout-btn" onclick="checkout()">Proceed to Checkout</button>
    </div>
  `;

  modal.classList.add('show');
}

function closeCart() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

function increaseQty(index) {
  if (cart[index]) {
    cart[index].quantity += 1;
    localStorage.setItem('freshFarmCart', JSON.stringify(cart));
    updateCartBadge();
    openCart();
  }
}

function decreaseQty(index) {
  if (cart[index] && cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    localStorage.setItem('freshFarmCart', JSON.stringify(cart));
    updateCartBadge();
    openCart();
  }
}

function removeFromCart(index) {
  if (cart[index]) {
    cart.splice(index, 1);
    localStorage.setItem('freshFarmCart', JSON.stringify(cart));
    updateCartBadge();
    openCart();
  }
}

function checkout() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 50;
  alert('Order placed successfully!\nTotal Amount: ₹' + total + '\n\nThank you for shopping with Fresh Farm!');
  cart = [];
  localStorage.removeItem('freshFarmCart');
  updateCartBadge();
  closeCart();
}

// ===== Search Functionality =====

function searchProducts() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (!searchTerm) {
    alert('Please enter a product name to search');
    return;
  }
  
  // Define products available in marketplace
  const products = [
    { name: 'Fresh Spinach', price: 80 },
    { name: 'Fresh Tomatoes', price: 60 },
    { name: 'Fresh Cucumber', price: 40 },
    { name: 'Fresh Carrots', price: 50 },
    { name: 'Fresh Onions', price: 35 },
    { name: 'Fresh Potatoes', price: 25 }
  ];
  
  // Search for matching products
  const results = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );
  
  if (results.length === 0) {
    alert('No products found matching "' + searchTerm + '". Try searching for: Spinach, Tomatoes, Cucumber, Carrots, Onions, or Potatoes');
    return;
  }
  
  // Display search results
  let message = 'Found ' + results.length + ' product(s):\n\n';
  results.forEach(product => {
    message += '• ' + product.name + ' - ₹' + product.price + '/kg\n';
  });
  message += '\nClick on a product card to add to cart!';
  
  alert(message);
}

// Allow search by pressing Enter key
document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter' && event.target.id === 'searchInput') {
    searchProducts();
  }
});

// ===== AI Crop Disease Detector =====

// Disease database with symptoms and solutions
const diseaseDatabase = {
  wheat: {
    'Yellowing,Spotting': {
      name: 'Leaf Rust',
      description: 'Fungal disease causing rust-colored pustules on leaves',
      solution: 'Apply fungicide containing propiconazole. Spray every 10-14 days. Remove infected leaves. Ensure proper spacing for air circulation.'
    },
    'Yellowing,Wilting': {
      name: 'Fusarium Wilt',
      description: 'Soil-borne fungal disease causing vascular damage',
      solution: 'Use resistant varieties. Rotate crops. Avoid waterlogging. Apply Trichoderma biofungicide. Sterilize soil if severely affected.'
    },
    'Powdery': {
      name: 'Powdery Mildew',
      description: 'White powdery coating on leaves reduces photosynthesis',
      solution: 'Spray sulfur dust or neem oil. Improve air circulation. Reduce nitrogen fertilizer. Apply fungicide every 7-10 days.'
    }
  },
  rice: {
    'Yellowing,Spotting': {
      name: 'Blast Disease',
      description: 'Fungal disease affecting leaves and panicles',
      solution: 'Use resistant varieties. Apply tricyclazole fungicide. Improve drainage. Avoid excessive nitrogen. Spray at boot stage.'
    },
    'Mold': {
      name: 'False Smut',
      description: 'Fungal disease producing green masses on grain',
      solution: 'Use clean seeds. Apply carbendazim at heading stage. Remove affected panicles. Improve field drainage.'
    }
  },
  tomato: {
    'Spotting,Necrosis': {
      name: 'Early Blight',
      description: 'Brown spots with concentric rings on leaves and stems',
      solution: 'Remove lower infected leaves. Apply mancozeb or chlorothalonil. Maintain 30cm spacing. Stake plants for air circulation. Mulch soil.'
    },
    'Yellowing,Wilting': {
      name: 'Fusarium Wilt',
      description: 'One-sided wilting and yellowing of leaves',
      solution: 'Use resistant varieties. Practice crop rotation. Avoid wounding roots. Solarize soil. Remove affected plants immediately.'
    },
    'Mold': {
      name: 'Late Blight',
      description: 'Water-soaked spots on leaves with white fungal growth',
      solution: 'Remove infected parts. Apply Bordeaux mixture or mancozeb. Improve ventilation. Reduce humidity. Spray every 7-10 days.'
    }
  },
  potato: {
    'Yellowing,Spotting': {
      name: 'Early Blight',
      description: 'Dark spots with concentric rings on leaves',
      solution: 'Use healthy seed tubers. Remove infected leaves. Apply mancozeb weekly. Improve air circulation. Deep mulch soil.'
    },
    'Wilting,Necrosis': {
      name: 'Late Blight',
      description: 'Water-soaked lesions spreading rapidly, especially in cool wet weather',
      solution: 'Plant resistant varieties. Use Bordeaux mixture. Apply fungicide when conditions favor disease. Remove infected tubers.'
    },
    'Powdery': {
      name: 'Powdery Scab',
      description: 'Raised, corky spots on tuber surface',
      solution: 'Improve drainage. Use resistant varieties. Store tubers in cool dry place. Treat seed with pentachloronitrobenzene.'
    }
  },
  spinach: {
    'Yellowing': {
      name: 'Nutrient Deficiency',
      description: 'Iron or nitrogen deficiency causes yellowing',
      solution: 'Apply nitrogen fertilizer or foliar spray. For iron deficiency, apply iron sulfate. Check soil pH (should be 6.0-7.0).'
    },
    'Spotting': {
      name: 'Leaf Spot',
      description: 'Small brown/purple spots on leaves',
      solution: 'Improve air circulation. Remove affected leaves. Apply copper fungicide. Avoid overhead watering. Maintain spacing.'
    }
  },
  corn: {
    'Yellowing': {
      name: 'Nitrogen Deficiency',
      description: 'Lower leaves turn yellow first',
      solution: 'Apply urea or ammonium nitrate. Split nitrogen application. Ensure good drainage. Check soil pH.'
    },
    'Spotting,Necrosis': {
      name: 'Northern Leaf Blight',
      description: 'Elongated gray spots on leaves becoming tan with dark borders',
      solution: 'Use resistant hybrids. Remove crop debris. Improve air circulation. Apply fungicide if needed. Rotate crops.'
    }
  },
  cucumber: {
    'Yellowing': {
      name: 'Downy Mildew',
      description: 'Yellow spots on upper leaf surface with purple growth below',
      solution: 'Apply sulfur or copper fungicide. Improve ventilation. Remove affected leaves. Spray every 7-10 days.'
    },
    'Powdery': {
      name: 'Powdery Mildew',
      description: 'White powdery coating on leaves and stems',
      solution: 'Spray neem oil or sulfur. Remove affected leaves. Improve air circulation. Apply fungicide every 7 days.'
    }
  }
};

function openDiseaseDetector() {
  const modal = document.getElementById('diseaseModal');
  if (modal) {
    modal.classList.add('show');
    // Reset form
    document.getElementById('cropType').value = '';
    document.querySelectorAll('.symptom-item input').forEach(cb => cb.checked = false);
    document.getElementById('resultsContainer').classList.remove('show');
  }
}

function closeDiseaseDetector() {
  const modal = document.getElementById('diseaseModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const previewImage = document.getElementById('previewImage');
      previewImage.src = e.target.result;
      previewImage.classList.add('show');
      alert('Image uploaded! Now select crop type and symptoms to analyze.');
    };
    reader.readAsDataURL(file);
  }
}

function analyzeCropDisease() {
  const cropType = document.getElementById('cropType').value;
  const resultsContainer = document.getElementById('resultsContainer');
  const resultsContent = document.getElementById('resultsContent');
  
  if (!cropType) {
    alert('Please select a crop type first');
    return;
  }
  
  // Get selected symptoms
  const selectedSymptoms = [];
  document.querySelectorAll('.symptom-item input:checked').forEach(checkbox => {
    selectedSymptoms.push(checkbox.value);
  });
  
  if (selectedSymptoms.length === 0) {
    alert('Please select at least one symptom');
    return;
  }
  
  // Create symptom key for database lookup
  const symptomKey = selectedSymptoms.join(',');
  
  // Check if we have disease data for this crop and symptoms
  const cropDiseases = diseaseDatabase[cropType];
  
  if (!cropDiseases) {
    resultsContent.innerHTML = '<p style="color: #666;">Analysis not available for this crop type. Please contact our experts.</p>';
    resultsContainer.classList.add('show');
    return;
  }
  
  // Find matching diseases
  const matchingDiseases = [];
  Object.entries(cropDiseases).forEach(([symptoms, disease]) => {
    const symptomArray = symptoms.split(',');
    const matchCount = selectedSymptoms.filter(s => symptomArray.includes(s)).length;
    if (matchCount > 0) {
      matchingDiseases.push({
        matchPercentage: (matchCount / symptomArray.length) * 100,
        disease: disease
      });
    }
  });
  
  if (matchingDiseases.length === 0) {
    resultsContent.innerHTML = '<p style="color: #666;">No disease found matching your symptoms. Your crop appears to be healthy! If symptoms persist, consult an agricultural expert.</p>';
    resultsContainer.classList.add('show');
    return;
  }
  
  // Sort by match percentage
  matchingDiseases.sort((a, b) => b.matchPercentage - a.matchPercentage);
  
  // Display results
  let resultsHTML = '';
  matchingDiseases.forEach(item => {
    resultsHTML += `
      <div class="disease-result">
        <div class="disease-name">🦠 ${item.disease.name}</div>
        <div class="disease-description"><strong>Description:</strong> ${item.disease.description}</div>
        <div class="disease-solution"><strong>💊 Solution:</strong> ${item.disease.solution}</div>
      </div>
    `;
  });
  
  resultsContent.innerHTML = resultsHTML;
  resultsContainer.classList.add('show');
}

// Close disease modal when clicking outside
window.addEventListener('click', function(event) {
  const diseaseModal = document.getElementById('diseaseModal');
  if (event.target === diseaseModal) {
    closeDiseaseDetector();
  }
});

// ===== Search Functionality =====

function searchProducts() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (!searchTerm) {
    alert('Please enter a product name to search');
    return;
  }
  
  // Define products available in marketplace
  const products = [
    { name: 'Fresh Spinach', price: 80 },
    { name: 'Fresh Tomatoes', price: 60 },
    { name: 'Fresh Cucumber', price: 40 },
    { name: 'Fresh Carrots', price: 50 },
    { name: 'Fresh Onions', price: 35 },
    { name: 'Fresh Potatoes', price: 25 }
  ];
  
  // Search for matching products
  const results = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );
  
  if (results.length === 0) {
    alert('No products found matching "' + searchTerm + '". Try searching for: Spinach, Tomatoes, Cucumber, Carrots, Onions, or Potatoes');
    return;
  }
  
  // Display search results
  let message = 'Found ' + results.length + ' product(s):\n\n';
  results.forEach(product => {
    message += '• ' + product.name + ' - ₹' + product.price + '/kg\n';
  });
  message += '\nClick on a product card to add to cart!';
  
  alert(message);
}

// Allow search by pressing Enter key
document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter' && event.target.id === 'searchInput') {
    searchProducts();
  }
});

// ===== Modal Close on Outside Click =====

window.addEventListener('click', function(event) {
  const authModal = document.getElementById('authModal');
  const cartModal = document.getElementById('cartModal');
  
  if (event.target === authModal) {
    closeAuthModal();
  }
  
  if (event.target === cartModal) {
    closeCart();
  }
});

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    openAuthModal,
    closeAuthModal,
    handleLogin,
    handleRegister,
    handleLogout,
    addToCart,
    openCart,
    closeCart
  };
}
