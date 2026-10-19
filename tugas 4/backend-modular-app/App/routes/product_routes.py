from flask import Blueprint, request, jsonify
from App.repositories.product_repo import ProductRepository
from App.services.product_service import ProductService

product_bp = Blueprint('products', __name__, url_prefix='/api/v1/products')
repo = ProductRepository()
service = ProductService(repo)

@product_bp.route('', methods=['GET'])
def list_products():
    result = service.fetch_products()
    return jsonify({"status": "success", "data": result}), 200

@product_bp.route('/<int:product_id>', methods=['GET'])
def find_product(product_id):
    resp, status_code = service.get_product_details(product_id)
    return jsonify(resp), status_code

@product_bp.route('', methods=['POST'])
def create_product():
    data = request.get_json() if request.is_json else None
    resp, status_code = service.add_new_product(data)
    return jsonify(resp), status_code

@product_bp.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json() if request.is_json else None
    resp, status_code = service.update_product(product_id, data)
    return jsonify(resp), status_code

@product_bp.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    resp, status_code = service.delete_product(product_id)
    return jsonify(resp), status_code