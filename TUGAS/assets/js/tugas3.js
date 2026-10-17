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
// 3. Eksekusi Fungsi
const result = procesprodukData(produk, 10000);
console.log("Jumlah produk yang sesuai:", result);

// 4. Menghitung Total Nilai Stok Seluruh Produk
      let totalSemuaStok = 0;

     for (const product of produk) {
    totalSemuaStok += product.price * product.stock;
}


console.log(
    `Total nilai stok seluruh produk: Rp${totalSemuaStok.toLocaleString("id-ID")}`
);