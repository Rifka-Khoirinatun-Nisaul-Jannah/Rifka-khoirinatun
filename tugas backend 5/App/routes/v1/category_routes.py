
from flask import Blueprint, request
from App.utils.response_helper import success_response, fail_response

category_bp = Blueprint(
    "category_bp",
    __name__,
    url_prefix="/api/v1/categories"
)

categories = [
    {"id": 1, "name": "Es Krim"},
    {"id": 2, "name": "Minuman"},
    {"id": 3, "name": "Makanan"},
]

@category_bp.route("", methods=["GET"])
@category_bp.route("/", methods=["GET"])
def get_categories():
    return success_response(data=categories)


@category_bp.route("/<int:category_id>", methods=["GET"])
def get_category(category_id):
    category = next(
        (c for c in categories if c["id"] == category_id),
        None
    )

    if category is None:
        return fail_response({
            "category_id": "Kategori tidak ditemukan"
        }, 404)

    return success_response(data=category)


@category_bp.route("", methods=["POST"])
@category_bp.route("/", methods=["POST"])
def create_category():
    data = request.get_json(silent=True) or {}
    name = data.get("name")

    if not isinstance(name, str) or not name.strip():
        return fail_response({
            "name": "Nama kategori wajib diisi"
        }, 400)

    new_category = {
        "id": max((c["id"] for c in categories), default=0) + 1,
        "name": name.strip()
    }

    categories.append(new_category)

    return success_response(
        data=new_category,
        message="Kategori berhasil ditambahkan",
        code=201
    )


@category_bp.route("/<int:category_id>", methods=["PUT"])
def update_category(category_id):
    category = next(
        (c for c in categories if c["id"] == category_id),
        None
    )

    if category is None:
        return fail_response({
            "category_id": "Kategori tidak ditemukan"
        }, 404)

    data = request.get_json(silent=True) or {}
    name = data.get("name")

    if not isinstance(name, str) or not name.strip():
        return fail_response({
            "name": "Nama kategori wajib diisi"
        }, 400)

    category["name"] = name.strip()

    return success_response(
        data=category,
        message="Kategori berhasil diperbarui"
    )


@category_bp.route("/<int:category_id>", methods=["DELETE"])
def delete_category(category_id):
    category = next(
        (c for c in categories if c["id"] == category_id),
        None
    )

    if category is None:
        return fail_response({
            "category_id": "Kategori tidak ditemukan"
        }, 404)

    categories.remove(category)

    return success_response(
        message="Kategori berhasil dihapus"
    )
