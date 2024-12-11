// Toggle Class Active for Hamburger Menu
const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');

// When hamburger menu is clicked
hamburger?.addEventListener('click', () => {
    navbarNav.classList.toggle('active');
});

// Get the elements for payment method selection and payment fields
const paymentMethodSelect = document.getElementById('payment-method');
const creditCardFields = document.getElementById('credit-card-fields');
const paypalFields = document.getElementById('paypal-fields');
const bankTransferFields = document.getElementById('bank-transfer-fields');

// Function to toggle the visibility of payment method fields
paymentMethodSelect.addEventListener('change', function() {
    // Hide all payment fields initially
    creditCardFields.style.display = 'none';
    paypalFields.style.display = 'none';
    bankTransferFields.style.display = 'none';

    // Display fields based on the selected payment method
    if (paymentMethodSelect.value === 'credit-card') {
        creditCardFields.style.display = 'block';
    } else if (paymentMethodSelect.value === 'paypal') {
        paypalFields.style.display = 'block';
    } else if (paymentMethodSelect.value === 'bank-transfer') {
        bankTransferFields.style.display = 'block';
    }
});

// Trigger change event to display default payment method fields on load
window.addEventListener('load', function() {
    paymentMethodSelect.dispatchEvent(new Event('change'));
});

// Event listener untuk tombol Checkout
document.getElementById('checkout-button').addEventListener('click', function() {
    // Mengarahkan pengguna ke halaman payment.html
    window.location.href = "payment.html"; // Mengarahkan ke halaman payment.html
});

// Ambil elemen input file dan pesan status
const fileInput = document.getElementById('payment-proof');
const statusMessage = document.getElementById('status-message');

// Event listener untuk mendeteksi perubahan pada input file
fileInput.addEventListener('change', function() {
    if (fileInput.files.length > 0) {
        // Menampilkan pesan "File siap untuk dikirim" jika file terpilih
        statusMessage.style.display = 'block';
    } else {
        statusMessage.style.display = 'none';
    }
});

// Optional: Menghandle aksi pada tombol confirm pembayaran
document.getElementById('confirm-payment').addEventListener('click', function() {
    if (fileInput.files.length > 0) {
        alert('File berhasil dikirim!');
    } else {
        alert('Silakan pilih bukti pembayaran terlebih dahulu!');
    }
});

document.getElementById('confirm-payment').addEventListener('click', function() {
    var paymentProof = document.getElementById('payment-proof').files[0];  // Mengambil file yang diunggah
    var statusMessage = document.getElementById('status-message');

    // Jika tidak ada file yang diunggah
    if (!paymentProof) {
        // Tampilkan pesan kesalahan
        statusMessage.textContent = 'Harap Upload Bukti Terlebih Dahulu';
        statusMessage.className = 'error';  // Menambahkan kelas error untuk latar belakang merah
        statusMessage.style.display = 'block';  // Menampilkan pesan
        
        // Sembunyikan pesan setelah 3 detik
        setTimeout(function() {
            statusMessage.style.display = 'none';
        }, 3000);  // 3 detik
    } else {
        // Jika file ada, tampilkan pesan sukses
        statusMessage.textContent = 'Bukti Telah Di Kirim';
        statusMessage.className = 'success';  // Menambahkan kelas success untuk latar belakang hijau
        statusMessage.style.display = 'block';  // Menampilkan pesan
        
        // Sembunyikan pesan setelah 3 detik dan arahkan ke halaman index.html
        setTimeout(function() {
            statusMessage.style.display = 'none';  // Menyembunyikan pesan
            window.location.href = 'index.html';  // Mengarahkan ke halaman index.html
        }, 3000);  // 3 detik
    }
});


