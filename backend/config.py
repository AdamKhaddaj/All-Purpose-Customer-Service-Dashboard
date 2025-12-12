import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    
    # Database config
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'postgresql://postgres:password@localhost:5432/customer_service_db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = os.getenv('SQLALCHEMY_ECHO', 'False').lower() == 'true'
    
    # Flask configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    # CORS configuration
    CORS_HEADERS = 'Content-Type'
    
    # Ticket fetcher configuration (in minutes)
    TICKET_FETCH_INTERVAL = int(os.getenv('TICKET_FETCH_INTERVAL', '5'))
    
    # External API configuration (examples - customize based on your integration)
    EXTERNAL_API_KEY = os.getenv('EXTERNAL_API_KEY', '')
    EXTERNAL_API_URL = os.getenv('EXTERNAL_API_URL', '')
    
    # Marketplace API credentials (examples)
    REVERB_API_KEY = os.getenv('REVERB_API_KEY', '')
    EBAY_API_KEY = os.getenv('EBAY_API_KEY', '')
    AMAZON_API_KEY = os.getenv('AMAZON_API_KEY', '')
    ETSY_API_KEY = os.getenv('ETSY_API_KEY', '')
