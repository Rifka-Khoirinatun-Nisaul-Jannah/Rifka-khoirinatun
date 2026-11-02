
export function validateProduct(nama, kategori, harga, stok) {
    if (nama.trim() === "") {
        return "Nama produk wajib diisi.";
    }

    if (kategori === "") {
        return "Silakan pilih kategori produk.";
    }

    if (harga.trim() === "" || !Number.isFinite(Number(harga)) || Number(harga) <= 0) {
        return "Harga harus berupa angka dan lebih dari 0.";
    }

    if (stok.trim() === "" || !Number.isInteger(Number(stok)) || Number(stok) < 0) {
        return "Stok harus berupa bilangan bulat dan tidak boleh negatif.";
    }

    return "";
}
 