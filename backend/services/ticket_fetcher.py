import logging
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from extensions import db
from models import Ticket, Message
import requests

logger = logging.getLogger(__name__)

def start_scheduler(app):
    from config import Config
    
    scheduler = BackgroundScheduler()
    
    # Wrap the job in app context
    def scheduled_job():
        with app.app_context():
            fetch_messages()
    
    # Schedule the job to run every X minutes (from config)
    interval_minutes = Config.TICKET_FETCH_INTERVAL
    scheduler.add_job(
        func=scheduled_job,
        trigger="interval",
        minutes=interval_minutes,
        id='fetch_tickets_job',
        name='Fetch and create tickets from some external API',
        replace_existing=True
    )
    
    scheduler.start()
    logger.info(f"Ticket fetcher scheduler started (runs every {interval_minutes} minutes)")
    
    # Optional: Run once on startup
    # scheduled_job()

def fetch_messages(api_key):
    # This is a placeholder function that you'd use to fetch & format messages into Ticket objects
    return []

