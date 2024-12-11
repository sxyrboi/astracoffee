// Toggle Class Active for Hamburger Menu
const navbarNav = document.querySelector('.navbar-nav');
// When hamburger menu is clicked
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// Click outside the navbar to remove 'active' class
const hamburger = document.querySelector('#hamburger-menu');
document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});
document.getElementById('submit-btn').addEventListener('click', function () {
    // Ambil nilai dari form dan hapus spasi di awal dan akhir
    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const noHp = document.getElementById('no-hp').value.trim();
    const noticeBar = document.getElementById('notice-bar');
    const noticeMessage = document.getElementById('notice-message');
  
    // Mengecek apakah ada input yang kosong
    if (nama === '' || email === '' || noHp === '') {
      // Jika ada input yang kosong, tampilkan pesan "Isi Form Terlebih Dahulu!"
      noticeMessage.textContent = 'Isi Form Terlebih Dahulu!';
      noticeBar.style.display = 'block';  // Tampilkan notice bar merah
      noticeBar.classList.remove('success');  // Menghapus class sukses
  
      // Sembunyikan notice setelah 3 detik dan tetap di halaman yang sama
      setTimeout(() => {
        noticeBar.style.display = 'none';
      }, 3000);
    } else {
      // Jika semua input terisi, tampilkan pesan "Pesan Anda telah dikirim!"
      noticeMessage.textContent = 'Pesan Anda telah dikirim!';
      noticeBar.style.display = 'block';
      noticeBar.classList.add('success');  // Menambahkan class untuk sukses (background hijau)
  
      // Sembunyikan notice setelah 3 detik dan redirect ke bagian atas halaman
      setTimeout(() => {
        noticeBar.style.display = 'none';
        window.location.href = '#';  // Mengarahkan ke bagian atas halaman (home)
      }, 3000);
  
      // Reset form setelah pengiriman sukses
      document.getElementById('contact-form').reset();
    }
  });
  