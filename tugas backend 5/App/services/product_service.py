
from App.utils.response_helper import success_response, fail_response


class ProductService:
    def __init__(self, repo):
        self.repo = repo

    def fetch_products(self):
        return success_response(data=self.repo.get_all())

    def get_product_details(self, product_id):
        product = self.repo.get_by_id(product_id)

        if not product:
            return fail_response({
                "product_id": "Produk tidak ditemukan"
            }, 404)

        return success_response(data=product)

    def add_new_product(self, data):
        if not data:
            return fail_response({
                "body": "Data produk wajib diisi"
            }, 400)

        name = data.get("name")
        price = data.get("price")

        if not isinstance(name, str) or not name.strip():
            return fail_response({
                "name": "Nama produk wajib diisi"
            }, 400)

        try:
            price = float(price)
        except (ValueError, TypeError):
            return fail_response({
                "price": "Harga harus berupa angka"
            }, 400)

        if price <= 0:
            return fail_response({
                "price": "Harga harus lebih besar dari 0"
            }, 400)

        created = self.repo.create(name.strip(), price)

        return success_response(
            data=created,
            message="Produk berhasil ditambahkan",
            code=201
        )

    def update_product(self, product_id, data):
        product = self.repo.get_by_id(product_id)

        if not product:
            return fail_response({
                "product_id": "Produk tidak ditemukan"
            }, 404)

        if not data:
            return fail_response({
                "body": "Data produk wajib diisi"
            }, 400)

        name = data.get("name")
        price = data.get("price")

        if not isinstance(name, str) or not name.strip():
            return fail_response({
                "name": "Nama produk wajib diisi"
            }, 400)

        try:
            price = float(price)
        except (ValueError, TypeError):
            return fail_response({
                "price": "Harga harus berupa angka"
            }, 400)

        if price <= 0:
            return fail_response({
                "price": "Harga harus lebih besar dari 0"
            }, 400)

        updated = self.repo.update(
            product_id,
            name.strip(),
            price
        )

        return success_response(
            data=updated,
            message="Produk berhasil diperbarui"
        )

    def delete_product(self, product_id):
        product = self.repo.get_by_id(product_id)

        if not product:
            return fail_response({
                "product_id": "Produk tidak ditemukan"
            }, 404)

        self.repo.delete(product_id)

        return success_response(
            message="Produk berhasil dihapus"
        )
