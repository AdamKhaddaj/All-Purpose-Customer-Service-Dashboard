from extensions import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON
import uuid


# Association table for ticket-tag many-to-many relationship
ticket_tags = db.Table('ticket_tags',
    db.Column('ticket_id', db.String(36), db.ForeignKey('tickets.ticket_id'), primary_key=True),
    db.Column('tag_id', db.String(36), db.ForeignKey('tags.id'), primary_key=True)
)


class Tag(db.Model):
    __tablename__ = 'tags'
    
    id = db.Column('id', db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False, unique=True)
    color = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'ID': self.id,
            'name': self.name,
            'color': self.color
        }


class Agent(db.Model):
    __tablename__ = 'agents'
    
    id = db.Column('id', db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    tickets = db.relationship('Ticket', backref='agent', lazy=True)
    
    def to_dict(self):
        return {
            'ID': self.id,
            'name': self.name
        }


class FAQAutoResponse(db.Model):
    __tablename__ = 'faq_auto_responses'
    
    id = db.Column('id', db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    faq_auto_response = db.Column(db.Text, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'ID': self.id,
            'faqAutoResponse': self.faq_auto_response
        }


class CannedResponse(db.Model):
    __tablename__ = 'canned_responses'
    
    id = db.Column('id', db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    response = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'ID': self.id,
            'response': self.response
        }


class Message(db.Model):
    __tablename__ = 'messages'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ticket_id = db.Column(db.String(36), db.ForeignKey('tickets.ticket_id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    authored = db.Column(db.Boolean, nullable=False, default=False)  # True if sent by agent
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    image_attachments = db.Column(JSON, default=list)
    
    def to_dict(self):
        return {
            'message': self.message,
            'authored': self.authored,
            'date': self.date.isoformat(),
            'imageAttachments': self.image_attachments or []
        }


class Ticket(db.Model):
    __tablename__ = 'tickets'
    
    ticket_id = db.Column('ticket_id', db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    marketplace = db.Column(db.String(50), nullable=False)  # Reverb, eBay, Amazon, Etsy
    marketplace_conversation_id = db.Column(db.String(200), nullable=False, unique=True)
    customer_name = db.Column(db.String(200), nullable=False)
    priority = db.Column(db.String(20), nullable=False, default='Medium')  # Low, Medium, High
    ticket_status = db.Column(db.String(20), nullable=False, default='New')  # New, In Progress, Completed
    assigned_to = db.Column(db.String(36), db.ForeignKey('agents.id'), nullable=True)
    conversation_start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    last_updated_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    order_history = db.Column(JSON, default=list)
    related_listing_url = db.Column(db.String(500), nullable=True)
    
    # Relationships
    messages = db.relationship('Message', backref='ticket', lazy=True, cascade='all, delete-orphan', order_by='Message.date')
    tags = db.relationship('Tag', secondary=ticket_tags, lazy='subquery',
                          backref=db.backref('tickets', lazy=True))
    
    def to_dict(self):
        return {
            'ticketID': self.ticket_id,
            'marketplace': self.marketplace,
            'marketplaceConversationID': self.marketplace_conversation_id,
            'customerName': self.customer_name,
            'priority': self.priority,
            'ticketStatus': self.ticket_status,
            'assignedTo': self.agent.name if self.agent else '',
            'tags': [tag.to_dict() for tag in self.tags],
            'conversationStartDate': self.conversation_start_date.isoformat(),
            'lastUpdatedDate': self.last_updated_date.isoformat(),
            'messages': [msg.to_dict() for msg in sorted(self.messages, key=lambda m: m.date)],
            'orderHistory': self.order_history or [],
            'relatedListingURL': self.related_listing_url
        }
