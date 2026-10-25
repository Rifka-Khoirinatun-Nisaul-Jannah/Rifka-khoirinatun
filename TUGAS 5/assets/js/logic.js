const STORAGE_KEY = "rifkaIceCreamProducts";
const FALLBACK_IMAGE =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#ffe1e9"/>' +
        '<stop offset="100%" stop-color="#fff0d1"/>' +
        '</linearGradient></defs>' +
        '<rect width="600" height="400" fill="url(#g)"/>' +
        '<text x="50%" y="54%" font-size="120" text-anchor="middle">🍦</text>' +
        "</svg>"
    );

const CATEGORY_EMOJI = {
    Vanilla: "🍦",
    Cokelat: "🍫",
    Stroberi: "🍓",
    Matcha: "🍵",
    Blueberry: "🫐",
    Cookies: "🍪",
    Mangga: "🥭",
    Karamel: "🍮",
    Lainnya: "🍨"
};

const initialProducts = [
    {
        id: 1,
        name: "Vanilla Dream",
        category: "Vanilla",
        stock: 20,
        price: 12000,
        image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Chocolate Bliss",
        category: "Cokelat",
        stock: 15,
        price: 15000,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Strawberry Love",
        category: "Stroberi",
        stock: 18,
        price: 13000,
        image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Matcha Green",
        category: "Matcha",
        stock: 12,
        price: 16000,
        image: "https://id.pngtree.com/free-png-vectors/es-krim-matcha"
    },
    {
        id: 5,
        name: "Blueberry Pop",
        category: "Blueberry",
        stock: 10,
        price: 14000,
        image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Cookies Cream",
        category: "Cookies",
        stock: 14,
        price: 17000,
        image: "https://images.unsplash.com/photo-1517093157656-b9eccef1a7d2?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Mango Sunshine",
        category: "Mangga",
        stock: 16,
        price: 12000,
        image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Caramel Crunch",
        category: "Karamel",
        stock: 9,
        price: 18000,
        image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&q=80"
    }
];


const SELECTED_KEY = "rifkaSelectedProduct";

try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SELECTED_KEY);
} catch (error) {
    console.error("Gagal membersihkan data lama:", error);
}

function readSession(key) {
    try {
        return sessionStorage.getItem(key);
    } catch (error) {
        console.error("Gagal membaca sesi:", error);
        return null;
    }
}

function writeSession(key, value) {
    try {
        sessionStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.error("Gagal menyimpan sesi:", error);
        return false;
    }
}

function removeSession(key) {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error("Gagal menghapus sesi:", error);
    }
}

const CATEGORY_IMAGE = initialProducts.reduce((map, product) => {
    if (!map[product.category]) {
        map[product.category] = product.image;
    }

    return map;
}, {});


function normalizeIds(products) {
    return products.map((product, index) => ({
        ...product,
        id: index + 1
    }));
}

function getProducts() {
    try {
        const saved = readSession(STORAGE_KEY);

        if (saved !== null) {
            const products = JSON.parse(saved);

            if (Array.isArray(products)) {
                return normalizeIds(products);
            }
        }
    } catch (error) {
        console.error("Gagal membaca data produk:", error);
    }

    saveProducts(initialProducts);
    return normalizeIds(initialProducts);
}

function saveProducts(products) {
    return writeSession(STORAGE_KEY, JSON.stringify(products));
}

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);
}

/* =====================================
   HALAMAN KATALOG
===================================== */

function renderCatalog(products = getProducts()) {
    const container = document.querySelector("#product-container");

    if (!container) return;

    container.innerHTML = "";

    products.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card fade-in";

        const stock = Number(product.stock) || 0;

        const image = document.createElement("img");
        image.src = product.image || FALLBACK_IMAGE;
        image.alt = `Ice cream ${product.name}`;
        image.loading = "lazy";
        image.addEventListener("error", () => {
            if (image.src !== FALLBACK_IMAGE) {
                image.src = FALLBACK_IMAGE;
            }
        });

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const category = document.createElement("p");
        category.className = "category";
        category.textContent = `Kategori: ${product.category}`;

        const stockText = document.createElement("p");
        stockText.className = "stock";
        stockText.textContent =
            stock > 0 ? `Stok: ${stock} unit` : "Stok habis";

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = formatRupiah(product.price);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn-pesan";
        button.textContent = stock > 0 ? "Pesan" : "Habis";
        button.disabled = stock <= 0;

        button.addEventListener("click", () => {
            writeSession(SELECTED_KEY, product.name);

            window.location.href =
                "formulir.html?pesan=" +
                encodeURIComponent(product.name);
        });

        info.append(name, category, stockText, price, button);
        card.append(image, info);
        container.appendChild(card);
    });

    const emptyMessage = document.querySelector("#emptyMessage");

    if (emptyMessage) {
        emptyMessage.hidden = products.length > 0;
    }
}

/* =====================================
   SEARCH PRODUK
===================================== */

function setupSearch() {
    const searchInput = document.querySelector("#searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value
            .trim()
            .toLowerCase();

        const filteredProducts = getProducts().filter((product) =>
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword)
        );

        renderCatalog(filteredProducts);
    });
}

/* =====================================
   FORM INPUT DAN LIVE PREVIEW
===================================== */

function setupProductForm() {
    const form = document.querySelector("#productForm");

    if (!form) return;

    const idInput = document.querySelector("#productId");
    const nameInput = document.querySelector("#productName");
    const categoryInput = document.querySelector("#productCategory");
    const stockInput = document.querySelector("#productStock");
    const priceInput = document.querySelector("#productPrice");

    const formTitle = document.querySelector("#formTitle");
    const submitButton = document.querySelector("#submitButton");
    const message = document.querySelector("#formMessage");

    const previewEmoji = document.querySelector("#previewEmoji");
    const previewBadge = document.querySelector("#previewBadge");

    function updatePreview() {
        const stock = Number(stockInput.value) || 0;

        document.querySelector("#previewName").textContent =
            nameInput.value.trim() || "Nama Produk";

        document.querySelector("#previewCategory").textContent =
            "Kategori: " + (categoryInput.value || "-");

        document.querySelector("#previewStock").textContent =
            "Stok: " + (stockInput.value || "0") + " unit";

        document.querySelector("#previewPrice").textContent =
            formatRupiah(priceInput.value);

        if (previewEmoji) {
            previewEmoji.textContent =
                CATEGORY_EMOJI[categoryInput.value] || "🍦";
        }

        if (previewBadge) {
            previewBadge.className = "badge";

            if (stock <= 0) {
                previewBadge.classList.add("out");
                previewBadge.textContent = "Habis";
            } else if (stock <= 5) {
                previewBadge.classList.add("low");
                previewBadge.textContent = "Stok Menipis";
            } else {
                previewBadge.textContent = "Tersedia";
            }
        }
    }

    function showMessage(text, type) {
        message.textContent = text;
        message.className = type;
    }

    [nameInput, categoryInput, stockInput, priceInput]
        .forEach((input) => {
            input.addEventListener("input", updatePreview);
            input.addEventListener("change", updatePreview);
        });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = nameInput.value.trim();
        const category = categoryInput.value;
        const stock = Number(stockInput.value);
        const price = Number(priceInput.value);

        if (
            !name ||
            !category ||
            stockInput.value === "" ||
            !Number.isInteger(stock) ||
            stock < 0 ||
            priceInput.value === "" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            showMessage(
                "Periksa kembali nama, kategori, stok, dan harga.",
                "error"
            );
            return;
        }

        const products = getProducts();
        const editingId = idInput.value
            ? Number(idInput.value)
            : null;

        if (editingId !== null) {
            const index = products.findIndex(
                (product) => product.id === editingId
            );

            if (index === -1) {
                showMessage("Produk tidak ditemukan.", "error");
                return;
            }

            products[index] = {
                ...products[index],
                name,
                category,
                stock,
                price,
                image: CATEGORY_IMAGE[category] ||
                    products[index].image ||
                    FALLBACK_IMAGE
            };
        } else {
            const newId = products.length
                ? Math.max(
                    ...products.map((product) => Number(product.id) || 0)
                ) + 1
                : 1;

            products.push({
                id: newId,
                name,
                category,
                stock,
                price,
                image: CATEGORY_IMAGE[category] || FALLBACK_IMAGE
            });
        }

        if (!saveProducts(products)) {
            showMessage(
                "Data gagal disimpan. Periksa penyimpanan browser.",
                "error"
            );
            return;
        }

        renderProductTable();

        // Tambahan: menampilkan hasil di Console
        console.log(
            editingId !== null
            ? "Produk berhasil diperbarui!"
            : "Produk berhasil ditambahkan ke katalog!"
        );

        console.table(
            getProducts().map((product) => ({
            ID: product.id,
            Nama: product.name,
            Kategori: product.category,
            Stok: product.stock,
            Harga: formatRupiah(product.price)
            }))
        );

        showMessage(
            editingId !== null
            ? "Produk berhasil diperbarui!"
            : "Produk berhasil ditambahkan ke katalog!",
        "success"
        );

        resetForm(false);
    });

    function resetForm(clearMessage = true) {
        form.reset();
        idInput.value = "";

        formTitle.textContent = "Form Input Produk";
        submitButton.textContent = "Simpan Produk";

        updatePreview();

        if (clearMessage) {
            message.textContent = "";
            message.className = "";
        }
    }

    document.querySelector("#resetButton").addEventListener(
        "click",
        () => {
            resetForm();
        }
    );

    // Mengisi form ketika tombol Pesan diklik di katalog.
    const params = new URLSearchParams(window.location.search);
    const selectedName =
        params.get("pesan") ||
        readSession(SELECTED_KEY);

    if (selectedName) {
        const selected = getProducts().find(
            (product) => product.name === selectedName
        );

        if (selected) {
            idInput.value = selected.id;
            nameInput.value = selected.name;
            categoryInput.value = selected.category;
            stockInput.value = selected.stock;
            priceInput.value = selected.price;

            formTitle.textContent = "Edit Produk";
            submitButton.textContent = "Simpan Perubahan";

            updatePreview();

            showMessage(
                `Produk "${selected.name}" siap diubah. Simpan untuk memperbarui katalog.`,
                "success"
            );
        }

        removeSession(SELECTED_KEY);

        if (params.has("pesan")) {
            window.history.replaceState(
                null,
                "",
                window.location.pathname
            );
        }
    }

    // Fungsi edit dipanggil dari tombol pada tabel.
    window.editProduct = function (id) {
        const product = getProducts().find(
            (item) => item.id === Number(id)
        );

        if (!product) return;

        idInput.value = product.id;
        nameInput.value = product.name;
        categoryInput.value = product.category;
        stockInput.value = product.stock;
        priceInput.value = product.price;

        formTitle.textContent = "Edit Produk";
        submitButton.textContent = "Simpan Perubahan";

        updatePreview();

        showMessage(
            "Mode edit aktif. Ubah data lalu simpan.",
            "success"
        );

        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    // Sesuaikan ID produk yang sedang diedit setelah ID disusun ulang.
    window.remapEditForm = function (
        editingId,
        deletedId,
        editingName
    ) {
        if (editingId === null || editingId === undefined) return;

        // Produk yang sedang diedit ikut terhapus.
        if (editingId === deletedId || !editingName) {
            resetForm();
            return;
        }

        const products = getProducts();
        const guessedId =
            editingId > deletedId ? editingId - 1 : editingId;
        const guessed = products.find(
            (item) => item.id === guessedId
        );

        const moved =
            guessed && guessed.name === editingName
                ? guessed
                : products.find((item) => item.name === editingName);

        if (moved) {
            idInput.value = moved.id;
        } else {
            resetForm();
        }
    };
}

/* =====================================
   TABEL DAFTAR PRODUK
===================================== */

function renderProductTable() {
    const tableBody = document.querySelector("#productTableBody");

    if (!tableBody) return;

    const products = getProducts();

    tableBody.innerHTML = "";

    products.forEach((product) => {
        const row = document.createElement("tr");
        const stock = Number(product.stock) || 0;

        if (stock <= 0) {
            row.className = "row-out";
        }

        const values = [
            product.id,
            product.name,
            product.category,
            stock > 0 ? `${stock}` : "Habis",
            formatRupiah(product.price)
        ];

        values.forEach((value) => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "btn-edit";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            window.editProduct(product.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn-hapus";
        deleteButton.textContent = "Hapus";

        deleteButton.addEventListener("click", () => {
            deleteProduct(product.id);
        });

        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });

    const emptyMessage = document.querySelector("#tableEmptyMessage");

    if (emptyMessage) {
        emptyMessage.hidden = products.length > 0;
    }
}

/* =====================================
   HAPUS PRODUK
===================================== */

function deleteProduct(id) {
    const products = getProducts();
    const targetId = Number(id);

    const product = products.find((item) => item.id === targetId);

    if (!product) return;

    const confirmed = window.confirm(
        `Hapus produk "${product.name}"?`
    );

    if (!confirmed) return;

    // ID produk yang sedang diedit (bila ada) supaya ikut menyesuaikan.
    const idInput = document.querySelector("#productId");
    const editingId = idInput && idInput.value
        ? Number(idInput.value)
        : null;

    const editingProduct = editingId !== null
        ? products.find((item) => item.id === editingId)
        : null;

    // Hapus lalu susun ulang ID: ID sesudah yang dihapus otomatis naik.
    const updatedProducts = normalizeIds(
        products.filter((item) => item.id !== targetId)
    );

    if (!saveProducts(updatedProducts)) {
        const message = document.querySelector("#formMessage");

        if (message) {
            message.textContent = "Produk gagal dihapus.";
            message.className = "error";
        }

        return;
    }

    renderProductTable();

    if (typeof window.remapEditForm === "function") {
        window.remapEditForm(
            editingId,
            targetId,
            editingProduct ? editingProduct.name : null
        );
    }

    const message = document.querySelector("#formMessage");

    if (message) {
        message.textContent =
            "Produk berhasil dihapus. ID produk otomatis disusun ulang.";
        message.className = "success";
    }
}

/* =====================================
   LOG CONSOLE SAAT WEBSITE DIBUKA
===================================== */

function logStartupInfo() {
    const products = getProducts();

    console.log(
        "%c🍦 Ice Cream — " +
            (document.title || "Katalog"),
        "color:#ed557d;font-size:15px;font-weight:800;"
    );

    console.log(
        "%c" +
            products.length +
            " produk dimuat dari sesi (hilang saat website ditutup).",
        "color:#82747b;font-style:italic;"
    );

    if (products.length === 0) {
        console.log("%cBelum ada data produk.", "color:#d93652;");
        return;
    }

    console.table(
        products.map((product) => ({
            ID: product.id,
            Nama: product.name,
            Kategori: product.category,
            Stok: product.stock,
            Harga: formatRupiah(product.price)
        }))
    );
}

/* =====================================
   JALANKAN PROGRAM
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    logStartupInfo();

    renderCatalog();
    setupSearch();

    setupProductForm();
    renderProductTable();
});