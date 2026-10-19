class ProductService:
    def __init__(self, repo):
        self.repo = repo

    def fetch_products(self):
        return self.repo.get_all()

    def get_product_details(self, product_id):
        product = self.repo.get_by_id(product_id)
        if not product:
            return {"error": "Produk tidak ditemukan"}, 404
        return {"status": "success", "data": product}, 200

    def add_new_product(self, data):
        if not data or "name" not in data or "price" not in data:
            return {"error": "Nama dan harga produk wajib diisi"}, 400
        if data["price"] <= 0:
            return {"error": "Harga produk harus lebih besar dari 0"}, 400
        
        created = self.repo.create(data["name"], data["price"])
        return {"status": "success", "message": "Produk tersimpan", "data": created}, 201
                

    def update_product(self, product_id, data):
        if not data:
            return {"error": "Data produk wajib diisi"}, 400

        if "price" in data and data["price"] <= 0:
            return {"error": "Harga produk harus lebih besar dari 0"}, 400

        updated = self.repo.update(product_id, data)
        if not updated:
            return {"error": "Produk tidak ditemukan"}, 404

        return {
            "status": "success",
            "message": "Produk berhasil diperbarui",
            "data": updated
        }, 200

    def delete_product(self, product_id):
        deleted = self.repo.delete(product_id)
        if not deleted:
            return {"error": "Produk tidak ditemukan"}, 404

        return {
            "status": "success",
            "message": "Produk berhasil dihapus",
            "data": deleted
        }, 200