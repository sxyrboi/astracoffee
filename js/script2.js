// Toggle Class Active for Hamburger Menu
const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');

// When hamburger menu is clicked
hamburger?.addEventListener('click', () => {
    navbarNav.classList.toggle('active');
});

// Click outside the navbar to remove 'active' class
document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});

// Event listener untuk menghapus item dari keranjang
document.addEventListener('click', function (e) {
    // Hanya aktifkan jika elemen yang diklik adalah tombol remove-item
    if (e.target.classList.contains('remove-item')) {
        const itemId = e.target.getAttribute('data-id');
        e.stopPropagation();  // Menghentikan event agar tidak memengaruhi elemen lain
        removeItemFromCart(itemId);
    }
});

// Fungsi untuk menghapus item dari keranjang
function removeItemFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Cari item berdasarkan ID
    let item = cart.find(item => item.id === itemId);

    if (item) {
        // Jika jumlah item lebih dari 1, kurangi kuantitasnya
        if (item.quantity > 1) {
            item.quantity -= 1;
            showNotification(`${item.name} jumlahnya telah dikurangi di keranjang!`, "warning");
        } else {
            // Jika hanya ada 1 item, hapus item dari keranjang
            cart = cart.filter(item => item.id !== itemId);
            showNotification(`${item.name} telah dihapus dari keranjang!`, "error");
        }

        // Simpan perubahan ke localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Perbarui tampilan keranjang dan jumlah item
        updateCartDisplay();
        updateCartCount();
    } else {
        showNotification("Item tidak ditemukan di keranjang.", "error");
    }
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';  // Kosongkan tampilan keranjang

    if (cart.length > 0) {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            const itemTotal = item.quantity * item.price;
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity} x ${item.price}K = ${itemTotal.toLocaleString()}K</span>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Perbarui total item dan harga
        updateTotal(cart);
    } else {
        cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
        // Set total item dan harga ke 0 jika kosong
        document.getElementById('total-items').textContent = '0';
        document.getElementById('total-price').textContent = '0';
    }
}

// Fungsi untuk memperbarui jumlah item dan total harga
function updateTotal(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toLocaleString();
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = "success") {
    const notificationBar = document.createElement("div");
    notificationBar.className = `notification-bar ${type}`;
    notificationBar.textContent = message;

    document.body.appendChild(notificationBar);

    // Tampilkan notifikasi dengan menambahkan kelas "show"
    setTimeout(() => {
        notificationBar.classList.add("show");
    }, 100);

    // Hilangkan notifikasi setelah 3 detik
    setTimeout(() => {
        notificationBar.classList.remove("show");
        setTimeout(() => {
            notificationBar.remove(); // Hapus elemen setelah animasi selesai
        }, 500); // Durasi animasi hilang
    }, 3000);
}

// Fungsi untuk menambahkan item ke keranjang
function addToCart(name, price, id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(item => item.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price: parseFloat(price), quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${name} telah ditambahkan ke keranjang!`, "success");
}

// Update Cart Item Count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Inisialisasi jumlah item pada ikon cart
window.addEventListener('load', updateCartCount);

// Event listener untuk semua tombol "Add to Cart"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        const id = this.getAttribute('data-id');
        addToCart(name, price, id);
    });
});

// Event listeners for modals and checkout functionalities
const cartIcon = document.getElementById('shopping-cart');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');

cartIcon?.addEventListener('click', function (e) {
    e.preventDefault();
    displayCartItems();
    cartModal.style.display = 'block';
});

closeModal?.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', function (e) {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Fungsi untuk menampilkan item di keranjang
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';

    if (cart.length > 0) {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            const itemTotal = item.quantity * item.price;
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>${item.quantity} x ${item.price}K= ${itemTotal.toLocaleString()}K</span>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Update total item dan harga
        updateTotal(cart);
    } else {
        cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
        // Set total item dan harga ke 0 jika kosong
        document.getElementById('total-items').textContent = '0';
        document.getElementById('total-price').textContent = '0';
    }
}

// Fungsi untuk mengupdate total item dan harga
function updateTotal(cart) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice.toLocaleString();
}

// Show Payment Modal on Checkout Button Click
document.getElementById('checkout-btn').addEventListener('click', function () {
    const paymentModal = document.getElementById('payment-modal');
    const totalElement = document.getElementById('total');
  
    // Ambil total pembayaran dari localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    // Tampilkan modal dan total pembayaran
    paymentModal.style.display = 'flex';
    totalElement.value = `IDR ${total.toLocaleString()}`;
  });
  
  // Close Payment Modal
  document.getElementById('close-payment-modal').addEventListener('click', function () {
    const paymentModal = document.getElementById('payment-modal');
    paymentModal.style.display = 'none';
  });
  
  // Process Payment
  document.getElementById('pay-now').addEventListener('click', function () {
    alert('Pembayaran Anda sedang diproses!');
    const paymentModal = document.getElementById('payment-modal');
    
    // Clear cart data after payment
    localStorage.removeItem('cart');
  
    // Redirect to confirmation or thank you page (optional)
    window.location.href = 'thank-you.html';
  
    // Hide modal
    paymentModal.style.display = 'none';
  });
  
  // Show Checkout Modal
document.getElementById('checkout-btn').addEventListener('click', function () {
    const checkoutModal = document.getElementById('checkout-modal');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    // Update checkout summary
    document.getElementById('checkout-total-items').textContent = totalItems;
    document.getElementById('checkout-total-price').textContent = `IDR ${totalPrice.toLocaleString()}`;
  
    // Show checkout modal
    checkoutModal.style.display = 'flex';
  });
  
  // Close Checkout Modal
  document.getElementById('close-checkout-modal').addEventListener('click', function () {
    document.getElementById('checkout-modal').style.display = 'none';
  });
  
  // Show Payment Modal
  document.getElementById('open-payment-modal').addEventListener('click', function () {
    document.getElementById('payment-modal').style.display = 'flex';
    document.getElementById('checkout-modal').style.display = 'none'; // Hide checkout modal
  });
  
  // Close Payment Modal
  document.getElementById('close-payment-modal').addEventListener('click', function () {
    document.getElementById('payment-modal').style.display = 'none';
  });
  
  // Process Payment
  document.getElementById('pay-now').addEventListener('click', function () {
    alert('Payment processed successfully!');
    localStorage.removeItem('cart'); // Clear cart data
    document.getElementById('payment-modal').style.display = 'none'; // Hide payment modal
    window.location.reload(); // Reload page to reset
  });
  document.addEventListener('DOMContentLoaded', function () {
    // Tombol Checkout
    const checkoutButton = document.getElementById('checkout-button');
  
    // Tombol untuk menutup modal
    const closeModalButton = document.getElementById('close-checkout-modal');
  
    // Tambahkan event listener ke tombol Checkout
    if (checkoutButton) {
      checkoutButton.addEventListener('click', function () {
        console.log("Checkout button clicked. Redirecting...");
        window.location.href = 'pembelanjaan.html';
      });
    } else {
      console.error("Tombol Checkout tidak ditemukan.");
    }
  
    // Tambahkan event listener ke tombol penutup modal
    if (closeModalButton) {
      closeModalButton.addEventListener('click', function () {
        const modal = document.getElementById('checkout-modal');
        if (modal) {
          modal.style.display = 'none'; // Tutup modal
        }
      });
    } else {
      console.error("Tombol penutup modal tidak ditemukan.");
    }
  });
  