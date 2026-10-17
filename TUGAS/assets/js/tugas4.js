const produk = [
{
  id: 1,
  name: "Es Krim Cokelat",
  category: "Es Krim",
  price: 10000,
  stock: 20
},
{
  id: 2,
  name: "Es Krim Vanilla",
  category: "Es Krim",
  price: 10000,
  stock: 25
},
{
  id: 3,
  name: "Es Krim Stroberi",
  category: "Es Krim",
  price: 10000,
  stock: 18
},
{
  id: 4,
  name: "Es Krim Matcha",
  category: "Es Krim",
  price: 12000,
  stock: 15
},
{
  id: 5,
  name: "Es Krim Oreo",
  category: "Es Krim",
  price: 12000,
  stock: 20
},
{
  id: 6,
  name: "Es Krim Mangga",
  category: "Es Krim",
  price: 10000,
  stock: 15
},
{
  id: 7,
  name: "Es Krim Taro",
  category: "Es Krim",
  price: 12000,
  stock: 12
},
{
  id: 8,
  name: "Es Krim Cookies",
  category: "Es Krim",
  price: 13000,
  stock: 10
}
];

const produkEsKrim = produk.filter((item) => {
    return item.category === "Es Krim";
});

console.log("=== Semua Produk Kategori Es Krim ===");

produkEsKrim.forEach((item) => {
    console.log(
        `[id: ${item.id}] ${item.name} - Harga: Rp${item.price} - Stok: ${item.stock}`
    );
});

console.log(produk);

// 2. Fungsi Pengolahan Data Menggunakan ES6
function procesprodukData(produk, filterPrice) {
    console.log(`=== Menjalankan Filter Harga: ${filterPrice} ===`);

    let totalStockValue = 0;
    let matchCount = 0;

    for (const product of produk) {
        // Evaluasi kondisi menggunakan Strict Equality (===)
        if (product.price === filterPrice) {
            matchCount++;

            const subtotal = product.price * product.stock;
            totalStockValue += subtotal;

            // Evaluasi stok (tersedia atau habis)
            const statusStok = product.stock > 0 ? "Stok Tersedia" : "Stok Habis";
            console.log(`[id: ${product.id}] ${product.name} - Stok: ${product.stock} (${statusStok})`);

        }
    }

    return {
        filterPrice: filterPrice,
        totalProduk: matchCount,
        totalNilaiStok: totalStockValue
    };
}
// // 3. Eksekusi Fungsi
// const result = procesprodukData(produk, 10000);
// console.log("Jumlah produk yang sesuai:", result);

// 4. Menghitung Total Nilai Stok Seluruh Produk
      let totalSemuaStok = 0;

     for (const product of produk) {
    totalSemuaStok += product.price * product.stock;
}


console.log(
    `Total nilai stok seluruh produk: Rp${totalSemuaStok.toLocaleString("id-ID")}`
);

// 5. Event Handling Form
const form = document.getElementById("product-form");
const nama = document.getElementById("product-name");
const kategori = document.getElementById("product-category");
const harga = document.getElementById("product-price");
const stok = document.getElementById("product-stock");
const preview = document.getElementById("product-preview");

// Event input untuk live preview
function tampilkanPreview() {
    preview.innerHTML = `
        <p>Nama Produk: ${nama.value || "-"}</p>
        <p>Kategori: ${kategori.value || "-"}</p>
        <p>Harga: ${harga.value ? "Rp " + harga.value : "-"}</p>
        <p>Stok: ${stok.value || "-"}</p>
    `;
}

nama.addEventListener("input", tampilkanPreview);
harga.addEventListener("input", tampilkanPreview);
stok.addEventListener("input", tampilkanPreview);

// Event change untuk kategori
kategori.addEventListener("change", tampilkanPreview);

// Event submit pada form
const feedback = document.getElementById("form-feedback");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const namaProduk = nama.value.trim();
    const hargaProduk = Number(harga.value);
    const stokProduk = Number(stok.value);

    // Validasi data
    if (
        namaProduk === "" ||
        kategori.value === "" ||
        harga.value === "" ||
        hargaProduk <= 0 ||
        stok.value === "" ||
        stokProduk < 0
    ) {
        feedback.textContent = "Data produk tidak valid!";
        feedback.style.color = "red";
        return;
    }

    // Membuat object produk baru
    const newProduct = {
        id: produk.length + 1,
        name: namaProduk,
        category: kategori.value,
        price: hargaProduk,
        stock: stokProduk
    };

    // Menyimpan ke Mock Data
    produk.push(newProduct);

    console.log("Data produk berhasil ditambahkan:", newProduct);
    console.log(produk);

    // Feedback sukses
    feedback.textContent = `Sukses! Produk ${newProduct.name} berhasil disimpan.`;
    feedback.style.color = "green";

    // Reset form
    form.reset();
    tampilkanPreview();
    });