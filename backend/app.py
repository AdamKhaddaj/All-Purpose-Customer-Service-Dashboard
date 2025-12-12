from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from services.ticket_fetcher import start_scheduler

# blueprints
from routes.ticket_routes import bp as tickets_bp
from routes.tag_routes import bp as tags_bp
from routes.agent_routes import bp as agents_bp
from routes.faq_routes import bp as faq_bp
from routes.canned_response_routes import bp as canned_bp

# Initialize db
db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    app.register_blueprint(tickets_bp, url_prefix='/api')
    app.register_blueprint(tags_bp, url_prefix='/api')
    app.register_blueprint(agents_bp, url_prefix='/api')
    app.register_blueprint(faq_bp, url_prefix='/api')
    app.register_blueprint(canned_bp, url_prefix='/api')
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    with app.app_context():
        db.create_all() 
    
    # Start background scheduler for ticket fetching
    start_scheduler(app)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
