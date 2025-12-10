// --- KONSTANTA & VARIABEL UMKM ---
const NAMA_UMKM = "Kopi Koco";
const TAHUN_BERDIRI = 2015;
const LOKASI = "Pekalongan";

// --- START: KODE JQUERY UTAMA ---
$(document).ready(function () {
    
    // Alert Sapaan (Opsional: bisa diaktifkan/dinonaktifkan)
    // alert(`Selamat datang di ${NAMA_UMKM}!`);
    
    // --- EVENT 1: Keyup (Pencarian Produk Real-Time) ---
    $("#cari-produk").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        
        // Tampilkan teks pencarian
        if (value.length > 0) {
            $("#teks-cari").text(value);
            $("#hasil-cari").show();
        } else {
            $("#hasil-cari").hide();
        }

        // Logika Filter Produk
        $("#list-produk .col-md-4").filter(function () {
            var textKartu = $(this).text().toLowerCase();
            $(this).toggle(textKartu.indexOf(value) > -1);
        });
    });

    // --- EVENT 2: Hover (Efek Kartu Produk) ---
    $(".card").hover(
        function () {
            $(this).addClass("card-hover-effect shadow-lg");
        },
        function () {
            $(this).removeClass("card-hover-effect shadow-lg");
        }
    );

    // --- EVENT 3: Click (Tombol Beli) ---
    $(".card .btn-primary").click(function (e) {
        e.preventDefault();
        // Cek apakah tombol ini ada di dalam card produk
        if ($(this).closest(".card-body").length > 0) {
            let namaProduk = $(this).closest(".card-body").find(".card-title").text();
            let harga = $(this).prev().text();
            alert(`Produk ${namaProduk} (${harga}) berhasil dimasukkan ke keranjang!`);
        }
    });

    // --- EVENT 4: Click (Cek Rekomendasi) ---
    $("#cekSeleraBtn").click(function () {
        let jenis = $("#jenisInput").val();
        let gula = $("#gulaInput").val();
        let rekomendasi, deskripsi, bgClass;

        if (jenis === "kopi") {
            if (gula === "manis") {
                rekomendasi = "Kopi Kenangan Koco";
                deskripsi = "Kopi premium + Susu Manis Creamy!";
                bgClass = "alert-warning";
            } else {
                rekomendasi = "Americano";
                deskripsi = "Kopi murni segar tanpa gula.";
                bgClass = "alert-dark text-white";
            }
        } else {
            rekomendasi = (gula === "manis") ? "Matcha Latte" : "Matcha Latte (Less Sugar)";
            deskripsi = "Matcha premium yang menyehatkan.";
            bgClass = "alert-success";
        }

        // Menampilkan Hasil Rekomendasi
        $("#seleraResult").html(`
            <h5 class="fw-bold mb-1">Cobain: ${rekomendasi}</h5>
            <small>${deskripsi}</small>
        `).removeClass().addClass(`mt-3 p-3 text-center border ${bgClass}`).fadeIn();
        
        // --- TAMBAHAN: Logika Kategori Usia (Di dalam tombol yang sama atau terpisah) ---
        // Jika kamu ingin cek usia dijalankan bersamaan dengan rekomendasi
        let usia = $("#usiaInput").val();
        let kategori = "";

        if (usia !== "" && usia > 0) {
            if (usia < 13) kategori = "Anak-anak";
            else if (usia <= 17) kategori = "Remaja";
            else if (usia <= 60) kategori = "Dewasa";
            else kategori = "Lansia";

            // Tambahkan info kategori ke hasil
            $("#seleraResult").append(`<div class="mt-2 border-top pt-2"><strong>Kategori Usia:</strong> ${kategori}</div>`);
        }
    });

    // --- EVENT 5: Double Click (Sembunyikan Tabel) ---
    $("h3").dblclick(function () {
        $(this).next("div").slideToggle("slow");
    });

    // --- EVENT 6: Submit (Hitung Total) ---
    $("#orderForm").submit(function (ev) {
        ev.preventDefault();
        let harga = $("#harga").val();
        let jumlah = $("#jumlah").val();

        if (harga === "" || jumlah === "") {
            $("#totalResult").text("Harap isi harga dan jumlah!").addClass("text-danger");
            return;
        }

        let total = harga * jumlah;
        let formattedTotal = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(total);

        $("#totalResult").text(`Total Belanja: ${formattedTotal}`)
            .removeClass("text-danger").addClass("text-success");
    });

    // --- EVENT 7: Click (Reset Form) ---
    $("#resetOrderBtn").click(function () {
        $("#harga").val("");
        $("#jumlah").val("");
        $("#totalResult").text("");
    });

    // --- FITUR TAMBAHAN: Testimoni ---
    const testimoni = [
        { nama: "Andi", produk: "Americano", pesan: "Mantap jiwa!", nilai: 5 },
        { nama: "Siti", produk: "Kopi Kenangan", pesan: "Creamy banget.", nilai: 4 },
        { nama: "Budi", produk: "Ultimate Latte", pesan: "Harga worth it.", nilai: 5 },
        { nama: "Rina", produk: "Matcha Latte", pesan: "Suka banget!", nilai: 5 },
    ];

    if ($("#testimoniList").length) {
        testimoni.forEach(function (t) {
            let bintang = "★".repeat(t.nilai) + "☆".repeat(5 - t.nilai);
            $("#testimoniList").append(`
                <div class="col-md-6 mb-3">
                    <div class="card h-100 border-start border-4 border-success">
                        <div class="card-body">
                            <h5 class="card-title">${t.nama} <small class="text-muted fs-6">- ${t.produk}</small></h5>
                            <p class="card-text text-warning">${bintang}</p>
                            <p class="card-text">"${t.pesan}"</p>
                        </div>
                    </div>
                </div>
            `);
        });
    }
});

// --- INFO CONSOLE (Untuk Debugging/Tugas Variabel) ---
let jumlahProduk = 6;
let jumlahProdukBaru = jumlahProduk + 2;
console.log(`--- INFO UMKM ${NAMA_UMKM} ---`);
console.log(`Lokasi: ${LOKASI}`);
console.log(`Total Produk: ${jumlahProdukBaru}`);