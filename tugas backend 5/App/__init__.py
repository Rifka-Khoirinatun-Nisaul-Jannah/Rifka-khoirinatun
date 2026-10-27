from flask import Flask
from App.routes.v1.category_routes import category_bp
from App.routes.v1.product_routes import product_bp
from App.routes.v1.user_routes import user_bp_v1

def create_app():
    app = Flask(__name__)
    app.register_blueprint(category_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(user_bp_v1)

    return app
