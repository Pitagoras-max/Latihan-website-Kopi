// Combined interactive script for UMKM site (versi diperbaiki + tambahan fitur produk dan tema)
const ENABLE_WELCOME_ALERT = true;
if (ENABLE_WELCOME_ALERT) alert('Selamat datang di Website Profil UMKM Anda!');

// Helper: Render rating
const renderRating = (r, starsEl, textEl) => {
  r = Math.max(0, Math.min(5, r)); // Pastikan r antara 0-5
  const fullStars = Math.floor(r);
  const halfStar = r % 1 >= 0.5 ? 1 : 0; // Opsional: tambah bintang setengah jika perlu
  const emptyStars = 5 - fullStars - halfStar;
  const stars = '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
  if (starsEl) starsEl.textContent = stars;
  if (textEl) {
    textEl.textContent = r >= 4.5 ? '★★★★★ Sangat Disarankan' : r >= 3 ? '★★★ Rekomendasi Biasa' : '★ Tidak Direkomendasikan';
    textEl.classList.toggle('recommend', r >= 4.5); // Gunakan toggle untuk class
  }
};

// Simple rating
const hasilRatingEl = document.getElementById('hasil-rating');
if (hasilRatingEl) renderRating(4, null, hasilRatingEl);

document.addEventListener('DOMContentLoaded', () => {
  // === BAGIAN ASLI (Rating, Usia, Testimoni, Order, Kontak) ===
  // Product cards
  document.querySelectorAll('.product-card').forEach(card => {
    const r = parseFloat(card.getAttribute('data-rating') || 0);
    if (isNaN(r)) return; // Skip jika rating tidak valid
    renderRating(r, card.querySelector('.stars'), card.querySelector('.rating-text'));
  });

  // Kategori Usia
  const usiaInput = document.getElementById('usiaInput');
  const cekBtn = document.getElementById('cekUsiaBtn');
  const usiaResult = document.getElementById('usiaResult');
  if (usiaInput && cekBtn && usiaResult) {
    const kategori = u => {
      u = Number(u);
      if (isNaN(u) || u < 0) return null; // Validasi angka positif
      return u < 13 ? 'Anak-anak' : u <= 17 ? 'Remaja' : u <= 60 ? 'Dewasa' : 'Lansia';
    };
    cekBtn.onclick = () => {
      const val = usiaInput.value.trim();
      const kat = kategori(val);
      usiaResult.textContent = kat ? `Kategori: ${kat}` : 'Masukkan usia yang valid (angka positif).';
      usiaResult.style.color = kat ? '#006400' : '#b00';
    };
  }

  // Testimoni (opsional: buat dinamis dari API nanti)
  const testimoniList = document.getElementById('testimoniList');
  if (testimoniList) {
    const data = [
      { nama: 'Andi', produk: 'Kopi Americano', pesan: 'Rasa kopinya mantap, bikin melek!', nilai: 5 },
      { nama: 'Siti', produk: 'Kopi Latte', pesan: 'Lembut dan creamy, favorit saya.', nilai: 4 },
      { nama: 'Budi', produk: 'Kopi Americano', pesan: 'Harga terjangkau, kualitas premium.', nilai: 5 },
      { nama: 'Rina', produk: 'Kopi Latte', pesan: 'Tempat nyaman buat nongkrong.', nilai: 4 },
      { nama: 'Dedi', produk: 'Kopi Americano', pesan: 'Varian menu banyak, recommended!', nilai: 5 }
    ];
    testimoniList.innerHTML = data.map(t => `
      <div class="testimoni-item">
        <div class="product-name">${t.produk}</div>
        <strong>${t.nama}</strong>
        <p>${t.pesan}</p>
        <div class="rating-meta">
          <span class="stars">${'★'.repeat(t.nilai)}${'☆'.repeat(5 - t.nilai)}</span>
          <span class="rating-score"> ${t.nilai}/5</span>
        </div>
      </div>
    `).join('');
  }

  // Order / Hitung Total
  const form = document.getElementById('orderForm');
  if (form) {
    const hargaInput = document.getElementById('harga');
    const jumlahInput = document.getElementById('jumlah');
    const totalResult = document.getElementById('totalResult');
    const resetBtn = document.getElementById('resetOrderBtn');
    const hitung = (h, j) => {
      h = Number(h);
      j = Number(j);
      return (isNaN(h) || isNaN(j) || h < 0 || j < 0) ? null : h * j; // Validasi angka positif
    };
    form.onsubmit = e => {
      e.preventDefault();
      const h = hargaInput?.value.trim(), j = jumlahInput?.value.trim();
      if (!h || !j) {
        totalResult.textContent = 'Lengkapi harga dan jumlah.';
        totalResult.style.color = '#b00';
        return;
      }
      const total = hitung(h, j);
      if (total === null) {
        totalResult.textContent = 'Masukkan angka yang valid.';
        totalResult.style.color = '#b00';
        return;
      }
      totalResult.textContent = `Total belanja: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total)}`;
      totalResult.style.color = '#006400';
    };
    resetBtn?.onclick = () => {
      if (hargaInput) hargaInput.value = '';
      if (jumlahInput) jumlahInput.value = '';
      if (totalResult) totalResult.textContent = '';
      hargaInput?.focus();
    };
  }
  
  // Form Kontak
  const formKontak = document.getElementById("formKontak");
  const nama = document.getElementById("nama");
  const email = document.getElementById("email");
  const pesan = document.getElementById("pesan");
  const errorMsg = document.getElementById("errorMsg");
  if (formKontak && nama && email && pesan && errorMsg) {
    // Fungsi validasi email sederhana
    const isValidEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    formKontak.addEventListener("submit", function (e) {
      e.preventDefault();
      const namaVal = nama.value.trim();
      const emailVal = email.value.trim();
      const pesanVal = pesan.value.trim();
      if (!namaVal || !emailVal || !pesanVal) {
        errorMsg.textContent = "Semua field harus diisi.";
        errorMsg.style.color = '#b00';
      } else if (!isValidEmail(emailVal)) {
        errorMsg.textContent = "Format email tidak valid.";
        errorMsg.style.color = '#b00';
      } else {
        errorMsg.textContent = "";
        alert("Pesan berhasil dikirim!");
        formKontak.reset();
      }
    });
  }

  // === BAGIAN BARU (Tambah Produk, Preview, Tema, Hover, Hapus) ===
  const produkInput = document.getElementById("produkInput");
  const tambahBtn = document.getElementById("tambahBtn");
  const daftarProduk = document.getElementById("daftarProduk");
  const previewProduk = document.getElementById("previewProduk");
  const temaSelect = document.getElementById("temaSelect");

  // Pastikan elemen ada sebelum menambahkan event
  if (produkInput && tambahBtn && daftarProduk && previewProduk && temaSelect) {
    // Event 1: Tambah Produk ke daftar (click)
    tambahBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const namaProduk = produkInput.value.trim();
      if (namaProduk !== "") {
        const li = document.createElement("li");
        li.textContent = namaProduk;

        // Tambahkan Event Hover (mouseover & mouseout)
        li.addEventListener("mouseover", () => li.style.backgroundColor = "#e0e0e0");
        li.addEventListener("mouseout", () => li.style.backgroundColor = "");

        // Tambahkan Event Hapus (dblclick)
        li.addEventListener("dblclick", () => {
          if (confirm("Yakin ingin menghapus produk ini?")) {
            li.remove();
          }
        });

        daftarProduk.appendChild(li);
        produkInput.value = "";
        previewProduk.textContent = "";
      }
    });

    // Event 2: Preview input secara langsung (keyup)
    produkInput.addEventListener("keyup", function () {
      previewProduk.textContent = produkInput.value;
    });

    // Event 3: Ubah tema background (change)
    temaSelect.addEventListener("change", function () {
      document.body.style.backgroundColor = temaSelect.value;
    });
  }
});