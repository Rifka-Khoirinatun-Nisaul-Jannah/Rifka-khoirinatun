
class ProductRepository:
    def __init__(self):
        self.products = [
            {"id": 1, "name": "Es Krim Cokelat", "price": 15000},
            {"id": 2, "name": "Es Krim Vanilla", "price": 85000},
            {"id": 3, "name": "Es Krim Stroberi", "price": 10000},
            {"id": 4, "name": "Es Krim Matcha", "price": 12000},
            {"id": 5, "name": "Es Krim Oreo", "price": 12000},
            {"id": 6, "name": "Es Krim Mangga", "price": 10000},
            {"id": 7, "name": "Es Krim Taro", "price": 12000},
            {"id": 8, "name": "Es Krim Cookies", "price": 12000},
            {"id": 10, "name": "Es Krim Jagung", "price": 10000}
        ]

    def get_all(self):
        return self.products

    def get_by_id(self, product_id):
        return next(
            (p for p in self.products if p["id"] == product_id),
            None
        )

    def create(self, name, price):
        new_id = max(
            (p["id"] for p in self.products),
            default=0
        ) + 1

        new_product = {
            "id": new_id,
            "name": name,
            "price": price
        }

        self.products.append(new_product)
        return new_product

    def update(self, product_id, name, price):
        product = self.get_by_id(product_id)

        if product is None:
            return None

        product["name"] = name
        product["price"] = price
        return product

    def delete(self, product_id):
        product = self.get_by_id(product_id)

        if product is None:
            return False

        self.products.remove(product)
        return True
