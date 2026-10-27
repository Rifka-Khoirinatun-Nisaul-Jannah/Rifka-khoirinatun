
from flask import Blueprint, request
from App.repositories.product_repo import ProductRepository
from App.services.product_service import ProductService

product_bp = Blueprint(
    "product_bp",
    __name__,
    url_prefix="/api/v1/products"
)

repo = ProductRepository()
service = ProductService(repo)


@product_bp.route("", methods=["GET"])
@product_bp.route("/", methods=["GET"])
def list_products():
    return service.fetch_products()


@product_bp.route("/<int:product_id>", methods=["GET"])
def find_product(product_id):
    return service.get_product_details(product_id)


@product_bp.route("", methods=["POST"])
@product_bp.route("/", methods=["POST"])
def create_product():
    data = request.get_json(silent=True)
    return service.add_new_product(data)


@product_bp.route("/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    data = request.get_json(silent=True)
    return service.update_product(product_id, data)


@product_bp.route("/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    return service.delete_product(product_id)
