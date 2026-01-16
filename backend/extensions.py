"""
Flask extensions initialization
Prevents circular imports by defining extensions in a separate module
"""
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()
