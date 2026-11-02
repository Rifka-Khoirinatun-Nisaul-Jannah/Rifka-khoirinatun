import {
    getProducts,
    getCategories,
    addProduct,
    deleteProduct,
    updateProduct
} from "./modules/data_service.js";

import { validateProduct } from "./modules/form_validator.js";
import { renderProducts } from "./modules/ui_renderer.js";

// Mengambil elemen HTML
const container = document.querySelector("#daftar-produk");
const search = document.querySelector("#search");
const filterKategori = document.querySelector("#filter-kategori");
const formTambah = document.querySelector("#form-tambah");
const pesanForm = document.querySelector("#pesan-form");

// Menampilkan data produk di Console
console.log("Jumlah produk:", getProducts().length);
console.table(getProducts());

// Mengisi pilihan kategori pada filter
function isiFilterKategori() {
    if (!filterKategori) return;

    const kategoriTerpilih = filterKategori.value;

    filterKategori.innerHTML =
        '<option value="">Semua Kategori</option>';

    getCategories().forEach((kategori) => {
        const option = document.createElement("option");

        option.value = kategori;
        option.textContent = kategori;

        filterKategori.append(option);
    });

    if (getCategories().includes(kategoriTerpilih)) {
        filterKategori.value = kategoriTerpilih;
    }
}

// Menampilkan produk pertama kali
if (container) {
    isiFilterKategori();
    renderProducts(getProducts());
}

// Menggabungkan pencarian dan filter kategori
function tampilkanHasil() {
    const keyword = search
        ? search.value.toLowerCase().trim()
        : "";

    const kategori = filterKategori
        ? filterKategori.value
        : "";

    const hasil = getProducts().filter((prod) => {
        const cocokNama = prod.name
            .toLowerCase()
            .includes(keyword);

        const cocokKategori =
            kategori === "" ||
            prod.category.toLowerCase() === kategori.toLowerCase();

        return cocokNama && cocokKategori;
    });

    renderProducts(hasil);
}

// Fitur pencarian
if (search) {
    search.addEventListener("input", tampilkanHasil);
}

// Fitur filter kategori
if (filterKategori) {
    filterKategori.addEventListener("change", tampilkanHasil);
}

// Tombol edit dan hapus produk
if (container) {
    container.addEventListener("click", function (event) {
        const card = event.target.closest(".kartu-produk");

        if (!card) return;

        const id = Number(card.getAttribute("data-id"));

        const product = getProducts().find(
            (prod) => prod.id === id
        );

        if (!product) return;

        // Edit produk
        if (event.target.classList.contains("btn-edit")) {
            const nama = prompt(
                "Masukkan nama produk:",
                product.name
            );

            if (nama === null) return;

            const kategori = prompt(
                "Masukkan kategori produk:",
                product.category
            );

            if (kategori === null) return;

            const harga = prompt(
                "Masukkan harga produk:",
                product.price
            );

            if (harga === null) return;

            const stok = prompt(
                "Masukkan stok produk:",
                product.stock
            );

            if (stok === null) return;

            // Memeriksa data produk
            const pesanValidasi = validateProduct(
                nama,
                kategori,
                harga,
                stok
            );

            if (pesanValidasi !== "") {
                alert(pesanValidasi);
                return;
            }

            // Menyimpan perubahan produk
            updateProduct(id, {
                name: nama.trim(),
                category: kategori.trim(),
                price: Number(harga),
                stock: Number(stok)
            });

            isiFilterKategori();
            tampilkanHasil();

            console.log("Produk berhasil diperbarui:", product);

            alert("Produk berhasil diperbarui!");
        }

        // Hapus produk
        if (event.target.classList.contains("btn-hapus")) {
            const yakin = confirm(
                "Yakin ingin menghapus produk ini?"
            );

            if (yakin) {
                deleteProduct(id);

                isiFilterKategori();
                tampilkanHasil();

                console.log(
                    "Jumlah produk:",
                    getProducts().length
                );

                console.table(getProducts());
            }
        }
    });
}

// Form tambah produk
if (formTambah) {
    formTambah.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.querySelector("#nama").value;
        const kategori = document.querySelector("#kategori").value;
        const harga = document.querySelector("#harga").value;
        const stok = document.querySelector("#stok").value;

        // Validasi data produk
        const pesanValidasi = validateProduct(
            nama,
            kategori,
            harga,
            stok
        );

        if (pesanValidasi !== "") {
            pesanForm.textContent = pesanValidasi;
            pesanForm.style.color = "red";
            pesanForm.style.backgroundColor = "";
            return;
        }

        // Membuat ID produk baru
        const products = getProducts();

        const produkBaru = {
            id: products.length > 0
                ? Math.max(...products.map((prod) => prod.id)) + 1
                : 1,
            name: nama.trim(),
            category: kategori.trim(),
            price: Number(harga),
            stock: Number(stok)
        };

        // Menambahkan produk
        addProduct(produkBaru);

        pesanForm.textContent = "Produk berhasil ditambahkan!";
        pesanForm.style.color = "green";
        pesanForm.style.padding = "10px";
        pesanForm.style.backgroundColor = "#e8f5e9";
        pesanForm.style.borderRadius = "5px";

        formTambah.reset();

        console.log("Produk berhasil ditambahkan:", produkBaru);
        console.log("Jumlah produk:", getProducts().length);
        console.table(getProducts());
    });
}
