const STORAGE_KEY = "produkPertanian";

// Data awal produk pertanian
let products = [
    {
        id: 1,
        name: "Cabai Merah",
        category: "Sayuran",
        price: 25000,
        stock: 20
    },
    {
        id: 2,
        name: "Tomat",
        category: "Sayuran",
        price: 12000,
        stock: 15
    },
    {
        id: 3,
        name: "Beras Lokal",
        category: "Beras",
        price: 14000,
        stock: 30
    },
    {
        id: 4,
        name: "Pisang",
        category: "Buah-buahan",
        price: 10000,
        stock: 25
    },
    {
        id: 5,
        name: "Ubi Jalar",
        category: "Palawija",
        price: 8000,
        stock: 18
    },
    {
        id: 6,
        name: "Jagung Manis",
        category: "Sayuran",
        price: 10000,
        stock: 20
    }
];

// Mengambil data dari localStorage
const dataTersimpan = localStorage.getItem(STORAGE_KEY);

if (dataTersimpan) {
    products = JSON.parse(dataTersimpan);
} else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Menyimpan data produk
function simpanProduk() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Mengambil semua data produk
export function getProducts() {
    return products;
}

// Menambahkan produk baru
export function addProduct(product) {
    products.push(product);
    simpanProduk();
}

// Mengambil daftar kategori
export function getCategories() {
    return [...new Set(products.map(product => product.category))];
}

// Menghapus produk berdasarkan ID
export function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    simpanProduk();
}

// Mengedit produk berdasarkan ID
export function updateProduct(id, dataBaru) {
    const product = products.find(product => product.id === id);

    if (product) {
        product.name = dataBaru.name;
        product.category = dataBaru.category;
        product.price = dataBaru.price;
        product.stock = dataBaru.stock;

        simpanProduk();
    }
}
