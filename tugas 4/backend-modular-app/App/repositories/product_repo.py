class ProductRepository:
    def __init__(self):
        self.products = [
            {"id": 1, "name": "Laptop Pro", "price": 15000000},
            {"id": 2, "name": "Mechanical Keyboard", "price": 850000},
            {"id": 3, "name": "Mouse Wireless", "price": 150000},
            {"id": 4, "name": "Monitor LED", "price": 2500000},
            {"id": 5, "name": "Headset Gaming", "price": 450000}
        ]

    def get_all(self):
        return self.products

    def get_by_id(self, product_id):
        return next((p for p in self.products if p["id"] == product_id), None)

    def create(self, name, price):
        new_product = {"id": len(self.products) + 1, "name": name, "price": price}
        self.products.append(new_product)
        return new_product

    def update(self, product_id, data):
        product = self.get_by_id(product_id)
        if not product:
            return None

        product.update(data)
        return product

    def delete(self, product_id):
        product = self.get_by_id(product_id)
        if not product:
            return None

        self.products.remove(product)
        return product
