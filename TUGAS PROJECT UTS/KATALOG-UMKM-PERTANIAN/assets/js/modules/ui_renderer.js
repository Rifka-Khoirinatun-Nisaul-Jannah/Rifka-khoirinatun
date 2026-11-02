
export function renderProducts(data) {
    const container = document.querySelector("#daftar-produk");

    // Periksa apakah halaman memiliki daftar produk
    if (!container) return;

    // Kosongkan daftar sebelum menampilkan produk
    container.innerHTML = "";

    // Jika produk tidak ditemukan
    if (data.length === 0) {
        container.innerHTML = "<p>Produk tidak ditemukan.</p>";
        return;
    }

    data.forEach((prod) => {
        const card = document.createElement("article");

        card.className = "kartu-produk";
        card.setAttribute("data-id", prod.id);

        card.innerHTML = `
            <h3>${prod.name}</h3>
            <p>Kategori: ${prod.category}</p>
            <p>Harga: Rp ${prod.price.toLocaleString("id-ID")}</p>
            <p>Stok: ${prod.stock}</p>

            <button type="button" class="btn-edit">
                Edit Produk
            </button>

            <button type="button" class="btn-hapus">
                Hapus Produk
            </button>
        `;

        container.append(card);
    });
}
